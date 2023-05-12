const express = require('express');

const { 
    createSaleController,
     updateSalesController,
     findSaleController,
 } = require('../controllers');

const saleRouter = express.Router();

saleRouter.get('/:id');
saleRouter.post('/', createSaleController);
saleRouter.put('/:id', updateSalesController);
saleRouter.post('/orders', findSaleController);

module.exports = saleRouter;