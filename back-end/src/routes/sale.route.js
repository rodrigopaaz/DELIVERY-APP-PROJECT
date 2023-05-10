const express = require('express');
const { createSaleController, updateSalesController } = require('../controllers');

const saleRouter = express.Router();

saleRouter.post('/', createSaleController);
saleRouter.put('/:id', updateSalesController);

module.exports = saleRouter;