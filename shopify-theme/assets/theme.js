/**
 * DEXYFIED Official Shopify Storefront JavaScript
 * Theme switcher, navigation toggles, search modal, product gallery,
 * scroll reveal animations, catalog filtering & sorting, and reviews
 */

document.addEventListener('DOMContentLoaded', () => {
  initThemeToggle();
  initMobileMenu();
  initSearchModal();
  initProductGallery();
  initScrollReveal();
  initCatalogFilters();
  initProductReviews();
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

// Search Modal Toggle — Strictly Closed by Default
function initSearchModal() {
  const triggers = document.querySelectorAll('[data-search-trigger]');
  const modal = document.querySelector('[data-search-modal]');
  const closeBtn = document.querySelector('[data-search-close]');
  if (!modal) return;
  if (modal.dataset.searchInitialized === 'true') return;
  modal.dataset.searchInitialized = 'true';

  function closeModal() {
    modal.classList.remove('open');
    modal.classList.add('hidden');
    modal.style.setProperty('display', 'none', 'important');
    modal.setAttribute('aria-hidden', 'true');
    document.body.style.overflow = '';
  }

  function openModal() {
    modal.classList.remove('hidden');
    modal.classList.add('open');
    modal.style.setProperty('display', 'flex', 'important');
    modal.setAttribute('aria-hidden', 'false');
    document.body.style.overflow = 'hidden';
    const input = modal.querySelector('input[type="search"]');
    if (input) {
      setTimeout(() => {
        input.focus();
        input.select();
      }, 50);
    }
  }

  // Strictly enforce closed state on initial load / refresh
  closeModal();

  triggers.forEach(t => {
    t.addEventListener('click', (e) => {
      e.preventDefault();
      openModal();
    });
  });

  if (closeBtn) {
    closeBtn.addEventListener('click', (e) => {
      e.preventDefault();
      closeModal();
    });
  }

  modal.addEventListener('click', (e) => {
    if (e.target === modal) {
      closeModal();
    }
  });

  document.addEventListener('keydown', (e) => {
    if (e.key === 'Escape' && (modal.style.display === 'flex' || !modal.classList.contains('hidden'))) {
      closeModal();
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

// Viewport Scroll Reveal Animations
function initScrollReveal() {
  const elements = document.querySelectorAll('.reveal-on-scroll');
  if (!elements.length) return;

  const prefersReduced = window.matchMedia && window.matchMedia('(prefers-reduced-motion: reduce)').matches;
  if (prefersReduced || !('IntersectionObserver' in window)) {
    elements.forEach(el => el.classList.add('is-revealed'));
    return;
  }

  const observer = new IntersectionObserver((entries, obs) => {
    entries.forEach(entry => {
      if (entry.isIntersecting) {
        entry.target.classList.add('is-revealed');
        obs.unobserve(entry.target);
      }
    });
  }, {
    threshold: 0.08,
    rootMargin: '0px 0px -30px 0px'
  });

  elements.forEach(el => observer.observe(el));
}

// Shop Catalog Interactive Filters & Sorting
function initCatalogFilters() {
  const catalogSection = document.querySelector('[data-catalog-section]');
  if (!catalogSection) return;

  const pills = catalogSection.querySelectorAll('[data-cat-filter]');
  const cards = catalogSection.querySelectorAll('[data-product-card]');
  const priceSlider = catalogSection.querySelector('[data-price-slider]');
  const priceDisplay = catalogSection.querySelector('[data-max-price-display]');
  const sortSelect = catalogSection.querySelector('[data-sort-select]');
  const countEl = catalogSection.querySelector('[data-filtered-count]');
  const emptyEl = catalogSection.querySelector('[data-empty-filter-state]');
  const gridEl = catalogSection.querySelector('[data-catalog-grid]');
  const resetBtn = catalogSection.querySelector('[data-reset-filters]');

  if (!cards.length) return;

  let currentCategory = 'all';
  let currentMaxPrice = priceSlider ? parseFloat(priceSlider.value) : 5000;
  let currentSort = 'default';

  // Check URL query parameters or hash
  const urlParams = new URLSearchParams(window.location.search);
  const catParam = urlParams.get('category') || window.location.hash.replace('#', '');
  if (catParam) {
    const matchingPill = Array.from(pills).find(p => p.getAttribute('data-cat-filter').toLowerCase() === catParam.toLowerCase());
    if (matchingPill) {
      currentCategory = catParam.toLowerCase();
      pills.forEach(p => p.classList.toggle('active', p === matchingPill));
    }
  }

  function applyFiltersAndSort() {
    let visibleCount = 0;
    const cardsArray = Array.from(cards);

    // Filter
    cardsArray.forEach(card => {
      const cat = (card.getAttribute('data-category') || '').toLowerCase();
      const tags = (card.getAttribute('data-tags') || '').toLowerCase();
      const price = parseFloat(card.getAttribute('data-price') || '0');

      let matchesCat = (currentCategory === 'all');
      if (!matchesCat) {
        matchesCat = cat.includes(currentCategory) || tags.includes(currentCategory);
        if (!matchesCat && currentCategory === 'audio') {
          matchesCat = cat.includes('audio') || tags.includes('audio') || tags.includes('earbuds') || tags.includes('headphones');
        }
        if (!matchesCat && currentCategory === 'smart watches') {
          matchesCat = cat.includes('smart') || cat.includes('watch') || tags.includes('smart') || tags.includes('watch');
        }
        if (!matchesCat && currentCategory === 'wearables') {
          matchesCat = cat.includes('wearable') || tags.includes('wearable') || tags.includes('ring');
        }
        if (!matchesCat && currentCategory === 'workspace') {
          matchesCat = cat.includes('workspace') || tags.includes('workspace') || tags.includes('stand');
        }
      }

      const matchesPrice = price <= currentMaxPrice;

      if (matchesCat && matchesPrice) {
        card.style.display = '';
        visibleCount++;
      } else {
        card.style.display = 'none';
      }
    });

    // Sort visible cards within grid
    if (gridEl) {
      const sortedCards = cardsArray.slice().sort((a, b) => {
        const priceA = parseFloat(a.getAttribute('data-price') || '0');
        const priceB = parseFloat(b.getAttribute('data-price') || '0');
        const refA = a.getAttribute('data-ref') || '';
        const refB = b.getAttribute('data-ref') || '';

        if (currentSort === 'price-asc') return priceA - priceB;
        if (currentSort === 'price-desc') return priceB - priceA;
        return refA.localeCompare(refB, undefined, { numeric: true });
      });

      sortedCards.forEach(card => gridEl.appendChild(card));
    }

    if (countEl) countEl.textContent = visibleCount;
    if (emptyEl) emptyEl.style.display = visibleCount === 0 ? 'block' : 'none';
  }

  pills.forEach(pill => {
    pill.addEventListener('click', () => {
      pills.forEach(p => p.classList.remove('active'));
      pill.classList.add('active');
      currentCategory = (pill.getAttribute('data-cat-filter') || 'all').toLowerCase();
      applyFiltersAndSort();
    });
  });

  if (priceSlider) {
    priceSlider.addEventListener('input', (e) => {
      currentMaxPrice = parseFloat(e.target.value);
      if (priceDisplay) priceDisplay.textContent = currentMaxPrice.toLocaleString();
      applyFiltersAndSort();
    });
  }

  if (sortSelect) {
    sortSelect.addEventListener('change', (e) => {
      currentSort = e.target.value;
      applyFiltersAndSort();
    });
  }

  if (resetBtn) {
    resetBtn.addEventListener('click', () => {
      currentCategory = 'all';
      pills.forEach(p => p.classList.toggle('active', p.getAttribute('data-cat-filter') === 'all'));
      if (priceSlider) {
        priceSlider.value = '5000';
        currentMaxPrice = 5000;
        if (priceDisplay) priceDisplay.textContent = '5,000';
      }
      if (sortSelect) {
        sortSelect.value = 'default';
        currentSort = 'default';
      }
      applyFiltersAndSort();
    });
  }

  applyFiltersAndSort();
}

// Product Reviews System (Local Storage + Standard UI)
function initProductReviews() {
  const section = document.querySelector('[data-product-reviews-section]');
  if (!section) return;

  const handle = section.getAttribute('data-product-handle') || 'general';
  const storageKey = 'dexyfied-reviews-' + handle;

  const toggleBtn = section.querySelector('[data-toggle-review-form]');
  const formPanel = section.querySelector('[data-review-form-panel]');
  const form = section.querySelector('[data-review-form]');
  const starsContainer = section.querySelector('[data-interactive-stars]');
  const ratingInput = section.querySelector('#SelectedRatingValue');
  const ratingText = section.querySelector('[data-star-rating-text]');
  const charCount = section.querySelector('[data-char-count]');
  const bodyInput = section.querySelector('#ReviewBody');
  const feedbackMsg = section.querySelector('[data-review-feedback-msg]');
  const listEl = section.querySelector('[data-reviews-list]');
  const emptyEl = section.querySelector('[data-reviews-empty]');
  const feedCountEl = section.querySelector('[data-feed-count]');
  const avgRatingEl = section.querySelector('[data-avg-rating]');
  const totalReviewsEl = section.querySelector('[data-total-reviews-count]');
  const starsSummary = section.querySelector('[data-stars-summary]');

  // Toggle Form visibility / smooth scroll
  if (toggleBtn && formPanel) {
    toggleBtn.addEventListener('click', () => {
      formPanel.scrollIntoView({ behavior: 'smooth', block: 'center' });
      const firstInput = formPanel.querySelector('#ReviewAuthor');
      if (firstInput) firstInput.focus();
    });
  }

  // Interactive Stars
  let selectedRating = 0;
  if (starsContainer) {
    const starBtns = starsContainer.querySelectorAll('.star-btn');

    starBtns.forEach(btn => {
      const val = parseInt(btn.getAttribute('data-star-val'), 10);

      btn.addEventListener('mouseenter', () => {
        highlightStars(val);
        if (ratingText) ratingText.textContent = `${val} / 5 Stars`;
      });

      btn.addEventListener('mouseleave', () => {
        highlightStars(selectedRating);
        if (ratingText) ratingText.textContent = selectedRating > 0 ? `${selectedRating} / 5 Stars` : 'Select rating';
      });

      btn.addEventListener('click', () => {
        selectedRating = val;
        if (ratingInput) ratingInput.value = val;
        highlightStars(val);
        if (ratingText) ratingText.textContent = `${val} / 5 Stars`;
      });
    });

    function highlightStars(count) {
      starBtns.forEach(btn => {
        const val = parseInt(btn.getAttribute('data-star-val'), 10);
        btn.classList.toggle('active', val <= count);
      });
    }
  }

  // Character Counter
  if (bodyInput && charCount) {
    bodyInput.addEventListener('input', () => {
      charCount.textContent = `${bodyInput.value.length} / 1000`;
    });
  }

  // Load reviews from localStorage
  function getStoredReviews() {
    try {
      const data = localStorage.getItem(storageKey);
      return data ? JSON.parse(data) : [];
    } catch (e) {
      return [];
    }
  }

  function saveReview(review) {
    try {
      const current = getStoredReviews();
      current.unshift(review);
      localStorage.setItem(storageKey, JSON.stringify(current));
    } catch (e) {}
  }

  function renderReviews() {
    const reviews = getStoredReviews();
    if (!listEl) return;

    listEl.innerHTML = '';

    if (feedCountEl) feedCountEl.textContent = reviews.length;
    if (totalReviewsEl) totalReviewsEl.textContent = `(${reviews.length} ${reviews.length === 1 ? 'review' : 'reviews'})`;

    if (reviews.length === 0) {
      if (emptyEl) emptyEl.style.display = 'block';
      if (avgRatingEl) avgRatingEl.textContent = '0.0';
      if (starsSummary) {
        starsSummary.querySelectorAll('svg').forEach(s => {
          s.setAttribute('fill', '#CBD5E1');
          s.setAttribute('stroke', '#CBD5E1');
        });
      }
      return;
    }

    if (emptyEl) emptyEl.style.display = 'none';

    // Calculate Average
    const sum = reviews.reduce((acc, r) => acc + (parseFloat(r.rating) || 5), 0);
    const avg = sum / reviews.length;
    if (avgRatingEl) avgRatingEl.textContent = avg.toFixed(1);

    const rounded = Math.round(avg);
    if (starsSummary) {
      starsSummary.querySelectorAll('svg').forEach((s, idx) => {
        const active = idx < rounded;
        s.setAttribute('fill', active ? '#F59E0B' : '#CBD5E1');
        s.setAttribute('stroke', active ? '#F59E0B' : '#CBD5E1');
      });
    }

    const pdpStars = document.querySelectorAll('.pdp-title-star');
    if (pdpStars.length) {
      pdpStars.forEach((s, idx) => {
        const active = idx < rounded;
        s.setAttribute('fill', active ? '#F59E0B' : '#CBD5E1');
        s.setAttribute('stroke', active ? '#F59E0B' : '#CBD5E1');
      });
    }

    // Render Review Cards
    reviews.forEach(r => {
      const card = document.createElement('div');
      card.className = 'single-review-card';

      let starSvgs = '';
      for (let i = 1; i <= 5; i++) {
        const fill = i <= r.rating ? '#F59E0B' : '#CBD5E1';
        starSvgs += `<svg width="14" height="14" viewBox="0 0 24 24" fill="${fill}" stroke="${fill}"><polygon points="12 2 15.09 8.26 22 9.27 17 14.14 18.18 21.02 12 17.77 5.82 21.02 7 14.14 2 9.27 8.91 8.26 12 2"></polygon></svg>`;
      }

      card.innerHTML = `
        <div style="display: flex; justify-content: space-between; align-items: flex-start; gap: 0.75rem;">
          <div style="display: flex; align-items: center; gap: 0.5rem; flex-wrap: wrap;">
            <span style="font-family: var(--font-display); font-weight: 700; font-size: 0.875rem; color: var(--text-primary); text-transform: uppercase;">
              ${escapeHtml(r.author)}
            </span>
            <span style="font-family: var(--font-tech); font-size: 0.625rem; color: var(--text-muted); border: 1px solid var(--border-main); padding: 0.125rem 0.375rem; border-radius: var(--radius-xs); text-transform: uppercase;">
              YOUR SUBMISSION
            </span>
          </div>
          <div style="display: flex; align-items: center; gap: 0.5rem;">
            <div style="display: flex; align-items: center; gap: 2px;">
              ${starSvgs}
            </div>
            <span style="font-family: var(--font-tech); font-size: 0.6875rem; color: var(--text-dim);">
              ${escapeHtml(r.date || 'Today')}
            </span>
          </div>
        </div>
        <p style="font-family: var(--font-sans); font-size: 0.8125rem; color: var(--text-muted); line-height: 1.6; margin: 0; white-space: pre-line;">
          ${escapeHtml(r.body)}
        </p>
      `;
      listEl.appendChild(card);
    });
  }

  function escapeHtml(str) {
    if (!str) return '';
    return str.replace(/&/g, '&amp;').replace(/</g, '&lt;').replace(/>/g, '&gt;').replace(/"/g, '&quot;');
  }

  // Handle Form Submit
  if (form) {
    form.addEventListener('submit', (e) => {
      e.preventDefault();

      if (!selectedRating || selectedRating < 1) {
        showFeedback('Please select a star rating between 1 and 5.', true);
        return;
      }

      const nameVal = form.querySelector('#ReviewAuthor')?.value.trim();
      const bodyVal = form.querySelector('#ReviewBody')?.value.trim();

      if (!nameVal || nameVal.length < 2) {
        showFeedback('Please enter your display name.', true);
        return;
      }

      if (!bodyVal || bodyVal.length < 10) {
        showFeedback('Review comments must be at least 10 characters.', true);
        return;
      }

      const newReview = {
        author: nameVal,
        rating: selectedRating,
        body: bodyVal,
        date: new Date().toLocaleDateString('en-US', { month: 'short', day: 'numeric', year: 'numeric' })
      };

      saveReview(newReview);
      renderReviews();

      // Reset form
      form.reset();
      selectedRating = 0;
      if (starsContainer) {
        starsContainer.querySelectorAll('.star-btn').forEach(b => b.classList.remove('active'));
      }
      if (ratingText) ratingText.textContent = 'Select rating';
      if (charCount) charCount.textContent = '0 / 1000';

      showFeedback('Thank you! Your verified review has been recorded.', false);
    });
  }

  function showFeedback(msg, isError) {
    if (!feedbackMsg) return;
    feedbackMsg.textContent = msg;
    feedbackMsg.style.display = 'block';
    if (isError) {
      feedbackMsg.style.backgroundColor = 'rgba(220, 38, 38, 0.1)';
      feedbackMsg.style.color = '#DC2626';
      feedbackMsg.style.border = '1px solid rgba(220, 38, 38, 0.3)';
    } else {
      feedbackMsg.style.backgroundColor = 'rgba(22, 163, 74, 0.1)';
      feedbackMsg.style.color = 'var(--success-color)';
      feedbackMsg.style.border = '1px solid rgba(22, 163, 74, 0.3)';
    }
    setTimeout(() => {
      feedbackMsg.style.display = 'none';
    }, 6000);
  }

  renderReviews();
}
