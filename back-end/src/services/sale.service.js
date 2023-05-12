const { sales } = require('../database/models');
const { users } = require('../database/models');
const { sales_products: SalesProduct } = require('../database/models');

const findUserByEmail = async (email) => {
  const user = await users.findOne({ where: { email } });
  return user;
};

const createSaleService = async (sale) => {
  try {
    const { address, number, email, seller, total, products } = sale;
    const { id: userId } = await users.findOne({ where: { email } });
    const newSale = await sales.create({
      userId,
      sellerId: seller,
      totalPrice: Number(total),
      deliveryAddress: address,
      deliveryNumber: number,
      saleDate: new Date(),
      status: 'Pendente',
    });
    await Promise.all(products.map(async ({ id, quantity }) => SalesProduct.create({
      saleId: newSale.id, productId: id, quantity,
    })));
    return newSale;
  } catch (error) { throw new Error(error.message); }
};

const findSaleService = async (email) => {
  try {
    const { id, role } = await findUserByEmail(email);
    if (role === 'customer') {
      const compras = await sales.findAll({ where: { userId: id } });
      return compras;
    }
    if (role === 'seller') {
      const vendas = await sales.findAll({ where: { sellerId: id } });
      return vendas;
    }
  } catch (error) {
    throw new Error(error);
  }
};

const findById = async (id) => {
  try {
    const data = await sales.findByPk(id);
    console.log('data', data);
    return data;
  } catch (error) {
    throw new Error(error);
  }
};

const updateSaleService = async (id, info) => {
  try {
    console.log('id', id);
    const { status } = info;
    const exist = await findById(id);
    console.log('EXISTE', exist);
    if (!exist) throw new Error('Not Found');
    const data = await sales.update({
      status,
    }, { where: { id } });
    console.log('data', data);
    return data;
  } catch (error) {
    throw new Error(error.message);
  }
};

module.exports = {
  createSaleService,
  findSaleService,
  updateSaleService,
};