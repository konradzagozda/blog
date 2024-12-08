#!/bin/bash

# Build the React application
cd ../frontend
yarn build

# Return to terraform directory
cd ../tf

# Sync the build folder with S3
aws s3 sync ../frontend/dist/ s3://$(terraform output -raw website_bucket_name)

# Invalidate CloudFront cache
aws cloudfront create-invalidation --distribution-id $(terraform output -raw cloudfront_distribution_id) --paths "/*" 