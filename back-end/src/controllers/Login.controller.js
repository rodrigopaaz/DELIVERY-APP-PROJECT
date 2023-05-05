const { loginService } = require('../services/Login.service');

const loginController = async (req, res) => {
  const { email, password } = req.body;
  try {
    const result = await loginService(email, password);

    return res.status(200).json(result);
  } catch (error) {
    return res.status(404).json({ message: 'Not Found' });
  }
};

module.exports = {
  loginController,
};
