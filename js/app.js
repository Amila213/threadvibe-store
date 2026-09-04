/**
 * ThreadVibe - Modern Fits for Everyday Living
 * Core Application Logic & State Management
 */

// Global Configuration
let CONFIG = {
  brandName: 'ThreadVibe',
  whatsappNumber: '94771234567', // Sri Lanka format (77 123 4567)
  currency: 'Rs.',
  freeShippingThreshold: 5000,
  shippingFeeColombo: 350,
  shippingFeeOutstation: 450,
};

// 8 Curated Premium Products Showcase (with front & back angles from curated fashion photography)
let PRODUCTS = [
  {
    id: 'tv-01',
    name: 'Heavyweight Oversized Boxy Tee - Charcoal Acid',
    category: 'tees',
    categoryName: 'Oversized Tees & Hoodies',
    currentPrice: 2850,
    originalPrice: 3800,
    discountPercent: 25,
    stockLeft: 2, // Urgency
    status: 'urgent',
    badge: 'Trending 🔥',
    badgeClass: 'badge-hot',
    sizes: ['S', 'M', 'L', 'XL'],
    selectedSize: 'M',
    description: '260 GSM 100% heavyweight combed cotton. Drop-shoulder relaxed silhouette with a subtle vintage mineral acid wash. Pre-shrunk for zero shrinkage.',
    imageFront: 'https://images.unsplash.com/photo-1583743814966-8936f5b7be1a?auto=format&fit=crop&w=700&q=80',
    imageBack: 'https://images.unsplash.com/photo-1521572267360-ee0c2909d518?auto=format&fit=crop&w=700&q=80'
  },
  {
    id: 'tv-02',
    name: 'Vintage Wash French Terry Hoodie - Olive Sage',
    category: 'tees',
    categoryName: 'Oversized Tees & Hoodies',
    currentPrice: 4650,
    originalPrice: 5900,
    discountPercent: 21,
    stockLeft: 4,
    status: 'urgent',
    badge: 'Bestseller',
    badgeClass: 'badge-bestseller',
    sizes: ['M', 'L', 'XL', 'XXL'],
    selectedSize: 'L',
    description: 'Premium 380 GSM loopback French terry with double-layered hood, concealed kangaroo pocket, and matte metal aglets. Super soft interior.',
    imageFront: 'https://images.unsplash.com/photo-1556905055-8f358a7a47b2?auto=format&fit=crop&w=700&q=80',
    imageBack: 'https://images.unsplash.com/photo-1578587018452-892bacefd3f2?auto=format&fit=crop&w=700&q=80'
  },
  {
    id: 'tv-03',
    name: 'Tactical Utility Relaxed Cargo Pants - Sand Dune',
    category: 'streetwear',
    categoryName: 'Casual & Streetwear',
    currentPrice: 4200,
    originalPrice: 5200,
    discountPercent: 19,
    stockLeft: 3,
    status: 'urgent',
    badge: 'Hot Drop',
    badgeClass: 'badge-hot',
    sizes: ['30', '32', '34', '36'],
    selectedSize: '32',
    description: 'Cotton ripstop construction with 6 functional deep ergonomic pockets, adjustable ankle bungee toggles, and elastic waistband with drawstrings.',
    imageFront: 'https://images.unsplash.com/photo-1624378439575-d8705ad7ae80?auto=format&fit=crop&w=700&q=80',
    imageBack: 'https://images.unsplash.com/photo-1506630448388-4e683c67ddb0?auto=format&fit=crop&w=700&q=80'
  },
  {
    id: 'tv-04',
    name: 'Minimalist Relaxed Linen Shirt - Warm Terracotta',
    category: 'formal',
    categoryName: 'Formal & Office Wear',
    currentPrice: 3450,
    originalPrice: 4500,
    discountPercent: 23,
    stockLeft: 12,
    status: 'in-stock',
    badge: 'Signature',
    badgeClass: 'badge-bestseller',
    sizes: ['S', 'M', 'L', 'XL'],
    selectedSize: 'M',
    description: 'Breathable pure flax linen blended with organic cotton. Spread collar, coconut shell buttons, lightweight drape engineered for tropical Sri Lankan heat.',
    imageFront: 'https://images.unsplash.com/photo-1602810318383-e386cc2a3ccf?auto=format&fit=crop&w=700&q=80',
    imageBack: 'https://images.unsplash.com/photo-1598033129183-c4f50c736f10?auto=format&fit=crop&w=700&q=80'
  },
  {
    id: 'tv-05',
    name: 'Signature Box-Cut Street Tee - Raw Off-White',
    category: 'tees',
    categoryName: 'Oversized Tees & Hoodies',
    currentPrice: 2650,
    originalPrice: 3200,
    discountPercent: 17,
    stockLeft: 5,
    status: 'urgent',
    badge: 'Staff Pick',
    badgeClass: 'badge-hot',
    sizes: ['S', 'M', 'L', 'XL'],
    selectedSize: 'L',
    description: 'Clean aesthetic aesthetic with minimal chest embroidery. High ribbed collar that holds shape wash after wash. Seamless tubular body construction.',
    imageFront: 'https://images.unsplash.com/photo-1521572267360-ee0c2909d518?auto=format&fit=crop&w=700&q=80',
    imageBack: 'https://images.unsplash.com/photo-1503342217505-b0a15ec3261c?auto=format&fit=crop&w=700&q=80'
  },
  {
    id: 'tv-06',
    name: 'Modern Tailored Cuban Collar Shirt - Navy Stripe',
    category: 'formal',
    categoryName: 'Formal & Office Wear',
    currentPrice: 3750,
    originalPrice: 4800,
    discountPercent: 22,
    stockLeft: 7,
    status: 'in-stock',
    badge: 'Top Rated',
    badgeClass: 'badge-bestseller',
    sizes: ['S', 'M', 'L', 'XL', 'XXL'],
    selectedSize: 'M',
    description: 'Crisp oxford weave cotton with subtle vertical pinstripes. Elegant retro Cuban camp collar, tailored relaxed fit for smart-casual office and date nights.',
    imageFront: 'https://images.unsplash.com/photo-1603252109303-2751441dd157?auto=format&fit=crop&w=700&q=80',
    imageBack: 'https://images.unsplash.com/photo-1596755094514-f87e34085b2c?auto=format&fit=crop&w=700&q=80'
  },
  {
    id: 'tv-07',
    name: 'Acid Wash Heavyweight Oversized Crewneck - Asphalt',
    category: 'streetwear',
    categoryName: 'Casual & Streetwear',
    currentPrice: 3950,
    originalPrice: 5200,
    discountPercent: 24,
    stockLeft: 2,
    status: 'urgent',
    badge: 'Only 2 Left!',
    badgeClass: 'badge-sale',
    sizes: ['M', 'L', 'XL'],
    selectedSize: 'L',
    description: 'Crafted with premium brushed fleece. Distressed ribbing at neck and cuffs, pigment-dyed for a unique authentic streetwear patina.',
    imageFront: 'https://images.unsplash.com/photo-1618354691373-d851c5c3a990?auto=format&fit=crop&w=700&q=80',
    imageBack: 'https://images.unsplash.com/photo-1576566588028-4147f3842f27?auto=format&fit=crop&w=700&q=80'
  },
  {
    id: 'tv-08',
    name: 'Casual Drawstring Chino Trousers - Charcoal',
    category: 'sale',
    categoryName: 'Clearance / Offers',
    currentPrice: 2950,
    originalPrice: 4400,
    discountPercent: 33,
    stockLeft: 3,
    status: 'urgent',
    badge: 'Save 33%',
    badgeClass: 'badge-sale',
    sizes: ['30', '32', '34', '36'],
    selectedSize: '32',
    description: 'Stretch cotton twill pants featuring an internal drawstring, tapered leg opening, and rear welt pockets. Maximum comfort without sacrificing polish.',
    imageFront: 'https://images.unsplash.com/photo-1473966968600-fa801b869a1a?auto=format&fit=crop&w=700&q=80',
    imageBack: 'https://images.unsplash.com/photo-1624378439575-d8705ad7ae80?auto=format&fit=crop&w=700&q=80'
  }
];

