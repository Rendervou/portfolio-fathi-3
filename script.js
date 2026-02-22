/* ============================================================
   FATHI PORTFOLIO — script.js
   ============================================================ */

/* ===== SPLASH LOADING ===== */
const splash = document.getElementById('splash');
const sPct = document.getElementById('sPct');
const sFill = document.querySelector('.s-fill');
let pct = 0;
const ticker = setInterval(() => {
  pct = Math.min(pct + Math.floor(Math.random() * 4 + 1), 100);
  sPct.textContent = pct + '%';
  sFill.style.width = pct + '%';
  if (pct >= 100) clearInterval(ticker);
}, 20);
setTimeout(() => {
  splash.classList.add('out');
  setTimeout(() => splash.remove(), 900);
}, 2900);

/* ===== CUSTOM CURSOR ===== */
const cDot = document.getElementById('cDot');
const cRing = document.getElementById('cRing');
let mx = -100, my = -100, rx = -100, ry = -100;

document.addEventListener('mousemove', e => {
  mx = e.clientX; my = e.clientY;
  cDot.style.left = mx + 'px';
  cDot.style.top  = my + 'px';
});
(function loop() {
  rx += (mx - rx) * 0.1;
  ry += (my - ry) * 0.1;
  cRing.style.left = rx + 'px';
  cRing.style.top  = ry + 'px';
  requestAnimationFrame(loop);
})();

document.querySelectorAll('a, button, .pill, .sbox, .pc, .cc, .feat, .ei-card').forEach(el => {
  el.addEventListener('mouseenter', () => {
    cDot.style.transform = 'translate(-50%,-50%) scale(2)';
    cRing.style.width    = '52px';
    cRing.style.height   = '52px';
    cRing.style.background = 'rgba(61,255,203,0.05)';
    cRing.style.borderColor = 'rgba(61,255,203,0.8)';
  });
  el.addEventListener('mouseleave', () => {
    cDot.style.transform = 'translate(-50%,-50%) scale(1)';
    cRing.style.width    = '34px';
    cRing.style.height   = '34px';
    cRing.style.background = 'transparent';
    cRing.style.borderColor = 'rgba(61,255,203,0.5)';
  });
});

/* ===== NAV SCROLL ===== */
const nav = document.getElementById('nav');
const btt = document.getElementById('btt');
window.addEventListener('scroll', () => {
  nav.classList.toggle('scrolled', window.scrollY > 40);
  btt.classList.toggle('show', window.scrollY > 500);
  updateActiveNav();
}, { passive: true });

/* ===== MOBILE NAV ===== */
document.getElementById('ham').addEventListener('click', () => {
  document.getElementById('navLinks').classList.toggle('open');
});
document.querySelectorAll('.nav-links a').forEach(a =>
  a.addEventListener('click', () => document.getElementById('navLinks').classList.remove('open'))
);

/* ===== ACTIVE NAV HIGHLIGHT ===== */
function updateActiveNav() {
  const sections = document.querySelectorAll('section[id]');
  const scrollY = window.scrollY + 120;
  sections.forEach(sec => {
    const top = sec.offsetTop;
    const height = sec.offsetHeight;
    const id = sec.getAttribute('id');
    const link = document.querySelector(`.nav-links a[href="#${id}"]`);
    if (link) {
      link.classList.toggle('active-link', scrollY >= top && scrollY < top + height);
    }
  });
}

/* ===== SMOOTH SCROLL ===== */
document.querySelectorAll('a[href^="#"]').forEach(a => {
  a.addEventListener('click', e => {
    const t = document.querySelector(a.getAttribute('href'));
    if (t) {
      e.preventDefault();
      t.scrollIntoView({ behavior: 'smooth' });
    }
  });
});

/* ===== INTERSECTION OBSERVER — REVEAL ===== */
const revealObs = new IntersectionObserver(entries => {
  entries.forEach(en => {
    if (en.isIntersecting) {
      en.target.classList.add('in');
      // Animate skill bars inside
      en.target.querySelectorAll('.ski-fill').forEach((b, i) => {
        setTimeout(() => { b.style.width = b.dataset.w + '%'; }, 200 + i * 80);
      });
      revealObs.unobserve(en.target);
    }
  });
}, { threshold: 0.12, rootMargin: '0px 0px -40px 0px' });

document.querySelectorAll('.rv, .rv-left, .rv-right, .rv-scale, .rv-flip').forEach(el => {
  revealObs.observe(el);
});

