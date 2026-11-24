(function () {
  var header = document.querySelector('header');
  var nav = header && header.querySelector('nav');
  if (!nav) return;

  var btn = document.createElement('button');
  btn.type = 'button';
  btn.className = 'menu-btn';
  btn.setAttribute('aria-expanded', 'false');
  btn.setAttribute('aria-controls', 'site-nav');
  btn.setAttribute('aria-label', 'Toggle menu');
  btn.innerHTML = '<span class="menu-label">Menu</span><span class="menu-icon" aria-hidden="true">&#9776;</span>';

  nav.id = 'site-nav';
  nav.parentNode.insertBefore(btn, nav);
  header.classList.add('has-menu');

  function setOpen(open) {
    nav.classList.toggle('open', open);
    btn.setAttribute('aria-expanded', open ? 'true' : 'false');
    btn.querySelector('.menu-label').textContent = open ? 'Close' : 'Menu';
    btn.querySelector('.menu-icon').innerHTML = open ? '&#10005;' : '&#9776;';
  }

  btn.addEventListener('click', function () {
    setOpen(!nav.classList.contains('open'));
  });
  nav.addEventListener('click', function (e) {
    if (e.target.closest('a')) setOpen(false);
  });
  document.addEventListener('keydown', function (e) {
    if (e.key === 'Escape') setOpen(false);
  });
  window.addEventListener('resize', function () {
    if (window.innerWidth > 1000) setOpen(false);
  });
})();

/* ---------- Phone helpers: collapsible lists and a back-to-top button ---------- */
(function () {
  var mq = window.matchMedia('(max-width: 700px)');
  var folds = [].slice.call(document.querySelectorAll('details.fold'));

  function sync() {
    folds.forEach(function (d) {
      if (!mq.matches) { d.open = true; }
      else if (!d.dataset.touched) { d.open = false; }
    });
  }
  folds.forEach(function (d) {
    var s = d.querySelector('summary');
    if (s) s.addEventListener('click', function () { d.dataset.touched = '1'; });
  });
  function openFor(hash) {
    if (!hash || hash.length < 2 || !mq.matches) return;
    var el = document.getElementById(hash.slice(1));
    if (!el) return;
    var f = el.matches('details.fold') ? el : el.querySelector('details.fold');
    if (f) { f.open = true; f.dataset.touched = '1'; }
  }
  document.addEventListener('click', function (e) {
    var a = e.target.closest && e.target.closest('a[href^="#"]');
    if (a) openFor(a.getAttribute('href'));
  });
  window.addEventListener('hashchange', function () { openFor(location.hash); });
  if (mq.addEventListener) mq.addEventListener('change', sync); else if (mq.addListener) mq.addListener(sync);
  sync();
  openFor(location.hash);

  var up = document.createElement('button');
  up.type = 'button';
  up.className = 'to-top';
  up.setAttribute('aria-label', 'Back to top');
  up.innerHTML = '&#8593;';
  document.body.appendChild(up);
  function onScroll() { up.classList.toggle('show', window.scrollY > 900); }
  window.addEventListener('scroll', onScroll, { passive: true });
  up.addEventListener('click', function () { window.scrollTo({ top: 0, behavior: 'smooth' }); });
  onScroll();
})();

/* ---------- Phone booking bar: Book now and Call, shown after you start scrolling ---------- */
(function () {
  if (/book\.html/.test(location.pathname)) return;
  var mq = window.matchMedia('(max-width: 700px)');
  var bar = document.createElement('div');
  bar.className = 'book-bar';
  bar.innerHTML =
    '<a class="main" href="https://optimumclinic.janeapp.com/#/staff_member/48" target="_blank" rel="noopener">Book now</a>' +
    '<a class="call" href="tel:+16047036470" aria-label="Call (604) 703-6470">' +
    '<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" aria-hidden="true">' +
    '<path d="M5 4h4l2 5-2.5 1.5a11 11 0 0 0 5 5L15 13l5 2v4a2 2 0 0 1-2 2A16 16 0 0 1 3 6a2 2 0 0 1 2-2"/></svg></a>';
  document.body.appendChild(bar);
  document.body.classList.add('has-bar');

  var scrolled = false, endInView = false, typing = false;
  function update() { bar.classList.toggle('show', mq.matches && scrolled && !endInView && !typing); }

  window.addEventListener('scroll', function () { scrolled = window.scrollY > 400; update(); }, { passive: true });
  scrolled = window.scrollY > 400;

  if ('IntersectionObserver' in window) {
    var seen = new Set();
    var io = new IntersectionObserver(function (entries) {
      entries.forEach(function (en) { if (en.isIntersecting) seen.add(en.target); else seen.delete(en.target); });
      endInView = seen.size > 0; update();
    });
    [].slice.call(document.querySelectorAll('.band, footer.site')).forEach(function (el) { io.observe(el); });
  }
  document.addEventListener('focusin', function (e) { if (/^(INPUT|SELECT|TEXTAREA)$/.test(e.target.tagName)) { typing = true; update(); } });
  document.addEventListener('focusout', function () { typing = false; update(); });
  if (mq.addEventListener) mq.addEventListener('change', update); else if (mq.addListener) mq.addListener(update);
  update();
})();
