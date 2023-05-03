const { users } = require('../database/models');
const { createToken } = require('../utils/JWT.token');

    const loginService = async (email, password) => {
        const data = await users.findOne({ where: { email, password } });
        if (!data) {
            return { message: 'invalid login' };
        }
        const token = await createToken({ data });
        return token;
    };

module.exports = {
    loginService,
};