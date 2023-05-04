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

      const getRoleController = async (req, res) => {
        const payload = req.data;
        const { role } = payload.data;
        return res.status(200).json(role);
      };

module.exports = {
  loginController,
  getRoleController,
};