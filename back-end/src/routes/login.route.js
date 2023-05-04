const express = require('express');
const { loginController, getRoleController } = require('../controllers');
const { validatePassword, validateEmail } = require('../middlewares/login.validate');
const validateToken = require('../middlewares/token.validate');

const loginRouter = express.Router();

loginRouter.post(
'/',
validatePassword,
validateEmail,
loginController,
);

loginRouter.get('/role', validateToken, getRoleController);

module.exports = loginRouter;