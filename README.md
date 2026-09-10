# opensource // archive

<p align="center">
  <img src="https://img.shields.io/badge/opensource-archive-111111?style=for-the-badge">
  <img src="https://img.shields.io/github/stars/pilottX11/archive?style=for-the-badge">
  <img src="https://img.shields.io/github/forks/pilottX11/archive?style=for-the-badge">
  <img src="https://img.shields.io/github/last-commit/pilottX11/archive?style=for-the-badge">
</p>

<p align="center">
  <a href="#contents">Contents</a> •
  <a href="#site">Site</a> •
  <a href="#adding-a-source">Adding a Source</a> •
  <a href="#structure">Structure</a>
</p>

## About

**opensource** is a static, GitHub Pages–hosted archive of external download links. There's no
upload button and no backend — every entry lives in a single JSON file, and every addition goes
through the repo as a pull request. Each entry is a link, not a hosted file, and can carry a
VirusTotal scan link alongside the download so visitors can check a file before grabbing it.

## Contents

| Component            | Description                                      |
| --------------------- | ------------------------------------------------- |
| `index.html`           | The archive (list view) — the only page on the site |
| `assets/css/style.css` | All styling                                        |
| `assets/js/script.js`  | Loads `entries.json`, renders the list, handles filter/search |
| `data/entries.json`    | The archive itself — one object per source        |
| `README.md`            | Repository documentation                          |

## Site

The site is a single page (`index.html`) that fetches `data/entries.json` on load and renders
it as a sortable, filterable, searchable list. Filtering is done by tag (`base`, `imgui`, `leak`
by default) and by a live text search over name/description. Every row shows two actions:
**download** (the external link) and **virustotal** (a scan link, when one is provided).

```js
fetch("data/entries.json")
```

## Adding a source

There is intentionally no in-site upload form. To add an entry:

1. Host the actual file externally (Google Drive, Mega, a GitHub Release asset, etc.) and
   grab a direct link.
2. **(Recommended)** Scan the file on [virustotal.com](https://www.virustotal.com) and copy the
   report URL (`https://www.virustotal.com/gui/file/<hash>`).
3. Fork the repo, open `data/entries.json`, and append a new object to the array:

```json
   {
     "name": "example-source",
     "description": "One line describing what this is.",
     "tags": ["base"],
     "size": "42 MB",
     "date": "2026-09-09",
     "link": "https://example.com/downloads/example-source.zip",
     "virustotal": "https://www.virustotal.com/gui/file/EXAMPLE_HASH"
   }
```

4. Validate the JSON (`python3 -m json.tool data/entries.json`) and open a pull request.
   Once merged, GitHub Pages rebuilds and the entry appears automatically.

### Field reference

| Field         | Required | Notes                                                                 |
| ------------- | -------- | ---------------------------------------------------------------------- |
| `name`        | yes      | Display name of the source                                            |
| `description` | no       | One-line summary shown under the name                                 |
| `tags`        | yes      | Array of tags — use existing (`base`, `imgui`, `leak`) or add new ones |
| `size`        | no       | Display string, e.g. `"1.1 GB"`                                       |
| `date`        | yes      | `YYYY-MM-DD`, used for newest-first sorting                           |
| `link`        | yes      | External download URL — the only place the file lives                 |
| `virustotal`  | no       | VirusTotal report URL; omit if not scanned — the site shows "no scan" instead |

To make a new tag filterable, add a matching button inside `#tagFilters` in `index.html`:

```html
<button class="tag-btn" data-tag="your-tag">your-tag</button>
```

## Structure

```text
opensource/
├── index.html
├── assets/
│   ├── css/
│   │   └── style.css
│   └── js/
│       └── script.js
├── data/
│   └── entries.json
└── README.md
```

## Build

```text
Type         Static site
Backend      None
Hosting      GitHub Pages
Data source  data/entries.json
Scans        Optional per-entry VirusTotal link
```

## Deploying

1. Push this repo's contents to GitHub.
2. **Settings → Pages → Source** → select branch (e.g. `main`) and root folder (`/`).
3. Save — GitHub serves it at `https://yourname.github.io/opensource/`.
4. Every merged PR touching `data/entries.json` updates the live list.

<p align="center">
  <a href="https://github.com/pilottX11/archive">
    <img src="https://img.shields.io/badge/View%20Repository-GitHub-181717?style=for-the-badge&logo=github">
  </a>
</p>

<p align="center">
  <sub>static archive · repo-only contributions · optional VirusTotal per entry</sub>
</p>