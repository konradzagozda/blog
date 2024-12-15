terraform {
  source = "../../modules/blog"
}

inputs = {
  domain_name            = null
  alternate_domain_names = []
  website_bucket_name    = "konradzagozda-website-bucket-20241215"
}