# DEXYFIED Official Shopify Theme (Online Store 2.0)

A native, high-performance Shopify theme recreating the exact technical editorial storefront of **DEXYFIED** (built with pure Liquid, modular CSS, Space Grotesk, IBM Plex Mono, and Plus Jakarta Sans).

---

## 1. Directory Structure

```text
shopify-theme/
├── assets/
│   ├── theme.css                  # Design system styles, CSS variables, dark/light theme
│   ├── theme.js                   # Theme toggle, mobile menu, search dialog, gallery
│   ├── cart.js                    # Native Ajax cart engine (/cart/add.js, /cart/change.js)
│   ├── dexyfied-logo-raw.jpg      # Official brand mark
│   └── *.png, *.svg               # Hardware studio photography & schematics
├── config/
│   ├── settings_schema.json       # Merchant customizer settings
│   └── settings_data.json         # Default brand data & settings
├── layout/
│   └── theme.liquid               # Core HTML5 skeleton, fonts, meta tags, and header/footer
├── locales/
│   └── en.default.json            # Storefront strings and translations
├── sections/
│   ├── announcement-bar.liquid    # Nationwide delivery & return policy micro-banner
│   ├── header.liquid              # Brand logo, nav menu, dark mode toggle, search, cart
│   ├── hero-laptop-stand.liquid   # Priority Laptop Stand campaign (live Silver/Black switcher)
│   ├── trust-bar.liquid           # 4 verification & delivery reassurance pillars
│   ├── engineered-essentials.liquid # Curated Lineup // 01 asymmetric layout
│   ├── product-spotlight.liquid   # Full-width I9 Ultra Max Smart Watch specs spotlight
│   ├── featured-collection.liquid # Complete catalog grid
│   ├── customer-reviews.liquid    # Verified feedback & transparency statement
│   ├── commercial-standards.liquid# Honest pricing, flat delivery, and 7-day return pillars
│   ├── main-product.liquid        # Product detail page (gallery, colors, ring sizes, specs, sticky buy bar)
│   ├── main-collection.liquid     # Collection catalog with filter tabs
│   ├── main-cart.liquid           # Standalone /cart page fallback
│   ├── main-page.liquid           # Editorial policy page template
│   └── footer.liquid              # Logistics status, legal links, contact, social channels
├── snippets/
│   ├── cart-drawer.liquid         # Native Ajax slide-over cart drawer
│   ├── product-card.liquid        # Reusable hardware product card
│   ├── tech-specs-table.liquid    # High-contrast specifications table
│   ├── search-modal.liquid        # Instant search overlay
│   └── meta-tags.liquid           # Social and search engine metadata
└── products-import.csv            # Ready-to-import CSV for all verified DEXYFIED products
```

---

## 2. How to Upload the Theme to Shopify

1. Open your terminal or file explorer and navigate to `shopify-theme/`.
2. Zip the theme directory (include `assets`, `config`, `layout`, `locales`, `sections`, `snippets`, and `templates` in the root of the `.zip` file).
3. In your Shopify Admin, navigate to **Online Store** → **Themes**.
4. In the **Theme library** section, click **Add theme** → **Upload zip file**.
5. Select the created zip archive and click **Upload file**.
6. The theme will appear as an unpublished theme. Click **Actions** → **Preview** to review your live storefront without affecting existing customers.

---

## 3. How to Import the Product Catalog

All 8 hardware products, finishes, variants, and ring sizes are pre-formatted in `shopify-theme/products-import.csv`:

1. In Shopify Admin, navigate to **Products**.
2. Click **Import** (top right corner).
3. Select `shopify-theme/products-import.csv`.
4. Check **Overwrite any current products that have the same handle** (optional).
5. Click **Upload and continue**, then **Import products**.

### Verified Catalog Items:
- **DX-01**: Adjustable Portable Laptop Desktop Stand (PKR 1,500 / Compare PKR 3,000) — Silver & Black finishes
- **DX-02**: Touch Screen AirPods Case (PKR 3,200 / Compare PKR 5,000) — Black & White finishes
- **DX-03**: Wireless Over-Ear Stereo Headphones (PKR 3,500 / Compare PKR 5,000)
- **DX-04**: Luminous Heartbeat Pattern Finger Ring (PKR 550 / Compare PKR 1,800) — Sizes 6, 7, 9, 10, 11, 12, 17, 20, 21
- **DX-05**: Fast Qi Magnetic Wireless Charger (PKR 2,200 / Compare PKR 3,500)
- **DX-06**: I9 Ultra Max Smart Watch (PKR 2,500 / Compare PKR 3,300)
- **DX-07**: T900 Ultra 2 Smart Watch — Series 9 (PKR 2,000 / Compare PKR 3,500) — Orange, Black, White
- **DX-08**: T800 Ultra — Watch 8 Ultra (PKR 2,000 / Compare PKR 3,000) — Orange, Black, Grey, Green

---

## 4. How to Configure Cash on Delivery (COD) in Shopify

To enable native Cash on Delivery orders through standard Shopify checkout:
1. In Shopify Admin, go to **Settings** (bottom left) → **Payments**.
2. Scroll down to **Manual payment methods**.
3. Click **Add manual payment method** → Select **Cash on Delivery (COD)**.
4. Set the **Additional details** to:
   > "Pay in cash when your parcel arrives at your doorstep via tracked courier across Pakistan. Our team confirms all details prior to dispatch."
5. Set the **Payment instructions** to:
   > "Please have the exact amount in PKR ready at the time of delivery. A verification message may be sent to your WhatsApp number before shipment."
6. Click **Activate Cash on Delivery**.

---

## 5. How to Set Flat PKR 150 Nationwide Shipping

1. Go to **Settings** → **Shipping and delivery**.
2. Under **General shipping rates**, click **Manage**.
3. Under the **Pakistan** shipping zone:
   - Click **Add rate**.
   - Rate name: `Nationwide Tracked Courier`
   - Price: `PKR 150`
4. Click **Save**.
