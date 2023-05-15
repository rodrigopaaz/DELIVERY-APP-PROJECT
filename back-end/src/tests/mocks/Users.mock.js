const allUsers = [
  {
    id: 1,
    name: 'Delivery App Admin',
    email: 'adm@deliveryapp.com',
    password: 'a4c86edecc5aee06eff8fdeda69e0d04',
    role: 'administrator',
  },
  {
    id: 2,
    name: 'Fulana Pereira',
    email: 'fulana@deliveryapp.com',
    password: '3c28d2b0881bf46457a853e0b07531c6',
    role: 'seller',
  },
]; 
  
  const createUser = {
    token: 'fakeToken',
  };
  
  const users = { 
    name: 'Nathália',
    email: 'na@deliveryapp.com',
    password: '--na2@21!!--',
    role: 'seller',
  };

  const idUserUp = {
  id: 2,
  name: 'Fulana Fulana Pereira',
  email: 'fulana@deliveryapp.com',
  password: 'fulana@123',
  role: 'seller',
  // -- senha: md5('fulana@123')
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
  module.exports = {
  allUsers,
  users,
  createUser,
  idUserUp,
  idRemove,
  mockUpdate,
  };