/* Skill panels specifically */
document.querySelectorAll('.sk-panel').forEach(p => {
  new IntersectionObserver(en => {
    if (en[0].isIntersecting) {
      p.querySelectorAll('.ski-fill').forEach((b, i) => {
        setTimeout(() => { b.style.width = b.dataset.w + '%'; }, 250 + i * 90);
      });
    }
  }, { threshold: 0.3 }).observe(p);
});

/* ===== PORTFOLIO FILTER ===== */
document.querySelectorAll('.flt-btn').forEach(btn => {
  btn.addEventListener('click', function() {
    document.querySelectorAll('.flt-btn').forEach(b => b.classList.remove('active'));
    this.classList.add('active');
    const f = this.dataset.f;
    document.querySelectorAll('.pc').forEach((c, idx) => {
      const show = f === 'all' || c.dataset.cat === f;
      setTimeout(() => {
        c.style.opacity       = show ? '1' : '0.12';
        c.style.transform     = show ? '' : 'scale(0.95)';
        c.style.pointerEvents = show ? '' : 'none';
        c.style.filter        = show ? '' : 'blur(2px)';
      }, idx * 30);
    });
  });
});

/* ===== DESIGN FILTER ===== */
document.querySelectorAll('.dflt-btn').forEach(btn => {
  btn.addEventListener('click', function() {
    document.querySelectorAll('.dflt-btn').forEach(b => b.classList.remove('active'));
    this.classList.add('active');
    const f = this.dataset.f;
    document.querySelectorAll('.dc').forEach((c, idx) => {
      const show = f === 'all' || c.dataset.cat === f;
      setTimeout(() => {
        c.style.opacity       = show ? '1' : '0.12';
        c.style.transform     = show ? '' : 'scale(0.95)';
        c.style.pointerEvents = show ? '' : 'none';
        c.style.filter        = show ? '' : 'blur(2px)';
      }, idx * 30);
    });
  });
});

/* ===== MOUSE PARALLAX (hero glows) ===== */
document.addEventListener('mousemove', e => {
  const xp = (e.clientX / window.innerWidth  - 0.5) * 22;
  const yp = (e.clientY / window.innerHeight - 0.5) * 22;
  const g1 = document.querySelector('.h-glow-1');
  const g2 = document.querySelector('.h-glow-2');
  if (g1) g1.style.transform = `translate(${xp * 0.6}px, ${yp * 0.6}px)`;
  if (g2) g2.style.transform = `translate(${-xp * 0.4}px, ${-yp * 0.4}px)`;
}, { passive: true });

/* ===== MAGNETIC BUTTONS ===== */
document.querySelectorAll('.btn-p, .btn-s, .nav-cta, #btt').forEach(btn => {
  btn.addEventListener('mousemove', e => {
    const r = btn.getBoundingClientRect();
    const x = e.clientX - r.left - r.width  / 2;
    const y = e.clientY - r.top  - r.height / 2;
    btn.style.transform = `translate(${x * 0.25}px, ${y * 0.25}px)`;
  });
  btn.addEventListener('mouseleave', () => {
    btn.style.transform = '';
  });
});

/* ===== TILT EFFECT (cards) ===== */
document.querySelectorAll('.pc, .cc, .sk-panel').forEach(card => {
  card.addEventListener('mousemove', e => {
    const r = card.getBoundingClientRect();
    const x = ((e.clientX - r.left) / r.width  - 0.5) * 8;
    const y = ((e.clientY - r.top)  / r.height - 0.5) * 8;
    card.style.transform = `perspective(800px) rotateX(${-y}deg) rotateY(${x}deg) translateY(-6px) scale(1.01)`;
  });
  card.addEventListener('mouseleave', () => {
    card.style.transform = '';
  });
});

/* ===== COUNTING NUMBERS ANIMATION ===== */
function animateCount(el) {
  const target = parseInt(el.dataset.count || el.textContent);
  const suffix = el.dataset.suffix || '';
  let current = 0;
  const step = Math.ceil(target / 60);
  const timer = setInterval(() => {
    current = Math.min(current + step, target);
    el.textContent = current + suffix;
    if (current >= target) clearInterval(timer);
  }, 25);
}
const countObs = new IntersectionObserver(entries => {
  entries.forEach(en => {
    if (en.isIntersecting) {
      animateCount(en.target);
      countObs.unobserve(en.target);
    }
  });
}, { threshold: 0.5 });
document.querySelectorAll('.count-num').forEach(el => countObs.observe(el));

