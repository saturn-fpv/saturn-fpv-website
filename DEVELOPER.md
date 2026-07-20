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

### 1. Standalone vs. Frame Detection & Sidebar Injection
Every tool loads `../partials/partial_tools.js` at the bottom of its `<body>`.
- **Iframe Wrapper Mode (Loaded inside App/Dashboard iframe)**: `partial_tools.js` detects the parent frame (`window.parent !== window`) and bails out immediately, leaving navigation entirely to the App wrapper's native shell.
- **Standalone Mode (Direct Website Access)**: `partial_tools.js` injects the website's header (unified styling) and footer, displays the static help documentation box (`.sfpv-help-box`) at the bottom of the page, and dynamically loads the synced `js/tools-list.js` and `js/sidebar.js` files to construct and mount the slide-out tools sidebar drawer.
- **Synchronous Layout Injections**: To prevent layout shifting and jumping on page reloads (buildup stutter), `partial_tools.js` runs synchronously when parsed. It applies default `body { padding-top: 86px !important; }` and adds the `.has-persistent-sidebar` offset class immediately to ensure the initial paint matches the final layout.

### 2. Shared Sidebar Component & Metadata
* **Tools Configuration (`js/tools-list.js`)**: Serves as the single source of truth for tool keys, names, icons, paths, and display sequence.
* **Component script (`js/sidebar.js`)**: Dynamically compiles the HTML list, injects styling variables (including `.light-theme` overrides for the drawer), and intercepts theme toggle slider triggers. On the Website, it navigates via direct window redirection to sibling paths.
* **Mobile Viewport Overflow Prevention**: To avoid page zoom/scaling issues on mobile, the sidebar drawer must apply `visibility: hidden;` when closed. This ensures off-screen elements do not expand the scrollable boundary.
* **Theme Persistence & Local File Restrictions**: Theme selections are stored under the `'fpv-tools-theme'` local storage key. Note that browsers isolate `localStorage` spaces per file when pages are opened locally using `file://` URLs. Setting synchronization across tools will function natively inside the App and on the live Website (HTTP/HTTPS), but will not sync across pages when opened directly from files.

### 3. Dynamic Help Text Harvesting
In iframe mode, the tool automatically sends its help section's HTML up to the parent wrapper via a `postMessage` event. The parent wrapper then dynamically populates its sliding help drawer, eliminating duplicate text storage.

### 4. Shared Offline Libraries
All tools link to shared scripts inside `/js/` and styles inside `/css/` (copied from the app). This ensures identical file contents and maximizes website load performance.

### 5. Favicon Optimization & Link Paths
* **High-Resolution Logo**: Located at `image/logo/saturn_fpv_logo_white_small.jpg` (500x500 px), used for website brand headers, footers, and mobile bookmarks.
* **Optimized Favicon**: A lightweight 32x32 PNG file located at `image/logo/favicon-32.png`. It is used for standard browser tab icons.
* **HTML Integration**:
  - The root HTML files (`index.html`, `tools.html`, etc.) must link it as `<link rel="icon" type="image/png" href="image/logo/favicon-32.png">`.
  - The tool HTML files inside `tools/` (synchronized from FPV Tools) link it as `<link rel="icon" type="image/png" href="../image/logo/favicon-32.png">`.

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
