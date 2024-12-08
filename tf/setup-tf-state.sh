#!/bin/bash
set -e

# Set environment variables
export TF_STATE_BUCKET="konradzagozda-terraform-state"
export TF_LOCK_TABLE="konradzagozda-terraform-lock"
export AWS_REGION="us-east-1"

# Check if bucket already exists
if aws s3api head-bucket --bucket ${TF_STATE_BUCKET} 2>/dev/null; then
    echo "Bucket already exists"
else
    # Create S3 bucket
    aws s3 mb s3://${TF_STATE_BUCKET} --region ${AWS_REGION}
    
    # Enable versioning
    aws s3api put-bucket-versioning \
        --bucket ${TF_STATE_BUCKET} \
        --versioning-configuration Status=Enabled
        
    # Add encryption
    aws s3api put-bucket-encryption \
        --bucket ${TF_STATE_BUCKET} \
        --server-side-encryption-configuration '{
            "Rules": [
                {
                    "ApplyServerSideEncryptionByDefault": {
                        "SSEAlgorithm": "AES256"
                    }
                }
            ]
        }'
fi

# Check if DynamoDB table exists
if aws dynamodb describe-table --table-name ${TF_LOCK_TABLE} 2>/dev/null; then
    echo "DynamoDB table already exists"
else
    # Create DynamoDB table
    aws dynamodb create-table \
        --table-name ${TF_LOCK_TABLE} \
        --attribute-definitions AttributeName=LockID,AttributeType=S \
        --key-schema AttributeName=LockID,KeyType=HASH \
        --billing-mode PAY_PER_REQUEST \
        --region ${AWS_REGION}
fi