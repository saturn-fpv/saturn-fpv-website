/*
  Saturn FPV - shared site chrome (nav + footer).
  Works over file:// and http(s) (no fetch used).

  Usage: <script src="../partials/site-chrome-v02.js" data-root="../v12"></script>
    - data-root is the relative path from the current page to the site root
      (the folder containing index.html). Use "." from a page inside /v12/,
      and "../v12" from a page inside /tools/.
    - Optional data-pad-top="true" marks the page as a tool page. This:
        * adds top padding to <body> so the fixed nav does not cover content
        * overrides the tool's own body background with the main site color
        * adds a "Back to Tools" link as the first nav item
*/
(function () {
  var script = document.currentScript;
  var root = (script && script.getAttribute('data-root')) || '.';
  // strip trailing slash
  if (root.endsWith('/')) root = root.slice(0, -1);
  var isToolPage = !!(script && script.getAttribute('data-pad-top') === 'true');

  // logo path is resolved dynamically relative to site root
  var LOGO = root + '/image/logo/saturn_fpv_logo_white_small.jpg';

  var CSS = `
    /* Scoped-ish chrome styles. Uses its own class names to avoid clashing
       with tool page styles. Mirrors the look of the main site nav/footer. */
    .sfpv-nav {
      position: fixed; top: 0; left: 0; right: 0; z-index: 1000;
      padding: 1rem 2rem;
      display: flex; align-items: center; justify-content: space-between;
      background: rgba(10, 10, 11, 0.8);
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
    @media (max-width: 640px) {
      .sfpv-nav { padding: 0.75rem 1.25rem; }
      .sfpv-nav .nav-links {
        display: none; position: absolute; top: 100%; left: 0; right: 0;
        background: #111113; border-bottom: 1px solid #27272A;
        flex-direction: column; padding: 1.5rem; gap: 1rem;
      }
      .sfpv-nav .nav-links.open { display: flex; }
      .sfpv-nav .mobile-toggle { display: block; }
    }

    .sfpv-foot {
      border-top: 1px solid #27272A;
      padding: 3rem 2rem;
      font-family: 'Outfit', -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, sans-serif;
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
  `;

  function navHTML() {
    var backLink = isToolPage
      ? `<li><a class="nav-back" href="${root}/tools.html">&larr; Back to Tools</a></li>`
      : '';
    return `
      <nav class="sfpv-nav" id="navbar">
        <a href="${root}/index.html" class="nav-brand">
          <img src="${LOGO}" alt="Saturn FPV" class="nav-logo">
          <span class="nav-brand-text">SATURN FPV</span>
        </a>
        <button class="mobile-toggle" type="button" aria-label="Menu">&#9776;</button>
        <ul class="nav-links">
          ${backLink}
          <li><a href="${root}/index.html#products">Frames & Tools</a></li>
          <li><a href="${root}/index.html#services">Services</a></li>
          <li><a href="${root}/index.html#about">About</a></li>
          <li><a href="${root}/index.html#gallery">Gallery</a></li>
          <li><a href="${root}/index.html#connect">Connect</a></li>
          <li><a href="mailto:info@saturnfpv.com" class="nav-cta">Get in Touch</a></li>
        </ul>
      </nav>
    `;
  }

  function footerHTML() {
    return `
      <footer class="sfpv-foot">
        <div class="footer-inner">
          <img src="${LOGO}" alt="Saturn FPV" class="footer-logo">
          <p>&copy; 2026 Saturn FPV. All rights reserved.</p>
        </div>
      </footer>
    `;
  }

  function ensureFont() {
    if (document.querySelector('link[href*="fonts.googleapis.com/css2?family=Outfit"]')) return;
    var l = document.createElement('link');
    l.rel = 'stylesheet';
    l.href = 'https://fonts.googleapis.com/css2?family=Outfit:wght@300;400;500;600;700&display=swap';
    document.head.appendChild(l);
  }

  function injectStyle() {
    var s = document.createElement('style');
    s.setAttribute('data-sfpv-chrome', '');
    s.textContent = CSS;
    document.head.appendChild(s);
  }

  function insertChrome() {
    // Nav as first child of body
    var wrap = document.createElement('div');
    wrap.innerHTML = navHTML().trim();
    document.body.insertBefore(wrap.firstElementChild, document.body.firstChild);

    // Footer at end of body
    var fwrap = document.createElement('div');
    fwrap.innerHTML = footerHTML().trim();
    document.body.appendChild(fwrap.firstElementChild);
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

    // Preserve the old reveal-on-scroll behavior from components.js
    var observer = new IntersectionObserver(function (entries) {
      entries.forEach(function (entry) {
        if (entry.isIntersecting) entry.target.classList.add('visible');
      });
    }, { threshold: 0.1, rootMargin: '0px 0px -50px 0px' });
    document.querySelectorAll('.reveal').forEach(function (el) { observer.observe(el); });
    setTimeout(function () {
      document.querySelectorAll('.reveal:not(.visible)').forEach(function (el) {
        el.classList.add('visible');
      });
    }, 1000);
  }

  function run() {
    ensureFont();
    injectStyle();
    if (isToolPage) {
      document.body.style.paddingTop = '70px';
      // Override the tool's own body background so it matches the main site.
      document.body.style.background = '#0A0A0B';
      document.body.style.backgroundColor = '#0A0A0B';
    }
    insertChrome();
    wireBehavior();
  }

  if (document.readyState === 'loading') {
    document.addEventListener('DOMContentLoaded', run);
  } else {
    run();
  }
})();
