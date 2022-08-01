const mongoose = require('mongoose');

const OrderSchema = new mongoose.Schema(
  {
    totalPrice: { type: Number, required: true },
    isPickup: { type: Boolean, required: true },
    isDelivery: { type: Boolean, required: true },
    user: {
      type: mongoose.Schema.Types.ObjectId,
      ref: 'User',
    },
  },
  {
    timestamps: true,
  }
);

const model = mongoose.model('Order', OrderSchema);
module.exports = model;
