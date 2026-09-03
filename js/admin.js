/**
 * ThreadVibe - Admin Panel Core Logic
 */

let state = {
  products: [],
  orders: [],
  settings: {},
  currentTab: 'overview',
  editingProductId: null,
  uploadedImages: {
    front: null,
    back: null
  }
};

document.addEventListener('DOMContentLoaded', () => {
  initTabs();
  initUploaders();
  initForms();
  loadAllData();
});

// Load all data from API
async function loadAllData() {
  try {
    const [prodRes, orderRes, setRes] = await Promise.all([
      fetch('/api/products').then(r => r.json()).catch(() => []),
      fetch('/api/orders').then(r => r.json()).catch(() => []),
      fetch('/api/settings').then(r => r.json()).catch(() => ({}))
    ]);

    state.products = prodRes;
    state.orders = orderRes;
    state.settings = setRes;

    renderOverviewStats();
    renderProductsTable();
    renderOrdersTable();
    renderSettingsForm();
    renderRecentOrdersTable();
  } catch (err) {
    console.error('Failed to load data:', err);
    showAdminToast('Failed to load data from server. Check server connection.', true);
  }
}

/* ==========================================================================
   Tab Navigation
   ========================================================================== */
function initTabs() {
  const navItems = document.querySelectorAll('.nav-item[data-tab]');
  navItems.forEach(btn => {
    btn.addEventListener('click', () => {
      const tabName = btn.getAttribute('data-tab');
      switchTab(tabName);
    });
  });
}

function switchTab(tabName) {
  state.currentTab = tabName;
  document.querySelectorAll('.nav-item[data-tab]').forEach(btn => {
    btn.classList.toggle('active', btn.getAttribute('data-tab') === tabName);
  });

  document.querySelectorAll('.tab-content').forEach(panel => {
    panel.classList.toggle('active', panel.id === `tab-${tabName}`);
  });

  const titles = {
    overview: { title: 'Dashboard Overview', desc: 'Real-time sales, order volume, and inventory status.' },
    products: { title: 'Product Inventory', desc: 'Manage your apparel catalog, stock, and high-res photos.' },
    orders: { title: 'Customer Orders', desc: 'Track incoming orders, update status, and chat directly on WhatsApp.' },
    settings: { title: 'Store Settings', desc: 'Update seller WhatsApp number, shipping fees, and store announcements.' }
  };

  const headerInfo = titles[tabName] || titles.overview;
  const pageTitle = document.getElementById('page-title');
  const pageDesc = document.getElementById('page-desc');
  if (pageTitle) pageTitle.textContent = headerInfo.title;
  if (pageDesc) pageDesc.textContent = headerInfo.desc;
}

/* ==========================================================================
   Dashboard Overview & Stats
   ========================================================================== */
function renderOverviewStats() {
  const totalRevenue = state.orders.reduce((sum, o) => sum + (Number(o.total) || 0), 0);
  const totalOrders = state.orders.length;
  const totalProducts = state.products.length;
  const lowStockCount = state.products.filter(p => Number(p.stockLeft) <= 3).length;

  const revEl = document.getElementById('stat-total-revenue');
  const ordEl = document.getElementById('stat-total-orders');
  const prodEl = document.getElementById('stat-total-products');
  const stockEl = document.getElementById('stat-low-stock');

  if (revEl) revEl.textContent = `Rs. ${totalRevenue.toLocaleString()}`;
  if (ordEl) ordEl.textContent = totalOrders;
  if (prodEl) prodEl.textContent = totalProducts;
  if (stockEl) stockEl.textContent = lowStockCount;
}

function renderRecentOrdersTable() {
  const container = document.getElementById('recent-orders-tbody');
  if (!container) return;

  const recent = state.orders.slice(0, 5);
  if (recent.length === 0) {
    container.innerHTML = `<tr><td colspan="6" style="text-align: center; color: var(--color-text-muted); padding: 2rem;">No orders placed yet.</td></tr>`;
    return;
  }

  container.innerHTML = recent.map(o => `
    <tr>
      <td><strong>#${o.orderId}</strong></td>
      <td>${o.customer?.name || 'Customer'}</td>
      <td>${formatDate(o.createdAt)}</td>
      <td>Rs. ${(Number(o.total) || 0).toLocaleString()}</td>
      <td><span class="badge-status ${o.status || 'pending'}">${o.status || 'pending'}</span></td>
      <td>
        <button class="btn btn-secondary btn-sm" onclick="switchTab('orders')">View Details</button>
      </td>
    </tr>
  `).join('');
}

