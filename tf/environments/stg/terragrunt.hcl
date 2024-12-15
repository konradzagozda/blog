terraform {
  source = "../../modules/blog"
}

remote_state {
  backend = "s3"
  config = {
    bucket         = "konradzagozda-terraform-state-staging"
    key            = "terraform.tfstate"
    region         = "us-east-1"
    dynamodb_table = "konradzagozda-terraform-lock-staging"
    encrypt        = true
  }
}

generate "provider" {
  path      = "provider.tf"
  if_exists = "overwrite_terragrunt"
  contents  = <<EOF
provider "aws" {
  region = "us-east-1"
  
  default_tags {
    tags = {
      Environment = "Staging"
      Project     = "Personal Website"
      Terraform   = "true"
    }
  }
}
EOF
}

inputs = {
  domain_name            = null
  alternate_domain_names = []
  website_bucket_name    = "konradzagozda-website-bucket-20241215"
}