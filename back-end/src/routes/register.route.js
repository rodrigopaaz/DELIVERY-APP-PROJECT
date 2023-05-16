const express = require('express');
const { createUserController } = require('../controllers');

const registerRouter = express.Router();

registerRouter.post('/', createUserController);

module.exports = registerRouter;