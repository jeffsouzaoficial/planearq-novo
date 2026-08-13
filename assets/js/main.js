/* PLANEARQ Paisagismo — interações */
(function () {
  'use strict';

  var reduceMotion = window.matchMedia('(prefers-reduced-motion: reduce)').matches;

  /* ---------- header no scroll ---------- */
  var head = document.getElementById('siteHead');
  var mbar = document.querySelector('.mbar');

  function onScroll() {
    if (window.scrollY > 40) head.classList.add('scrolled');
    else head.classList.remove('scrolled');

    if (mbar) {
      var hero = document.querySelector('.hero');
      var heroH = hero ? hero.offsetHeight - 120 : 0;
      mbar.classList.toggle('is-in', window.scrollY > heroH);
    }
  }
  window.addEventListener('scroll', onScroll, { passive: true });
  onScroll();

  /* ---------- menu mobile ---------- */
  var burger = document.getElementById('burger');
  var nav = document.getElementById('headNav');

  function closeMenu() {
    nav.classList.remove('open');
    burger.classList.remove('open');
    burger.setAttribute('aria-expanded', 'false');
    document.body.style.overflow = '';
  }
  burger.addEventListener('click', function () {
    var open = nav.classList.toggle('open');
    burger.classList.toggle('open', open);
    burger.setAttribute('aria-expanded', String(open));
    document.body.style.overflow = open ? 'hidden' : '';
  });
  nav.querySelectorAll('a').forEach(function (a) {
    a.addEventListener('click', closeMenu);
  });
  window.addEventListener('keydown', function (e) {
    if (e.key === 'Escape') closeMenu();
  });

  /* ---------- reveals ---------- */
  var revealEls = document.querySelectorAll('.reveal');
  if (reduceMotion || !('IntersectionObserver' in window)) {
    revealEls.forEach(function (el) { el.classList.add('is-in'); });
  } else {
    var io = new IntersectionObserver(function (entries) {
      entries.forEach(function (entry) {
        if (entry.isIntersecting) {
          entry.target.classList.add('is-in');
          io.unobserve(entry.target);
        }
      });
    }, { threshold: 0.12, rootMargin: '0px 0px -6% 0px' });
    revealEls.forEach(function (el) { io.observe(el); });
  }

  /* ---------- hero: revelar conteúdo após o carregamento ---------- */
  window.addEventListener('load', function () {
    var heroEls = document.querySelectorAll('.hero .reveal');
    heroEls.forEach(function (el, i) {
      el.classList.add('is-in');
    });
  });
  /* fallback se o load já tiver disparado (cache) */
  if (document.readyState === 'complete') {
    document.querySelectorAll('.hero .reveal').forEach(function (el) { el.classList.add('is-in'); });
  }

  /* ---------- lightbox ---------- */
  var lb = document.getElementById('lightbox');
  var lbImg = lb.querySelector('img');
  var lbClose = lb.querySelector('.lightbox-close');

  document.querySelectorAll('.gal-tile').forEach(function (tile) {
    tile.setAttribute('tabindex', '0');
    tile.setAttribute('role', 'button');
    tile.addEventListener('click', function () { openLb(tile); });
    tile.addEventListener('keydown', function (e) {
      if (e.key === 'Enter' || e.key === ' ') { e.preventDefault(); openLb(tile); }
    });
  });

  function openLb(tile) {
    var img = tile.querySelector('img');
    lbImg.src = img.getAttribute('src');
    lbImg.alt = img.getAttribute('alt') || '';
    lb.classList.add('open');
    document.body.style.overflow = 'hidden';
  }
  function closeLb() {
    lb.classList.remove('open');
    document.body.style.overflow = '';
  }
  lbClose.addEventListener('click', closeLb);
  lb.addEventListener('click', function (e) { if (e.target === lb) closeLb(); });
  window.addEventListener('keydown', function (e) { if (e.key === 'Escape') closeLb(); });

  /* ---------- ano no rodapé ---------- */
  var ano = document.getElementById('ano');
  if (ano) ano.textContent = new Date().getFullYear();
})();