/* ==========================================================================
   Product Management (CRUD & File Uploads)
   ========================================================================== */
function renderProductsTable(filterText = '', filterCat = 'all') {
  const tbody = document.getElementById('products-tbody');
  if (!tbody) return;

  let filtered = state.products.filter(p => {
    const matchesSearch = !filterText || p.name.toLowerCase().includes(filterText.toLowerCase());
    const matchesCategory = (filterCat === 'all') || (p.category === filterCat);
    return matchesSearch && matchesCategory;
  });

  if (filtered.length === 0) {
    tbody.innerHTML = `<tr><td colspan="7" style="text-align: center; color: var(--color-text-muted); padding: 3rem;">No products match your search.</td></tr>`;
    return;
  }

  tbody.innerHTML = filtered.map(p => `
    <tr>
      <td>
        <div class="product-cell">
          <div class="product-thumb-pair">
            <img src="${p.imageFront}" alt="Front" class="product-thumb" title="Front Angle">
            <img src="${p.imageBack}" alt="Back" class="product-thumb" title="Back Angle">
          </div>
          <div>
            <div class="product-name-bold">${p.name}</div>
            <span class="product-cat-tag">${p.categoryName || p.category}</span>
          </div>
        </div>
      </td>
      <td>
        <strong>Rs. ${Number(p.currentPrice).toLocaleString()}</strong>
        ${p.originalPrice > p.currentPrice ? `<div style="font-size: 0.75rem; color: #94a3b8; text-decoration: line-through;">Rs. ${Number(p.originalPrice).toLocaleString()}</div>` : ''}
      </td>
      <td>
        <strong>${p.stockLeft}</strong> units
      </td>
      <td>
        <span class="badge-status ${p.stockLeft <= 3 ? 'urgent' : 'in-stock'}">
          ${p.stockLeft <= 3 ? 'Low Stock' : 'In Stock'}
        </span>
      </td>
      <td>
        <span style="font-size: 0.8rem; font-weight: 600; color: #475569;">
          ${(p.sizes || []).join(', ')}
        </span>
      </td>
      <td>
        <span class="badge-status" style="background: #f1f5f9; color: #334155;">${p.badge || 'None'}</span>
      </td>
      <td>
        <div style="display: flex; gap: 0.4rem;">
          <button class="btn btn-secondary btn-sm" onclick="openEditProductModal('${p.id}')" title="Edit Product">
            <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><path d="M12 20h9"/><path d="M16.5 3.5a2.12 2.12 0 0 1 3 3L7 19l-4 1 1-4Z"/></svg>
            Edit
          </button>
          <button class="btn btn-danger btn-sm" onclick="deleteProduct('${p.id}', '${escapeQuotes(p.name)}')" title="Delete Product">
            <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><path d="M3 6h18"/><path d="M19 6v14c0 1-1 2-2 2H7c-1 0-2-1-2-2V6"/><path d="M8 6V4c0-1 1-2 2-2h4c1 0 2 1 2 2v2"/></svg>
          </button>
        </div>
      </td>
    </tr>
  `).join('');
}

// Modal & File Uploads Handlers
function initUploaders() {
  const frontBox = document.getElementById('box-upload-front');
  const frontInput = document.getElementById('input-file-front');
  const frontPreview = document.getElementById('preview-front');
  const frontPrompt = document.getElementById('prompt-front');

  const backBox = document.getElementById('box-upload-back');
  const backInput = document.getElementById('input-file-back');
  const backPreview = document.getElementById('preview-back');
  const backPrompt = document.getElementById('prompt-back');

  if (frontBox && frontInput) {
    frontBox.addEventListener('click', () => frontInput.click());
    frontInput.addEventListener('change', async (e) => {
      const file = e.target.files[0];
      if (file) {
        await uploadAndSetImage(file, 'front', frontPreview, frontPrompt);
      }
    });
  }

  if (backBox && backInput) {
    backBox.addEventListener('click', () => backInput.click());
    backInput.addEventListener('change', async (e) => {
      const file = e.target.files[0];
      if (file) {
        await uploadAndSetImage(file, 'back', backPreview, backPrompt);
      }
    });
  }
}

