const { createSaleService, updateSaleService } = require('../services/sale.service');

const createSaleController = async (req, res) => {
  try {
    const sale = req.body;
    const result = await createSaleService(sale);
    res.status(201).json(result);
  } catch (error) {
    res.status(409).json(error.message);
  }
};

const updateSalesController = async (req, res) => {
  try {
    const { id } = req.params;
    const sale = req.body;
    await updateSaleService(id, sale);
    res.status(200).json({ message: 'update complete' });
  } catch (error) {
    console.log('cheguei aqui');
    res.status(404).json(error.message);
  }
};

module.exports = {
  createSaleController,
  updateSalesController,
};