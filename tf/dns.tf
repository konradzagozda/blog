# Get the hosted zone for primary domain
data "aws_route53_zone" "domain" {
  name = var.domain_name
}

# Get hosted zones for alternate domains
data "aws_route53_zone" "alternate_domains" {
  for_each = toset(var.alternate_domain_names)
  name     = each.value
}

# Create SSL certificate with SANs for all domains
resource "aws_acm_certificate" "cert" {
  domain_name               = var.domain_name
  subject_alternative_names = concat(["*.${var.domain_name}"], var.alternate_domain_names, [for domain in var.alternate_domain_names : "*.${domain}"])
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
      # Determine which domain this validation record belongs to
      domain = (
        contains(var.alternate_domain_names, regex("([^.]+\\.[^.]+)$", dvo.domain_name)[0]) ?
        regex("([^.]+\\.[^.]+)$", dvo.domain_name)[0] :
        var.domain_name
      )
    }
  }

  allow_overwrite = true
  name            = each.value.name
  records         = [each.value.record]
  ttl             = 60
  type            = each.value.type
  zone_id = (
    each.value.domain == var.domain_name ?
    data.aws_route53_zone.domain.zone_id :
    data.aws_route53_zone.alternate_domains[each.value.domain].zone_id
  )
}

# Certificate validation
resource "aws_acm_certificate_validation" "cert" {
  certificate_arn = aws_acm_certificate.cert.arn
  validation_record_fqdns = [
    for record in aws_route53_record.cert_validation : record.fqdn
  ]

  timeouts {
    create = "30m"
  }
}

# Create Route53 record for the primary domain and www
resource "aws_route53_record" "website" {
  for_each = toset(["", "www."])

  zone_id = data.aws_route53_zone.domain.zone_id
  name    = "${each.value}${var.domain_name}"
  type    = "A"

  alias {
    name                   = aws_cloudfront_distribution.website_distribution.domain_name
    zone_id                = aws_cloudfront_distribution.website_distribution.hosted_zone_id
    evaluate_target_health = false
  }
}

# Create Route53 records for alternate domains and their www subdomains
resource "aws_route53_record" "alternate_domains" {
  for_each = {
    for pair in flatten([
      for domain in var.alternate_domain_names : [
        { domain = domain, prefix = "" },
        { domain = domain, prefix = "www." }
      ]
    ]) : "${pair.prefix}${pair.domain}" => pair
  }

  zone_id = data.aws_route53_zone.alternate_domains[each.value.domain].zone_id
  name    = "${each.value.prefix}${each.value.domain}"
  type    = "A"

  alias {
    name                   = aws_cloudfront_distribution.redirect_distribution[each.value.domain].domain_name
    zone_id                = aws_cloudfront_distribution.redirect_distribution[each.value.domain].hosted_zone_id
    evaluate_target_health = false
  }
} 