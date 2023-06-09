const express = require('express');
const cors = require('cors');

const loginRouter = require('../routes/login.route');
const registerRouter = require('../routes/register.route');
const userRouter = require('../routes/user.route');
const productRouter = require('../routes/product.route');
const saleRouter = require('../routes/sale.route');

const app = express();

app.use(express.json());
app.use(express.static('public'));

app.use(cors());

app.use('/user', userRouter);
app.use('/login', loginRouter);
app.use('/register', registerRouter);
app.use('/products', productRouter);
app.use('/sales', saleRouter);

app.get('/coffee', (_req, res) => res.status(418).end());

module.exports = app;
