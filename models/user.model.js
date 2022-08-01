const mongoose = require('mongoose');

const User = new mongoose.Schema({
  firstName: { type: String, required: true },
  lastName: { type: String, required: true },
  email: { type: String, required: true, unique: true },
  password: { type: String, required: true },
  isAdmin: { type: Boolean, default: false },
  isCustomer: { type: Boolean, default: true },
});

const model = mongoose.model('User', User);

module.exports = model;
