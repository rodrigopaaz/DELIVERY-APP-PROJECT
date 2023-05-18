const url = 'http://localhost:3001/images/skol_lata_350ml.jpg';
const skolProduct = 'Skol Lata 1l';

const allProducts = [
  {
  id: 1,
  name: 'Skol Lata 250ml',
  price: 2.20,
  urlImage: url,
  },
  {
  id: 2,
  name: 'Heineken 600ml',
  price: 7.50,
  urlImage: 'http://localhost:3001/images/heineken_600ml.jpg',
  },
  ];
  
  const product = {
    name: skolProduct,
    price: 4.30,
    urlImage: url,
  };
  
  const createProduct = {
    id: 12,
    name: skolProduct,
    price: 4.30,
    urlImage: url,
  };
  
  const idProductUp = {
    id: 1,
    name: skolProduct,
    price: 4.30,
    urlImage: url,
  };

  const idProductUpdated = {
    id: 1,
    name: 'Skol 1l',
    price: 4.30,
    urlImage: url,
  };

  const idRemove = [
  {
  fieldCount: 0,
  affectedRows: 1,
  insertId: 0,
  info: '',
  serverStatus: 2,
  warningStatus: 0,
  },
  undefined,
  ];

  const mockUpdate = {
  fieldCount: 0,
  affectedRows: 1,
  insertId: 0,
  info: 'Rows matched: 1 Changed: 1 Warnings: 0',
  serverStatus: 2,
  warningStatus: 0,
  changedRows: 1,
  };

  const idProduct = 1;

  const errorId = 999;

  module.exports = {
  allProducts,
  createProduct,
  product,
  idProductUp,
  idRemove,
  idProduct,
  mockUpdate,
  errorId,
  idProductUpdated,
  };
