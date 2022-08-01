const router = require('express').Router();
const { getOrders, createOrder } = require('../controllers/orderController');
const { protect, confirmCustomer } = require('../middleware/authMiddleware');

router
  .route('/')
  .get(protect, confirmCustomer, getOrders)
  .post(protect, confirmCustomer, createOrder);

module.exports = router;