// Cart State Management
class CartState {
  constructor() {
    this.items = this.loadCart();
    this.subscribers = [];
  }

  loadCart() {
    try {
      const saved = localStorage.getItem('threadvibe_cart');
      return saved ? JSON.parse(saved) : [];
    } catch (e) {
      return [];
    }
  }

  saveCart() {
    try {
      localStorage.setItem('threadvibe_cart', JSON.stringify(this.items));
    } catch (e) {
      console.error(e);
    }
    this.notify();
  }

  subscribe(callback) {
    this.subscribers.push(callback);
  }

  notify() {
    this.subscribers.forEach(cb => cb(this));
  }

  addItem(product, size = null, qty = 1) {
    const chosenSize = size || product.selectedSize || product.sizes[0];
    const existingIndex = this.items.findIndex(
      item => item.id === product.id && item.size === chosenSize
    );

    if (existingIndex > -1) {
      this.items[existingIndex].qty += qty;
    } else {
      this.items.push({
        id: product.id,
        name: product.name,
        price: product.currentPrice,
        originalPrice: product.originalPrice,
        size: chosenSize,
        image: product.imageFront,
        qty: qty
      });
    }

    this.saveCart();
    showToast(`Added "${product.name}" (${chosenSize}) to cart!`, 'success');
  }

  updateQty(index, change) {
    if (this.items[index]) {
      this.items[index].qty += change;
      if (this.items[index].qty <= 0) {
        this.removeItem(index);
        return;
      }
      this.saveCart();
    }
  }

  removeItem(index) {
    if (this.items[index]) {
      const removedName = this.items[index].name;
      this.items.splice(index, 1);
      this.saveCart();
      showToast(`Removed from cart`, 'info');
    }
  }

  clear() {
    this.items = [];
    this.saveCart();
  }

  getTotalCount() {
    return this.items.reduce((sum, item) => sum + item.qty, 0);
  }

  getSubtotal() {
    return this.items.reduce((sum, item) => sum + (item.price * item.qty), 0);
  }
}

const cart = new CartState();

// Initialize Application UI
document.addEventListener('DOMContentLoaded', () => {
  initDarkMode(); // must be first to prevent FOUC
  renderProducts('all');
  initFilterTabs();
  initSearch();
  initMobileNav();
  initCartDrawer();
  initQuickViewModal();
  initCheckoutModal();
  initWhatsAppOrderButtons();
  initScrollHeader();
  cart.notify(); // initial render
  loadStoreData(); // sync with server API
});

/* ==========================================================================
   Mobile Navigation Drawer
   ========================================================================== */
function initMobileNav() {
  const toggleBtn = document.getElementById('mobile-menu-toggle-btn');
  const closeBtn = document.getElementById('mobile-nav-close-btn');
  const backdrop = document.getElementById('mobile-nav-backdrop');

  if (toggleBtn) toggleBtn.addEventListener('click', openMobileNav);
  if (closeBtn) closeBtn.addEventListener('click', closeMobileNav);
  if (backdrop) backdrop.addEventListener('click', closeMobileNav);

  // Close on Escape key
  document.addEventListener('keydown', (e) => {
    if (e.key === 'Escape') closeMobileNav();
  });
}

function openMobileNav() {
  const backdrop = document.getElementById('mobile-nav-backdrop');
  const drawer = document.getElementById('mobile-nav-drawer');
  if (backdrop && drawer) {
    backdrop.classList.add('active');
    drawer.classList.add('active');
    document.body.style.overflow = 'hidden';
  }
}

function closeMobileNav() {
  const backdrop = document.getElementById('mobile-nav-backdrop');
  const drawer = document.getElementById('mobile-nav-drawer');
  if (backdrop && drawer) {
    backdrop.classList.remove('active');
    drawer.classList.remove('active');
    document.body.style.overflow = '';
  }
}

