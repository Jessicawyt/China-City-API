const mongoose = require('mongoose');

const connectDb = async () => {
  try {
    await mongoose.connect(process.env.DBSTRING);
    console.log('DB connected...');
  } catch (err) {
    console.log(err);
  }
};

module.exports = connectDb;
