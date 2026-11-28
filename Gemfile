# The site's Jekyll and plugins, at exact versions. Dependabot keeps them
# current (.github/dependabot.yml)
source "https://rubygems.org"

gem "jekyll", "= 4.4.1"

group :jekyll_plugins do
  gem "jekyll-redirect-from", "= 0.17.0"
  gem "jekyll-seo-tag", "= 2.9.1"
  gem "jekyll-sitemap", "= 1.4.0"
end

# Checks that the built site's own links and images exist (the workflow's
# "Check the site's own links and images" step)
gem "html-proofer", "~> 5.2", group: :test
