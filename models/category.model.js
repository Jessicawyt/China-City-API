const mongoose = require('mongoose');

const categorySchema = new mongoose.Schema({
  category: { type: String, required: true },
});

const model = mongoose.model('Category', categorySchema);
module.exports = model;
