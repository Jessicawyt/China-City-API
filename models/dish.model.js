const mongoose = require('mongoose');

const dishSchema = new mongoose.Schema({
  name: { type: String, required: true },
  description: { type: String, default: ' ' },
  price: { type: Number, required: true },
  spicyLevel: { type: Number, default: 0 },
  glutenFree: { type: Boolean, default: false },
  isVegan: { type: Boolean, default: false },
  isFree: { type: Boolean, default: false },
  ContainsAllergy: { type: Boolean, default: true },
  comesWithSide: { type: Boolean, required: true },
  image: {
    type: String,
    default:
      'https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcSME4ZO2Ytw0sKSa2r78hyh2n500wGmwdhmSA&usqp=CAU',
  },
  order: { type: mongoose.Schema.Types.ObjectId, ref: 'Order' },
  category: { type: mongoose.Schema.Types.ObjectId, ref: 'Category' },
});

const model = mongoose.model('Dish', dishSchema);
module.exports = model;
