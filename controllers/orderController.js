const Order = require('../models/order.model');

const getOrders = async (req, res) => {
  const orders = await Order.find({ user: req.user.id });
  res.status(200).json(orders);
};

const createOrder = async (req, res) => {
  if (req.body.totalPrice && req.body.isDelivery && req.body.isPickup) {
    const order = await Order.create({
      totalPrice: req.body.totalPrice,
      isPickup: req.body.isPickup,
      isDelivery: req.body.isDelivery,
      user: req.user.id,
    });
    res.status(200).json(order);
  } else {
    res.status(500).json({ error: 'Please provide valid info' });
  }
};

exports.getOrders = getOrders;
exports.createOrder = createOrder;
