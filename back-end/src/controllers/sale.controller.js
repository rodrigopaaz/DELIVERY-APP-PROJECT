const { createSaleService } = require('../services/sale.service');

const createSaleController = async (req, res) => {
  try {
    const sale = req.body;
    const result = await createSaleService(sale);
    res.status(201).json(result);
  } catch (error) {
    res.status(409).json(error.message);
  }
};

module.exports = {
  createSaleController,
};