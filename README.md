# FED-USA News

A static, responsive newsroom site for local-first reporting, source-linked U.S. politics and world briefs, practical story guides, and clear editorial policies.

## Start locally

Open `index.html` in a browser, or serve the folder with a local HTTP server:

```sh
python3 -m http.server 8000
```

Then visit `http://localhost:8000`.

## Main pages

- `index.html` — front page and dated daily brief
- `politics.html` — U.S. politics coverage and source-linked context
- `world.html` — international briefs from AP and Reuters
- `stories/index.html` — story guides and directory search/filter
- `chapters/index.html` — local chapter directory and launch criteria
- `about.html`, `editorial-standards.html`, `corrections.html`, `tips.html`, `contact.html`, `support.html`, `privacy.html`, `terms.html`, `accessibility.html`

Every page shares the same responsive navigation and footer. The mobile menu, story-directory filters, scroll indicator, and reveal effects are implemented in `effects.js`; reduced-motion preferences are respected in both CSS and JavaScript.

## Editorial maintenance

The front-page and desk briefs are hand-maintained static summaries—not a live news feed. Their current snapshot is dated **October 15, 2026**. Before publishing later, re-check every linked report, update the dates and summaries, and preserve the source attribution. Do not leave an old brief looking current.

Use `stories/_template.html` only as an authoring scaffold. It is not a published story. Verify claims, link sources, obtain an editorial review, and add visible correction notes when material facts change.

## Community and support

The primary community call to action is **Join the server**: <https://beta.echoed.gg/invite/65dd48216ed4d23bb2ca>. Public support links remain on `support.html`. This static site does not process payments and has no newsletter provider connected.

## Project folders

- `assets/images/` — logo and editorial artwork
- `brand/`, `content/`, `prompts/` — identity and editorial working material
- `stories/`, `chapters/` — published guides and local directory
- `FED-USA-News-Android/` and `FED-USA-News-Desktop/` — wrapper projects with bundled site copies

After changing the web site, copy it into each wrapper’s embedded site folder before packaging the apps. Review links, keyboard access, mobile layout, and reduced-motion behavior before deployment.

## Deploy

The static site can be deployed to a compatible static host, including Cloudflare Pages or GitHub Pages. Review `_redirects`, `_headers`, `sitemap.xml`, and `robots.txt` for the production domain before launch.
