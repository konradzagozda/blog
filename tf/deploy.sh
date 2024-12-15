#!/bin/bash

# Check if environment argument is provided
if [ -z "$1" ]; then
    echo "Usage: ./deploy.sh <environment>"
    exit 1
fi

ENVIRONMENT=$1

# Validate environment
if [[ "$ENVIRONMENT" != "prod" && "$ENVIRONMENT" != "stg" ]]; then
    echo "Error: Environment must be either 'prod' or 'stg'"
    exit 1
fi

# Navigate to the correct environment directory
cd environments/$ENVIRONMENT

# Sync the build folder with S3
aws s3 sync ../../../frontend/dist/ s3://$(terragrunt output -raw website_bucket_name)

# Invalidate CloudFront cache
aws cloudfront create-invalidation --distribution-id $(terragrunt output -raw cloudfront_distribution_id) --paths "/*"