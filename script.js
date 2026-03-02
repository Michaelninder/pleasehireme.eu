(function () {
  'use strict';

  // CURSOR
  const cur = document.getElementById('cursor');
  const ring = document.getElementById('cursor-ring');
  document.addEventListener('mousemove', e => {
    cur.style.left = e.clientX + 'px';
    cur.style.top = e.clientY + 'px';
    ring.style.left = e.clientX + 'px';
    ring.style.top = e.clientY + 'px';
  });
  document.querySelectorAll('a, button').forEach(el => {
    el.addEventListener('mouseenter', () => {
      cur.style.width = '5px'; cur.style.height = '5px';
      ring.style.width = '50px'; ring.style.height = '50px';
    });
    el.addEventListener('mouseleave', () => {
      cur.style.width = '10px'; cur.style.height = '10px';
      ring.style.width = '34px'; ring.style.height = '34px';
    });
  });

  // HAMBURGER
  const ham = document.getElementById('ham');
  const mob = document.getElementById('mob');
  ham.addEventListener('click', () => {
    ham.classList.toggle('open');
    mob.classList.toggle('open');
    document.body.style.overflow = mob.classList.contains('open') ? 'hidden' : '';
  });
  mob.querySelectorAll('a').forEach(a => a.addEventListener('click', () => {
    ham.classList.remove('open');
    mob.classList.remove('open');
    document.body.style.overflow = '';
  }));

  // MARQUEE
  const words = [
    'Laravel Developer', '100+ Domains', 'Rheinland-Pfalz', 'Full-Stack',
    'MTEX.dev', 'xpsystems.eu', 'eu-data.org', 'European Focus',
    'GDPR Compliant', 'Available 2026', 'Open Source', 'PHP 8+',
    'DevOps', 'Remote-Friendly', 'Serial Founder', 'pleasehireme.eu'
  ];
  const mqi = document.getElementById('mqi');
  const mk = w => `<span class="mq-item">${w}<span class="mq-sep">✦</span></span>`;
  mqi.innerHTML = [...words, ...words, ...words, ...words].map(mk).join('');

  // COUNTER ANIMATION
  function animCount(el, target) {
    if (isNaN(target)) { el.textContent = target; return; }
    const dur = 1500, start = performance.now();
    (function tick(now) {
      const p = Math.min((now - start) / dur, 1);
      const e = 1 - Math.pow(1 - p, 3);
      el.textContent = Math.floor(e * target);
      if (p < 1) requestAnimationFrame(tick);
      else el.textContent = target;
    })(start);
  }

  const co = new IntersectionObserver(entries => {
    entries.forEach(e => {
      if (e.isIntersecting) {
        animCount(e.target, parseInt(e.target.dataset.count));
        co.unobserve(e.target);
      }
    });
  }, { threshold: 0.5 });
  document.querySelectorAll('[data-count]').forEach(c => co.observe(c));

  // SCROLL REVEALS
  const ro = new IntersectionObserver(entries => {
    entries.forEach(e => {
      if (e.isIntersecting) { e.target.classList.add('in'); ro.unobserve(e.target); }
    });
  }, { threshold: 0.07, rootMargin: '0px 0px -35px 0px' });
  document.querySelectorAll('.reveal').forEach(el => ro.observe(el));

  // PROJECT FILTER
  document.querySelectorAll('.fb').forEach(btn => {
    btn.addEventListener('click', () => {
      document.querySelectorAll('.fb').forEach(b => b.classList.remove('active'));
      btn.classList.add('active');
      const f = btn.dataset.filter;
      document.querySelectorAll('.pc').forEach(c => {
        c.classList.toggle('hidden', f !== 'all' && c.dataset.category !== f);
      });
    });
  });

  // BACK TO TOP
  const btt = document.getElementById('btt');
  window.addEventListener('scroll', () => btt.classList.toggle('show', window.scrollY > 500), { passive: true });
  btt.addEventListener('click', () => window.scrollTo({ top: 0, behavior: 'smooth' }));

  // MODALS
  const ov = document.getElementById('ov');
  function openM(id) {
    document.getElementById(id).classList.add('on');
    ov.classList.add('on');
    document.body.style.overflow = 'hidden';
  }
  function closeAll() {
    document.querySelectorAll('.modal').forEach(m => m.classList.remove('on'));
    ov.classList.remove('on');
    document.body.style.overflow = '';
  }
  document.getElementById('op').addEventListener('click', () => openM('pm'));
  document.getElementById('oi').addEventListener('click', () => openM('im'));
  ov.addEventListener('click', closeAll);
  document.querySelectorAll('.mc').forEach(b => b.addEventListener('click', closeAll));
  document.addEventListener('keydown', e => { if (e.key === 'Escape') closeAll(); });

  // SMOOTH ANCHOR SCROLL
  document.querySelectorAll('a[href^="#"]').forEach(a => {
    a.addEventListener('click', function (e) {
      const t = document.querySelector(this.getAttribute('href'));
      if (t) { e.preventDefault(); t.scrollIntoView({ behavior: 'smooth' }); }
    });
  });

})();