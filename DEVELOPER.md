# Saturn FPV Website - Shared Tools Architecture

This repository shares its interactive FPV tools and library assets with the **FPV Tools Android App** repository. By aligning their folder structures, files, and scripts, both projects can remain in sync with zero logic divergence.

---

## Shared Directory Structure

The following directories in the website root must remain 100% identical to their counterparts in the app repository:

```
[Saturn FPV Website Root]
├── tools/                         <-- Interactive tools HTML pages
│   ├── rate-converter.html
│   ├── tpa-comparison.html
│   ├── sensor-calibration.html
│   ├── stator-volume.html
│   ├── pid-simulator.html
│   ├── prop-tip-speed.html
│   ├── frequency-planner.html
│   └── telemetry-parser.html
├── js/                            <-- Shared offline-first JS libraries
│   ├── chart.umd.min.js
│   ├── leaflet.js
│   ├── jszip.min.js
│   └── ...
└── css/                           <-- Shared offline-first CSS stylesheets
    ├── fonts.css
    └── leaflet.css
```

---

## How It Works

### 1. Standalone vs. Frame Detection
Every tool loads `../partials/partial_tools.js` at the bottom of its `<body>`.
- **Standalone Mode (Direct Website Access)**: `partial_tools.js` injects the main website header and footer, and overrides the tool's CSS to display the detailed help block (`.info`) at the bottom of the page.
- **Iframe Wrapper Mode (Loaded inside App/Dashboard iframe)**: `partial_tools.js` detects the parent frame (`window.parent !== window`) and bails out, loading only the tool's core UI. The parent wrapper (`index.html`) handles the header, sidebar, and slide-down help panels.

### 2. Dynamic Help Text Harvesting
In iframe mode, the tool automatically sends its help section's HTML up to the parent wrapper via a `postMessage` event. The parent wrapper then dynamically populates its sliding help drawer, eliminating duplicate text storage.

### 3. Shared Offline Libraries
All tools link to shared scripts inside `/js/` and styles inside `/css/` (copied from the app). This ensures identical file contents and maximizes website load performance (multiplexed same-origin loads, no DNS roundtrips to external CDNs).

---

## Synchronization Workflow

Whenever you make improvements or fixes to any tool, style, or library in the **FPV Tools** (App) repository:

1. Open PowerShell in the **Saturn FPV Website** directory.
2. Run the synchronization script:
   ```powershell
   .\sync-tools.ps1
   ```
3. The script will automatically copy the updated `/tools/`, `/js/`, and `/css/` folders from the app folder to the website folder, replacing the obsolete versions.
4. Verify the changes locally and commit the updates to git.
