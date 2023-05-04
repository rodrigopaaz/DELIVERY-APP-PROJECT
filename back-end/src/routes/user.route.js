const express = require('express');
const { 
    createUserController,
    findAllUserController,
    findByIdUserController,
    deleteUserController
 } = require('../controllers');

const userRouter = express.Router();

userRouter.post('/', createUserController);
userRouter.get('/', findAllUserController);
userRouter.get('/:id', findByIdUserController);
userRouter.delete('/:id', deleteUserController);

module.exports = userRouter;