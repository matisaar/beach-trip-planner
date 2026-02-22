/* ============================================================
   Dynamic hamburger nav — auto-discovers all .html pages
   from the GitHub repo so you never update a link list.
   Include with: <script src="nav.js"></script>
   ============================================================ */
(function () {
  'use strict';

  // ── Config ────────────────────────────────────────────────
  var REPO  = 'matisaar/beach-trip-planner';
  var API   = 'https://api.github.com/repos/' + REPO + '/contents/';
  var CACHE = '_nav_pages';
  var TTL   = 600000;                       // 10 min cache

  // ── Other projects (external links shown in nav) ──────────
  var EXTERNAL_PROJECTS = [
    { name: '🏠 Greek Property Finder', url: 'https://matisaar.github.io/greek-property-finder/', desc: 'Investment properties under €75k' },
    { name: '🛒 Calgary Grocery Scraper', url: 'https://github.com/matisaar/calgary-grocery-scraper', desc: 'Price comparison tool' },
    { name: '📈 Stock Analyzer', url: 'https://michael-stock-analyzer.vercel.app', desc: 'Michael\'s stock analyzer' },
    { name: '📋 T661 Checker', url: 'https://t661-checker.vercel.app', desc: 'SR&ED claim checker' }
  ];

  // ── Current page ──────────────────────────────────────────
  var cur = location.pathname.split('/').pop() || 'index.html';

  // ── Auto-generate nice title from filename ────────────────
  function title(f) {
    return f.replace('.html', '').replace(/-/g, ' ')
      .replace(/\b[a-z]/g, function (c) { return c.toUpperCase(); });
  }

  // ── Icon by keyword (fully dynamic — no hardcoded filenames)
  function icon(f) {
    if (f === 'index.html')       return '🏠';
    if (/compare/i.test(f))       return '⚖️';
    if (/share/i.test(f))         return '📤';
    if (/explore/i.test(f))       return '🔭';    if (/island/i.test(f))        return '🏝️';    if (/flight/i.test(f))        return '✈️';
    if (/restaurant/i.test(f))    return '🍽️';
    if (/hotel/i.test(f))         return '🏨';
    if (/airbnb/i.test(f))        return '🏡';
    if (/alternative/i.test(f))   return '🗺️';
    if (/viz/i.test(f))           return '📊';
    if (f === 'greece.html')      return '🇬🇷';
    if (f === 'best-trip.html')   return '🇮🇹';
    return '📄';
  }

  // ── Grouping (prefix-based, fully dynamic) ────────────────
  var GROUP_ORDER  = ['main', 'italy', 'greece', 'projects'];
  var GROUP_LABELS = {
    main:     '📍 Overview',
    italy:    '🇮🇹 Italy · Amalfi Coast',
    greece:   '🇬🇷 Greece · Islands',
    projects: '🚀 Other Projects'
  };
  // Pages that sort first within their group
  var PINS = { 'index.html': 1, 'best-trip.html': 1, 'greece.html': 1, 'compare.html': 1 };

  function group(f) {
    if (/^(index|compare|share|explore)\.html$/.test(f)) return 'main';
    if (/^(greece|island)/i.test(f)) return 'greece';
    if (/^(best-trip|flights|restaurants|hotels|airbnbs|alternatives|viz)/i.test(f)) return 'italy';
    return 'main';
  }

  function sortWithin(a, b) {
    var pa = PINS[a] ? 0 : 1, pb = PINS[b] ? 0 : 1;
    if (pa !== pb) return pa - pb;
    return a.localeCompare(b);
  }

  // ── Inject CSS (all scoped with #_nav prefix) ─────────────
  var s = document.createElement('style');
  s.textContent = [
    '#_nav-btn{position:fixed;top:14px;left:14px;z-index:99999;width:42px;height:42px;',
      'border-radius:11px;border:none;background:rgba(0,0,0,.55);color:#fff;font-size:21px;',
      'cursor:pointer;display:flex;align-items:center;justify-content:center;',
      'backdrop-filter:blur(10px);-webkit-backdrop-filter:blur(10px);',
      'transition:background .2s,transform .15s;box-shadow:0 2px 12px rgba(0,0,0,.25);line-height:1}',
    '#_nav-btn:hover{background:rgba(0,0,0,.78);transform:scale(1.06)}',
    '#_nav-overlay{position:fixed;inset:0;background:rgba(0,0,0,.4);z-index:99998;',
      'opacity:0;pointer-events:none;transition:opacity .25s}',
    '#_nav-overlay._open{opacity:1;pointer-events:auto}',
    '#_nav-panel{position:fixed;top:0;left:0;bottom:0;width:290px;max-width:85vw;',
      'background:#fff;z-index:100000;transform:translateX(-100%);',
      'transition:transform .3s cubic-bezier(.4,0,.2,1);',
      'box-shadow:4px 0 30px rgba(0,0,0,.18);display:flex;flex-direction:column;',
      'font-family:Inter,system-ui,-apple-system,sans-serif}',
    '#_nav-panel._open{transform:translateX(0)}',
    '#_nav-hdr{display:flex;align-items:center;justify-content:space-between;',
      'padding:18px 20px;border-bottom:1px solid #e5e7eb;flex-shrink:0}',
    '#_nav-hdr span{font-weight:800;font-size:1rem;color:#1a1a2e}',
    '#_nav-x{border:none;background:none;font-size:1.3rem;cursor:pointer;',
      'color:#6b7280;padding:4px 8px;border-radius:6px;transition:background .15s}',
    '#_nav-x:hover{background:#f3f4f6;color:#1a1a2e}',
    '#_nav-body{flex:1;overflow-y:auto;padding:10px 0 20px;-webkit-overflow-scrolling:touch}',
    '._nav-g{padding:0 12px;margin-bottom:6px}',
    '._nav-gl{font-size:.66rem;font-weight:800;text-transform:uppercase;letter-spacing:.7px;',
      'color:#9ca3af;padding:10px 8px 4px;margin:0}',
    '._nav-a{display:flex;align-items:center;gap:10px;padding:10px 12px;border-radius:9px;',
      'text-decoration:none;color:#1a1a2e;font-size:.86rem;font-weight:600;',
      'transition:background .12s,color .12s}',
    '._nav-a:hover{background:#f0f7ff;text-decoration:none}',
    '._nav-a._cur{background:#dbeafe;color:#023e8a;font-weight:800}',
    '._nav-i{font-size:1.05rem;width:24px;text-align:center;flex-shrink:0}',
    '._nav-ld{text-align:center;padding:40px 16px;color:#9ca3af;font-size:.84rem}',
    '#_nav-foot{padding:12px 20px;border-top:1px solid #e5e7eb;flex-shrink:0}',
    '#_nav-foot a{display:block;text-align:center;padding:10px;border-radius:9px;',
      'background:linear-gradient(135deg,#023e8a,#0077b6);color:#fff;text-decoration:none;',
      'font-weight:700;font-size:.8rem;transition:filter .15s}',
    '#_nav-foot a:hover{filter:brightness(1.15);text-decoration:none}'
  ].join('\n');
  document.head.appendChild(s);

  // ── Inject DOM ────────────────────────────────────────────
  var btn = document.createElement('button');
  btn.id = '_nav-btn';
  btn.innerHTML = '&#9776;';
  btn.setAttribute('aria-label', 'Open navigation');

  var ov = document.createElement('div');
  ov.id = '_nav-overlay';

  var pnl = document.createElement('nav');
  pnl.id = '_nav-panel';
  pnl.setAttribute('aria-label', 'Site navigation');
  pnl.innerHTML =
    '<div id="_nav-hdr"><span>🗺️ matisaar</span>' +
    '<button id="_nav-x" aria-label="Close">✕</button></div>' +
    '<div id="_nav-body"><div class="_nav-ld">Loading…</div></div>' +
    '<div id="_nav-foot"><a href="https://github.com/matisaar" target="_blank">GitHub ↗</a></div>';

  document.body.appendChild(btn);
  document.body.appendChild(ov);
  document.body.appendChild(pnl);

  // ── Open / Close ──────────────────────────────────────────
  function open()  { pnl.classList.add('_open'); ov.classList.add('_open'); }
  function close() { pnl.classList.remove('_open'); ov.classList.remove('_open'); }

  btn.addEventListener('click', open);
  ov.addEventListener('click', close);
  document.getElementById('_nav-x').addEventListener('click', close);
  document.addEventListener('keydown', function (e) { if (e.key === 'Escape') close(); });

  // ── Render page list ──────────────────────────────────────
  function render(pages) {
    var buckets = {};
    GROUP_ORDER.forEach(function (k) { buckets[k] = []; });

    pages.forEach(function (f) {
      var g = group(f);
      if (!buckets[g]) { buckets[g] = []; GROUP_ORDER.push(g); GROUP_LABELS[g] = '📄 ' + g; }
      buckets[g].push(f);
    });

    var html = '';
    GROUP_ORDER.forEach(function (key) {
      if (key === 'projects') return; // render external separately below
      var list = buckets[key];
      if (!list || !list.length) return;
      list.sort(sortWithin);
      html += '<div class="_nav-g"><p class="_nav-gl">' + (GROUP_LABELS[key] || key) + '</p>';
      list.forEach(function (f) {
        var cls = f === cur ? ' _cur' : '';
        html += '<a class="_nav-a' + cls + '" href="' + f + '">' +
                '<span class="_nav-i">' + icon(f) + '</span>' + title(f) + '</a>';
      });
      html += '</div>';
    });

    // ── External projects section ───────────────────────────
    html += '<div class="_nav-g"><p class="_nav-gl">' + GROUP_LABELS.projects + '</p>';
    EXTERNAL_PROJECTS.forEach(function (proj) {
      html += '<a class="_nav-a" href="' + proj.url + '" target="_blank">' +
              '<span class="_nav-i" style="font-size:0.92rem">' + proj.name.split(' ')[0] + '</span>' +
              proj.name.replace(/^[^\s]+\s/, '') + ' <span style="opacity:.4;font-size:.7rem">↗</span></a>';
    });
    html += '</div>';

    document.getElementById('_nav-body').innerHTML = html;
  }

  // ── Fetch from GitHub API (cached) ────────────────────────
  function load() {
    try {
      var c = JSON.parse(sessionStorage.getItem(CACHE));
      if (c && Date.now() - c.ts < TTL) { render(c.p); return; }
    } catch (e) { /* ignore */ }

    fetch(API)
      .then(function (r) { return r.json(); })
      .then(function (data) {
        if (!Array.isArray(data)) throw new Error('bad');
        var pages = data
          .filter(function (f) { return f.name.endsWith('.html'); })
          .map(function (f) { return f.name; })
          .sort();
        try { sessionStorage.setItem(CACHE, JSON.stringify({ ts: Date.now(), p: pages })); } catch (e) { /* ignore */ }
        render(pages);
      })
      .catch(function () {
        document.getElementById('_nav-body').innerHTML =
          '<div class="_nav-ld">⚠️ Couldn\'t load pages.<br>Check your connection.</div>';
      });
  }

  load();
})();
