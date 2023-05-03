const express = require('express');
const LoginController = require('../controllers');
const { validatePassword, validateEmail } = require('../middlewares/login.validate');

const loginRouter = express.Router();

loginRouter.post(
'/',
validatePassword,
validateEmail,
LoginController.loginController,
);

module.exports = loginRouter;