# AGENTS.md — Wedding Invitation SPA

## Structure

```
config.js        ← all customizable data (edit this only)
render.js        ← reads config, populates HTML, runs animations
index.html       ← skeleton (no text content, loaded by render.js)
style.css        ← all styles

assets/          ← images (backgrounds, icons, envelope panels)
```

## How to customize

Only edit `config.js`. Everything else stays untouched.

## Architecture notes

- Timeline events are generated from config data, not hardcoded HTML.
- Events alternate sides automatically (even index = text left, odd = icon left).
- `openMap`, `closeMap`, `openInMaps` exposed on `window` for HTML onclick handlers.
- Fully offline: fonts bundled locally (`assets/fonts/`), Leaflet bundled locally (`assets/leaflet/`).
- Leaflet OSM tile layer (`{s}.tile.openstreetmap.org`) still requires network — only loads when user taps a location button.

## Loading order

```
index.html:
  1. config.js            ← data
  2. assets/leaflet/leaflet.js  ← map library
  3. render.js            ← rendering logic
```

## No build tooling

Pure HTML/CSS/JS. Deploy to any static host.
