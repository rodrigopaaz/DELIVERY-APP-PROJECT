const express = require('express');
const cors = require('cors');
const path = require('path');
const loginRouter = require('../routes/login.route');
const userRouter = require('../routes/user.route');
const productRouter = require('../routes/product.route');

const app = express();

app.use(express.json());
// path.join(__dirname + '/public');
// app.use('/images', express.static(`${__dirname}/public`));
// app.use('/static', express.static(__dirname + '/public'));
// app.use('/images', express.static('public'));

app.use(cors());
app.use('/login', loginRouter);
app.use('/register', userRouter);
app.use('/products', productRouter);

app.use('/images', express.static(path.join(__dirname, 'images')));
app.get('/coffee', (_req, res) => res.status(418).end());

module.exports = app;
