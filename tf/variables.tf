variable "aws_region" {
  description = "AWS region"
  type        = string
  default     = "us-east-1"
}

variable "website_bucket_name" {
  description = "Name of the S3 bucket for the website"
  type        = string
}

variable "domain_name" {
  description = "Primary domain name"
  type        = string
}

variable "alternate_domain_names" {
  description = "List of alternate domain names that should redirect to the primary domain"
  type        = list(string)
  default     = ["konradzagozda.com"]
}
