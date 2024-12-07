# Set environment variables
export TF_STATE_BUCKET="konradzagozda-terraform-state"
export TF_LOCK_TABLE="konradzagozda-terraform-lock"
export AWS_REGION="us-east-1"

# Create S3 bucket
aws s3 mb s3://${TF_STATE_BUCKET} --region ${AWS_REGION}

# Enable versioning on the bucket
aws s3api put-bucket-versioning \
    --bucket ${TF_STATE_BUCKET} \
    --versioning-configuration Status=Enabled

# Create DynamoDB table for state locking with on-demand pricing
aws dynamodb create-table \
    --table-name ${TF_LOCK_TABLE} \
    --attribute-definitions AttributeName=LockID,AttributeType=S \
    --key-schema AttributeName=LockID,KeyType=HASH \
    --billing-mode PAY_PER_REQUEST \
    --region ${AWS_REGION}