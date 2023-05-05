const { products } = require('../database/models');

const createProcuctService = async (info) => {
    try {
        const { name, price, urlImage } = info;
        const data = await products.create({ name, price, urlImage });
        return data;
    } catch (error) {
        throw new Error(error.message);
    }
};

const findAllProcuctService = async () => {
    try {
        const data = await products.findAll();
        return data;
    } catch (error) {
        throw new Error(error.message);
    }
};

const findByIdProdService = async (id) => {
    try {
        const data = await products.findByPk(id);
        return data;
    } catch (error) {
        throw new Error(error);
    }
};

const updateProductService = async (id, info) => {
    try {
        const exist = await findByIdProdService(id);
        const { name, price, urlImage } = info;
        if (!exist) {
          throw new Error('Not Found');
        }
        const data = await products.update({ name, price, urlImage }, { where: { id } });
        return data;
      } catch (error) {
        throw new Error(error.message);
      }
};

const deleteProductService = async (id) => {
    await products.destroy({ where: { id } });
    return { status: 204 };
};

module.exports = {
    createProcuctService,
    findAllProcuctService,
    findByIdProdService,
    updateProductService,
    deleteProductService,
};