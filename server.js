require('dotenv').config();
const express = require('express');
const cors = require('cors');
const path = require('path');
const fs = require('fs');
const mongoose = require('mongoose');

// Import Mongoose Models
const Product = require('./models/Product');
const Order = require('./models/Order');
const Setting = require('./models/Setting');

const app = express();
const PORT = process.env.PORT || 3000;
const MONGODB_URI = process.env.MONGO_URI || process.env.MONGODB_URI || 'mongodb+srv://amilasaranga859_db_user:mGxXepFKpPAUlsXw@cluster0.4uluanl.mongodb.net/clothing_store?retryWrites=true&w=majority&appName=Cluster0';

const DATA_DIR = path.join(__dirname, 'data');
const UPLOADS_DIR = path.join(__dirname, 'uploads');

// Ensure uploads directory exists (safely handled for serverless/read-only environments like Vercel)
try {
  if (!fs.existsSync(UPLOADS_DIR)) {
    fs.mkdirSync(UPLOADS_DIR, { recursive: true });
  }
} catch (err) {
  // Read-only filesystem in serverless environments (e.g. Vercel/AWS Lambda /var/task)
  console.log('ℹ️ Running in read-only / serverless environment; local uploads directory creation skipped.');
}

// Middleware
app.use(cors());
app.use(express.json({ limit: '25mb' }));
app.use(express.urlencoded({ extended: true, limit: '25mb' }));

// =======================================================
// Serverless Optimized MongoDB Connection with Caching
// =======================================================
let cachedPromise = null;

async function connectDB() {
  if (mongoose.connection.readyState === 1) {
    return mongoose.connection;
  }

  if (!cachedPromise) {
    const opts = {
      bufferCommands: false,
      serverSelectionTimeoutMS: 10000,
    };

    cachedPromise = mongoose.connect(MONGODB_URI, opts).then(async (m) => {
      console.log('✅ MongoDB Atlas Connected Successfully');
      await autoSeedDatabase();
      return m;
    }).catch(err => {
      cachedPromise = null;
      console.error('❌ MongoDB Atlas Connection Error:', err.message);
      throw err;
    });
  }

  return cachedPromise;
}

// Ensure database is connected for all API requests
app.use(async (req, res, next) => {
  if (req.path.startsWith('/api/')) {
    try {
      await connectDB();
    } catch (err) {
      return res.status(500).json({ error: 'Database connection failed', details: err.message });
    }
  }
  next();
});

// Auto-seed function from existing JSON files on first empty start
async function autoSeedDatabase() {
  try {
    const productCount = await Product.countDocuments();
    if (productCount === 0) {
      const productsFile = path.join(DATA_DIR, 'products.json');
      if (fs.existsSync(productsFile)) {
        const rawProducts = JSON.parse(fs.readFileSync(productsFile, 'utf-8'));
        if (Array.isArray(rawProducts) && rawProducts.length > 0) {
          console.log(`🌱 Migrating ${rawProducts.length} products into MongoDB Atlas...`);
          await Product.insertMany(rawProducts);
        }
      }
    }

    const orderCount = await Order.countDocuments();
    if (orderCount === 0) {
      const ordersFile = path.join(DATA_DIR, 'orders.json');
      if (fs.existsSync(ordersFile)) {
        const rawOrders = JSON.parse(fs.readFileSync(ordersFile, 'utf-8'));
        if (Array.isArray(rawOrders) && rawOrders.length > 0) {
          console.log(`🌱 Migrating ${rawOrders.length} orders into MongoDB Atlas...`);
          await Order.insertMany(rawOrders);
        }
      }
    }

    const settingCount = await Setting.countDocuments();
    if (settingCount === 0) {
      const settingsFile = path.join(DATA_DIR, 'settings.json');
      if (fs.existsSync(settingsFile)) {
        const rawSettings = JSON.parse(fs.readFileSync(settingsFile, 'utf-8'));
        console.log('🌱 Migrating settings into MongoDB Atlas...');
        await Setting.create(rawSettings);
      } else {
        await Setting.getSettings();
      }
    }
  } catch (err) {
    console.warn('Auto-seed check note:', err.message);
  }
}

// ==========================================
// 1. PRODUCTS REST API
// ==========================================

