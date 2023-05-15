const { 
   createSaleService,
   updateSaleService,
   findSaleService,
   findByIdSaleService,
  } = require('../services/sale.service');

const createSaleController = async (req, res) => {
  try {
    const sale = req.body;
    const result = await createSaleService(sale);
    res.status(201).json(result);
  } catch (error) {
    res.status(409).json(error.message);
  }
};

const findByIdSaleController = async (req, res) => {
  try {
    const { id } = req.params;
    const result = await findByIdSaleService(id);
    res.status(200).json(result);
  } catch (error) {
    res.status(409).json(error.message);
  }
};

const findSaleController = async (req, res) => {
  try {
    const { email } = req.body;
    const result = await findSaleService(email);
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
    res.status(404).json(error.message);
  }
};

module.exports = {
  createSaleController,
  updateSalesController,
  findSaleController,
  findByIdSaleController,
};