# Blog

This repository powers my website at [kzagozda.me](https://kzagozda.me)

## Architecture

![Architecture Diagram](docs/images/architecture.png)

The website architecture consists of:

- **Frontend**: React-based static website
- **CMS**: Contentful headless CMS for content management
- **Hosting**: AWS S3 static website hosting
- **CDN**: Amazon CloudFront with ACM SSL certificate
- **Infrastructure**: Managed via Terraform
- **CI/CD**: Automated deployments using GitHub Actions

## Responsive Views

### Mobile

![Mobile Timeline](docs/images/mobile_timeline.png)

![Mobile Article](docs/images/mobile_article.png)

### Tablet

![Tablet Timeline](docs/images/tablet_timeline.png)

![Tablet Article](docs/images/tablet_article.png)

### Desktop

![Desktop Timeline](docs/images/desktop_timeline.png)

![Desktop Article](docs/images/desktop_article.png)

## Infrastructure

The infrastructure is managed using Terraform and includes:

- S3 bucket for static website hosting
- CloudFront distribution for content delivery
- ACM certificate for HTTPS
- Required IAM roles and policies

## CI/CD & Deployment

The site uses GitHub Actions for continuous integration and deployment. When changes are pushed to the main branch, the pipeline automatically:

- Provisions infrastructure using Terraform
- Builds the React application
- Deploys built assets to S3
- Creates CloudFront cache invalidation to ensure latest content delivery

No manual deployment steps are required - simply push your changes to the main branch and GitHub Actions handles the rest.

## Local Development

### Requirements

- Node.js
- Yarn
- Contentful API keys (for CMS integration)

### Setup

1. Install dependencies:

```bash
cd frontend
yarn install
```

2. Start development server:

```bash
yarn dev
```
