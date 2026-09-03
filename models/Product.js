const mongoose = require('mongoose');

const productSchema = new mongoose.Schema(
  {
    id: {
      type: String,
      required: true,
      unique: true,
      index: true,
      trim: true,
      default: () => `tv-${Date.now()}`
    },
    name: {
      type: String,
      required: [true, 'Product name is required'],
      trim: true
    },
    category: {
      type: String,
      default: 'tees',
      trim: true
    },
    categoryName: {
      type: String,
      default: 'Oversized Tees & Hoodies'
    },
    price: {
      type: Number,
      default: 0
    },
    currentPrice: {
      type: Number,
      default: 0
    },
    originalPrice: {
      type: Number,
      default: 0
    },
    discountPrice: {
      type: Number,
      default: 0
    },
    discountPercent: {
      type: Number,
      default: 0
    },
    stock: {
      type: Number,
      default: 1
    },
    stockLeft: {
      type: Number,
      default: 1
    },
    status: {
      type: String,
      default: 'in-stock'
    },
    badge: {
      type: String,
      default: 'New Drop 🔥'
    },
    badgeClass: {
      type: String,
      default: 'badge-hot'
    },
    sizes: {
      type: [String],
      default: ['S', 'M', 'L', 'XL']
    },
    selectedSize: {
      type: String,
      default: 'M'
    },
    description: {
      type: String,
      default: ''
    },
    images: {
      type: [String],
      default: []
    },
    imageFront: {
      type: String,
      default: 'https://images.unsplash.com/photo-1521572267360-ee0c2909d518?auto=format&fit=crop&w=700&q=80'
    },
    imageBack: {
      type: String,
      default: 'https://images.unsplash.com/photo-1503342217505-b0a15ec3261c?auto=format&fit=crop&w=700&q=80'
    },
    featured: {
      type: Boolean,
      default: false
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
        // Ensure id is preserved and clean
        ret.id = ret.id || ret._id.toString();
        return ret;
      }
    },
    toObject: { virtuals: true }
  }
);

// Pre-save synchronization hook
productSchema.pre('save', function () {
  // Sync price and currentPrice
  if (this.currentPrice !== undefined && this.currentPrice !== null && this.currentPrice > 0) {
    this.price = this.currentPrice;
  } else if (this.price !== undefined && this.price !== null && this.price > 0) {
    this.currentPrice = this.price;
  }

  // Sync originalPrice and discountPrice
  if (this.originalPrice > 0) {
    this.discountPrice = this.originalPrice;
  } else if (this.discountPrice > 0) {
    this.originalPrice = this.discountPrice;
  } else {
    this.originalPrice = this.currentPrice;
    this.discountPrice = this.currentPrice;
  }

  // Calculate discount percentage
  if (this.originalPrice > this.currentPrice && this.originalPrice > 0) {
    this.discountPercent = Math.round(((this.originalPrice - this.currentPrice) / this.originalPrice) * 100);
  } else {
    this.discountPercent = 0;
  }

  // Sync stock and stockLeft
  if (this.stockLeft !== undefined && this.stockLeft !== null) {
    this.stock = this.stockLeft;
  } else if (this.stock !== undefined && this.stock !== null) {
    this.stockLeft = this.stock;
  }

  // Update status based on stock level
  if (this.stockLeft <= 0) {
    this.status = 'out-of-stock';
  } else if (this.stockLeft <= 3) {
    this.status = 'urgent';
  } else {
    this.status = 'in-stock';
  }

  // Sync images array and imageFront / imageBack
  if (Array.isArray(this.images) && this.images.length > 0) {
    if (!this.imageFront || this.imageFront.includes('unsplash.com/photo-1521572267360')) {
      this.imageFront = this.images[0];
    }
    if (!this.imageBack || this.imageBack.includes('unsplash.com/photo-1503342217505')) {
      this.imageBack = this.images[1] || this.images[0];
    }
  } else {
    this.images = [this.imageFront, this.imageBack].filter(Boolean);
  }

  // Set default categoryName if missing
  if (!this.categoryName) {
    const categoryMap = {
      tees: 'Oversized Tees & Hoodies',
      streetwear: 'Casual & Streetwear',
      formal: 'Formal & Office Wear',
      sale: 'Clearance / Offers'
    };
    this.categoryName = categoryMap[this.category] || 'Apparel & Fits';
  }
});

module.exports = mongoose.model('Product', productSchema);
