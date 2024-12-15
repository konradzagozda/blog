terraform {
  source = "../../modules/blog"
}

inputs = {
  domain_name            = "zagozdakonrad.com"
  alternate_domain_names = ["konradzagozda.com"]
  website_bucket_name    = "konradzagozda-website-bucket-20240319"
}