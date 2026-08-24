GitHub Pages Documentation *Configuring a custom domain for your GitHub Pages site*: https://docs.github.com/en/pages/configuring-a-custom-domain-for-your-github-pages-site.

## Bluesky Custom Domain Handle

The Bluesky handle `@loganfinney.com` is verified via the **HTTPS well-known method**: GitHub Pages serves the file `.well-known/atproto-did`, whose sole content is the account's DID (`did:plc:…`). Two files in this repository make that work and must be preserved in any future hosting migration:

| File | Purpose |
| :--- | :--- |
| `.well-known/atproto-did` | Contains the account DID; Bluesky fetches `https://loganfinney.com/.well-known/atproto-did` to verify domain ownership. |
| `_config.yml` | Jekyll configuration with `include: [".well-known"]`, so the Jekyll build on GitHub Pages publishes the dot-folder instead of dropping it. This works with the current plain-HTML site and with any future Jekyll-based site — just carry the `include` entry into the new config. |

If the handle ever shows as invalid, confirm the URL above returns the DID, then re-verify in the Bluesky app under **Settings → Account → Handle → I have my own domain → Verify Text File**.

> Note: DNS-based verification (`_atproto` TXT record) is **not** used because the wildcard CNAME record at Porkbun (`*.loganfinney.com → laf-us.github.io`) shadows that subdomain. The well-known file method avoids touching DNS entirely.
