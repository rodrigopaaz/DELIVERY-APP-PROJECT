// const {
//     createProcuctService,
//     findAllProcuctService,
//     findByIdProdService,
//     updateProductService,
//     deleteProductService,
// } = require('../services/product.service');

const productsController = require('../services/product.service');

const createProcuctController = async (req, res) => {
    try {
        const { name, price, urlImage } = req.body;
        const result = await productsController.createProcuctService({ name, price, urlImage });
        res.status(201).json(result);
    } catch (error) {
        res.status(400).json(error.message);
    }
};

const findAllProcuctController = async (_req, res) => {
    try {
        const result = await productsController.findAllProcuctService();
        res.status(200).json(result);
    } catch (error) {
        res.status(404).json(error.message);
    }
};

const findByIdProdController = async (req, res) => {
    try {
        const { id } = req.params;
        const result = await productsController.findByIdProdService(id);
        res.status(200).json(result);
    } catch (error) {
        res.status(404).json(error.message);
    }
};

const updateProductController = async (req, res) => {
    try {
        const { id } = req.params;
        const { name, price, urlImage } = req.body;
        await productsController.updateProductService(id, { name, price, urlImage });
        res.status(200).json({ message: 'update complete' });
      } catch (error) {
        res.status(404).json(error.message);
      }
};

const deleteProductController = async (req, res) => {
    const { id } = req.params;
    await productsController.deleteProductService(id);
    res.status(204).end();
};

module.exports = {
    createProcuctController,
    findAllProcuctController,
    findByIdProdController,
    updateProductController,
    deleteProductController,
};