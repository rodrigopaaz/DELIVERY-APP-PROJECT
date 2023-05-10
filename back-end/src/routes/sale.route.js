const express = require('express');

const { 
    createSaleController,
     updateSalesController,
     findByIdSaleController,
 } = require('../controllers');

const saleRouter = express.Router();

saleRouter.get('/:id', findByIdSaleController);
saleRouter.post('/', createSaleController);
saleRouter.put('/:id', updateSalesController);
saleRouter.post('/orders', findByIdSaleController);

module.exports = saleRouter;