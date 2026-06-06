/* ============================================================
   KB Medizintechnik — main.js
   ============================================================ */

document.addEventListener('DOMContentLoaded', () => {

  /* ---- Header scroll shadow ---- */
  const header = document.querySelector('.header');
  if (header) {
    const onScroll = () => header.classList.toggle('scrolled', window.scrollY > 20);
    window.addEventListener('scroll', onScroll, { passive: true });
  }

  /* ---- Mobile nav toggle ---- */
  const toggle = document.querySelector('.nav-toggle');
  const nav = document.querySelector('.header-nav');
  if (toggle && nav) {
    toggle.addEventListener('click', () => {
      const open = nav.classList.toggle('open');
      toggle.setAttribute('aria-expanded', open);
    });
    document.addEventListener('click', (e) => {
      if (!toggle.contains(e.target) && !nav.contains(e.target)) {
        nav.classList.remove('open');
      }
    });
  }

  /* ---- Dropdown navigation — hover robuste avec délai ---- */
  document.querySelectorAll('.nav-dropdown').forEach(dropdown => {
    let closeTimer = null;

    const open = () => {
      clearTimeout(closeTimer);
      // Ferme les autres dropdowns
      document.querySelectorAll('.nav-dropdown').forEach(d => {
        if (d !== dropdown) d.classList.remove('open');
      });
      dropdown.classList.add('open');
    };

    const close = () => {
      // Délai 150ms : laisse le temps à la souris de descendre vers le menu
      closeTimer = setTimeout(() => dropdown.classList.remove('open'), 150);
    };

    // Hover sur le trigger ou le menu
    dropdown.addEventListener('mouseenter', open);
    dropdown.addEventListener('mouseleave', close);

    // Clic sur le trigger (toggle) — utile sur tablette
    const trigger = dropdown.querySelector('.nav-dropdown-trigger');
    if (trigger) {
      trigger.addEventListener('click', (e) => {
        e.stopPropagation();
        dropdown.classList.toggle('open');
      });
    }

    // Clic en dehors ferme le menu
    document.addEventListener('click', (e) => {
      if (!dropdown.contains(e.target)) {
        dropdown.classList.remove('open');
      }
    });
  });

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
      const gallery = thumb.closest('.product-gallery');
      if (gallery) gallery.querySelectorAll('.product-thumb').forEach(t => t.classList.remove('active'));
      thumb.classList.add('active');
    });
  });

  /* ---- Filter reset ---- */
  const resetBtn = document.querySelector('.btn-reset-filters');
  if (resetBtn) {
    resetBtn.addEventListener('click', () => {
      document.querySelectorAll('.filter-option input[type="checkbox"]').forEach(cb => cb.checked = false);
    });
  }

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
      showToast(`${name} ajouté au panier`, 'success');
      updateCartCount(1);
    });
  });

  document.querySelectorAll('[data-action="add-devis"]').forEach(btn => {
    btn.addEventListener('click', () => {
      const name = btn.closest('[data-product]')?.dataset.product || 'Produit';
      showToast(`${name} ajouté à votre devis`, 'info');
    });
  });

  /* ---- Cart count ---- */
  function updateCartCount(delta) {
    const countEl = document.querySelector('.cart-count');
    if (!countEl) return;
    const current = parseInt(countEl.textContent) || 0;
    countEl.textContent = current + delta;
  }

  /* ---- Login form ---- */
  const loginForm = document.querySelector('#login-form');
  if (loginForm) {
    loginForm.addEventListener('submit', (e) => {
      e.preventDefault();
      const btn = loginForm.querySelector('[type="submit"]');
      btn.textContent = 'Connexion...';
      btn.disabled = true;
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
      setTimeout(() => { window.location.href = 'index.html'; }, 1800);
    });
  }

  /* ---- Status filter (dashboard tables) ---- */
  document.querySelectorAll('[data-filter-status]').forEach(btn => {
    btn.addEventListener('click', () => {
      document.querySelectorAll('[data-filter-status]').forEach(b => b.classList.remove('active'));
      btn.classList.add('active');
    });
  });

  /* ---- Sidebar mobile toggle ---- */
  const sidebarToggle = document.querySelector('.sidebar-toggle');
  const sidebar = document.querySelector('.team-sidebar');
  if (sidebarToggle && sidebar) {
    sidebarToggle.addEventListener('click', () => sidebar.classList.toggle('open'));
  }

  /* ---- Active nav link ---- */
  const currentPath = window.location.pathname.split('/').pop();
  document.querySelectorAll('.nav-link, .sidebar-link').forEach(link => {
    const href = link.getAttribute('href') || '';
    if (href && href === currentPath) link.classList.add('active');
  });

});
