// ============================================================
// WILDPEDIA – script.js
// Update: Category card click → scroll + auto filter
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
if (siteHeader) {
  window.addEventListener('scroll', () => {
    siteHeader.style.boxShadow = window.scrollY > 40
      ? '0 4px 24px rgba(0,0,0,0.3)' : 'none';
  });
}

// ===== CATEGORY CARD → AUTO FILTER + SCROLL =====
document.querySelectorAll('.cat-card[data-filter]').forEach(card => {
  card.addEventListener('click', () => {
    const filter = card.dataset.filter;
    const encyclopediaSection = document.getElementById('fauna');
    if (!encyclopediaSection) return;
    encyclopediaSection.scrollIntoView({ behavior: 'smooth', block: 'start' });
    setTimeout(() => {
      document.querySelectorAll('.ftab').forEach(tab => {
        tab.classList.remove('active');
        if (tab.dataset.filter === filter) tab.classList.add('active');
      });
      document.querySelectorAll('.fauna-card').forEach(fc => {
        if (filter === 'all' || fc.dataset.group === filter) {
          fc.classList.remove('hidden');
          fc.classList.remove('visible');
          setTimeout(() => fc.classList.add('visible'), 80);
        } else {
          fc.classList.add('hidden');
        }
      });
    }, 700);
  });
});

// ===== INNER CARD TABS =====
document.querySelectorAll('.fc-tab-buttons').forEach(btnGroup => {
  btnGroup.querySelectorAll('.ftb').forEach(btn => {
    btn.addEventListener('click', () => {
      btnGroup.querySelectorAll('.ftb').forEach(b => b.classList.remove('active'));
      btn.classList.add('active');
      const card = btnGroup.closest('.fauna-card');
      card.querySelectorAll('.fc-tab-content').forEach(tc => tc.classList.remove('active'));
      const target = document.getElementById(btn.dataset.tab);
      if (target) target.classList.add('active');
    });
  });
});

// ===== FILTER TABS =====
document.querySelectorAll('.ftab').forEach(tab => {
  tab.addEventListener('click', () => {
    document.querySelectorAll('.ftab').forEach(t => t.classList.remove('active'));
    tab.classList.add('active');
    const filter = tab.dataset.filter;
    document.querySelectorAll('.fauna-card').forEach(card => {
      if (filter === 'all' || card.dataset.group === filter) {
        card.classList.remove('hidden');
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

document.querySelectorAll(
  '.fauna-card, .cat-card, .about-mini-card, .af-item, .cc-item, .cl-item, .ff-card, .endemic-card'
).forEach((el, i) => {
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
    p.style.cssText = `width:${size}px;height:${size}px;left:${Math.random()*100}%;animation-delay:${Math.random()*12}s;animation-duration:${Math.random()*10+14}s;`;
    container.appendChild(p);
  }
}
createParticles();

// ===== ACTIVE NAV HIGHLIGHT =====
const navObserver = new IntersectionObserver((entries) => {
  entries.forEach(entry => {
    if (entry.isIntersecting) {
      document.querySelectorAll('.main-nav a').forEach(link => {
        link.style.color = '';
        if (link.getAttribute('href') === '#' + entry.target.id)
          link.style.color = 'rgba(255,255,255,1)';
      });
    }
  });
}, { threshold: 0.4 });
document.querySelectorAll('section[id]').forEach(s => navObserver.observe(s));

// ===== IMAGE MODAL FUNCTIONALITY =====
document.addEventListener('DOMContentLoaded', () => {
  const modal = document.getElementById('imageModal');
  const modalImg = document.getElementById('modalImage');
  const modalCaption = document.getElementById('modalCaption');
  const modalClose = document.getElementById('modalClose');

  // Add click event to all fauna card images
  document.querySelectorAll('.fc-icon img').forEach(img => {
    img.style.cursor = 'pointer';
    img.addEventListener('click', () => {
      modalImg.src = img.src;
      modalImg.alt = img.alt;
      modalCaption.textContent = img.alt;
      modal.classList.add('active');
      document.body.style.overflow = 'hidden'; // Prevent background scrolling
    });
  });

  // Close modal when clicking close button
  modalClose.addEventListener('click', () => {
    modal.classList.remove('active');
    document.body.style.overflow = ''; // Restore scrolling
  });

  // Close modal when clicking outside the image
  modal.addEventListener('click', (e) => {
    if (e.target === modal) {
      modal.classList.remove('active');
      document.body.style.overflow = '';
    }
  });

  // Close modal with Escape key
  document.addEventListener('keydown', (e) => {
    if (e.key === 'Escape' && modal.classList.contains('active')) {
      modal.classList.remove('active');
      document.body.style.overflow = '';
    }
  });
});
