const express = require('express');
const { createSaleController } = require('../controllers/sale.controller');

const saleRouter = express.Router();

saleRouter.post('/', createSaleController);

module.exports = saleRouter;