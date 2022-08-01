const Category = require('../models/category.model');

const getCategories = async (req, res) => {
  const categories = await Category.find({});
  res.status(200).json(categories);
};

const createCategory = async (req, res) => {
  try {
    if (req.body.category) {
      const category = await Category.create({
        category: req.body.category,
      });
      if (category) res.status(200).json(category);
    }
  } catch (error) {
    console.log(error);
    res.status(500).json({ error });
  }
};

exports.getCategories = getCategories;
exports.createCategory = createCategory;