async function uploadAndSetImage(file, angle, previewEl, promptEl) {
  const reader = new FileReader();
  reader.onload = async (re) => {
    const base64Data = re.target.result;
    previewEl.src = base64Data;
    previewEl.style.display = 'block';
    promptEl.style.display = 'none';

    try {
      showAdminToast('Uploading photo to server...', false);
      const res = await fetch('/api/upload', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ filename: file.name, data: base64Data })
      }).then(r => r.json());

      if (res.success && res.url) {
        state.uploadedImages[angle] = res.url;
        showAdminToast(`${angle === 'front' ? 'Front' : 'Back'} angle photo uploaded successfully!`);
      } else {
        // Fallback to base64 if upload endpoint fails
        state.uploadedImages[angle] = base64Data;
      }
    } catch (e) {
      console.warn('Direct upload endpoint error, using base64 payload:', e);
      state.uploadedImages[angle] = base64Data;
    }
  };
  reader.readAsDataURL(file);
}

function openAddProductModal() {
  state.editingProductId = null;
  state.uploadedImages = { front: null, back: null };

  const form = document.getElementById('product-form');
  if (form) form.reset();

  document.getElementById('modal-product-title').textContent = 'Add New Product Fit';
  resetUploadBox('front');
  resetUploadBox('back');

  // Set default checkboxes (S, M, L, XL checked)
  document.querySelectorAll('.size-check-input').forEach(chk => {
    chk.checked = ['S', 'M', 'L', 'XL'].includes(chk.value);
  });

  const modal = document.getElementById('product-modal-backdrop');
  if (modal) modal.classList.add('active');
}

function openEditProductModal(productId) {
  const p = state.products.find(item => item.id === productId);
  if (!p) return;

  state.editingProductId = productId;
  state.uploadedImages = { front: p.imageFront, back: p.imageBack };

  document.getElementById('modal-product-title').textContent = 'Edit Product Fit';

  document.getElementById('prod-name').value = p.name;
  document.getElementById('prod-category').value = p.category;
  document.getElementById('prod-price').value = p.currentPrice;
  document.getElementById('prod-original-price').value = p.originalPrice || p.currentPrice;
  document.getElementById('prod-stock').value = p.stockLeft;
  document.getElementById('prod-badge').value = p.badge || '';
  document.getElementById('prod-desc').value = p.description || '';

  // Setup Image Previews
  setUploadPreview('front', p.imageFront);
  setUploadPreview('back', p.imageBack);

  // Setup Sizes checkboxes
  document.querySelectorAll('.size-check-input').forEach(chk => {
    chk.checked = (p.sizes || []).includes(chk.value);
  });

  const modal = document.getElementById('product-modal-backdrop');
  if (modal) modal.classList.add('active');
}

function setUploadPreview(angle, url) {
  const preview = document.getElementById(`preview-${angle}`);
  const prompt = document.getElementById(`prompt-${angle}`);
  if (preview && prompt) {
    if (url) {
      preview.src = url;
      preview.style.display = 'block';
      prompt.style.display = 'none';
    } else {
      preview.style.display = 'none';
      prompt.style.display = 'flex';
    }
  }
}

function resetUploadBox(angle) {
  setUploadPreview(angle, null);
  const input = document.getElementById(`input-file-${angle}`);
  if (input) input.value = '';
}

function closeProductModal() {
  const modal = document.getElementById('product-modal-backdrop');
  if (modal) modal.classList.remove('active');
}

async function deleteProduct(productId, productName) {
  if (!confirm(`Are you sure you want to delete "${productName}" from your store?`)) return;

  try {
    const res = await fetch(`/api/products/${productId}`, { method: 'DELETE' }).then(r => r.json());
    if (res.success) {
      state.products = state.products.filter(p => p.id !== productId);
      renderProductsTable();
      renderOverviewStats();
      showAdminToast(`Deleted "${productName}" successfully`);
    } else {
      showAdminToast('Failed to delete product', true);
    }
  } catch (err) {
    console.error(err);
    showAdminToast('Error deleting product', true);
  }
}

/* ==========================================================================
   Forms & Submissions
   ========================================================================== */
function initForms() {
  // Product Search and Filter
  const searchInput = document.getElementById('product-search');
  const catFilter = document.getElementById('product-cat-filter');

  if (searchInput) {
    searchInput.addEventListener('input', (e) => {
      renderProductsTable(e.target.value.trim(), catFilter.value);
    });
  }

  if (catFilter) {
    catFilter.addEventListener('change', (e) => {
      renderProductsTable(searchInput.value.trim(), e.target.value);
    });
  }

  // Product Form Submit
  const productForm = document.getElementById('product-form');
  if (productForm) {
    productForm.addEventListener('submit', handleProductSubmit);
  }

  // Settings Form Submit
  const settingsForm = document.getElementById('settings-form');
  if (settingsForm) {
    settingsForm.addEventListener('submit', handleSettingsSubmit);
  }
}

