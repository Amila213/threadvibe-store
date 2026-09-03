const mongoose = require('mongoose');

const orderItemSchema = new mongoose.Schema(
  {
    id: { type: String, default: '' },
    productId: { type: String, default: '' },
    name: { type: String, required: true },
    color: { type: String, default: '' },
    size: { type: String, default: 'M' },
    qty: { type: Number, default: 1, min: 1 },
    quantity: { type: Number, default: 1, min: 1 },
    price: { type: Number, required: true, default: 0 }
  },
  { _id: false }
);

const customerSchema = new mongoose.Schema(
  {
    name: { type: String, default: '' },
    phone: { type: String, default: '' },
    address: { type: String, default: '' },
    city: { type: String, default: '' },
    district: { type: String, default: '' },
    notes: { type: String, default: '' }
  },
  { _id: false }
);

const orderSchema = new mongoose.Schema(
  {
    orderId: {
      type: String,
      required: true,
      unique: true,
      index: true,
      trim: true,
      default: () => `TV-${Math.floor(10000 + Math.random() * 90000)}`
    },
    customerName: {
      type: String,
      default: ''
    },
    customerPhone: {
      type: String,
      default: ''
    },
    address: {
      type: String,
      default: ''
    },
    customer: {
      type: customerSchema,
      default: () => ({})
    },
    items: {
      type: [orderItemSchema],
      default: []
    },
    subtotal: {
      type: Number,
      default: 0
    },
    deliveryFee: {
      type: Number,
      default: 0
    },
    total: {
      type: Number,
      default: 0
    },
    totalAmount: {
      type: Number,
      default: 0
    },
    paymentMethod: {
      type: String,
      default: 'cod',
      trim: true
    },
    slipUrl: {
      type: String,
      default: ''
    },
    bankSlipUrl: {
      type: String,
      default: ''
    },
    status: {
      type: String,
      default: 'pending',
      trim: true
    },
    orderStatus: {
      type: String,
      default: 'Pending',
      trim: true
    },
    createdAt: {
      type: Date,
      default: Date.now
    }
  },
  {
    timestamps: true,
    toJSON: {
      virtuals: true,
      transform: (doc, ret) => {
        return ret;
      }
    },
    toObject: { virtuals: true }
  }
);

// Pre-save synchronization hook
orderSchema.pre('save', function () {
  // Sync customer information
  if (this.customer) {
    if (this.customer.name && !this.customerName) this.customerName = this.customer.name;
    if (this.customer.phone && !this.customerPhone) this.customerPhone = this.customer.phone;
    if (this.customer.address && !this.address) this.address = this.customer.address;
    if (this.customerName && !this.customer.name) this.customer.name = this.customerName;
    if (this.customerPhone && !this.customer.phone) this.customer.phone = this.customerPhone;
    if (this.address && !this.customer.address) this.customer.address = this.address;
  } else {
    this.customer = {
      name: this.customerName || '',
      phone: this.customerPhone || '',
      address: this.address || '',
      city: '',
      district: '',
      notes: ''
    };
  }

  // Sync totals
  if (this.total !== undefined && this.total > 0) {
    this.totalAmount = this.total;
  } else if (this.totalAmount !== undefined && this.totalAmount > 0) {
    this.total = this.totalAmount;
  } else {
    const calcSubtotal = (this.items || []).reduce((acc, item) => acc + (Number(item.price) || 0) * (Number(item.qty || item.quantity) || 1), 0);
    this.subtotal = this.subtotal || calcSubtotal;
    this.total = this.subtotal + (Number(this.deliveryFee) || 0);
    this.totalAmount = this.total;
  }

  // Sync slip URLs
  if (this.slipUrl && !this.bankSlipUrl) {
    this.bankSlipUrl = this.slipUrl;
  } else if (this.bankSlipUrl && !this.slipUrl) {
    this.slipUrl = this.bankSlipUrl;
  }

  // Sync statuses (case-insensitive mapping)
  if (this.status) {
    const s = this.status.toLowerCase();
    this.status = s;
    this.orderStatus = s.charAt(0).toUpperCase() + s.slice(1);
  } else if (this.orderStatus) {
    const s = this.orderStatus.toLowerCase();
    this.status = s;
    this.orderStatus = s.charAt(0).toUpperCase() + s.slice(1);
  }

  // Sync item quantities and ids
  if (Array.isArray(this.items)) {
    this.items.forEach(item => {
      if (item.qty && !item.quantity) item.quantity = item.qty;
      if (item.quantity && !item.qty) item.qty = item.quantity;
      if (item.id && !item.productId) item.productId = item.id;
      if (item.productId && !item.id) item.id = item.productId;
    });
  }
});

module.exports = mongoose.model('Order', orderSchema);