async function loadStoreData() {
  try {
    const [settingsRes, productsRes] = await Promise.all([
      fetch('/api/settings').then(r => r.json()).catch(() => null),
      fetch('/api/products').then(r => r.json()).catch(() => null)
    ]);

    if (settingsRes && settingsRes.whatsappNumber) {
      CONFIG.whatsappNumber = settingsRes.whatsappNumber;
      if (settingsRes.shippingFeeColombo) CONFIG.shippingFeeColombo = Number(settingsRes.shippingFeeColombo);
      if (settingsRes.shippingFeeOutstation) CONFIG.shippingFeeOutstation = Number(settingsRes.shippingFeeOutstation);
      if (settingsRes.freeShippingThreshold) CONFIG.freeShippingThreshold = Number(settingsRes.freeShippingThreshold);
      if (settingsRes.announcementText) {
        const annMsg = document.querySelector('.announcement-content span');
        if (annMsg) annMsg.innerHTML = settingsRes.announcementText;
      }
    }

    if (Array.isArray(productsRes) && productsRes.length > 0) {
      PRODUCTS = productsRes;
      renderProducts('all');
    }
  } catch (e) {
    console.warn('API sync fallback to default static items:', e);
  }
}

/* ==========================================================================
   Header Scroll Effect
   ========================================================================== */
function initScrollHeader() {
  const header = document.querySelector('.header');
  window.addEventListener('scroll', () => {
    if (window.scrollY > 40) {
      header.classList.add('scrolled');
    } else {
      header.classList.remove('scrolled');
    }
  });
}

/* ==========================================================================
   Dark Mode Toggle — persists preference in localStorage
   ========================================================================== */
function initDarkMode() {
  const htmlEl = document.getElementById('html-root') || document.documentElement;
  const btn = document.getElementById('dark-mode-toggle');

  // Restore saved preference (or use system default)
  const savedTheme = localStorage.getItem('tv_theme');
  const prefersDark = window.matchMedia && window.matchMedia('(prefers-color-scheme: dark)').matches;
  const shouldBeDark = savedTheme === 'dark' || (!savedTheme && prefersDark);

  if (shouldBeDark) {
    htmlEl.classList.add('dark');
  } else {
    htmlEl.classList.remove('dark');
  }

  if (!btn) return;

  btn.addEventListener('click', () => {
    const isDark = htmlEl.classList.toggle('dark');
    localStorage.setItem('tv_theme', isDark ? 'dark' : 'light');
    // Provide brief visual feedback
    btn.style.transform = 'scale(0.88)';
    setTimeout(() => { btn.style.transform = ''; }, 180);
  });

  // Sync with OS-level theme changes
  if (window.matchMedia) {
    window.matchMedia('(prefers-color-scheme: dark)').addEventListener('change', (e) => {
      // Only auto-switch if user hasn't manually set a preference
      if (!localStorage.getItem('tv_theme')) {
        if (e.matches) htmlEl.classList.add('dark');
        else htmlEl.classList.remove('dark');
      }
    });
  }
}

/* ==========================================================================
   Products Showcase Rendering
   ========================================================================== */
function renderProducts(categoryFilter = 'all', searchQuery = '') {
  const grid = document.getElementById('products-grid');
  if (!grid) return;

  let filtered = PRODUCTS.filter(p => {
    const matchesCategory = (categoryFilter === 'all') || 
                            (categoryFilter === p.category) || 
                            (categoryFilter === 'sale' && p.discountPercent >= 20);
    const matchesSearch = !searchQuery || 
                          p.name.toLowerCase().includes(searchQuery.toLowerCase()) || 
                          p.categoryName.toLowerCase().includes(searchQuery.toLowerCase());
    return matchesCategory && matchesSearch;
  });

  if (filtered.length === 0) {
    grid.innerHTML = `
      <div style="grid-column: 1 / -1; text-align: center; padding: 3rem 1rem;">
        <p style="font-size: 1.1rem; color: var(--color-text-muted);">No products found matching your filter.</p>
        <button onclick="renderProducts('all')" class="btn btn-primary" style="margin-top: 1rem; padding: 0.6rem 1.4rem;">
          View All Products
        </button>
      </div>
    `;
    return;
  }

  grid.innerHTML = filtered.map(p => `
    <article class="product-card" data-id="${p.id}">
      <div class="product-image-box" onclick="openQuickView('${p.id}')">
        <!-- Dual Angle Images for Hover Flip -->
        <img src="${p.imageFront}" alt="${p.name} - Front Angle" class="product-img img-front" loading="lazy">
        <img src="${p.imageBack}" alt="${p.name} - Back Angle" class="product-img img-back" loading="lazy">
        
        <div class="product-badges">
          <span class="badge-tag ${p.badgeClass}">${p.badge}</span>
        </div>

        <button class="quick-view-btn-overlay" type="button">
          <svg width="15" height="15" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" style="vertical-align: middle; margin-right: 4px;"><path d="M2 12s3-7 10-7 10 7 10 7-3 7-10 7-10-7-10-7Z"/><circle cx="12" cy="12" r="3"/></svg>
          Quick View
        </button>
      </div>

      <div class="product-info">
        <div class="product-category-name">${p.categoryName}</div>
        <h3 class="product-title" onclick="openQuickView('${p.id}')">${p.name}</h3>

        <div class="product-pricing">
          <span class="price-current">Rs. ${p.currentPrice.toLocaleString()}</span>
          <span class="price-original">Rs. ${p.originalPrice.toLocaleString()}</span>
          <span class="discount-pill">-${p.discountPercent}%</span>
        </div>

        <div class="stock-status ${p.status === 'urgent' ? 'urgent' : 'in-stock'}">
          <span class="stock-dot"></span>
          <span>${p.stockLeft <= 5 ? `Only ${p.stockLeft} items left in stock!` : 'In Stock - Ready to Dispatch'}</span>
        </div>

        <!-- Size Selector Pills -->
        <div class="size-selector-wrap">
          <div class="size-label">
            <span>Select Size:</span>
            <strong id="selected-size-label-${p.id}">${p.selectedSize}</strong>
          </div>
          <div class="size-pills" data-product-id="${p.id}">
            ${p.sizes.map(size => `
              <button 
                type="button" 
                class="size-pill ${size === p.selectedSize ? 'selected' : ''}" 
                onclick="selectSize('${p.id}', '${size}')"
                aria-label="Size ${size}"
              >${size}</button>
            `).join('')}
          </div>
        </div>

        <!-- Action Buttons -->
        <div class="card-actions">
          <button type="button" class="btn-card-buy" onclick="addToCartClick('${p.id}')">
            <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2.2"><path d="M6 2 3 6v14a2 2 0 0 0 2 2h14a2 2 0 0 0 2-2V6l-3-4Z"/><path d="M3 6h18"/><path d="M16 10a4 4 0 0 1-8 0"/></svg>
            Add to Cart
          </button>
          
          <button type="button" class="btn-card-whatsapp" onclick="orderViaWhatsApp('${p.id}')" title="Order via WhatsApp">
            <svg width="18" height="18" viewBox="0 0 24 24" fill="currentColor"><path d="M17.472 14.382c-.297-.149-1.758-.867-2.03-.967-.273-.099-.471-.148-.67.15-.197.297-.767.966-.94 1.164-.173.199-.347.223-.644.075-.297-.15-1.255-.463-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.298-.347.446-.52.149-.174.198-.298.298-.497.099-.198.05-.371-.025-.52-.075-.149-.669-1.612-.916-2.207-.242-.579-.487-.5-.669-.51-.173-.008-.371-.01-.57-.01-.198 0-.52.074-.792.372-.272.297-1.04 1.016-1.04 2.479 0 1.462 1.065 2.875 1.213 3.074.149.198 2.096 3.2 5.077 4.487.709.306 1.262.489 1.694.625.712.227 1.36.195 1.871.118.571-.085 1.758-.719 2.006-1.413.248-.694.248-1.289.173-1.413-.074-.124-.272-.198-.57-.347m-5.421 7.403h-.004a9.87 9.87 0 01-5.031-1.378l-.361-.214-3.741.982.998-3.648-.235-.374a9.86 9.86 0 01-1.51-5.26c.001-5.45 4.436-9.884 9.888-9.884 2.64 0 5.122 1.03 6.988 2.898a9.825 9.825 0 012.893 6.994c-.003 5.45-4.437 9.884-9.885 9.884m8.413-18.297A11.815 11.815 0 0012.05 0C5.495 0 .16 5.335.157 11.892c0 2.096.547 4.142 1.588 5.945L.057 24l6.305-1.654a11.882 11.882 0 005.683 1.448h.005c6.554 0 11.89-5.335 11.893-11.893a11.821 11.821 0 00-3.48-8.413Z"/></svg>
            Order
          </button>
        </div>
      </div>
    </article>
  `).join('');
}

