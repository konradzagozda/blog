terraform {
  required_version = ">= 1.9.0"

  backend "s3" {
    bucket         = "konradzagozda-terraform-state"
    key            = "terraform.tfstate"
    region         = "us-east-1"
    dynamodb_table = "konradzagozda-terraform-lock"
    encrypt        = true
  }

  required_providers {
    aws = {
      source  = "hashicorp/aws"
      version = "~> 5.0"
    }
  }
}

provider "aws" {
  region = "us-east-1"

  default_tags {
    tags = {
      Environment = "Production"
      Project     = "Personal Website"
      Terraform   = "true"
    }
  }
}

# S3 bucket for website hosting
resource "aws_s3_bucket" "website_bucket" {
  bucket = var.website_bucket_name
}

# S3 bucket configuration for website hosting
resource "aws_s3_bucket_website_configuration" "website_config" {
  bucket = aws_s3_bucket.website_bucket.id

  index_document {
    suffix = "index.html"
  }

  error_document {
    key = "index.html"
  }
}

# S3 bucket policy to allow CloudFront access
resource "aws_s3_bucket_policy" "website_bucket_policy" {
  bucket = aws_s3_bucket.website_bucket.id

  policy = jsonencode({
    Version = "2012-10-17"
    Statement = [
      {
        Sid    = "AllowCloudFrontAccess"
        Effect = "Allow"
        Principal = {
          Service = "cloudfront.amazonaws.com"
        }
        Action   = "s3:GetObject"
        Resource = "${aws_s3_bucket.website_bucket.arn}/*"
        Condition = {
          StringEquals = {
            "AWS:SourceArn" = aws_cloudfront_distribution.website_distribution.arn
          }
        }
      }
    ]
  })
}

# CloudFront distribution
resource "aws_cloudfront_distribution" "website_distribution" {
  enabled             = true
  is_ipv6_enabled     = true
  default_root_object = "index.html"
  price_class         = "PriceClass_100"

  origin {
    domain_name              = aws_s3_bucket.website_bucket.bucket_regional_domain_name
    origin_access_control_id = aws_cloudfront_origin_access_control.default.id
    origin_id                = local.s3_origin_id
  }

  default_cache_behavior {
    allowed_methods        = ["GET", "HEAD", "OPTIONS"]
    cached_methods         = ["GET", "HEAD"]
    target_origin_id       = local.s3_origin_id
    viewer_protocol_policy = "redirect-to-https"

    forwarded_values {
      query_string = false
      cookies {
        forward = "none"
      }
    }

    min_ttl     = 0
    default_ttl = 3600
    max_ttl     = 86400
  }

  restrictions {
    geo_restriction {
      restriction_type = "none"
    }
  }

  viewer_certificate {
    acm_certificate_arn      = var.domain_name != null ? aws_acm_certificate.cert[0].arn : null
    ssl_support_method       = var.domain_name != null ? "sni-only" : null
    minimum_protocol_version = var.domain_name != null ? "TLSv1.2_2021" : "TLSv1"
    cloudfront_default_certificate = var.domain_name == null
  }

  custom_error_response {
    error_code         = 404
    response_code      = 200
    response_page_path = "/index.html"
  }

  aliases = concat([var.domain_name], ["www.${var.domain_name}"])
}

# CloudFront Origin Access Control
resource "aws_cloudfront_origin_access_control" "default" {
  name                              = "website_oac"
  description                       = "Origin Access Control for website"
  origin_access_control_origin_type = "s3"
  signing_behavior                  = "always"
  signing_protocol                  = "sigv4"
}

locals {
  s3_origin_id = "website_s3_origin"
}

resource "aws_s3_bucket_versioning" "website_bucket" {
  bucket = aws_s3_bucket.website_bucket.id
  versioning_configuration {
    status = "Enabled"
  }
}

resource "aws_s3_bucket_cors_configuration" "website_bucket" {
  bucket = aws_s3_bucket.website_bucket.id

  cors_rule {
    allowed_headers = ["*"]
    allowed_methods = ["GET", "HEAD"]
    allowed_origins = ["https://${var.domain_name}"]
    max_age_seconds = 3600
  }
}

resource "aws_s3_bucket_lifecycle_configuration" "website_bucket" {
  bucket = aws_s3_bucket.website_bucket.id

  rule {
    id     = "cleanup_old_versions"
    status = "Enabled"

    noncurrent_version_expiration {
      noncurrent_days = 90
    }
  }
}

resource "aws_s3_bucket_public_access_block" "website_bucket" {
  bucket = aws_s3_bucket.website_bucket.id

  block_public_acls       = true
  block_public_policy     = true
  ignore_public_acls      = true
  restrict_public_buckets = true
}

# S3 buckets for redirect domains
resource "aws_s3_bucket" "redirect_buckets" {
  for_each = toset(var.alternate_domain_names)
  bucket   = "redirect-${each.value}"
}

# Configure redirect buckets for website hosting
resource "aws_s3_bucket_website_configuration" "redirect_config" {
  for_each = toset(var.alternate_domain_names)
  bucket   = aws_s3_bucket.redirect_buckets[each.value].id

  redirect_all_requests_to {
    host_name = var.domain_name
    protocol  = "https"
  }
}

# CloudFront distributions for redirect domains
resource "aws_cloudfront_distribution" "redirect_distribution" {
  for_each = toset(var.alternate_domain_names)

  enabled         = true
  is_ipv6_enabled = true
  price_class     = "PriceClass_100"

  origin {
    domain_name = aws_s3_bucket_website_configuration.redirect_config[each.value].website_endpoint
    origin_id   = "S3-${each.value}"

    custom_origin_config {
      http_port              = 80
      https_port             = 443
      origin_protocol_policy = "http-only"
      origin_ssl_protocols   = ["TLSv1.2"]
    }
  }

  default_cache_behavior {
    allowed_methods        = ["GET", "HEAD", "OPTIONS"]
    cached_methods         = ["GET", "HEAD"]
    target_origin_id       = "S3-${each.value}"
    viewer_protocol_policy = "redirect-to-https"

    forwarded_values {
      query_string = false
      cookies {
        forward = "none"
      }
    }

    min_ttl     = 0
    default_ttl = 3600
    max_ttl     = 86400
  }

  restrictions {
    geo_restriction {
      restriction_type = "none"
    }
  }

  viewer_certificate {
    acm_certificate_arn      = var.domain_name != null ? aws_acm_certificate.cert[0].arn : null
    ssl_support_method       = var.domain_name != null ? "sni-only" : null
    minimum_protocol_version = var.domain_name != null ? "TLSv1.2_2021" : "TLSv1"
    cloudfront_default_certificate = var.domain_name == null
  }

  aliases = [each.value, "www.${each.value}"]
}