const { createUserService } = require('../services/user.service');

const createUserController = async (req, res) => {
    const { name, email, password } = req.body;
    const result = await createUserService({
        name,
        email,
        password,
        role: 'customer',
    });
    res.status(200).json(result);
};

module.exports = {
    createUserController,
};