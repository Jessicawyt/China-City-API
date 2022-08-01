const express = require('express');
const app = express();
const cors = require('cors');
const connectDb = require('./dbConfig/db');
const userRoute = require('./routes/userRoute');
const orderRoute = require('./routes/orderRoute');
const dishRoute = require('./routes/dishRoute');
const categoryRoute = require('./routes/categoryRoute');
require('dotenv').config();

connectDb();

app.use(cors());
app.use(express.json());
app.use(express.urlencoded({ extended: false }));

app.use('/chinacity/user', userRoute);
app.use('/chinacity/order', orderRoute);
app.use('/chinacity/dishes', dishRoute);
app.use('/chinacity/categories', categoryRoute);

app.listen(3555, () => {
  console.log('Server is running on Port 3555 ...');
});
