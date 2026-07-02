/*
  Saturn FPV - minimal tool page chrome (header + footer).
  Works over file:// (no fetch). Drop before </body>:
    <script src="../partials/partial_tools.js"></script>
*/
(function () {
  if (window.parent && window.parent !== window) return;
  var script = document.currentScript;
  var root = (script && script.getAttribute('data-root')) || '..';
  if (root.endsWith('/')) root = root.slice(0, -1);

  var CSS = `
    .sfpv-header {
      position: sticky; top: 0; z-index: 1000;
      display: flex; align-items: center; justify-content: space-between;
      padding: 0.75rem 1.5rem;
      background: rgba(10, 10, 11, 0.85);
      backdrop-filter: blur(10px);
      -webkit-backdrop-filter: blur(10px);
      border-bottom: 1px solid rgba(255,255,255,0.08);
      font-family: 'Outfit', -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, sans-serif;
      margin: -1.5rem -1.5rem 1.5rem;
    }
    .sfpv-brand { display: flex; align-items: center; gap: 0.6rem; text-decoration: none; color: #fff; }
    .sfpv-brand img { height: 32px; }
    .sfpv-brand-text { font-size: 0.95rem; font-weight: 600; letter-spacing: 0.08em; }
    .sfpv-links { display: flex; align-items: center; gap: 1.25rem; list-style: none; margin: 0; padding: 0; }
    .sfpv-links a { color: #e5e7eb; text-decoration: none; font-size: 0.9rem; font-weight: 400; transition: color 0.15s ease; }
    .sfpv-links a:hover { color: #fff; }
    .sfpv-back {
      color: #FAFAFA !important;
      border: 1px solid rgba(255,255,255,0.15);
      padding: 0.35rem 0.75rem;
      border-radius: 6px;
      transition: background 0.15s, border-color 0.15s;
    }
    .sfpv-back:hover { background: rgba(255,255,255,0.06); border-color: rgba(255,255,255,0.3); }
    .sfpv-cta {
      background: #E8722A !important; color: #0A0A0B !important;
      padding: 0.5rem 1.25rem; border-radius: 6px;
      font-weight: 600 !important; transition: opacity 0.2s !important;
    }
    .sfpv-cta:hover { opacity: 0.85; }
    @media (max-width: 600px) {
      .sfpv-header { padding: 0.6rem 1rem; }
      .sfpv-brand-text { display: none; }
      .sfpv-links { gap: 0.75rem; }
      .sfpv-links a { font-size: 0.8rem; }
    }
    .sfpv-footer {
      display: flex; align-items: center; justify-content: space-between;
      max-width: 1200px; margin: 2rem auto 0;
      padding: 1rem 1.5rem;
      border-top: 1px solid rgba(255,255,255,0.08);
      font-family: 'Outfit', -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, sans-serif;
    }
    .sfpv-footer img { height: 22px; opacity: 0.55; }
    .sfpv-footer p { margin: 0; font-size: 0.72rem; color: rgba(255,255,255,0.5); }
    @media (max-width: 500px) {
      .sfpv-footer { flex-direction: column; gap: 0.6rem; text-align: center; }
    }
    .info, .info-box { display: none !important; }
    .sfpv-help-box {
      background-color: #1f2937;
      border: 1px solid rgba(255,255,255,0.06);
      border-radius: 8px;
      padding: 1.25rem;
      font-size: 0.875rem;
      line-height: 1.6;
      color: #d1d5db;
      margin-top: 2rem;
      font-family: inherit;
    }
    .sfpv-help-box strong {
      color: #fff;
    }
    .sfpv-help-box p {
      margin: 0;
    }
    .sfpv-help-box br {
      display: block;
      content: "";
      margin-top: 0.5rem;
    }
    .sfpv-help-box ul, .sfpv-help-box ol {
      list-style: disc;
      padding-left: 1.5rem;
      margin-top: 0.5rem;
      display: flex;
      flex-direction: column;
      gap: 0.4rem;
    }
    .sfpv-help-box ol {
      list-style: decimal;
    }
  `;

  var HEADER_HTML = `
    <header class="sfpv-header">
      <a class="sfpv-brand" href="${root}/index.html">
        <img src="${root}/image/logo/saturn_fpv_logo_white_small.jpg" alt="Saturn FPV">
        <span class="sfpv-brand-text">SATURN FPV</span>
      </a>
      <ul class="sfpv-links">
        <li><a class="sfpv-back" href="${root}/tools.html">&larr; Back to Tools</a></li>
        <li><a href="${root}/index.html">Home</a></li>
        <li><a class="sfpv-cta" href="mailto:info@saturnfpv.com">Get in Touch</a></li>
      </ul>
    </header>
  `;

  var FOOTER_HTML = `
    <footer class="sfpv-footer">
      <img src="${root}/image/logo/saturn_fpv_logo_white_small.jpg" alt="Saturn FPV">
      <p>&copy; 2026 Saturn FPV. All rights reserved.</p>
    </footer>
  `;

  function load_font() {
    if (document.querySelector('link[href*="fonts.googleapis.com/css2?family=Outfit"]')) return;
    var l = document.createElement('link');
    l.rel = 'stylesheet';
    l.href = 'https://fonts.googleapis.com/css2?family=Outfit:wght@300;400;500;600;700&display=swap';
    document.head.appendChild(l);
  }

  function inject() {
    load_font();

    var style = document.createElement('style');
    style.textContent = CSS;
    document.head.appendChild(style);

    var header = document.createElement('div');
    header.innerHTML = HEADER_HTML;
    document.body.insertBefore(header.firstElementChild, document.body.firstChild);

    // Dynamic Standalone Help Box Injection
    var helpSource = document.getElementById('help-content-source');
    if (helpSource) {
      var helpBox = document.createElement('div');
      helpBox.className = 'sfpv-help-box';
      helpBox.innerHTML = helpSource.innerHTML;
      var container = document.querySelector('.container') || document.getElementById('root') || document.body;
      container.appendChild(helpBox);
    }

    var footer = document.createElement('div');
    footer.innerHTML = FOOTER_HTML;
    document.body.appendChild(footer.firstElementChild);
  }

  if (document.readyState === 'loading') {
    document.addEventListener('DOMContentLoaded', inject);
  } else {
    inject();
  }
})();
