const salesMock = [{
  id: 4,
  userId: 3,
  sellerId: 1,
  totalPrice: 2.2,
  deliveryAddress: 'rua dois',
  deliveryNumber: 10,
  saleDate: new Date(),
  status: 'Pendente',
}];

const sale = {
  dataValues: {
    id: 1,
    userId: 3,
    sellerId: 2,
    totalPrice: '10.00',
    deliveryAddress: 'Endereço de teste',
    deliveryNumber: '90',
    saleDate: '2023-05-17T20:23:32.000Z',
    status: 'Pendente',
  },
};

const createSale = {
  email: 'zebirita@email.com',
  address: 'rua dois',
  number: 10,
  seller: 1,
  total: '2.20',
  products: [{ id: 1, name: 'Skol Lata 250ml', price: 2.20, quantity: 1 }],
};

const saleReturned = {
  id: 1,
  userId: 3,
  sellerId: 2,
  totalPrice: '10.00',
  deliveryAddress: 'Endereço de teste',
  deliveryNumber: '90',
  saleDate: '2023-05-17T20:23:32.000Z',
  status: 'Pendente',
  products: [
    {
      id: 10,
      name: 'Skol Beats Senses 269ml',
      price: '3.57',
      salesProducts: {
        saleId: 1,
        productId: 10,
        quantity: 3,
      },
    },
    {
      id: 11,
      name: 'Stella Artois 275ml',
      price: '3.49',
      salesProducts: {
        saleId: 1,
        productId: 11,
        quantity: 1,
      },
    },
  ],
  seller: {
    id: 2,
    name: 'Fulana Pereira',
    email: 'fulana@deliveryapp.com',
  },
};

module.exports = {
  salesMock,
  createSale,
  saleReturned,
  sale,
};