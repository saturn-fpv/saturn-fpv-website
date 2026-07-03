/*
  Saturn FPV - unified tool page chrome (nav header + footer + sidebar injection).
  Works over file:// and http(s) (no fetch used).
  
  Injected dynamically when loaded directly on the website.
  Bails out early when running inside the App's iframe container.
*/
(function () {
  // If loaded inside the App iframe, return immediately and let App index.html wrapper handle chrome
  if (window.parent && window.parent !== window) return;

  var script = document.currentScript;
  var root = (script && script.getAttribute('data-root')) || '..';
  if (root.endsWith('/')) root = root.slice(0, -1);

  var LOGO = root + '/image/logo/saturn_fpv_logo_white_small.jpg';

  var CSS = `
    /* ── UNIFIED NAVBAR STYLING (matches partial_main.js) ── */
    body {
      padding-top: 86px !important;
    }
    .sfpv-nav {
      position: fixed; top: 0; left: 0; right: 0; z-index: 1000;
      padding: 1rem 2rem;
      display: flex; align-items: center; justify-content: space-between;
      background: rgba(10, 10, 11, 0.85);
      backdrop-filter: blur(20px);
      -webkit-backdrop-filter: blur(20px);
      border-bottom: 1px solid transparent;
      transition: border-color 0.3s;
      font-family: 'Outfit', -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, sans-serif;
    }
    .sfpv-nav.scrolled { border-bottom-color: #27272A; }
    .sfpv-nav .nav-brand {
      display: flex; align-items: center; gap: 0.6rem;
      text-decoration: none; color: #FAFAFA;
    }
    .sfpv-nav .nav-brand-text {
      font-size: 1rem; font-weight: 600; letter-spacing: 0.08em; white-space: nowrap;
    }
    .sfpv-nav .nav-logo { height: 36px; }
    .sfpv-nav .nav-links {
      display: flex; gap: 2rem; list-style: none; align-items: center;
      margin: 0; padding: 0;
    }
    .sfpv-nav .nav-links a {
      color: #A1A1AA; text-decoration: none;
      font-size: 0.875rem; font-weight: 500; letter-spacing: 0.02em;
      transition: color 0.2s;
    }
    .sfpv-nav .nav-links a:hover { color: #FAFAFA; }
    .sfpv-nav .nav-back {
      color: #FAFAFA !important;
      border: 1px solid #27272A;
      padding: 0.35rem 0.75rem;
      border-radius: 6px;
      transition: background 0.2s, border-color 0.2s;
    }
    .sfpv-nav .nav-back:hover {
      background: #18181B;
      border-color: #3f3f46;
    }
    .sfpv-nav .nav-cta {
      background: #E8722A !important; color: #0A0A0B !important;
      padding: 0.5rem 1.25rem; border-radius: 6px;
      font-weight: 600 !important; transition: opacity 0.2s !important;
    }
    .sfpv-nav .nav-cta:hover { opacity: 0.85; }
    .sfpv-nav .mobile-toggle {
      display: none; background: none; border: none;
      color: #FAFAFA; font-size: 1.5rem; cursor: pointer;
    }

    /* ── MOBILE MENU BUTTON ── */
    .sfpv-tools-btn {
      background: none; 
      border: 1px solid rgba(255,255,255,0.15); 
      color: #fff; 
      padding: 0.35rem 0.75rem; 
      border-radius: 6px; 
      cursor: pointer; 
      font-family: inherit; 
      font-size: 0.85rem; 
      font-weight: 500; 
      display: flex; 
      align-items: center; 
      gap: 0.35rem;
      transition: background-color 0.2s, border-color 0.2s;
    }
    .sfpv-tools-btn:hover {
      background: rgba(255,255,255,0.06);
      border-color: rgba(255,255,255,0.3);
    }
    
    @media (max-width: 640px) {
      .sfpv-nav { padding: 0.75rem 1.25rem; }
      .sfpv-nav .nav-brand-text { display: none; }
      .sfpv-nav .nav-links {
        display: none; position: absolute; top: 100%; left: 0; right: 0;
        background: #111113; border-bottom: 1px solid #27272A;
        flex-direction: column; padding: 1.5rem; gap: 1rem;
      }
      .sfpv-nav .nav-links.open { display: flex; }
      .sfpv-nav .mobile-toggle { display: block; }
      .tools-btn-text { display: none; }
    }

    @media (min-width: 1024px) {
      .sfpv-tools-btn {
        display: none !important; /* Hide trigger toggle when sidebar is permanently open on right */
      }
      body.has-persistent-sidebar {
        padding-right: 300px !important;
      }
    }

    /* Set offset-top custom property for sidebar positioning on website */
    :root {
      --header-offset-top: 70px;
    }

    /* ── UNIFIED FOOTER STYLING ── */
    .sfpv-foot {
      border-top: 1px solid #27272A;
      padding: 3rem 2rem;
      font-family: 'Outfit', -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, sans-serif;
      margin-top: 3rem;
    }
    .sfpv-foot .footer-inner {
      max-width: 1200px; margin: 0 auto;
      display: flex; align-items: center; justify-content: space-between;
    }
    .sfpv-foot .footer-logo { height: 28px; opacity: 0.6; }
    .sfpv-foot p { margin: 0; font-size: 0.75rem; color: #71717A; }
    @media (max-width: 640px) {
      .sfpv-foot .footer-inner { flex-direction: column; gap: 1rem; }
    }

    /* ── STANDALONE HELP BOX ── */
    .info, .info-box { display: none !important; }
    .sfpv-help-box {
      background-color: #1f2937;
      border: 1px solid rgba(255,255,255,0.06);
      border-radius: 8px;
      padding: 1.25rem;
      font-size: 0.875rem;
      line-height: 1.6;
      color: #d1d5db;
      margin: 3rem auto 0;
      max-width: 900px;
      font-family: inherit;
      transition: background-color 0.25s ease, border-color 0.25s ease, color 0.25s ease;
    }
    .sfpv-help-box strong { color: #fff; }
    .sfpv-help-box p { margin: 0; }
    .sfpv-help-box br { display: block; content: ""; margin-top: 0.5rem; }
    .sfpv-help-box ul, .sfpv-help-box ol {
      list-style: disc; padding-left: 1.5rem; margin-top: 0.5rem;
      display: flex; flex-direction: column; gap: 0.4rem;
    }
    .sfpv-help-box ol { list-style: decimal; }

    /* Light Theme overrides for the Help Box */
    body.light-theme .sfpv-help-box {
      background-color: #F4F4F5;
      border-color: #D4D4D8;
      color: #27272A;
    }
    body.light-theme .sfpv-help-box strong {
      color: #09090B;
    }
  `;

  var HEADER_HTML = `
    <nav class="sfpv-nav" id="navbar">
      <a class="nav-brand" href="${root}/index.html">
        <img class="nav-logo" src="${LOGO}" alt="Saturn FPV">
        <span class="nav-brand-text">SATURN FPV</span>
      </a>
      <div style="display: flex; align-items: center; gap: 0.5rem; margin-left: auto; margin-right: 0.5rem;">
        <button class="sfpv-tools-btn" onclick="window.sfpvSidebar.toggle()" title="Tools Directory">
          <span>🛠️</span> <span class="tools-btn-text">Tools Directory</span>
        </button>
        <button class="mobile-toggle" type="button" aria-label="Menu">&#9776;</button>
      </div>
      <ul class="nav-links">
        <li><a class="nav-back" href="${root}/tools.html">&larr; Back to Tools</a></li>
        <li><a href="${root}/index.html#products">Frames & Tools</a></li>
        <li><a href="${root}/index.html#services">Services</a></li>
        <li><a href="${root}/index.html#about">About</a></li>
        <li><a href="${root}/index.html#gallery">Gallery</a></li>
        <li><a href="${root}/index.html#connect">Connect</a></li>
        <li><a class="nav-cta" href="mailto:info@saturnfpv.com">Get in Touch</a></li>
      </ul>
    </nav>
  `;

  var FOOTER_HTML = `
    <footer class="sfpv-foot">
      <div class="footer-inner">
        <img src="${LOGO}" alt="Saturn FPV" class="footer-logo">
        <p>&copy; 2026 Saturn FPV. All rights reserved.</p>
      </div>
    </footer>
  `;

  function load_font() {
    if (document.querySelector('link[href*="fonts.googleapis.com/css2?family=Outfit"]')) return;
    var l = document.createElement('link');
    l.rel = 'stylesheet';
    l.href = 'https://fonts.googleapis.com/css2?family=Outfit:wght@300;400;500;600;700&display=swap';
    document.head.appendChild(l);
  }

  function load_sidebar_scripts() {
    // 1. Load tools-list.js
    var s1 = document.createElement('script');
    s1.src = root + '/js/tools-list.js';
    document.head.appendChild(s1);

    // 2. Load sidebar.js (once list loads)
    s1.onload = function () {
      var s2 = document.createElement('script');
      s2.src = root + '/js/sidebar.js';
      document.head.appendChild(s2);
    };
  }

  // ──── SYNCHRONOUS RUNTIME INJECTIONS ────
  // Since partial_tools.js is parsed at the end of the body, document.body is guaranteed to exist.
  // Injecting styles and class offsets synchronously prevents layout shifting during final render.
  
  if (window.innerWidth >= 1024) {
    document.body.classList.add('has-persistent-sidebar');
  }

  load_font();
  load_sidebar_scripts();

  var style = document.createElement('style');
  style.textContent = CSS;
  document.head.appendChild(style);

  // ──── DOMContentLoaded INJECTIONS ────

  function inject() {
    // Inject Navigation Header
    var headerContainer = document.createElement('div');
    headerContainer.innerHTML = HEADER_HTML.trim();
    document.body.insertBefore(headerContainer.firstElementChild, document.body.firstChild);

    // Inject Help Box Content
    var helpSource = document.getElementById('help-content-source');
    if (helpSource) {
      var helpBox = document.createElement('div');
      helpBox.className = 'sfpv-help-box';
      helpBox.innerHTML = helpSource.innerHTML;
      var container = document.querySelector('.container') || document.getElementById('root') || document.body;
      container.appendChild(helpBox);
    }

    // Inject Footer
    var footerContainer = document.createElement('div');
    footerContainer.innerHTML = FOOTER_HTML.trim();
    document.body.appendChild(footerContainer.firstElementChild);

    // Wire navbar actions
    wireBehavior();
  }

  function wireBehavior() {
    var nav = document.getElementById('navbar');
    var links = nav && nav.querySelector('.nav-links');
    var toggle = nav && nav.querySelector('.mobile-toggle');

    if (toggle && links) {
      toggle.addEventListener('click', function () {
        links.classList.toggle('open');
      });
      links.querySelectorAll('a').forEach(function (a) {
        a.addEventListener('click', function () { links.classList.remove('open'); });
      });
    }

    if (nav) {
      window.addEventListener('scroll', function () {
        nav.classList.toggle('scrolled', window.scrollY > 50);
      });
    }
  }

  if (document.readyState === 'loading') {
    document.addEventListener('DOMContentLoaded', inject);
  } else {
    inject();
  }
})();
