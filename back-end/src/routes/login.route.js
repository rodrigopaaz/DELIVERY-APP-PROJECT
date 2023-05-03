const express = require('express');
const LoginController = require('../controllers');

const loginRouter = express.Router();

loginRouter.post('/', LoginController.loginController);

module.exports = loginRouter;