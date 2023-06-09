const express = require('express');
const { 
    findAllUserController,
    findByIdUserController,
    updateUserController,
    deleteUserController,
 } = require('../controllers');
 const validateToken = require('../middlewares/token.validate');

const userRouter = express.Router();

userRouter.get('/', validateToken, findAllUserController);
userRouter.get('/:id', validateToken, findByIdUserController);
userRouter.put('/:id', validateToken, updateUserController);
userRouter.delete('/:id', validateToken, deleteUserController);

module.exports = userRouter;