async function handleProductSubmit(e) {
  e.preventDefault();

  const name = document.getElementById('prod-name').value.trim();
  const category = document.getElementById('prod-category').value;
  const currentPrice = Number(document.getElementById('prod-price').value);
  const originalPrice = Number(document.getElementById('prod-original-price').value) || currentPrice;
  const stockLeft = Number(document.getElementById('prod-stock').value);
  const badge = document.getElementById('prod-badge').value.trim() || 'New Drop 🔥';
  const description = document.getElementById('prod-desc').value.trim();

  // Get selected sizes
  const sizes = [];
  document.querySelectorAll('.size-check-input:checked').forEach(chk => {
    sizes.push(chk.value);
  });

  const categoryNames = {
    tees: 'Oversized Tees & Hoodies',
    streetwear: 'Casual & Streetwear',
    formal: 'Formal & Office Wear',
    sale: 'Clearance / Offers'
  };

  const productData = {
    name,
    category,
    categoryName: categoryNames[category] || 'Oversized Tees & Hoodies',
    currentPrice,
    originalPrice,
    stockLeft,
    badge,
    badgeClass: badge.includes('🔥') || badge.includes('Hot') ? 'badge-hot' : 'badge-bestseller',
    sizes: sizes.length > 0 ? sizes : ['S', 'M', 'L', 'XL'],
    description: description || 'Premium combed cotton fabric designed for everyday streetwear comfort.',
    imageFront: state.uploadedImages.front || 'https://images.unsplash.com/photo-1521572267360-ee0c2909d518?auto=format&fit=crop&w=700&q=80',
    imageBack: state.uploadedImages.back || state.uploadedImages.front || 'https://images.unsplash.com/photo-1503342217505-b0a15ec3261c?auto=format&fit=crop&w=700&q=80'
  };

  try {
    if (state.editingProductId) {
      // Update
      const res = await fetch(`/api/products/${state.editingProductId}`, {
        method: 'PUT',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(productData)
      }).then(r => r.json());

      if (res.success) {
        const idx = state.products.findIndex(p => p.id === state.editingProductId);
        if (idx > -1) state.products[idx] = res.product;
        showAdminToast('Product updated successfully!');
      }
    } else {
      // Create new
      const res = await fetch('/api/products', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(productData)
      }).then(r => r.json());

      if (res.success) {
        state.products.unshift(res.product);
        showAdminToast('New product added to store!');
      }
    }

    renderProductsTable();
    renderOverviewStats();
    closeProductModal();
  } catch (err) {
    console.error(err);
    showAdminToast('Failed to save product. Check server.', true);
  }
}

/* ==========================================================================
   Order Management & WhatsApp Connect
   ========================================================================== */
