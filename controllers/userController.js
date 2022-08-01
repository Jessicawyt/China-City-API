const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');
const User = require('../models/user.model');

const registerUser = async (req, res) => {
  try {
    const { firstName, lastName, password, email, isAdmin, isCustomer } =
      req.body;

    if (
      !email ||
      !firstName ||
      !lastName ||
      !password ||
      !isAdmin ||
      !isCustomer
    ) {
      res.status(400).json({ error: 'Please fill in with your information' });
    }

    // check if user exists
    const exists = await User.findOne({ email });
    if (exists) {
      res.status(500).json({ error: 'user already exists' });
    }
    const salt = await bcrypt.genSalt();
    const hashedPassword = await bcrypt.hash(password, salt);
    const newUser = await User.create({
      firstName,
      lastName,
      password: hashedPassword,
      email,
      isAdmin,
      isCustomer,
    });
    if (newUser) {
      res.status(200).json(newUser);
    } else {
      res.status(400).json({ error: 'invalid data' });
    }
  } catch (err) {
    console.log(err);
  }
};

const login = async (req, res) => {
  try {
    const { email, password } = req.body;
    const user = await User.findOne({ email });
    if (!user) {
      res.status(500).json({ error: "Email doesn't exist" });
    }
    const isValid = await bcrypt.compare(password, user.password);
    if (isValid) {
      const token = jwt.sign(
        {
          id: user._id,
          password: user.password,
          email: user.email,
          isCustomer: user.isCustomer,
          isAdmin: user.isAdmin,
        },
        process.env.SECRECT
      );
      res.status(200).json({ token, user });
    } else {
      res.status(500).json({ error: 'Wrong password' });
    }
  } catch (error) {
    console.log(error);
  }
};

exports.registerUser = registerUser;
exports.login = login;