// GET /api/products (fetch all / filtered)
app.get('/api/products', async (req, res) => {
  try {
    const { category, featured, search } = req.query;
    const query = {};

    if (category && category !== 'all') query.category = category;
    if (featured === 'true') query.featured = true;
    if (search) {
      query.$or = [
        { name: { $regex: search, $options: 'i' } },
        { description: { $regex: search, $options: 'i' } },
        { categoryName: { $regex: search, $options: 'i' } }
      ];
    }

    const products = await Product.find(query).sort({ createdAt: -1 });
    res.json(products);
  } catch (e) {
    res.status(500).json({ error: e.message });
  }
});

// POST /api/products (add new product)
app.post('/api/products', async (req, res) => {
  try {
    const body = req.body;
    const currentPrice = Number(body.currentPrice !== undefined ? body.currentPrice : (body.price || 0));
    const originalPrice = Number(body.originalPrice !== undefined ? body.originalPrice : (body.discountPrice || currentPrice));
    const stockLeft = Number(body.stockLeft !== undefined ? body.stockLeft : (body.stock !== undefined ? body.stock : 1));

    const productData = {
      id: body.id || `tv-${Date.now()}`,
      name: body.name || 'Untitled Fit',
      category: body.category || 'tees',
      categoryName: body.categoryName || 'Oversized Tees & Hoodies',
      currentPrice,
      price: currentPrice,
      originalPrice,
      discountPrice: originalPrice,
      stockLeft,
      stock: stockLeft,
      status: stockLeft <= 3 ? 'urgent' : 'in-stock',
      badge: body.badge || 'New Drop 🔥',
      badgeClass: body.badgeClass || 'badge-hot',
      sizes: Array.isArray(body.sizes) && body.sizes.length > 0 ? body.sizes : ['S', 'M', 'L', 'XL'],
      selectedSize: body.selectedSize || (body.sizes ? body.sizes[0] : 'M'),
      description: body.description || '',
      images: Array.isArray(body.images) && body.images.length > 0 ? body.images : [body.imageFront, body.imageBack].filter(Boolean),
      imageFront: body.imageFront || (Array.isArray(body.images) && body.images[0]) || 'https://images.unsplash.com/photo-1521572267360-ee0c2909d518?auto=format&fit=crop&w=700&q=80',
      imageBack: body.imageBack || (Array.isArray(body.images) && body.images[1]) || body.imageFront || 'https://images.unsplash.com/photo-1503342217505-b0a15ec3261c?auto=format&fit=crop&w=700&q=80',
      featured: Boolean(body.featured)
    };

    const newProduct = new Product(productData);
    await newProduct.save();

    res.status(201).json({ success: true, product: newProduct });
  } catch (e) {
    res.status(500).json({ error: e.message });
  }
});

// GET /api/products/:id
app.get('/api/products/:id', async (req, res) => {
  try {
    const id = req.params.id;
    const isObjectId = mongoose.Types.ObjectId.isValid(id) && id.length === 24;
    const filter = isObjectId ? { $or: [{ id }, { _id: id }] } : { id };

    const product = await Product.findOne(filter);
    if (!product) return res.status(404).json({ error: 'Product not found' });

    res.json(product);
  } catch (e) {
    res.status(500).json({ error: e.message });
  }
});

// PUT / PATCH /api/products/:id
const updateProductHandler = async (req, res) => {
  try {
    const id = req.params.id;
    const isObjectId = mongoose.Types.ObjectId.isValid(id) && id.length === 24;
    const filter = isObjectId ? { $or: [{ id }, { _id: id }] } : { id };

    let product = await Product.findOne(filter);
    if (!product) return res.status(404).json({ error: 'Product not found' });

    Object.keys(req.body).forEach(key => {
      if (key !== '_id' && key !== '__v') {
        product[key] = req.body[key];
      }
    });

    await product.save();
    res.json({ success: true, product });
  } catch (e) {
    res.status(500).json({ error: e.message });
  }
};
app.put('/api/products/:id', updateProductHandler);
app.patch('/api/products/:id', updateProductHandler);

// DELETE /api/products/:id
app.delete('/api/products/:id', async (req, res) => {
  try {
    const id = req.params.id;
    const isObjectId = mongoose.Types.ObjectId.isValid(id) && id.length === 24;
    const filter = isObjectId ? { $or: [{ id }, { _id: id }] } : { id };

    const removed = await Product.findOneAndDelete(filter);
    if (!removed) return res.status(404).json({ error: 'Product not found' });

    res.json({ success: true, removed });
  } catch (e) {
    res.status(500).json({ error: e.message });
  }
});

// ==========================================
// 2. ORDERS REST API
// ==========================================

