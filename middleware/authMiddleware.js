const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');
const User = require('../models/user.model');

const protect = async (req, res, next) => {
  let token;
  if (
    req.headers.authorization &&
    req.headers.authorization.startsWith('Bearer')
  ) {
    try {
      token = req.headers.authorization.split(' ')[1];
      const decodedPayload = jwt.verify(token, 'thisisasecret');
      const user = await User.findById(decodedPayload.id).select('-password');
      req.user = user;
      next();
    } catch (error) {
      res.status(500).json({ error: 'Not authorized' });
    }
  }
  if (!token) {
    res.status(401).json({ error: 'No token, Not authorized' });
  }
};

const confirmAdmin = (req, res, next) => {
  if (req.user && req.user.isAdmin && !req.user.isCustomer) {
    next();
  } else {
    res.status(500).json({ error: 'Access denied. Not Admin' });
  }
};

const confirmCustomer = (req, res, next) => {
  if (req.user && !req.user.isAdmin && req.user.isCustomer) {
    next();
  } else {
    res.status(500).json({ error: 'Access denied. Not Customer' });
  }
};

exports.protect = protect;
exports.confirmAdmin = confirmAdmin;
exports.confirmCustomer = confirmCustomer;
