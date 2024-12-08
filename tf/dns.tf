# Get the hosted zone
data "aws_route53_zone" "domain" {
  name = "kzagozda.me"
}

# Create SSL certificate
resource "aws_acm_certificate" "cert" {
  domain_name               = "kzagozda.me"
  subject_alternative_names = ["*.kzagozda.me"]
  validation_method         = "DNS"

  lifecycle {
    create_before_destroy = true
  }
}

# Create DNS records for certificate validation
resource "aws_route53_record" "cert_validation" {
  for_each = {
    for dvo in aws_acm_certificate.cert.domain_validation_options : dvo.domain_name => {
      name   = dvo.resource_record_name
      record = dvo.resource_record_value
      type   = dvo.resource_record_type
    }
  }

  allow_overwrite = true
  name            = each.value.name
  records         = [each.value.record]
  ttl             = 60
  type            = each.value.type
  zone_id         = data.aws_route53_zone.domain.zone_id
}

# Certificate validation
resource "aws_acm_certificate_validation" "cert" {
  certificate_arn         = aws_acm_certificate.cert.arn
  validation_record_fqdns = [for record in aws_route53_record.cert_validation : record.fqdn]
}

# Create Route53 record for the domain
resource "aws_route53_record" "website" {
  zone_id = data.aws_route53_zone.domain.zone_id
  name    = "kzagozda.me"
  type    = "A"

  alias {
    name                   = aws_cloudfront_distribution.website_distribution.domain_name
    zone_id               = aws_cloudfront_distribution.website_distribution.hosted_zone_id
    evaluate_target_health = false
  }
}

# Create www subdomain record
resource "aws_route53_record" "www" {
  zone_id = data.aws_route53_zone.domain.zone_id
  name    = "www.kzagozda.me"
  type    = "A"

  alias {
    name                   = aws_cloudfront_distribution.website_distribution.domain_name
    zone_id               = aws_cloudfront_distribution.website_distribution.hosted_zone_id
    evaluate_target_health = false
  }
} 