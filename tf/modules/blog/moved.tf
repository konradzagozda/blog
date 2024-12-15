# Moved blocks for handling resource migrations
moved {
  from = aws_acm_certificate.cert
  to   = aws_acm_certificate.cert[0]
}

moved {
  from = aws_acm_certificate_validation.cert
  to   = aws_acm_certificate_validation.cert[0]
}

moved {
  from = data.aws_route53_zone.domain
  to   = data.aws_route53_zone.domain[0]
}