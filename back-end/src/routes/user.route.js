const express = require('express');
const { createUserController } = require('../controllers');

const userRouter = express.Router();

userRouter.post('/', createUserController);

module.exports = userRouter;