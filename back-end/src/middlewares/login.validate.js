const validateEmail = (req, res, next) => {
    const { email } = req.body;
    const regex = /\S+@\S+\.\S+/;
    const valideEmail = regex.test(email);
  
    if (!valideEmail) {
      return res.status(400).json({ message: '"email" must be a valid email' });
    }
    
    return next();
  };

  const validatePassword = async (req, res, next) => {
    const { password } = req.body;
  
  if (password.length < 6) {
    return res.status(400).json({
      message: '"password" length must be at least 6 characters long' });
  }
  
  return next();
  };
  
  module.exports = {
    validatePassword,
    validateEmail,
};