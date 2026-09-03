const mongoose = require('mongoose');

const settingSchema = new mongoose.Schema(
  {
    brandName: {
      type: String,
      default: 'ThreadVibe'
    },
    whatsappNumber: {
      type: String,
      default: '+94765637702'
    },
    currency: {
      type: String,
      default: 'Rs.'
    },
    freeShippingThreshold: {
      type: Number,
      default: 5000
    },
    shippingFeeColombo: {
      type: Number,
      default: 350
    },
    shippingFeeOutstation: {
      type: Number,
      default: 450
    },
    announcementText: {
      type: String,
      default: 'Islandwide Cash on Delivery (COD) Available! Free shipping on orders over Rs. 5,000'
    },
    announcementBadge: {
      type: String,
      default: 'Special Offer'
    },
    notices: {
      type: [String],
      default: []
    },
    contactNumbers: {
      type: [String],
      default: []
    }
  },
  {
    timestamps: true,
    toJSON: {
      virtuals: true,
      transform: (doc, ret) => {
        return ret;
      }
    }
  }
);

// Static method to get or initialize settings
settingSchema.statics.getSettings = async function () {
  let settings = await this.findOne();
  if (!settings) {
    settings = await this.create({
      brandName: 'ThreadVibe',
      whatsappNumber: '+94765637702',
      currency: 'Rs.',
      freeShippingThreshold: 5000,
      shippingFeeColombo: 350,
      shippingFeeOutstation: 450,
      announcementText: 'Islandwide Cash on Delivery (COD) Available! Free shipping on orders over Rs. 5,000',
      announcementBadge: 'Special Offer'
    });
  }
  return settings;
};

module.exports = mongoose.model('Setting', settingSchema);
