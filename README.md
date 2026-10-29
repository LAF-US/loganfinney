# loganfinney.com

© 2018–present Logan Finney. All rights reserved.

## Looking after the site

- **To change the CV**, edit `cv.yaml` on GitHub. Saving it opens a pull
  request; merge it once its build shows green, and the site updates. Your
  name, job title, bio, email, website, location and links are in
  `_config.yml` too, for the site's pages: a change to one goes in both.
- **Runs by itself:** a daily check that republishes the site, so the CV's
  dates stay current; Dependabot's minor and patch updates, which merge once tested; and,
  after each publish, the Internet Archive's Wayback Machine saving the pages
  the CV links to.
- **Waits for you:** pull requests for major updates or for updates to the
  workflow's actions (merge when green), and an issue titled "The daily site
  build failed" (open the run it links to).
- **To switch on the Wayback Machine copies** (once): make a free archive.org
  account, get its keys at archive.org/account/s3.php, and add them under
  Settings → Secrets and variables → Actions as `ARCHIVE_ORG_ACCESS_KEY` and
  `ARCHIVE_ORG_SECRET_KEY`.
- **If the daily check ever stops running**, GitHub may have switched it off:
  in the Actions tab, pick "Build and publish the site" and press "Enable
  workflow".
