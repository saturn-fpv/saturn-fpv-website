# Saturn FPV Website

Source code for the official [Saturn FPV](https://saturnfpv.com) website, featuring open-source drone frames, cinematography portfolio, and interactive web tools for FPV pilots.

---

## Interactive FPV Tools

The interactive calculators and utilities hosted on this site (Rate Converter, TPA Comparison, Sensor Calibration, Stator Volume, PID Simulator, Prop Tip Speed, Frequency Planner, Telemetry Parser, and RF Calculators) are maintained upstream in the **[FPV Tools](https://github.com/saturn-fpv/fpv-tools)** repository.

* **Upstream Repository:** [saturn-fpv/fpv-tools](https://github.com/saturn-fpv/fpv-tools) (also available on Google Play)
* **Contributions & Bug Reports:** All tool-related improvements, bug reports, and pull requests should be submitted directly to the [FPV Tools repository](https://github.com/saturn-fpv/fpv-tools).
* Upstream tool updates are synchronized into this repository using the `sync-tools.ps1` script.

---

## Development & Hosting

* **Tech Stack:** Static site built with vanilla HTML5, CSS3, and client-side JavaScript (no server-side runtime or database).
* **Hosting:** Hosted directly on **GitHub Pages** with custom domain routing configured via the `CNAME` file for [`saturnfpv.com`](https://saturnfpv.com).
* **Local Preview:** You can open `index.html` directly in any web browser. To test local storage persistence across tool pages without browser file-origin restrictions, serve the directory with any local HTTP server (e.g. `python -m http.server` or `npx serve`).
* **Architecture Guide:** See [DEVELOPER.md](DEVELOPER.md) for details on shared components, layout injection, and tool synchronization.

---

## License

* **Code & Tools:** Licensed under the [GNU General Public License v3.0](LICENSE) (GPL-3.0).
* **Brand Assets & Media:** Logos, brand graphics, and original photography in `image/` remain Copyright © Saturn FPV. All rights reserved.
