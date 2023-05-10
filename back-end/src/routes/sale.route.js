const express = require('express');
const { 
    createSaleController,
     updateSalesController,
     findByIdSaleController
 } = require('../controllers');
 //const validateToken = require('../middlewares/token.validate')

const saleRouter = express.Router();

saleRouter.post('/', createSaleController);
saleRouter.put('/:id', updateSalesController);
saleRouter.post('/orders', findByIdSaleController);

module.exports = saleRouter;