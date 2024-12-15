#!/bin/bash

# Check if environment argument is provided
if [ -z "$1" ]; then
    echo "Usage: ./build.sh <environment>"
    exit 1
fi

ENVIRONMENT=$1

# Validate environment
if [[ "$ENVIRONMENT" != "prod" && "$ENVIRONMENT" != "stg" ]]; then
    echo "Error: Environment must be either 'prod' or 'stg'"
    exit 1
fi

# Build the React application
cd ../frontend
yarn install

# Set the mode based on the environment argument
if [ "$ENVIRONMENT" = "prod" ]; then
    yarn build --mode production
else
    yarn build --mode staging
fi