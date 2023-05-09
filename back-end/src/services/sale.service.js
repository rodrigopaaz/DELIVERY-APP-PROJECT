const { sales } = require('../database/models');
const { users } = require('../database/models');
const { sales_products: SalesProduct } = require('../database/models');

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
            saleId: newSale.id, productId: id, quantity })));
        return newSale;
    } catch (error) {
        throw new Error(error.message);
    }
};

module.exports = {
  createSaleService,
};