function selectSize(productId, size) {
  const product = PRODUCTS.find(p => p.id === productId);
  if (!product) return;
  product.selectedSize = size;

  const label = document.getElementById(`selected-size-label-${productId}`);
  if (label) label.textContent = size;

  const container = document.querySelector(`.size-pills[data-product-id="${productId}"]`);
  if (container) {
    const pills = container.querySelectorAll('.size-pill');
    pills.forEach(pill => {
      pill.classList.toggle('selected', pill.textContent.trim() === size);
    });
  }
}

function initFilterTabs() {
  const tabs = document.querySelectorAll('.filter-tab');
  tabs.forEach(tab => {
    tab.addEventListener('click', () => {
      tabs.forEach(t => t.classList.remove('active'));
      tab.classList.add('active');
      const category = tab.getAttribute('data-category');
      renderProducts(category);
    });
  });
}

function filterCategory(categoryName) {
  const tabs = document.querySelectorAll('.filter-tab');
  tabs.forEach(tab => {
    if (tab.getAttribute('data-category') === categoryName) {
      tab.classList.add('active');
    } else {
      tab.classList.remove('active');
    }
  });

  const target = document.getElementById('featured-products');
  if (target) {
    target.scrollIntoView({ behavior: 'smooth' });
  }
  renderProducts(categoryName);
}

function initSearch() {
  const searchInput = document.getElementById('search-input');
  const mobileSearchInput = document.getElementById('mobile-search-input');

  function handleSearch(query) {
    const activeTab = document.querySelector('.filter-tab.active');
    const category = activeTab ? activeTab.getAttribute('data-category') : 'all';
    renderProducts(category, query.trim());
    if (searchInput && searchInput.value !== query) searchInput.value = query;
    if (mobileSearchInput && mobileSearchInput.value !== query) mobileSearchInput.value = query;
  }

  if (searchInput) {
    searchInput.addEventListener('input', (e) => handleSearch(e.target.value));
  }

  if (mobileSearchInput) {
    mobileSearchInput.addEventListener('input', (e) => handleSearch(e.target.value));
  }
}

/* ==========================================================================
   WhatsApp Instant Ordering Automation (Crucial for FB/IG Sellers)
   ========================================================================== */
function orderViaWhatsApp(productId) {
  const product = PRODUCTS.find(p => p.id === productId);
  if (!product) return;

  const size = product.selectedSize || product.sizes[0];
  const itemUrl = window.location.href.split('#')[0];

  const message = 
`Hello ThreadVibe! 👋
I would like to order this item directly:

👕 *Product:* ${product.name}
📏 *Size:* ${size}
💰 *Price:* Rs. ${product.currentPrice.toLocaleString()} (Regular: Rs. ${product.originalPrice.toLocaleString()})
🆔 *SKU:* ${product.id}
🔗 *Link:* ${itemUrl}

Please let me know how to confirm my delivery details. Thank you!`;

  const encodedMsg = encodeURIComponent(message);
  const waUrl = `https://wa.me/${CONFIG.whatsappNumber}?text=${encodedMsg}`;

  window.open(waUrl, '_blank');
}

function initWhatsAppOrderButtons() {
  // Global event delegation or direct triggers
}

/* ==========================================================================
   Slide-Over Cart Drawer & Shipping Meter
   ========================================================================== */
function initCartDrawer() {
  const backdrop = document.getElementById('cart-backdrop');
  const drawer = document.getElementById('cart-drawer');
  const cartTriggers = document.querySelectorAll('.cart-trigger-btn');
  const closeBtn = document.getElementById('cart-close-btn');

  function openCart() {
    backdrop.classList.add('active');
    drawer.classList.add('active');
    document.body.style.overflow = 'hidden';
  }

  function closeCart() {
    backdrop.classList.remove('active');
    drawer.classList.remove('active');
    document.body.style.overflow = '';
  }

  cartTriggers.forEach(btn => btn.addEventListener('click', openCart));
  if (closeBtn) closeBtn.addEventListener('click', closeCart);
  if (backdrop) backdrop.addEventListener('click', closeCart);

  // Subscribe to Cart updates
  cart.subscribe(updateCartUI);
}

