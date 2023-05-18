const fulanaEmail = 'fulana@deliveryapp.com';
const fulanaPassword = 'fulana@123';
const fulanaName = 'Fulana Pereira';

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
    name: fulanaName,
    email: fulanaEmail,
    password: '3c28d2b0881bf46457a853e0b07531c6',
    role: 'seller',
  },
];

const allUsersWithoutPassword = [
  {
    id: 1,
    name: 'Delivery App Admin',
    email: 'adm@deliveryapp.com',
    role: 'administrator',
  },
  {
    id: 2,
    name: fulanaName,
    email: fulanaEmail,
    role: 'seller',
  },
];

  const createUser = {
    name: 'Fulana Pereira da Silva',
    email: fulanaEmail,
    password: '3c28d2b0881bf46457a853e0b07531c6',
    role: 'seller',
  };
  
  const createdUser = {
    token: 'fakeToken',
    name: 'Fulana Pereira da Silva',
    email: fulanaEmail,
    role: 'seller',
  };
  
  const users = { 
    name: 'Nathália Andrade',
    email: 'na@deliveryapp.com',
    password: '--na2@21!!--',
    role: 'seller',
  };

  const userToUpdate = {
    name: 'Fulana Fulana Pereira',
    email: fulanaEmail,
    password: fulanaPassword,
    role: 'seller',
  };

  const idUserUp = {
  id: 2,
  name: 'Fulana Fulana Pereira',
  email: fulanaEmail,
  password: fulanaPassword,
  role: 'seller',
  // -- senha: md5(fulanaPassword)
  };

  const idUserUpdated = {
    id: 2,
    name: fulanaName,
    email: fulanaEmail,
    password: fulanaPassword,
    role: 'seller',
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
  createdUser,
  idUserUpdated,
  userToUpdate,
  allUsersWithoutPassword,
  };
