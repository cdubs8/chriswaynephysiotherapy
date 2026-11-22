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