function updateCartUI(cartState) {
  // Update badge count
  const badgeCounts = document.querySelectorAll('.cart-count-badge');
  const totalItems = cartState.getTotalCount();
  badgeCounts.forEach(b => {
    b.textContent = totalItems;
    b.style.display = totalItems > 0 ? 'flex' : 'none';
  });

  // Update Free Shipping Progress Bar
  const subtotal = cartState.getSubtotal();
  const meterText = document.getElementById('shipping-meter-message');
  const meterFill = document.getElementById('shipping-progress-fill');

  if (meterText && meterFill) {
    if (subtotal >= CONFIG.freeShippingThreshold) {
      meterText.innerHTML = `🎉 Congratulations! You have unlocked <span>FREE Islandwide Delivery</span>!`;
      meterFill.style.width = '100%';
    } else {
      const remaining = CONFIG.freeShippingThreshold - subtotal;
      const pct = Math.min(100, Math.round((subtotal / CONFIG.freeShippingThreshold) * 100));
      meterText.innerHTML = `Add <span>Rs. ${remaining.toLocaleString()}</span> more to unlock <strong>FREE Islandwide Delivery</strong>!`;
      meterFill.style.width = `${pct}%`;
    }
  }

  // Update Cart Items List
  const container = document.getElementById('cart-items-container');
  const footer = document.getElementById('cart-footer');
  const subtotalEl = document.getElementById('cart-subtotal-val');

  if (!container) return;

  if (cartState.items.length === 0) {
    container.innerHTML = `
      <div class="cart-empty-state">
        <div class="cart-empty-icon">
          <svg width="34" height="34" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.8"><path d="M6 2 3 6v14a2 2 0 0 0 2 2h14a2 2 0 0 0 2-2V6l-3-4Z"/><path d="M3 6h18"/><path d="M16 10a4 4 0 0 1-8 0"/></svg>
        </div>
        <h4>Your Shopping Bag is Empty</h4>
        <p>Explore our trending streetwear and oversized fits to fill it up!</p>
        <button onclick="document.getElementById('cart-close-btn').click(); document.getElementById('featured-products').scrollIntoView({behavior:'smooth'});" class="btn btn-accent" style="padding: 0.75rem 1.4rem; font-size: 0.9rem;">
          Start Shopping
        </button>
      </div>
    `;
    if (footer) footer.style.display = 'none';
  } else {
    if (footer) footer.style.display = 'flex';
    if (subtotalEl) subtotalEl.textContent = `Rs. ${subtotal.toLocaleString()}`;

    container.innerHTML = cartState.items.map((item, index) => `
      <div class="cart-item">
        <img src="${item.image}" alt="${item.name}" class="cart-item-img">
        <div class="cart-item-details">
          <div class="cart-item-title-row">
            <span class="cart-item-title">${item.name}</span>
            <button type="button" class="cart-item-remove" onclick="cart.removeItem(${index})" title="Remove item">
              <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><path d="M18 6 6 18"/><path d="m6 6 12 12"/></svg>
            </button>
          </div>
          <div class="cart-item-meta">Size: <strong>${item.size}</strong></div>
          <div class="cart-item-price-row">
            <div class="qty-counter">
              <button type="button" class="qty-btn" onclick="cart.updateQty(${index}, -1)">-</button>
              <span class="qty-val">${item.qty}</span>
              <button type="button" class="qty-btn" onclick="cart.updateQty(${index}, 1)">+</button>
            </div>
            <div class="cart-item-price">Rs. ${(item.price * item.qty).toLocaleString()}</div>
          </div>
        </div>
      </div>
    `).join('');
  }
}

function addToCartClick(productId) {
  const product = PRODUCTS.find(p => p.id === productId);
  if (!product) return;
  cart.addItem(product, product.selectedSize, 1);
}

function orderCartViaWhatsApp() {
  if (cart.items.length === 0) {
    showToast('Your bag is empty!', 'warning');
    return;
  }

  let itemList = cart.items.map((it, idx) => 
    `${idx + 1}. *${it.name}* (Size: ${it.size}) × ${it.qty} = Rs. ${(it.price * it.qty).toLocaleString()}`
  ).join('\n');

  const subtotal = cart.getSubtotal();
  const delivery = subtotal >= CONFIG.freeShippingThreshold ? 'FREE' : `Rs. ${CONFIG.shippingFeeColombo} (Colombo) / Rs. ${CONFIG.shippingFeeOutstation} (Outstation)`;

  const message = 
`Hello ThreadVibe! 👋
I would like to place an order for my shopping cart:

🛍️ *Order Items:*
${itemList}

💵 *Subtotal:* Rs. ${subtotal.toLocaleString()}
🚚 *Delivery:* ${delivery}

Please confirm my order and guide me with the payment/delivery details. Thank you!`;

  const encodedMsg = encodeURIComponent(message);
  const waUrl = `https://wa.me/${CONFIG.whatsappNumber}?text=${encodedMsg}`;
  window.open(waUrl, '_blank');
}

/* ==========================================================================
   Quick View Modal
   ========================================================================== */
function initQuickViewModal() {
  const backdrop = document.getElementById('quickview-backdrop');
  const closeBtn = document.getElementById('quickview-close-btn');

  if (closeBtn) {
    closeBtn.addEventListener('click', () => {
      backdrop.classList.remove('active');
      document.body.style.overflow = '';
    });
  }

  if (backdrop) {
    backdrop.addEventListener('click', (e) => {
      if (e.target === backdrop) {
        backdrop.classList.remove('active');
        document.body.style.overflow = '';
      }
    });
  }
}

