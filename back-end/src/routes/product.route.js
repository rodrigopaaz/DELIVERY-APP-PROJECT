const express = require('express');
const {
    createProcuctController,
    findAllProcuctController,
    findByIdProdController,
    updateProductController,
    deleteProductController,
} = require('../controllers');

const productRouter = express.Router();

productRouter.post('/', createProcuctController);
productRouter.get('/:id', findByIdProdController);
productRouter.get('/', findAllProcuctController);
productRouter.put('/:id', updateProductController);
productRouter.delete('/:id', deleteProductController);

module.exports = productRouter;