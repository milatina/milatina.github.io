/* ═══════════════════════════════════════════════════════
   FLIONLION.COM — SHARED JAVASCRIPT
═══════════════════════════════════════════════════════ */

document.addEventListener('DOMContentLoaded', () => {

  // ── WARM AMBER FILM GRAIN ────────────────────────────
  const grain = document.getElementById('grain');
  if (grain) {
    const ctx = grain.getContext('2d');
    function resizeGrain() { grain.width = window.innerWidth; grain.height = window.innerHeight; }
    resizeGrain();
    window.addEventListener('resize', resizeGrain);
    function drawGrain() {
      const id = ctx.createImageData(grain.width, grain.height), d = id.data;
      for (let i = 0; i < d.length; i += 4) {
        const v = (Math.random() * 255) | 0;
        d[i] = Math.min(255, v + 10); d[i+1] = Math.min(255, v + 4);
        d[i+2] = v - 6; d[i+3] = 255;
      }
      ctx.putImageData(id, 0, 0);
      requestAnimationFrame(drawGrain);
    }
    drawGrain();
  }

  // ── CUSTOM CURSOR ────────────────────────────────────
  const dot = document.getElementById('cd');
  const ring = document.getElementById('cr');
  let mx = 0, my = 0, rx = 0, ry = 0;
  if (dot && ring) {
    document.addEventListener('mousemove', e => {
      mx = e.clientX; my = e.clientY;
      dot.style.left = mx + 'px'; dot.style.top = my + 'px';
    });
    (function anim() {
      rx += (mx - rx) * 0.1; ry += (my - ry) * 0.1;
      ring.style.left = rx + 'px'; ring.style.top = ry + 'px';
      requestAnimationFrame(anim);
    })();
    document.querySelectorAll('a, button, .vid-card, .photo-card, .reel-body').forEach(el => {
      el.addEventListener('mouseenter', () => {
        ring.style.width = '68px'; ring.style.height = '68px';
        ring.style.borderColor = 'rgba(232,192,32,0.65)';
      });
      el.addEventListener('mouseleave', () => {
        ring.style.width = '42px'; ring.style.height = '42px';
        ring.style.borderColor = 'rgba(232,192,32,0.4)';
      });
    });
  }

  // ── HUD TIMECODE ─────────────────────────────────────
  const tcEl = document.getElementById('tc');
  const fnEl = document.getElementById('fn');
  if (tcEl) {
    const t0 = Date.now(); let fc = 0;
    function hud() {
      const el = (Date.now() - t0) / 1000;
      const h = String(Math.floor(el / 3600)).padStart(2,'0');
      const m = String(Math.floor((el % 3600) / 60)).padStart(2,'0');
      const s = String(Math.floor(el % 60)).padStart(2,'0');
      const f = String(Math.floor((el % 1) * 24)).padStart(2,'0');
      tcEl.textContent = `${h}:${m}:${s}:${f}`;
      if (fnEl) fnEl.textContent = `FRAME ${(++fc).toString().padStart(6,'0')}`;
      requestAnimationFrame(hud);
    }
    hud();
  }

  // ── SCROLL REVEAL ────────────────────────────────────
  const ro = new IntersectionObserver(entries => {
    entries.forEach(e => { if (e.isIntersecting) e.target.classList.add('on'); });
  }, { threshold: 0.08, rootMargin: '0px 0px -20px 0px' });
  document.querySelectorAll('.reveal').forEach(el => ro.observe(el));

  // ── ACTIVE NAV LINK ──────────────────────────────────
  const path = window.location.pathname;
  document.querySelectorAll('.nav-links a').forEach(a => {
    if (a.getAttribute('href') === path ||
        (path.includes(a.getAttribute('href')) && a.getAttribute('href') !== '/')) {
      a.classList.add('active');
    }
  });

  // ── HERO PARALLAX (home page only) ───────────────────
  const ht = document.querySelector('.hero-title');
  const hbg = document.querySelector('.hero-bg');
  if (ht || hbg) {
    window.addEventListener('scroll', () => {
      const y = window.scrollY, vh = window.innerHeight;
      if (ht) { ht.style.transform = `translateY(${y * 0.28}px)`; ht.style.opacity = Math.max(0, 1 - (y / vh) * 1.6); }
      if (hbg) hbg.style.transform = `scale(${1 + y * 0.0003})`;
    }, { passive: true });
  }

  // ── DUST PARTICLES (hero only) ───────────────────────
  const dustCanvas = document.getElementById('dust');
  if (dustCanvas) {
    const ctx = dustCanvas.getContext('2d');
    const hero = document.querySelector('.hero');
    if (hero) {
        function resizeDust() { dustCanvas.width = hero.offsetWidth; dustCanvas.height = hero.offsetHeight; }
        resizeDust(); window.addEventListener('resize', resizeDust);
        const COLS = ['rgba(204,26,26,','rgba(232,192,32,','rgba(26,140,60,','rgba(74,156,200,','rgba(120,64,176,','rgba(250,240,216,'];
        const pts = Array.from({length:80}, () => ({
          x: Math.random() * dustCanvas.width, y: Math.random() * dustCanvas.height,
          r: Math.random() * 1.8 + 0.3, vx: (Math.random() - .5) * .22,
          vy: -Math.random() * .35 - .05, op: Math.random() * .5 + .05,
          tw: Math.random() * Math.PI * 2,
          col: COLS[Math.floor(Math.random() * COLS.length)],
        }));
        function drawDust() {
          ctx.clearRect(0, 0, dustCanvas.width, dustCanvas.height);
          pts.forEach(p => {
            p.tw += .016; const o = p.op * (.5 + .5 * Math.sin(p.tw));
            ctx.beginPath(); ctx.arc(p.x, p.y, p.r, 0, Math.PI * 2);
            ctx.fillStyle = p.col + o + ')'; ctx.fill();
            p.x += p.vx; p.y += p.vy;
            if (p.y < 0) { p.y = dustCanvas.height; p.x = Math.random() * dustCanvas.width; }
            if (p.x < 0) p.x = dustCanvas.width; if (p.x > dustCanvas.width) p.x = 0;
          });
          requestAnimationFrame(drawDust);
        }
        drawDust();
    }
  }

  // ── MOBILE NAV TOGGLE ────────────────────────────────
  const burger = document.getElementById('nav-burger');
  const navLinks = document.querySelector('.nav-links');
  if (burger && navLinks) {
    burger.addEventListener('click', () => {
      navLinks.classList.toggle('open');
    });
  }
});