function openQuickView(productId) {
  const product = PRODUCTS.find(p => p.id === productId);
  if (!product) return;

  const backdrop = document.getElementById('quickview-backdrop');
  const modalContent = document.getElementById('quickview-content');

  modalContent.innerHTML = `
    <div class="quickview-grid">
      <div class="quickview-gallery">
        <img id="qv-main-image" src="${product.imageFront}" alt="${product.name}" class="quickview-main-img">
        <div class="quickview-thumbs">
          <img src="${product.imageFront}" class="quickview-thumb active" onclick="switchQvImage(this, '${product.imageFront}')" alt="Front">
          <img src="${product.imageBack}" class="quickview-thumb" onclick="switchQvImage(this, '${product.imageBack}')" alt="Back">
        </div>
      </div>

      <div class="quickview-info">
        <div class="product-category-name">${product.categoryName}</div>
        <h2 style="font-family: var(--font-heading); font-size: 1.55rem; font-weight: 800; margin-bottom: 0.6rem; color: var(--color-primary);">${product.name}</h2>
        
        <div class="product-pricing" style="margin-bottom: 1rem;">
          <span class="price-current" style="font-size: 1.4rem;">Rs. ${product.currentPrice.toLocaleString()}</span>
          <span class="price-original" style="font-size: 1.05rem;">Rs. ${product.originalPrice.toLocaleString()}</span>
          <span class="discount-pill">-${product.discountPercent}% OFF</span>
        </div>

        <div class="stock-status ${product.status === 'urgent' ? 'urgent' : 'in-stock'}">
          <span class="stock-dot"></span>
          <span>${product.stockLeft <= 5 ? `Urgent: Only ${product.stockLeft} left in stock!` : 'In Stock & Ready for Immediate Dispatch'}</span>
        </div>

        <p style="font-size: 0.9rem; color: #475569; line-height: 1.6; margin-bottom: 1.5rem;">
          ${product.description}
        </p>

        <!-- Size selection in modal -->
        <div style="margin-bottom: 1.5rem;">
          <div class="size-label" style="margin-bottom: 0.5rem;">
            <span>Select Your Size:</span>
            <strong id="qv-size-display">${product.selectedSize}</strong>
          </div>
          <div class="size-pills">
            ${product.sizes.map(size => `
              <button type="button" class="size-pill ${size === product.selectedSize ? 'selected' : ''}" onclick="selectQvSize('${product.id}', '${size}')">${size}</button>
            `).join('')}
          </div>
        </div>

        <!-- Material Details & Badges -->
        <div style="background: #f8fafc; padding: 0.85rem; border-radius: var(--radius-md); font-size: 0.8rem; margin-bottom: 1.5rem; display: flex; flex-direction: column; gap: 0.4rem; border: 1px solid var(--color-border);">
          <div>✨ <strong>Fabric:</strong> 100% Super-combed breathable cotton</div>
          <div>🚚 <strong>Delivery:</strong> 1-3 working days islandwide (Cash on Delivery)</div>
          <div>🔄 <strong>Exchanges:</strong> Hassle-free 7-day size exchange</div>
        </div>

        <!-- Action buttons in modal -->
        <div style="display: flex; gap: 0.75rem; margin-top: auto;">
          <button type="button" class="btn btn-accent" style="flex: 1; padding: 0.85rem;" onclick="addQvToCart('${product.id}')">
            <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2.2"><path d="M6 2 3 6v14a2 2 0 0 0 2 2h14a2 2 0 0 0 2-2V6l-3-4Z"/><path d="M3 6h18"/><path d="M16 10a4 4 0 0 1-8 0"/></svg>
            Add to Bag
          </button>
          
          <button type="button" class="btn btn-whatsapp" style="flex: 1; padding: 0.85rem;" onclick="orderViaWhatsApp('${product.id}')">
            <svg width="18" height="18" viewBox="0 0 24 24" fill="currentColor"><path d="M17.472 14.382c-.297-.149-1.758-.867-2.03-.967-.273-.099-.471-.148-.67.15-.197.297-.767.966-.94 1.164-.173.199-.347.223-.644.075-.297-.15-1.255-.463-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.298-.347.446-.52.149-.174.198-.298.298-.497.099-.198.05-.371-.025-.52-.075-.149-.669-1.612-.916-2.207-.242-.579-.487-.5-.669-.51-.173-.008-.371-.01-.57-.01-.198 0-.52.074-.792.372-.272.297-1.04 1.016-1.04 2.479 0 1.462 1.065 2.875 1.213 3.074.149.198 2.096 3.2 5.077 4.487.709.306 1.262.489 1.694.625.712.227 1.36.195 1.871.118.571-.085 1.758-.719 2.006-1.413.248-.694.248-1.289.173-1.413-.074-.124-.272-.198-.57-.347m-5.421 7.403h-.004a9.87 9.87 0 01-5.031-1.378l-.361-.214-3.741.982.998-3.648-.235-.374a9.86 9.86 0 01-1.51-5.26c.001-5.45 4.436-9.884 9.888-9.884 2.64 0 5.122 1.03 6.988 2.898a9.825 9.825 0 012.893 6.994c-.003 5.45-4.437 9.884-9.885 9.884m8.413-18.297A11.815 11.815 0 0012.05 0C5.495 0 .16 5.335.157 11.892c0 2.096.547 4.142 1.588 5.945L.057 24l6.305-1.654a11.882 11.882 0 005.683 1.448h.005c6.554 0 11.89-5.335 11.893-11.893a11.821 11.821 0 00-3.48-8.413Z"/></svg>
            Order via WhatsApp
          </button>
        </div>
      </div>
    </div>
  `;

  backdrop.classList.add('active');
  document.body.style.overflow = 'hidden';
}

function switchQvImage(el, src) {
  const mainImg = document.getElementById('qv-main-image');
  if (mainImg) mainImg.src = src;

  const thumbs = document.querySelectorAll('.quickview-thumb');
  thumbs.forEach(t => t.classList.remove('active'));
  el.classList.add('active');
}

function selectQvSize(productId, size) {
  selectSize(productId, size);
  const display = document.getElementById('qv-size-display');
  if (display) display.textContent = size;

  const modalPills = document.querySelectorAll('#quickview-content .size-pill');
  modalPills.forEach(pill => {
    pill.classList.toggle('selected', pill.textContent.trim() === size);
  });
}

function addQvToCart(productId) {
  const product = PRODUCTS.find(p => p.id === productId);
  if (!product) return;
  cart.addItem(product, product.selectedSize, 1);
  document.getElementById('quickview-backdrop').classList.remove('active');
  document.body.style.overflow = '';
}

/* ==========================================================================
   Streamlined 1-Page Checkout Modal & WhatsApp Order Bundle
   ========================================================================== */