function renderOrdersTable() {
  const tbody = document.getElementById('orders-tbody');
  if (!tbody) return;

  if (state.orders.length === 0) {
    tbody.innerHTML = `<tr><td colspan="7" style="text-align: center; color: var(--color-text-muted); padding: 3rem;">No customer orders placed yet.</td></tr>`;
    return;
  }

  tbody.innerHTML = state.orders.map(o => {
    const rawPhone = (o.customer?.phone || '').replace(/[^0-9]/g, '');
    let waPhone = rawPhone;
    if (waPhone.startsWith('0')) waPhone = '94' + waPhone.substring(1);

    const waMessage = encodeURIComponent(`Hello ${o.customer?.name || 'Customer'}! 👋 This is ThreadVibe regarding your Order #${o.orderId}. Your order is currently marked as: ${o.status?.toUpperCase()}.`);
    const waLink = `https://wa.me/${waPhone}?text=${waMessage}`;

    const itemsSummary = (o.items || []).map(i => `${i.name} (${i.size}) × ${i.qty}`).join(', ');

    return `
      <tr>
        <td><strong>#${o.orderId}</strong></td>
        <td>
          <strong>${o.customer?.name || 'Anonymous'}</strong>
          <div style="font-size: 0.78rem; color: #64748b;">${o.customer?.phone || ''}</div>
          <div style="font-size: 0.78rem; color: #94a3b8;">${o.customer?.city || ''} (${o.customer?.district || ''})</div>
        </td>
        <td style="max-width: 220px;">
          <div style="font-size: 0.82rem; line-height: 1.35; overflow: hidden; text-overflow: ellipsis; white-space: nowrap;" title="${itemsSummary}">
            ${itemsSummary}
          </div>
        </td>
        <td>
          <strong>Rs. ${(Number(o.total) || 0).toLocaleString()}</strong>
          <div style="font-size: 0.72rem; color: #64748b; text-transform: uppercase;">${o.paymentMethod}</div>
        </td>
        <td>
          <select class="select-filter" style="padding: 0.3rem 0.6rem; font-size: 0.82rem;" onchange="updateOrderStatus('${o.orderId}', this.value)">
            <option value="pending" ${o.status === 'pending' ? 'selected' : ''}>Pending</option>
            <option value="confirmed" ${o.status === 'confirmed' ? 'selected' : ''}>Confirmed</option>
            <option value="dispatched" ${o.status === 'dispatched' ? 'selected' : ''}>Dispatched</option>
            <option value="delivered" ${o.status === 'delivered' ? 'selected' : ''}>Delivered</option>
            <option value="cancelled" ${o.status === 'cancelled' ? 'selected' : ''}>Cancelled</option>
          </select>
        </td>
        <td>
          <a href="${waLink}" target="_blank" class="btn-whatsapp-table" title="Chat with customer on WhatsApp">
            <svg width="14" height="14" viewBox="0 0 24 24" fill="currentColor"><path d="M17.472 14.382c-.297-.149-1.758-.867-2.03-.967-.273-.099-.471-.148-.67.15-.197.297-.767.966-.94 1.164-.173.199-.347.223-.644.075-.297-.15-1.255-.463-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.298-.347.446-.52.149-.174.198-.298.298-.497.099-.198.05-.371-.025-.52-.075-.149-.669-1.612-.916-2.207-.242-.579-.487-.5-.669-.51-.173-.008-.371-.01-.57-.01-.198 0-.52.074-.792.372-.272.297-1.04 1.016-1.04 2.479 0 1.462 1.065 2.875 1.213 3.074.149.198 2.096 3.2 5.077 4.487.709.306 1.262.489 1.694.625.712.227 1.36.195 1.871.118.571-.085 1.758-.719 2.006-1.413.248-.694.248-1.289.173-1.413-.074-.124-.272-.198-.57-.347m-5.421 7.403h-.004a9.87 9.87 0 01-5.031-1.378l-.361-.214-3.741.982.998-3.648-.235-.374a9.86 9.86 0 01-1.51-5.26c.001-5.45 4.436-9.884 9.888-9.884 2.64 0 5.122 1.03 6.988 2.898a9.825 9.825 0 012.893 6.994c-.003 5.45-4.437 9.884-9.885 9.884m8.413-18.297A11.815 11.815 0 0012.05 0C5.495 0 .16 5.335.157 11.892c0 2.096.547 4.142 1.588 5.945L.057 24l6.305-1.654a11.882 11.882 0 005.683 1.448h.005c6.554 0 11.89-5.335 11.893-11.893a11.821 11.821 0 00-3.48-8.413Z"/></svg>
            WhatsApp Chat
          </a>
        </td>
        <td>
          <button class="btn btn-secondary btn-sm" onclick="viewOrderDetails('${o.orderId}')">View</button>
        </td>
      </tr>
    `;
  }).join('');
}

async function updateOrderStatus(orderId, newStatus) {
  try {
    const res = await fetch(`/api/orders/${orderId}`, {
      method: 'PUT',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ status: newStatus })
    }).then(r => r.json());

    if (res.success) {
      const idx = state.orders.findIndex(o => o.orderId === orderId);
      if (idx > -1) state.orders[idx].status = newStatus;
      showAdminToast(`Order #${orderId} status updated to ${newStatus}`);
      renderRecentOrdersTable();
    }
  } catch (e) {
    showAdminToast('Failed to update status', true);
  }
}

