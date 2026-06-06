/* ============================================================
   KB Medizintechnik — main.js
   ============================================================ */

/* Panier — état persisté en sessionStorage */
const Cart = {
  get count() { return parseInt(sessionStorage.getItem('kb_cart') || '0'); },
  add(n = 1) {
    const next = this.count + n;
    sessionStorage.setItem('kb_cart', next);
    this.updateUI();
    return next;
  },
  updateUI() {
    const n = this.count;
    document.querySelectorAll('.cart-badge, .mobile-nav-cart-badge').forEach(el => {
      el.textContent = n;
      el.classList.toggle('hidden', n === 0);
    });
  }
};

document.addEventListener('DOMContentLoaded', () => {

  /* ---- Détermination du chemin de base (racine ou sous-dossier) ---- */
  const pathParts = window.location.pathname.split('/').filter(Boolean);
  const inSubdir = pathParts.length >= 2 && !pathParts[pathParts.length - 2].match(/\.(html|htm)$/);
  const base = inSubdir ? '../' : '';

  /* ---- Header scroll shadow ---- */
  const header = document.querySelector('.header');
  if (header) {
    const onScroll = () => header.classList.toggle('scrolled', window.scrollY > 20);
    window.addEventListener('scroll', onScroll, { passive: true });
  }

  /* ---- Mobile nav toggle + overlay backdrop ---- */
  const toggle = document.querySelector('.nav-toggle');
  const nav = document.querySelector('.header-nav');

  // Créer l'overlay backdrop
  const overlay = document.createElement('div');
  overlay.className = 'nav-overlay';
  document.body.appendChild(overlay);

  const closeNav = () => {
    nav?.classList.remove('open');
    overlay.classList.remove('open');
    toggle?.setAttribute('aria-expanded', 'false');
    toggle?.querySelectorAll('span').forEach((s, i) => s.style.transform = '');
  };

  if (toggle && nav) {
    toggle.addEventListener('click', () => {
      const open = nav.classList.toggle('open');
      overlay.classList.toggle('open', open);
      toggle.setAttribute('aria-expanded', open);
      // Animer les barres en X
      const bars = toggle.querySelectorAll('span');
      if (open) {
        bars[0].style.transform = 'rotate(45deg) translate(5px, 5px)';
        bars[1].style.opacity = '0';
        bars[2].style.transform = 'rotate(-45deg) translate(5px, -5px)';
      } else {
        bars.forEach(s => { s.style.transform = ''; s.style.opacity = ''; });
      }
    });
    overlay.addEventListener('click', closeNav);
  }

  /* ---- Dropdown navigation — hover robuste avec délai ---- */
  document.querySelectorAll('.nav-dropdown').forEach(dropdown => {
    let closeTimer = null;

    const openDD = () => {
      clearTimeout(closeTimer);
      document.querySelectorAll('.nav-dropdown').forEach(d => { if (d !== dropdown) d.classList.remove('open'); });
      dropdown.classList.add('open');
    };
    const closeDD = () => { closeTimer = setTimeout(() => dropdown.classList.remove('open'), 150); };

    // Sur desktop : hover
    if (window.matchMedia('(hover: hover)').matches) {
      dropdown.addEventListener('mouseenter', openDD);
      dropdown.addEventListener('mouseleave', closeDD);
    }

    // Sur mobile/tablette : clic toggle (le dropdown reste toujours visible dans le menu mobile)
    const trigger = dropdown.querySelector('.nav-dropdown-trigger');
    if (trigger) {
      trigger.addEventListener('click', (e) => {
        if (window.innerWidth > 768) {
          e.stopPropagation();
          dropdown.classList.toggle('open');
        }
        // Sur mobile le dropdown CSS le montre toujours via display:block
      });
    }

    document.addEventListener('click', (e) => {
      if (!dropdown.contains(e.target)) dropdown.classList.remove('open');
    });
  });

  /* ---- Bouton filtres mobile ---- */
  const filtersToggleBtn = document.querySelector('.filters-toggle');
  const filtersPanel = document.querySelector('.filters-panel');
  if (filtersToggleBtn && filtersPanel) {
    filtersToggleBtn.addEventListener('click', () => {
      const open = filtersPanel.classList.toggle('open');
      filtersToggleBtn.querySelector('.filters-toggle-label').textContent = open ? 'Masquer les filtres' : 'Afficher les filtres';
    });
  }

  /* ---- Quantity selectors ---- */
  document.querySelectorAll('.qty-selector').forEach(selector => {
    const input = selector.querySelector('.qty-input');
    selector.querySelectorAll('.qty-btn').forEach(btn => {
      btn.addEventListener('click', () => {
        let val = parseInt(input.value) || 1;
        if (btn.dataset.action === 'minus') val = Math.max(1, val - 1);
        if (btn.dataset.action === 'plus') val = Math.min(999, val + 1);
        input.value = val;
      });
    });
  });

  /* ---- Product thumbnails ---- */
  document.querySelectorAll('.product-thumb').forEach(thumb => {
    thumb.addEventListener('click', () => {
      thumb.closest('.product-gallery')?.querySelectorAll('.product-thumb').forEach(t => t.classList.remove('active'));
      thumb.classList.add('active');
    });
  });

  /* ---- Toast system ---- */
  const toastContainer = document.createElement('div');
  toastContainer.className = 'toast-container';
  document.body.appendChild(toastContainer);

  window.showToast = (message, type = 'success', duration = 3000) => {
    const icons = {
      success: '<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2.5"><path d="M20 6 9 17l-5-5"/></svg>',
      error: '<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2.5"><path d="M18 6 6 18M6 6l12 12"/></svg>',
      info: '<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2.5"><circle cx="12" cy="12" r="10"/><path d="M12 16v-4M12 8h.01"/></svg>',
    };
    const toast = document.createElement('div');
    toast.className = `toast toast-${type}`;
    toast.innerHTML = `${icons[type] || ''}<span>${message}</span>`;
    toastContainer.appendChild(toast);
    setTimeout(() => {
      toast.style.animation = 'toast-in 0.25s ease reverse';
      setTimeout(() => toast.remove(), 230);
    }, duration);
  };

  /* ---- Add to cart / devis ---- */
  document.querySelectorAll('[data-action="add-cart"]').forEach(btn => {
    btn.addEventListener('click', () => {
      const name = btn.closest('[data-product]')?.dataset.product || 'Produit';
      Cart.add(1);
      showToast(`${name} ajouté au panier`, 'success');
    });
  });

  document.querySelectorAll('[data-action="add-devis"]').forEach(btn => {
    btn.addEventListener('click', () => {
      const name = btn.closest('[data-product]')?.dataset.product || 'Produit';
      showToast(`${name} ajouté à votre devis`, 'info');
    });
  });

  /* ---- Init compteur panier depuis storage ---- */
  Cart.updateUI();

  /* ---- Login form ---- */
  const loginForm = document.querySelector('#login-form');
  if (loginForm) {
    loginForm.addEventListener('submit', (e) => {
      e.preventDefault();
      const btn = loginForm.querySelector('[type="submit"]');
      const originalText = btn.innerHTML;
      btn.innerHTML = 'Connexion…'; btn.disabled = true;
      setTimeout(() => {
        window.location.href = 'dashboard.html';
      }, 800);
    });
  }

  /* ---- Contact form ---- */
  const contactForm = document.querySelector('#contact-form');
  if (contactForm) {
    contactForm.addEventListener('submit', (e) => {
      e.preventDefault();
      showToast('Votre message a été envoyé. Nous vous répondons sous 24h.', 'success');
      contactForm.reset();
    });
  }

  /* ---- Devis form ---- */
  const devisForm = document.querySelector('#devis-form');
  if (devisForm) {
    devisForm.addEventListener('submit', (e) => {
      e.preventDefault();
      showToast('Votre demande de devis a été envoyée !', 'success');
      setTimeout(() => { window.location.href = `${base}index.html`; }, 1800);
    });
  }

  /* ---- Sidebar mobile toggle (dashboard équipe) ---- */
  const sidebarToggle = document.querySelector('.sidebar-toggle');
  const teamSidebar = document.querySelector('.team-sidebar');
  if (sidebarToggle && teamSidebar) {
    sidebarToggle.addEventListener('click', () => teamSidebar.classList.toggle('open'));
  }

  /* ---- Inject mobile bottom nav ---- */
  if (!document.querySelector('.mobile-bottom-nav')) {
    const pagePath = window.location.pathname;
    const isActive = (keyword) => pagePath.includes(keyword) ? 'active' : '';
    const isHome = (pagePath.endsWith('/') || pagePath.endsWith('index.html') || pagePath === '/') ? 'active' : '';

    const mobileNav = document.createElement('nav');
    mobileNav.className = 'mobile-bottom-nav';
    mobileNav.setAttribute('aria-label', 'Navigation mobile');
    mobileNav.innerHTML = `
      <div class="mobile-nav-items">
        <a href="${base}index.html" class="mobile-nav-item ${isHome}">
          <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.8">
            <path d="m3 9 9-7 9 7v11a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2z"/>
            <polyline points="9 22 9 12 15 12 15 22"/>
          </svg>
          <span>Accueil</span>
        </a>
        <a href="${base}boutique.html" class="mobile-nav-item ${isActive('boutique') || isActive('produit') || isActive('specialite')}">
          <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.8">
            <rect x="2" y="3" width="20" height="14" rx="2"/>
            <path d="M8 21h8M12 17v4"/>
          </svg>
          <span>Catalogue</span>
        </a>
        <a href="${base}boutique.html" class="mobile-nav-item mobile-nav-cart ${isActive('panier')}">
          <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.8">
            <circle cx="9" cy="21" r="1"/><circle cx="20" cy="21" r="1"/>
            <path d="M1 1h4l2.68 13.39a2 2 0 0 0 2 1.61h9.72a2 2 0 0 0 2-1.61L23 6H6"/>
          </svg>
          <span class="mobile-nav-cart-badge hidden" id="mobile-cart-badge">0</span>
          <span>Panier</span>
        </a>
        <a href="${base}devis.html" class="mobile-nav-item ${isActive('devis')}">
          <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.8">
            <path d="M14 2H6a2 2 0 0 0-2 2v16a2 2 0 0 0 2 2h12a2 2 0 0 0 2-2V8z"/>
            <polyline points="14 2 14 8 20 8"/>
            <line x1="16" y1="13" x2="8" y2="13"/>
            <line x1="16" y1="17" x2="8" y2="17"/>
          </svg>
          <span>Devis</span>
        </a>
        <a href="${base}compte/login.html" class="mobile-nav-item ${isActive('compte')}">
          <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.8">
            <path d="M17 21v-2a4 4 0 0 0-4-4H5a4 4 0 0 0-4 4v2"/>
            <circle cx="9" cy="7" r="4"/>
          </svg>
          <span>Mon compte</span>
        </a>
      </div>
    `;
    document.body.appendChild(mobileNav);
    // Sync badge après injection
    Cart.updateUI();
  }

});