function initCheckoutModal() {
  const backdrop = document.getElementById('checkout-backdrop');
  const closeBtn = document.getElementById('checkout-close-btn');
  const openCheckoutBtn = document.getElementById('btn-proceed-checkout');

  if (openCheckoutBtn) {
    openCheckoutBtn.addEventListener('click', () => {
      if (cart.items.length === 0) {
        showToast('Add items to your bag first!', 'warning');
        return;
      }
      // Close cart drawer and open checkout modal
      document.getElementById('cart-backdrop').classList.remove('active');
      document.getElementById('cart-drawer').classList.remove('active');
      renderCheckoutSummary();
      backdrop.classList.add('active');
      document.body.style.overflow = 'hidden';
    });
  }

  if (closeBtn) {
    closeBtn.addEventListener('click', () => {
      backdrop.classList.remove('active');
      document.body.style.overflow = '';
    });
  }

  // Payment radio selection change listener
  const paymentOptions = document.querySelectorAll('.payment-option');
  paymentOptions.forEach(opt => {
    opt.addEventListener('click', () => {
      paymentOptions.forEach(o => o.classList.remove('active'));
      opt.classList.add('active');
      const radio = opt.querySelector('input[type="radio"]');
      if (radio) radio.checked = true;

      const bankBox = document.getElementById('bank-transfer-details');
      if (radio && radio.value === 'bank_transfer') {
        if (bankBox) bankBox.classList.add('active');
      } else {
        if (bankBox) bankBox.classList.remove('active');
      }
    });
  });

  // District selector changes delivery fee
  const districtSelect = document.getElementById('checkout-district');
  if (districtSelect) {
    districtSelect.addEventListener('change', renderCheckoutSummary);
  }

  // Bank Slip Upload Preview
  const slipInput = document.getElementById('bank-slip-input');
  const dropzone = document.getElementById('file-dropzone');
  const previewBox = document.getElementById('slip-preview-box');
  const previewImg = document.getElementById('slip-preview-thumb');
  const previewName = document.getElementById('slip-preview-name');

  if (dropzone && slipInput) {
    dropzone.addEventListener('click', () => slipInput.click());
    slipInput.addEventListener('change', (e) => {
      const file = e.target.files[0];
      if (file) {
        previewName.textContent = file.name;
        const reader = new FileReader();
        reader.onload = (re) => {
          previewImg.src = re.target.result;
          previewBox.style.display = 'flex';
          showToast('Payment slip uploaded successfully!', 'success');
        };
        reader.readAsDataURL(file);
      }
    });
  }

  // Checkout Form Submission
  const checkoutForm = document.getElementById('checkout-form');
  if (checkoutForm) {
    checkoutForm.addEventListener('submit', handleCheckoutSubmit);
  }
}

function renderCheckoutSummary() {
  const container = document.getElementById('checkout-items-list');
  const subtotalEl = document.getElementById('co-subtotal');
  const deliveryEl = document.getElementById('co-delivery');
  const totalEl = document.getElementById('co-total');
  const districtSelect = document.getElementById('checkout-district');

  if (!container) return;

  const subtotal = cart.getSubtotal();
  const district = districtSelect ? districtSelect.value : 'colombo';
  
  let deliveryFee = 0;
  if (subtotal >= CONFIG.freeShippingThreshold) {
    deliveryFee = 0;
  } else {
    deliveryFee = (district === 'colombo' || district === 'gampaha') 
      ? CONFIG.shippingFeeColombo 
      : CONFIG.shippingFeeOutstation;
  }

  const finalTotal = subtotal + deliveryFee;

  container.innerHTML = cart.items.map(item => `
    <div class="checkout-item-compact">
      <img src="${item.image}" alt="${item.name}">
      <div>
        <div class="checkout-item-title">${item.name}</div>
        <div class="checkout-item-meta">Size: ${item.size} × Qty: ${item.qty}</div>
      </div>
      <div class="checkout-item-price">Rs. ${(item.price * item.qty).toLocaleString()}</div>
    </div>
  `).join('');

  if (subtotalEl) subtotalEl.textContent = `Rs. ${subtotal.toLocaleString()}`;
  if (deliveryEl) deliveryEl.textContent = deliveryFee === 0 ? 'FREE' : `Rs. ${deliveryFee.toLocaleString()}`;
  if (totalEl) totalEl.textContent = `Rs. ${finalTotal.toLocaleString()}`;
}

function handleCheckoutSubmit(e) {
  e.preventDefault();

  const name = document.getElementById('checkout-name').value.trim();
  const phone = document.getElementById('checkout-phone').value.trim();
  const address = document.getElementById('checkout-address').value.trim();
  const city = document.getElementById('checkout-city').value.trim();
  const district = document.getElementById('checkout-district').value;
  const notes = document.getElementById('checkout-notes').value.trim();
  const paymentMethod = document.querySelector('input[name="payment_method"]:checked').value;

  if (!name || !phone || !address || !city) {
    showToast('Please fill in all required delivery fields!', 'warning');
    return;
  }

  // Generate Unique Order ID
  const orderId = `TV-${Math.floor(10000 + Math.random() * 90000)}`;
  const subtotal = cart.getSubtotal();
  const deliveryFee = subtotal >= CONFIG.freeShippingThreshold 
    ? 0 
    : (district === 'colombo' || district === 'gampaha' ? CONFIG.shippingFeeColombo : CONFIG.shippingFeeOutstation);
  const total = subtotal + deliveryFee;

  // Format WhatsApp message for sellers
  const paymentText = paymentMethod === 'cod' 
    ? 'Cash on Delivery (COD)' 
    : paymentMethod === 'bank_transfer' 
    ? 'Bank Transfer (Slip Uploaded)' 
    : 'Card Payment Gateway';

  const orderItemsText = cart.items.map((it, idx) => 
    `  ${idx + 1}. ${it.name} [Size: ${it.size}] × ${it.qty} = Rs. ${(it.price * it.qty).toLocaleString()}`
  ).join('\n');

  const waOrderMessage = 
`🛍️ *NEW ORDER - ${orderId}*
━━━━━━━━━━━━━━━━━━━━━
👤 *Customer:* ${name}
📞 *Phone:* ${phone}
📍 *Address:* ${address}, ${city} (${district})
📝 *Notes:* ${notes || 'None'}
💳 *Payment:* ${paymentText}
━━━━━━━━━━━━━━━━━━━━━
📦 *Items:*
${orderItemsText}
━━━━━━━━━━━━━━━━━━━━━
💵 *Subtotal:* Rs. ${subtotal.toLocaleString()}
🚚 *Delivery:* ${deliveryFee === 0 ? 'FREE' : 'Rs. ' + deliveryFee.toLocaleString()}
⭐ *Total Amount:* Rs. ${total.toLocaleString()}
━━━━━━━━━━━━━━━━━━━━━
Please confirm my order dispatch. Thank you!`;

  // Save order to server API
  const orderPayload = {
    orderId,
    customer: { name, phone, address, city, district, notes },
    items: cart.items.map(it => ({ id: it.id, name: it.name, size: it.size, qty: it.qty, price: it.price })),
    subtotal,
    deliveryFee,
    total,
    paymentMethod,
    slipUrl: document.getElementById('slip-preview-thumb')?.src || ''
  };

  fetch('/api/orders', {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify(orderPayload)
  }).catch(err => console.warn('Could not post order to API:', err));

  // Close checkout modal and show success modal
  document.getElementById('checkout-backdrop').classList.remove('active');

  showOrderSuccess(orderId, name, total, waOrderMessage);
  cart.clear();
}

