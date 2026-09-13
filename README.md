# ASBS Africa Website — Phase 1 (Informational Site)

## Running locally
Header/footer load via `fetch()`, so opening `index.html` directly (file://)
will not work — the browser blocks local fetch requests. Use a local server:

```
npx serve .
```
or the VS Code "Live Server" extension. Then visit the address it prints.

## Deploying
Static site — deploys as-is to Vercel (drag-and-drop the folder or connect
the repo). No build step required.

## Structure
- `partials/header.html`, `partials/footer.html` — single source of truth
  for nav and footer, injected into every page by `assets/js/main.js`.
- `assets/css/base.css` — brand colors, fonts, resets. Edit here to change
  the palette or typography site-wide.
- `assets/css/components.css` — header, footer, buttons, cards. Reused by
  every page.
- `assets/css/pages/*.css` — one file per page for page-specific layout.
- `data/programmes.json` — the 4 programmes. Both the homepage highlights
  and the full Programmes page read from this one file.

## Updating content
- **Programme details** (name, description, who it's for, format, duration):
  edit `data/programmes.json` only — it renders on both the homepage and
  the Programmes page.
- **Nav links / footer contact info**: edit `partials/header.html` /
  `partials/footer.html` only — changes apply to every page automatically.
- **Real photography**: swap files in `assets/images/` and update the
  `image` paths in `data/programmes.json` and the hero background in
  `assets/css/pages/home.css`. Current images are placeholder SVGs.

## Phase 2 (E-Learning Platform) — how this sets it up
- `data/programmes.json` is shaped like an API response on purpose. When
  the backend (Node/Express + MongoDB per the standard stack) goes live,
  swap `fetch('data/programmes.json')` for `fetch('/api/programmes')` in
  `assets/js/pages/home.js` — no markup changes needed.
- The e-learning platform (student login, course viewer, dashboards) can
  live in its own `/platform` folder or subdomain, reusing
  `partials/header.html` / `footer.html` and `assets/css/base.css` /
  `components.css` for visual consistency, plus a "Student Portal" link
  added once, in the header partial, that then appears everywhere.
- Cloudinary can replace the local `assets/images/` folder for
  Phase 2 media (course thumbnails, video) without touching Phase 1 pages.

## Outstanding before final content pass
- Green Finance & Impact Reporting programme description in
  `data/programmes.json` is a placeholder — the screenshot cut it off
  before this could be captured; needs the real copy from Magic Patterns
  or the client.
- Real photography still needed for hero and all 4 programme cards
  (see Content Inventory in the Step 1 planning doc).
