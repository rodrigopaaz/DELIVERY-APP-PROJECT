const md5 = require('md5');
const { users } = require('../database/models');
const { createToken } = require('../utils/JWT.token');

const loginService = async (email, passwordUncripted) => {
  const password = md5(passwordUncripted);
  const data = await users.findOne({ where: { email, password } });
  if (!data) {
    throw new Error('Invalid login');
  }
  const token = createToken({ data });
  return { token, name: data.name, email, role: data.role };
};

module.exports = {
  loginService,
};
