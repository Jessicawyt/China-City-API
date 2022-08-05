const Order = require('../models/order.model');

const getOrders = async (req, res) => {
  const orders = await Order.find({ user: req.user.id });
  res.status(200).json(orders);
};

const createOrder = async (req, res) => {
  if (
    req.body.totalPrice &&
    (req.body.isDelivery || req.body.isPickup) &&
    req.body.orders.length > 0
  ) {
    // create new order
    const order = await Order.create({
      totalPrice: req.body.totalPrice,
      isPickup: req.body.isPickup,
      isDelivery: req.body.isDelivery,
      user: req.user.id,
      orders: req.body.orders,
    });
    if (order) res.status(200).json(order);
    else res.status(500).json({ error: 'Info not valid' });
  } else {
    res.status(500).json({ error: 'Please provide valid info' });
  }
};

exports.getOrders = getOrders;
exports.createOrder = createOrder;