function showOrderSuccess(orderId, name, total, waMessage) {
  const backdrop = document.getElementById('success-backdrop');
  const card = document.getElementById('success-card-content');

  card.innerHTML = `
    <div class="success-icon-wrap">
      <svg width="40" height="40" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2.5"><polyline points="20 6 9 17 4 12"/></svg>
    </div>
    <h3>Order Placed Successfully!</h3>
    <p style="color: var(--color-text-muted); font-size: 0.95rem;">Thank you, <strong>${name}</strong>! Your order has been placed with ThreadVibe.</p>
    
    <div class="order-code-badge">Order ID: #${orderId}</div>

    <div style="background: #f8fafc; border: 1px solid var(--color-border); border-radius: var(--radius-md); padding: 1.1rem; margin-bottom: 1.75rem; text-align: left; font-size: 0.88rem;">
      <div style="display:flex; justify-content:space-between; margin-bottom: 0.4rem;">
        <span style="color: var(--color-text-muted);">Amount Payable:</span>
        <strong style="font-family: var(--font-heading); font-size: 1.05rem; color: var(--color-primary);">Rs. ${total.toLocaleString()}</strong>
      </div>
      <div style="display:flex; justify-content:space-between;">
        <span style="color: var(--color-text-muted);">Estimated Delivery:</span>
        <strong style="color: var(--color-success);">1 - 3 Working Days</strong>
      </div>
    </div>

    <!-- Direct WhatsApp Order Forwarding Button for FB/Sri Lankan Sellers -->
    <a href="https://wa.me/${CONFIG.whatsappNumber}?text=${encodeURIComponent(waMessage)}" target="_blank" class="btn btn-whatsapp" style="width: 100%; margin-bottom: 0.85rem; padding: 0.85rem;">
      <svg width="20" height="20" viewBox="0 0 24 24" fill="currentColor"><path d="M17.472 14.382c-.297-.149-1.758-.867-2.03-.967-.273-.099-.471-.148-.67.15-.197.297-.767.966-.94 1.164-.173.199-.347.223-.644.075-.297-.15-1.255-.463-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.298-.347.446-.52.149-.174.198-.298.298-.497.099-.198.05-.371-.025-.52-.075-.149-.669-1.612-.916-2.207-.242-.579-.487-.5-.669-.51-.173-.008-.371-.01-.57-.01-.198 0-.52.074-.792.372-.272.297-1.04 1.016-1.04 2.479 0 1.462 1.065 2.875 1.213 3.074.149.198 2.096 3.2 5.077 4.487.709.306 1.262.489 1.694.625.712.227 1.36.195 1.871.118.571-.085 1.758-.719 2.006-1.413.248-.694.248-1.289.173-1.413-.074-.124-.272-.198-.57-.347m-5.421 7.403h-.004a9.87 9.87 0 01-5.031-1.378l-.361-.214-3.741.982.998-3.648-.235-.374a9.86 9.86 0 01-1.51-5.26c.001-5.45 4.436-9.884 9.888-9.884 2.64 0 5.122 1.03 6.988 2.898a9.825 9.825 0 012.893 6.994c-.003 5.45-4.437 9.884-9.885 9.884m8.413-18.297A11.815 11.815 0 0012.05 0C5.495 0 .16 5.335.157 11.892c0 2.096.547 4.142 1.588 5.945L.057 24l6.305-1.654a11.882 11.882 0 005.683 1.448h.005c6.554 0 11.89-5.335 11.893-11.893a11.821 11.821 0 00-3.48-8.413Z"/></svg>
      Send Order Details to WhatsApp
    </a>

    <button type="button" onclick="document.getElementById('success-backdrop').classList.remove('active'); document.body.style.overflow='';" class="btn btn-primary" style="width: 100%; padding: 0.8rem;">
      Continue Shopping
    </button>
  `;

  backdrop.classList.add('active');
  document.body.style.overflow = 'hidden';
}

/* ==========================================================================
   Toast Notification Helper
   ========================================================================== */
function showToast(message, type = 'info') {
  const container = document.getElementById('toast-container');
  if (!container) return;

  const toast = document.createElement('div');
  toast.className = `toast ${type === 'success' ? 'toast-success' : ''}`;
  toast.innerHTML = `
    <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2.2">
      ${type === 'success' 
        ? '<polyline points="20 6 9 17 4 12"/>' 
        : '<circle cx="12" cy="12" r="10"/><line x1="12" y1="8" x2="12" y2="12"/><line x1="12" y1="16" x2="12.01" y2="16"/>'}
    </svg>
    <span>${message}</span>
  `;

  container.appendChild(toast);

  setTimeout(() => {
    toast.style.opacity = '0';
    toast.style.transform = 'translateY(10px)';
    toast.style.transition = 'all 0.3s ease';
    setTimeout(() => toast.remove(), 300);
  }, 3200);
}
