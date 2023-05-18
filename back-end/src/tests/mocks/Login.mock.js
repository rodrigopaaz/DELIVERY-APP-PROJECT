const biritaEmail = 'zebirita@email.com';
const bititaName = 'Cliente Zé Birita';

const user = {
  id: 3,
  name: bititaName,
  email: biritaEmail,
  password: '1c37466c159755ce1fa181bd247cb925',
  role: 'customer',
};

const userFound = {
  name: bititaName,
  email: 'zebirita@email.com',
  role: 'customer',
};

const loginUser = {
  email: biritaEmail,
  password: '$#zebirita#$',
};

const logedUser = {
  token: 'fakeToken',
  name: bititaName,
  email: biritaEmail,
  role: 'customer',
};

module.exports = {
  user,
  userFound,
  loginUser,
  logedUser,
};