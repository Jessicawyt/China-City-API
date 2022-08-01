const router = require('express').Router();
const {
  getDishes,
  createDish,
  getDishesByCategoryId,
} = require('../controllers/dishController');
const { protect, confirmAdmin } = require('../middleware/authMiddleware');

router.route('/').get(getDishes).post(protect, confirmAdmin, createDish);
router.route('/:categoryId').get(getDishesByCategoryId);

module.exports = router;
