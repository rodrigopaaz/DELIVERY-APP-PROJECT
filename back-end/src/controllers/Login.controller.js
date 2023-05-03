const {loginService} = require('../services/Login.service');

     const loginController = async (req, res) => {
        const { email, password } = req.body;
        const result = await loginService(email, password);
        if (result.message) {
          return res.status(404).json({message: 'Not Found'});
        }
        return res.status(200).json(result);
      };


module.exports = loginController;