/**
 * DEXYFIED Official Shopify Ajax Cart Engine
 * Seamless slide-over drawer cart integrated with Shopify's /cart endpoints
 */

const DexyfiedCart = {
  drawer: null,
  overlay: null,
  cartCountBadge: null,

  init() {
    this.drawer = document.querySelector('[data-cart-drawer]');
    this.overlay = document.querySelector('[data-cart-overlay]');
    this.cartCountBadge = document.querySelectorAll('[data-cart-count]');

    // Attach open buttons
    document.querySelectorAll('[data-cart-open]').forEach(btn => {
      btn.addEventListener('click', (e) => {
        e.preventDefault();
        this.open();
      });
    });

    // Attach close buttons
    document.querySelectorAll('[data-cart-close]').forEach(btn => {
      btn.addEventListener('click', () => this.close());
    });

    if (this.overlay) {
      this.overlay.addEventListener('click', () => this.close());
    }

    // Intercept native product form submissions
    document.addEventListener('submit', (e) => {
      const form = e.target.closest('form[action*="/cart/add"]');
      if (form) {
        e.preventDefault();
        this.addToCartForm(form);
      }
    });

    // Initial sync
    this.refresh();
  },

  open() {
    if (this.drawer) this.drawer.classList.add('open');
    if (this.overlay) this.overlay.classList.add('open');
    document.body.style.overflow = 'hidden';
  },

  close() {
    if (this.drawer) this.drawer.classList.remove('open');
    if (this.overlay) this.overlay.classList.remove('open');
    document.body.style.overflow = '';
  },

  async getCart() {
    try {
      const res = await fetch('/cart.js', { headers: { 'Accept': 'application/json' } });
      return await res.json();
    } catch (err) {
      console.error('Error fetching cart:', err);
      return null;
    }
  },

  async addToCart(variantId, quantity = 1, properties = {}) {
    try {
      const payload = {
        id: variantId,
        quantity: quantity,
        properties: properties
      };

      const res = await fetch('/cart/add.js', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json', 'Accept': 'application/json' },
        body: JSON.stringify(payload)
      });

      if (!res.ok) {
        const errorData = await res.json();
        alert(errorData.description || 'Could not add item to cart');
        return;
      }

      await this.refresh();
      this.open();
    } catch (err) {
      console.error('Error adding to cart:', err);
    }
  },

  async addToCartForm(form) {
    const formData = new FormData(form);
    try {
      const res = await fetch('/cart/add.js', {
        method: 'POST',
        headers: { 'Accept': 'application/json' },
        body: formData
      });

      if (!res.ok) {
        const err = await res.json();
        alert(err.description || 'Could not add item to cart');
        return;
      }

      await this.refresh();
      this.open();
    } catch (err) {
      console.error('Error submitting cart form:', err);
    }
  },

  async updateItem(lineKey, quantity) {
    try {
      const res = await fetch('/cart/change.js', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json', 'Accept': 'application/json' },
        body: JSON.stringify({ id: lineKey, quantity: quantity })
      });
      await this.refresh();
    } catch (err) {
      console.error('Error changing cart item:', err);
    }
  },

  async refresh() {
    const cart = await this.getCart();
    if (!cart) return;

    // Update count badges
    if (this.cartCountBadge) {
      this.cartCountBadge.forEach(el => {
        el.textContent = cart.item_count;
      });
    }

    this.renderDrawerItems(cart);
  },

  formatMoney(cents) {
    const pkr = Math.round(cents / 100);
    return 'PKR ' + pkr.toLocaleString();
  },

  renderDrawerItems(cart) {
    const itemsContainer = document.querySelector('[data-cart-drawer-items]');
    const subtotalEl = document.querySelector('[data-cart-subtotal]');
    const totalEl = document.querySelector('[data-cart-total]');
    const emptyState = document.querySelector('[data-cart-empty]');
    const footer = document.querySelector('[data-cart-drawer-footer]');

    if (!itemsContainer) return;

    if (cart.items.length === 0) {
      if (emptyState) emptyState.style.display = 'flex';
      itemsContainer.innerHTML = '';
      if (footer) footer.style.display = 'none';
      return;
    }

    if (emptyState) emptyState.style.display = 'none';
    if (footer) footer.style.display = 'block';

    const shippingFee = 150; // Flat PKR 150
    const subtotalAmount = Math.round(cart.total_price / 100);
    const totalAmount = subtotalAmount + shippingFee;

    if (subtotalEl) subtotalEl.textContent = 'PKR ' + subtotalAmount.toLocaleString();
    if (totalEl) totalEl.textContent = 'PKR ' + totalAmount.toLocaleString();

    let html = '';
    cart.items.forEach((item, index) => {
      const lineKey = item.key;
      const properties = item.properties || {};
      let propHtml = '';
      for (const [key, val] of Object.entries(properties)) {
        if (key && !key.startsWith('_')) {
          propHtml += `<div style="font-family: var(--font-tech); font-size: 11px; font-weight: bold; text-transform: uppercase; margin-top: 2px;">${key}: ${val}</div>`;
        }
      }

      html += `
        <div style="display: flex; gap: 1rem; padding: 1rem 0; border-bottom: 1px solid var(--border-main);" data-line-key="${lineKey}">
          <div style="width: 5rem; height: 5rem; background: var(--bg-surface-elevated); border: 1px solid var(--border-main); display: flex; align-items: center; justify-content: center; padding: 0.5rem; flex-shrink: 0; border-radius: var(--radius-xs);">
            <img src="${item.featured_image ? item.featured_image.url : ''}" alt="${item.title}" style="max-height: 100%; max-width: 100%; object-fit: contain;">
          </div>
          <div style="flex: 1; display: flex; flex-direction: column; justify-content: space-between;">
            <div>
              <div style="display: flex; justify-content: space-between; align-items: flex-start; gap: 0.5rem;">
                <h4 style="font-family: var(--font-display); font-size: 0.875rem; font-weight: 600; color: var(--text-primary); line-height: 1.25; margin: 0;">
                  <a href="${item.url}">${item.product_title}</a>
                </h4>
                <button onclick="DexyfiedCart.updateItem('${lineKey}', 0)" style="color: var(--text-dim); padding: 2px;" title="Remove">✕</button>
              </div>
              ${item.variant_title && item.variant_title !== 'Default Title' ? `
                <div style="font-family: var(--font-tech); font-size: 11px; font-weight: bold; text-transform: uppercase; margin-top: 2px; color: var(--text-primary);">
                  OPTION: ${item.variant_title}
                </div>
              ` : ''}
              ${propHtml}
            </div>

            <div style="display: flex; align-items: center; justify-content: space-between; margin-top: 0.75rem;">
              <div style="display: flex; align-items: center; border: 1px solid var(--border-main); background: var(--bg-surface-elevated); border-radius: var(--radius-xs);">
                <button onclick="DexyfiedCart.updateItem('${lineKey}', ${item.quantity - 1})" style="padding: 0.25rem 0.5rem; color: var(--text-muted); font-family: var(--font-tech); font-size: 0.75rem;">-</button>
                <span style="font-family: var(--font-tech); font-size: 0.75rem; font-weight: bold; padding: 0 0.5rem;">${item.quantity}</span>
                <button onclick="DexyfiedCart.updateItem('${lineKey}', ${item.quantity + 1})" style="padding: 0.25rem 0.5rem; color: var(--text-muted); font-family: var(--font-tech); font-size: 0.75rem;">+</button>
              </div>
              <div style="font-family: var(--font-tech); font-size: 0.875rem; font-weight: bold; color: var(--text-primary);">
                ${this.formatMoney(item.final_line_price)}
              </div>
            </div>
          </div>
        </div>
      `;
    });

    itemsContainer.innerHTML = html;
  }
};

document.addEventListener('DOMContentLoaded', () => {
  DexyfiedCart.init();
});