// GET /api/orders (fetch all orders)
app.get('/api/orders', async (req, res) => {
  try {
    const { status } = req.query;
    const query = {};
    if (status && status !== 'all') {
      query.$or = [{ status: status.toLowerCase() }, { orderStatus: status }];
    }

    const orders = await Order.find(query).sort({ createdAt: -1 });
    res.json(orders);
  } catch (e) {
    res.status(500).json({ error: e.message });
  }
});

// POST /api/orders (create order & deduct stock)
app.post('/api/orders', async (req, res) => {
  try {
    const body = req.body;
    const customerObj = body.customer || {
      name: body.customerName || '',
      phone: body.customerPhone || '',
      address: body.address || '',
      city: body.city || '',
      district: body.district || '',
      notes: body.notes || ''
    };

    const items = Array.isArray(body.items) ? body.items : [];
    const subtotal = Number(body.subtotal) || items.reduce((sum, item) => sum + (Number(item.price) || 0) * (Number(item.qty || item.quantity) || 1), 0);
    const deliveryFee = Number(body.deliveryFee) || 0;
    const total = Number(body.total || body.totalAmount) || (subtotal + deliveryFee);

    const orderData = {
      orderId: body.orderId || `TV-${Math.floor(10000 + Math.random() * 90000)}`,
      customerName: customerObj.name || body.customerName || '',
      customerPhone: customerObj.phone || body.customerPhone || '',
      address: customerObj.address || body.address || '',
      customer: customerObj,
      items: items.map(it => ({
        id: it.id || it.productId || '',
        productId: it.productId || it.id || '',
        name: it.name || '',
        color: it.color || '',
        size: it.size || 'M',
        qty: Number(it.qty || it.quantity) || 1,
        quantity: Number(it.quantity || it.qty) || 1,
        price: Number(it.price) || 0
      })),
      subtotal,
      deliveryFee,
      total,
      totalAmount: total,
      paymentMethod: body.paymentMethod || 'cod',
      slipUrl: body.slipUrl || body.bankSlipUrl || '',
      bankSlipUrl: body.bankSlipUrl || body.slipUrl || '',
      status: (body.status || body.orderStatus || 'pending').toLowerCase(),
      orderStatus: body.orderStatus || (body.status ? body.status.charAt(0).toUpperCase() + body.status.slice(1) : 'Pending'),
      createdAt: body.createdAt ? new Date(body.createdAt) : new Date()
    };

    const newOrder = new Order(orderData);
    await newOrder.save();

    // Deduct stock in MongoDB
    if (items.length > 0) {
      for (const item of items) {
        const prodIdentifier = item.id || item.productId;
        if (!prodIdentifier) continue;

        const isItemObjectId = mongoose.Types.ObjectId.isValid(prodIdentifier) && prodIdentifier.length === 24;
        const pFilter = isItemObjectId ? { $or: [{ id: prodIdentifier }, { _id: prodIdentifier }] } : { id: prodIdentifier };

        const prod = await Product.findOne(pFilter);
        if (prod) {
          const deductQty = Number(item.qty || item.quantity) || 1;
          prod.stockLeft = Math.max(0, (prod.stockLeft || 1) - deductQty);
          prod.stock = prod.stockLeft;
          prod.status = prod.stockLeft <= 0 ? 'out-of-stock' : (prod.stockLeft <= 3 ? 'urgent' : 'in-stock');
          await prod.save();
        }
      }
    }

    res.status(201).json({ success: true, order: newOrder });
  } catch (e) {
    res.status(500).json({ error: e.message });
  }
});

// GET /api/orders/:id
app.get('/api/orders/:id', async (req, res) => {
  try {
    const orderId = req.params.id;
    const isObjectId = mongoose.Types.ObjectId.isValid(orderId) && orderId.length === 24;
    const filter = isObjectId ? { $or: [{ orderId }, { _id: orderId }] } : { orderId };

    const order = await Order.findOne(filter);
    if (!order) return res.status(404).json({ error: 'Order not found' });

    res.json(order);
  } catch (e) {
    res.status(500).json({ error: e.message });
  }
});

