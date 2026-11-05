
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
    if (window.innerWidth > 900) setOpen(false);
  });
})();
