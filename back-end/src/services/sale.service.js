const { sales } = require('../database/models');
const { users } = require('../database/models');
const { sales_products: SalesProduct } = require('../database/models');

const findUserByEmail = async (email) => {
  const { id: userId } = await users.findOne({ where: { email: email } });
  return userId;
}

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
      status: 'Pendente',
    });
    await Promise.all(products.map(async ({ id, quantity }) => SalesProduct.create({
      saleId: newSale.id, productId: id, quantity,
    })));
    return newSale;
  } catch (error) {
    throw new Error(error.message);
  }
};

const findByIdSaleService = async (email) => {
  try {
    const userId = await findUserByEmail(email);
    const data = await sales.findAll({where: {userId: userId}});
    return data;
  } catch (error) {
    throw new Error(error);
  }
};

// OBSERVAÇÃO: ARRAY DE PRODUCTS NÃO ESTÁ SENDO ATUALIZADO NESSA FUNÇÃO.

const updateSaleService = async (id, info) => {
  try {
    const { address, number, email, seller, total, status } = info;
    const userId = findUserByEmail(email)
    const exist = await sales.findByPk(id);
    if (!exist) throw new Error('Not Found');
    const data = await sales.update({
      userId,
      sellerId: seller,
      totalPrice: Number(total),
      deliveryAddress: address,
      deliveryNumber: number,
      status,
    }, { where: { id } });
    return data;
  } catch (error) {
    throw new Error(error.message);
  }
};

module.exports = {
  createSaleService,
  updateSaleService,
  findByIdSaleService
};