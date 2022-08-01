const Dish = require('../models/dish.model');
const Category = require('../models/category.model');

const getDishes = async (req, res) => {
  const dishes = await Dish.find({});
  res.status(200).json(dishes);
};

const getDishesByCategoryId = async (req, res) => {
  try {
    const id = req.params.categoryId;
    const dishes = await Dish.find({ category: id });
    if (dishes) res.status(200).json(dishes);
    else res.status(500).json({ error: 'invalid lookup' });
  } catch (error) {
    res.status(500).json({ error });
  }
};

const createDish = async (req, res) => {
  const {
    name,
    description,
    price,
    spicyLevel,
    glutenFree,
    isVegan,
    isFree,
    ContainsAllergy,
    comesWithSide,
    image,
    categoryId,
  } = req.body;
  try {
    console.log(categoryId);
    const category = await Category.findById(categoryId);
    if (category) {
      const dish = await Dish.create({
        name,
        description,
        price,
        spicyLevel,
        glutenFree,
        isVegan,
        isFree,
        ContainsAllergy,
        comesWithSide,
        image,
        category,
      });
      if (dish) res.status(200).json(dish);
      else res.status(500).json({ error: 'Need more data' });
    } else res.status(500).json({ error: 'Need more data' });
  } catch (error) {
    res.status(500).json({ error });
  }
};

exports.getDishes = getDishes;
exports.createDish = createDish;
exports.getDishesByCategoryId = getDishesByCategoryId;
