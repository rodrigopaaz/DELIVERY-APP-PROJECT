const {
    loginController,
    getRoleController,
} = require('./Login.controller');
const { 
    createUserController,
    findAllUserController,
    findByIdUserController,
    updateUserController,
    deleteUserController,
    
} = require('./user.controller');

module.exports = {
    loginController,
    createUserController,
    findAllUserController,
    findByIdUserController,
    updateUserController,
    deleteUserController,
    getRoleController,
};