function viewOrderDetails(orderId) {
  const o = state.orders.find(item => item.orderId === orderId);
  if (!o) return;

  const content = document.getElementById('order-modal-content');
  if (!content) return;

  content.innerHTML = `
    <div class="order-detail-card">
      <h5>Customer Information</h5>
      <div><strong>Name:</strong> ${o.customer?.name || 'N/A'}</div>
      <div><strong>WhatsApp / Phone:</strong> ${o.customer?.phone || 'N/A'}</div>
      <div><strong>Address:</strong> ${o.customer?.address || 'N/A'}, ${o.customer?.city || ''} (${o.customer?.district || ''})</div>
      <div><strong>Delivery Note:</strong> ${o.customer?.notes || 'None'}</div>
    </div>

    <div class="order-detail-card">
      <h5>Order Items</h5>
      <ul style="padding-left: 1.2rem;">
        ${(o.items || []).map(i => `
          <li><strong>${i.name}</strong> - Size: ${i.size} × ${i.qty} = Rs. ${(i.price * i.qty).toLocaleString()}</li>
        `).join('')}
      </ul>
      <div style="margin-top: 0.85rem; border-top: 1px solid var(--color-border); padding-top: 0.5rem;">
        <div>Subtotal: Rs. ${(Number(o.subtotal) || 0).toLocaleString()}</div>
        <div>Delivery: Rs. ${(Number(o.deliveryFee) || 0).toLocaleString()}</div>
        <div><strong>Total Payable: Rs. ${(Number(o.total) || 0).toLocaleString()}</strong></div>
        <div>Payment Method: <strong>${(o.paymentMethod || '').toUpperCase()}</strong></div>
      </div>
    </div>

    ${o.slipUrl ? `
      <div class="order-detail-card">
        <h5>Bank Transfer Slip</h5>
        <img src="${o.slipUrl}" alt="Bank Slip" style="max-width: 100%; max-height: 250px; border-radius: 6px; margin-top: 0.5rem; object-fit: contain;">
      </div>
    ` : ''}
  `;

  const modal = document.getElementById('order-modal-backdrop');
  if (modal) modal.classList.add('active');
}

function closeOrderModal() {
  const modal = document.getElementById('order-modal-backdrop');
  if (modal) modal.classList.remove('active');
}

/* ==========================================================================
   Store Settings
   ========================================================================== */
function renderSettingsForm() {
  const s = state.settings || {};
  if (document.getElementById('set-whatsapp')) document.getElementById('set-whatsapp').value = s.whatsappNumber || '94771234567';
  if (document.getElementById('set-colombo-fee')) document.getElementById('set-colombo-fee').value = s.shippingFeeColombo || 350;
  if (document.getElementById('set-outstation-fee')) document.getElementById('set-outstation-fee').value = s.shippingFeeOutstation || 450;
  if (document.getElementById('set-free-threshold')) document.getElementById('set-free-threshold').value = s.freeShippingThreshold || 5000;
  if (document.getElementById('set-announcement')) document.getElementById('set-announcement').value = s.announcementText || '';
}

async function handleSettingsSubmit(e) {
  e.preventDefault();

  const whatsappNumber = document.getElementById('set-whatsapp').value.trim();
  const shippingFeeColombo = Number(document.getElementById('set-colombo-fee').value);
  const shippingFeeOutstation = Number(document.getElementById('set-outstation-fee').value);
  const freeShippingThreshold = Number(document.getElementById('set-free-threshold').value);
  const announcementText = document.getElementById('set-announcement').value.trim();

  const newSettings = {
    whatsappNumber,
    shippingFeeColombo,
    shippingFeeOutstation,
    freeShippingThreshold,
    announcementText
  };

  try {
    const res = await fetch('/api/settings', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify(newSettings)
    }).then(r => r.json());

    if (res.success) {
      state.settings = res.settings;
      showAdminToast('Store settings saved successfully!');
    }
  } catch (err) {
    showAdminToast('Failed to save settings', true);
  }
}

/* ==========================================================================
   Toast Notification & Utilities
   ========================================================================== */
function showAdminToast(msg, isError = false) {
  const existing = document.querySelector('.admin-toast');
  if (existing) existing.remove();

  const toast = document.createElement('div');
  toast.className = 'admin-toast';
  if (isError) toast.style.borderLeftColor = 'var(--color-danger)';
  toast.textContent = msg;

  document.body.appendChild(toast);
  setTimeout(() => {
    toast.style.opacity = '0';
    toast.style.transition = 'opacity 0.3s ease';
    setTimeout(() => toast.remove(), 300);
  }, 3000);
}

function formatDate(dateStr) {
  if (!dateStr) return 'Just now';
  const d = new Date(dateStr);
  return d.toLocaleDateString('en-US', { month: 'short', day: 'numeric', hour: '2-digit', minute: '2-digit' });
}

function escapeQuotes(str) {
  return (str || '').replace(/'/g, "\\'").replace(/"/g, '&quot;');
}
