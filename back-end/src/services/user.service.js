const md5 = require('md5');
const { users } = require('../database/models');

const createUserService = async (info) => {
    try {
        const { name, email, password, role } = info;
        const criptedPassword = md5(password);
        const data = await users.create(
            {
                name,
                email,
                password: criptedPassword,
                role,
            },
        );
        return data;
    } catch (error) {
        throw new Error(error);
    }
};

module.exports = {
    createUserService,
};