/* ===== STAGGER CHILDREN ON SECTION ENTER ===== */
const staggerObs = new IntersectionObserver(entries => {
  entries.forEach(en => {
    if (en.isIntersecting) {
      const items = en.target.querySelectorAll(':scope > *');
      items.forEach((item, i) => {
        item.style.transitionDelay = `${i * 0.06}s`;
        item.classList.add('in');
      });
      staggerObs.unobserve(en.target);
    }
  });
}, { threshold: 0.1 });
document.querySelectorAll('.port-grid, .design-grid, .cert-grid, .sk-grid').forEach(g =>
  staggerObs.observe(g)
);

/* ===== ACTIVE NAV LINK STYLE ===== */
const style = document.createElement('style');
style.textContent = `.active-link { color: var(--teal) !important; }`;
document.head.appendChild(style);

/* ===== PARALLAX SECTIONS ===== */
window.addEventListener('scroll', () => {
  const scrollY = window.scrollY;
  document.querySelectorAll('.h-glow').forEach((el, i) => {
    el.style.transform = `translateY(${scrollY * (i === 0 ? 0.1 : -0.08)}px)`;
  });
}, { passive: true });

/* ===== TYPING EFFECT for hero role ===== */
const roles = ['Front-End Developer', 'Product Manager', 'UI/UX Enthusiast', 'Problem Solver'];
const roleEl = document.querySelector('.h-role-typing');
if (roleEl) {
  let roleIndex = 0, charIndex = 0, isDeleting = false;
  function typeRole() {
    const current = roles[roleIndex];
    if (isDeleting) {
      roleEl.textContent = current.slice(0, --charIndex);
    } else {
      roleEl.textContent = current.slice(0, ++charIndex);
    }
    if (!isDeleting && charIndex === current.length) {
      setTimeout(() => { isDeleting = true; typeRole(); }, 2000);
    } else if (isDeleting && charIndex === 0) {
      isDeleting = false;
      roleIndex = (roleIndex + 1) % roles.length;
      setTimeout(typeRole, 300);
    } else {
      setTimeout(typeRole, isDeleting ? 45 : 80);
    }
  }
  setTimeout(typeRole, 2000);
}

/* ===== CURSOR TRAIL PARTICLES ===== */
const MAX_TRAIL = 8;
const trail = [];
for (let i = 0; i < MAX_TRAIL; i++) {
  const dot = document.createElement('div');
  dot.style.cssText = `
    position:fixed; width:4px; height:4px; border-radius:50%;
    background:rgba(61,255,203,${0.06 - i*0.007});
    pointer-events:none; z-index:99994;
    transform:translate(-50%,-50%);
    transition:all ${0.05 + i*0.04}s linear;
  `;
  document.body.appendChild(dot);
  trail.push({ el: dot, x: -100, y: -100 });
}
document.addEventListener('mousemove', e => {
  trail[0].x = e.clientX; trail[0].y = e.clientY;
});
(function trailLoop() {
  for (let i = MAX_TRAIL - 1; i > 0; i--) {
    trail[i].x += (trail[i-1].x - trail[i].x) * 0.4;
    trail[i].y += (trail[i-1].y - trail[i].y) * 0.4;
    trail[i].el.style.left = trail[i].x + 'px';
    trail[i].el.style.top  = trail[i].y + 'px';
  }
  trail[0].el.style.left = trail[0].x + 'px';
  trail[0].el.style.top  = trail[0].y + 'px';
  requestAnimationFrame(trailLoop);
})();

/* ===== GLITCH TEXT EFFECT (on hover for nav logo) ===== */
const navLogo = document.querySelector('.nav-logo');
if (navLogo) {
  navLogo.addEventListener('mouseenter', () => {
    navLogo.style.animation = 'glitch 0.4s ease';
    setTimeout(() => { navLogo.style.animation = ''; }, 400);
  });
}
const glitchStyle = document.createElement('style');
glitchStyle.textContent = `
  @keyframes glitch {
    0%  { clip-path: inset(0 0 90% 0); transform: skewX(-5deg); }
    20% { clip-path: inset(30% 0 50% 0); transform: skewX(3deg) translateX(3px); }
    40% { clip-path: inset(60% 0 20% 0); transform: skewX(-2deg); }
    60% { clip-path: inset(80% 0 5% 0); transform: skewX(4deg) translateX(-3px); }
    80% { clip-path: inset(10% 0 70% 0); transform: skewX(0deg); }
    100%{ clip-path: inset(0 0 0 0); transform: skewX(0deg); }
  }
`;
document.head.appendChild(glitchStyle);
