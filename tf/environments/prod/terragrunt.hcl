terraform {
  source = "../../modules/blog"
}

remote_state {
  backend = "s3"
  config = {
    bucket         = "konradzagozda-terraform-state"
    key            = "terraform.tfstate"
    region         = "us-east-1"
    dynamodb_table = "konradzagozda-terraform-lock"
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
      Environment = "Production"
      Project     = "Personal Website"
      Terraform   = "true"
    }
  }
}
EOF
}

inputs = {
  domain_name            = "zagozdakonrad.com"
  alternate_domain_names = ["konradzagozda.com"]
  website_bucket_name    = "konradzagozda-website-bucket-20240319"
}