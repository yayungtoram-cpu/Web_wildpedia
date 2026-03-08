// ============================================================
// WILDPEDIA – script.js
// Features: Hamburger, Sticky Header, Filter Tabs,
//           Inner Card Tabs, Scroll Reveal, Form, Particles
// ============================================================

// ===== HAMBURGER MENU =====
const hamburgerBtn = document.getElementById('hamburgerBtn');
const mainNav = document.getElementById('mainNav');

if (hamburgerBtn && mainNav) {
  hamburgerBtn.addEventListener('click', () => {
    const open = mainNav.classList.toggle('open');
    hamburgerBtn.setAttribute('aria-expanded', open);
  });

  mainNav.querySelectorAll('a').forEach(link => {
    link.addEventListener('click', () => mainNav.classList.remove('open'));
  });

  document.addEventListener('click', (e) => {
    if (!hamburgerBtn.contains(e.target) && !mainNav.contains(e.target)) {
      mainNav.classList.remove('open');
    }
  });
}

// ===== STICKY HEADER SHADOW =====
const siteHeader = document.getElementById('siteHeader');
window.addEventListener('scroll', () => {
  if (window.scrollY > 40) {
    siteHeader.style.boxShadow = '0 4px 24px rgba(0,0,0,0.3)';
  } else {
    siteHeader.style.boxShadow = 'none';
  }
});

// ===== INNER CARD TABS (Reproduksi / Survival) =====
document.querySelectorAll('.fc-tab-buttons').forEach(btnGroup => {
  btnGroup.querySelectorAll('.ftb').forEach(btn => {
    btn.addEventListener('click', () => {
      // Remove active from all buttons in this group
      btnGroup.querySelectorAll('.ftb').forEach(b => b.classList.remove('active'));
      btn.classList.add('active');

      // Switch tab content
      const targetId = btn.dataset.tab;
      const card = btnGroup.closest('.fauna-card');
      card.querySelectorAll('.fc-tab-content').forEach(tc => tc.classList.remove('active'));
      const target = document.getElementById(targetId);
      if (target) target.classList.add('active');
    });
  });
});

// ===== FILTER TABS (Kategori fauna) =====
const filterTabs = document.querySelectorAll('.ftab');
const faunaCards = document.querySelectorAll('.fauna-card');

filterTabs.forEach(tab => {
  tab.addEventListener('click', () => {
    filterTabs.forEach(t => t.classList.remove('active'));
    tab.classList.add('active');

    const filter = tab.dataset.filter;

    faunaCards.forEach(card => {
      if (filter === 'all' || card.dataset.group === filter) {
        card.classList.remove('hidden');
        // Re-trigger reveal animation
        card.classList.remove('visible');
        setTimeout(() => card.classList.add('visible'), 50);
      } else {
        card.classList.add('hidden');
      }
    });
  });
});

// ===== SCROLL REVEAL =====
const revealObserver = new IntersectionObserver((entries) => {
  entries.forEach(entry => {
    if (entry.isIntersecting) {
      entry.target.classList.add('visible');
      revealObserver.unobserve(entry.target);
    }
  });
}, { threshold: 0.1 });

// Elementi yang akan di-reveal saat scroll
const revealTargets = document.querySelectorAll(
  '.fauna-card, .cat-card, .about-mini-card, .af-item, .cc-item, .cl-item'
);

revealTargets.forEach((el, i) => {
  el.classList.add('reveal');
  el.style.transitionDelay = `${(i % 6) * 0.07}s`;
  revealObserver.observe(el);
});

// ===== FORM KONTAK =====
const contactForm = document.getElementById('contactForm');
const formOk = document.getElementById('formOk');

if (contactForm && formOk) {
  contactForm.addEventListener('submit', (e) => {
    e.preventDefault();
    const btn = contactForm.querySelector('button[type="submit"]');
    btn.textContent = 'Mengirim... 🌿';
    btn.disabled = true;

    setTimeout(() => {
      contactForm.style.display = 'none';
      formOk.style.display = 'block';
    }, 1400);
  });
}

// ===== HERO PARTICLES =====
function createParticles() {
  const container = document.getElementById('heroParticles');
  if (!container) return;

  const count = window.innerWidth < 768 ? 10 : 20;

  for (let i = 0; i < count; i++) {
    const p = document.createElement('div');
    p.className = 'hero-particle';

    const size = Math.random() * 8 + 3;
    const left = Math.random() * 100;
    const delay = Math.random() * 12;
    const duration = Math.random() * 10 + 14;

    p.style.cssText = `
      width: ${size}px;
      height: ${size}px;
      left: ${left}%;
      animation-delay: ${delay}s;
      animation-duration: ${duration}s;
    `;

    container.appendChild(p);
  }
}

createParticles();

// ===== SMOOTH ACTIVE NAV HIGHLIGHT =====
const sections = document.querySelectorAll('section[id]');
const navLinks = document.querySelectorAll('.main-nav a');

const navObserver = new IntersectionObserver((entries) => {
  entries.forEach(entry => {
    if (entry.isIntersecting) {
      navLinks.forEach(link => {
        link.style.color = '';
        if (link.getAttribute('href') === '#' + entry.target.id) {
          link.style.color = 'rgba(255,255,255,1)';
        }
      });
    }
  });
}, { threshold: 0.4 });

sections.forEach(s => navObserver.observe(s));
