# loganfinney.com

The personal site of Logan Finney, a documentary journalist. It is
one page: a headline, contacts and a short bio, then his CV. The CV is kept in
[`cv.yaml`](cv.yaml) and rendered by [RenderCV](https://rendercv.com); the
site is built with [Jekyll](https://jekyllrb.com) and published to GitHub
Pages.

## How it is built

The Site workflow ([`.github/workflows/site.yml`](.github/workflows/site.yml))
builds and publishes the site on every push to `main`, once a day and by hand.
Pull requests run every step except publishing. Each run:

1. Makes TTF copies of the site's fonts for the PDF
   ([`scripts/fonts-for-rendercv.py`](scripts/fonts-for-rendercv.py)).
2. Renders `cv.yaml` with RenderCV to HTML, Markdown and PDF.
3. Puts RenderCV's HTML and Markdown on the site
   ([`scripts/rendercv-include.py`](scripts/rendercv-include.py)) and its PDF
   at `/cv.pdf`.
4. Builds the site with Jekyll.
5. Checks the built site against WCAG with pa11y-ci ([`tests/`](tests)).
6. Publishes it, if every step passed.

Nothing the build makes is committed.

## Building locally

You need Python 3.13, Ruby with Jekyll 4 and the `jekyll-redirect-from` and
`jekyll-sitemap` gems, and Node.js 22 for the accessibility checks.

```sh
pip install "rendercv[full]==2.8" "fonttools[woff]==4.66.1"
python3 scripts/fonts-for-rendercv.py
out=$(mktemp -d)
rendercv render cv.yaml -nopng -o "$out"
python3 scripts/rendercv-include.py "$out/Logan_Finney_CV.html"
cp "$out/Logan_Finney_CV.pdf" cv.pdf
jekyll build
```

To run the accessibility checks, serve the built site on port 8000 and run
pa11y-ci:

```sh
python3 -m http.server 8000 -d _site &
cd tests && npm ci --ignore-scripts && npm test
```

## Editing the CV

Edit [`cv.yaml`](cv.yaml), which follows
[RenderCV's schema](https://docs.rendercv.com). The `design` section sets the
PDF's look; the site's look is in [`styles.css`](styles.css).

## Acknowledgments

- The footer fire is the PlayStation Doom fire effect, after Filipe
  Deschamps's
  [doom-fire-algorithm](https://github.com/filipedeschamps/doom-fire-algorithm)
  (MIT License; see [`fire.js`](fire.js)).
- Typefaces: DejaVu Sans, Gelasio and Cousine, served from [`fonts/`](fonts)
  with their licenses.

## License

© 2026 Logan Finney. All rights reserved, except for the typefaces and
`fire.js`, which keep their own licenses.
