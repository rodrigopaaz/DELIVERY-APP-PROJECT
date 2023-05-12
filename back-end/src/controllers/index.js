const {
    loginController,
} = require('./Login.controller');

const { 
    createUserController,
    findAllUserController,
    findByIdUserController,
    updateUserController,
    deleteUserController,    
} = require('./user.controller');

const {
    createProcuctController,
    findAllProcuctController,
    findByIdProdController,
    updateProductController,
    deleteProductController,
} = require('./products.controller');

const {
    createSaleController,
    updateSalesController,
    findSaleController,
} = require('./sale.controller');

module.exports = {
    loginController,
    createUserController,
    findAllUserController,
    findByIdUserController,
    updateUserController,
    deleteUserController,
    createProcuctController,
    findAllProcuctController,
    findByIdProdController,
    updateProductController,
    deleteProductController,
    createSaleController,
    updateSalesController,
    findSaleController,
};