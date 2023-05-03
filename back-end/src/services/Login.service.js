const { users } = require('../database/models');

    const loginService = async (email, password) => {
        const data = await users.findOne({ where: { email, password } });
        if (!data) {
            return { message: 'invalid login' };
        }
        return data;
    };

module.exports = {
    loginService,
};