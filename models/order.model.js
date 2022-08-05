const mongoose = require('mongoose');

const OrderSchema = new mongoose.Schema(
  {
    totalPrice: { type: Number, required: true },
    isPickup: { type: Boolean, required: true },
    isDelivery: { type: Boolean, required: true },
    orders: [
      {
        dishId: { type: mongoose.Schema.Types.ObjectId, ref: 'Dish' },
        qty: { type: Number },
        dishPrice: { type: Number },
        sideId: {
          type: mongoose.Schema.Types.ObjectId,
          ref: 'Dish',
          default: null,
        },
        sidePrice: { type: Number, default: 0 },
      },
    ],
    user: {
      type: mongoose.Schema.Types.ObjectId,
      ref: 'User',
      required: true,
    },
  },
  {
    timestamps: true,
  }
);

const model = mongoose.model('Order', OrderSchema);
module.exports = model;