// PUT / PATCH /api/orders/:id (Update status: Pending -> Delivered)
const updateOrderHandler = async (req, res) => {
  try {
    const orderId = req.params.id;
    const isObjectId = mongoose.Types.ObjectId.isValid(orderId) && orderId.length === 24;
    const filter = isObjectId ? { $or: [{ orderId }, { _id: orderId }] } : { orderId };

    let order = await Order.findOne(filter);
    if (!order) return res.status(404).json({ error: 'Order not found' });

    if (req.body.status) {
      order.status = req.body.status.toLowerCase();
      order.orderStatus = req.body.status.charAt(0).toUpperCase() + req.body.status.slice(1);
    }
    if (req.body.orderStatus) {
      order.orderStatus = req.body.orderStatus;
      order.status = req.body.orderStatus.toLowerCase();
    }

    Object.keys(req.body).forEach(key => {
      if (key !== '_id' && key !== '__v' && key !== 'status' && key !== 'orderStatus') {
        order[key] = req.body[key];
      }
    });

    await order.save();
    res.json({ success: true, order });
  } catch (e) {
    res.status(500).json({ error: e.message });
  }
};
app.put('/api/orders/:id', updateOrderHandler);
app.patch('/api/orders/:id', updateOrderHandler);

// ==========================================
// 3. SETTINGS REST API
// ==========================================
app.get('/api/settings', async (req, res) => {
  try {
    const settings = await Setting.getSettings();
    res.json(settings);
  } catch (e) {
    res.status(500).json({ error: e.message });
  }
});

const updateSettingsHandler = async (req, res) => {
  try {
    let settings = await Setting.findOne();
    if (!settings) {
      settings = new Setting(req.body);
    } else {
      Object.keys(req.body).forEach(k => {
        if (k !== '_id' && k !== '__v') settings[k] = req.body[k];
      });
    }
    await settings.save();
    res.json({ success: true, settings });
  } catch (e) {
    res.status(500).json({ error: e.message });
  }
};
app.post('/api/settings', updateSettingsHandler);
app.put('/api/settings', updateSettingsHandler);

// ==========================================
// 4. IMAGE UPLOAD API (Base64 data URL)
// ==========================================
app.post('/api/upload', (req, res) => {
  try {
    const body = req.body;
    if (!body.data) return res.status(400).json({ error: 'No image data provided' });

    // In serverless / read-only environment, or if local file storage cannot be written, fallback gracefully to returning data URL directly
    try {
      if (!fs.existsSync(UPLOADS_DIR)) {
        fs.mkdirSync(UPLOADS_DIR, { recursive: true });
      }

      const matches = body.data.match(/^data:([A-Za-z-+\/]+);base64,(.+)$/);
      let ext = '.jpg';
      let buffer;

      if (matches && matches.length === 3) {
        const mime = matches[1];
        if (mime.includes('png')) ext = '.png';
        else if (mime.includes('webp')) ext = '.webp';
        else if (mime.includes('gif')) ext = '.gif';
        buffer = Buffer.from(matches[2], 'base64');
      } else {
        buffer = Buffer.from(body.data, 'base64');
      }

      const filename = `tv_${Date.now()}_${Math.floor(Math.random() * 1000)}${ext}`;
      const filePath = path.join(UPLOADS_DIR, filename);
      fs.writeFileSync(filePath, buffer);

      const fileUrl = `/uploads/${filename}`;
      return res.json({ success: true, url: fileUrl, filename });
    } catch (fsErr) {
      // Graceful fallback for read-only / serverless (e.g. Vercel) - return base64 URL directly
      console.warn('⚠️ File system write bypassed in serverless environment. Returning image payload directly:', fsErr.message);
      return res.json({ success: true, url: body.data, filename: body.filename || 'uploaded_image' });
    }
  } catch (e) {
    res.status(500).json({ error: e.message });
  }
});

// ==========================================
// 5. STATIC FILES & HTML SERVING
// ==========================================
app.use('/css', express.static(path.join(__dirname, 'css')));
app.use('/js', express.static(path.join(__dirname, 'js')));
app.use('/uploads', express.static(path.join(__dirname, 'uploads')));
app.use('/data', express.static(path.join(__dirname, 'data')));
app.use(express.static(path.join(__dirname)));

app.get('/admin', (req, res) => {
  res.sendFile(path.join(__dirname, 'admin.html'));
});

app.get('/admin.html', (req, res) => {
  res.sendFile(path.join(__dirname, 'admin.html'));
});

app.get('/', (req, res) => {
  res.sendFile(path.join(__dirname, 'index.html'));
});

// Start local listener only when not running in serverless Vercel environment
if (process.env.NODE_ENV !== 'production' || !process.env.VERCEL) {
  connectDB().then(() => {
    app.listen(PORT, () => {
      console.log(`🚀 ThreadVibe Storefront & Admin API running at http://localhost:${PORT}`);
      console.log(`📱 Admin Panel available at http://localhost:${PORT}/admin.html`);
    });
  }).catch(err => {
    console.error('Failed to start server:', err);
  });
}

// Export Express App for Vercel Serverless Functions
module.exports = app;
