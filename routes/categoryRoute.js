const router = require('express').Router();
const {
  getCategories,
  createCategory,
} = require('../controllers/categoryController');
const { protect, confirmAdmin } = require('../middleware/authMiddleware');

router
  .route('/')
  .get(getCategories)
  .post(protect, confirmAdmin, createCategory);

module.exports = router;
