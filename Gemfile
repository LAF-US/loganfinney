# The site's Jekyll and plugins: the github-pages gem pins the same versions
# GitHub Pages builds with (232 is the version in actions/jekyll-build-pages
# v1.0.13). Dependabot keeps it current (.github/dependabot.yml)
source "https://rubygems.org"

gem "github-pages", "= 232", group: :jekyll_plugins

# Checks that the built site's own links and images exist (the workflow's
# "Check the site's own links and images" step)
gem "html-proofer", "~> 5.2", group: :test
