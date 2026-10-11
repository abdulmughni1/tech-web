/**
 * DEXYFIED Official Shopify Storefront JavaScript
 * Theme switcher, navigation toggles, search modal, and UI utilities
 */

document.addEventListener('DOMContentLoaded', () => {
  initThemeToggle();
  initMobileMenu();
  initSearchModal();
  initProductGallery();
});

// Theme Toggle System (Dark / Light)
function initThemeToggle() {
  const toggleButtons = document.querySelectorAll('[data-theme-toggle]');
  
  function updateThemeUI(theme) {
    if (theme === 'dark') {
      document.documentElement.classList.add('dark');
      document.documentElement.setAttribute('data-theme', 'dark');
      document.documentElement.style.colorScheme = 'dark';
    } else {
      document.documentElement.classList.remove('dark');
      document.documentElement.setAttribute('data-theme', 'light');
      document.documentElement.style.colorScheme = 'light';
    }
    try {
      localStorage.setItem('dexyfied-theme', theme);
    } catch (e) {}
  }

  toggleButtons.forEach(btn => {
    btn.addEventListener('click', () => {
      const isDark = document.documentElement.classList.contains('dark') || 
                     document.documentElement.getAttribute('data-theme') === 'dark';
      const newTheme = isDark ? 'light' : 'dark';
      updateThemeUI(newTheme);
    });
  });
}

// Mobile Menu Toggle
function initMobileMenu() {
  const trigger = document.querySelector('[data-mobile-menu-toggle]');
  const menu = document.querySelector('[data-mobile-menu]');
  if (!trigger || !menu) return;

  trigger.addEventListener('click', () => {
    const isHidden = menu.classList.contains('hidden') || menu.style.display === 'none';
    if (isHidden) {
      menu.classList.remove('hidden');
      menu.style.display = 'block';
    } else {
      menu.classList.add('hidden');
      menu.style.display = 'none';
    }
  });
}

// Search Modal Toggle
function initSearchModal() {
  const triggers = document.querySelectorAll('[data-search-trigger]');
  const modal = document.querySelector('[data-search-modal]');
  const closeBtn = document.querySelector('[data-search-close]');
  if (!modal) return;

  triggers.forEach(t => {
    t.addEventListener('click', (e) => {
      e.preventDefault();
      modal.classList.remove('hidden');
      modal.style.display = 'flex';
      const input = modal.querySelector('input[type="search"]');
      if (input) input.focus();
    });
  });

  if (closeBtn) {
    closeBtn.addEventListener('click', () => {
      modal.classList.add('hidden');
      modal.style.display = 'none';
    });
  }

  modal.addEventListener('click', (e) => {
    if (e.target === modal) {
      modal.classList.add('hidden');
      modal.style.display = 'none';
    }
  });
}

// Product Page Gallery Swapper
function initProductGallery() {
  const thumbnails = document.querySelectorAll('[data-gallery-thumb]');
  const mainImage = document.querySelector('[data-gallery-main-image]');
  if (!mainImage || !thumbnails.length) return;

  thumbnails.forEach(thumb => {
    thumb.addEventListener('click', () => {
      const src = thumb.getAttribute('data-full-src');
      const alt = thumb.getAttribute('data-alt');
      if (src) {
        mainImage.src = src;
        if (alt) mainImage.alt = alt;
      }
      thumbnails.forEach(t => t.classList.remove('active'));
      thumb.classList.add('active');
    });
  });
}
