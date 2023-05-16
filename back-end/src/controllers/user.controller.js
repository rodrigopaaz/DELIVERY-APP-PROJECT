// const {
//   createUserService,
//   findAllUserService,
//   findByIdUserService,
//   updateUserService,
//   deleteUserService,
// } = require('../services/user.service');

const serviceUser = require('../services/user.service');

const createUserController = async (req, res) => {
  try {
    const { name, email, password, role } = req.body;
    const result = await serviceUser.createUserService({
      name,
      email,
      password,
      role,
    });
    return res.status(201).json(result);
  } catch (error) {
    return res.status(409).json(error.message);
  }
};

const findAllUserController = async (_req, res) => {
  const result = await serviceUser.findAllUserService();
  if (!result) {
    return res.status(404).json({ message: 'Not Found' });
  }
  return res.status(200).json(result);
};

const findByIdUserController = async (req, res) => {
  const { id } = req.params;
  const result = await serviceUser.findByIdUserService(id);
  if (!result) {
    return res.status(404).json({ message: 'Not Found' });
  }
  return res.status(200).json(result);
};

const updateUserController = async (req, res) => {
  try {
    const { id } = req.params;
    const { name, email, password, role } = req.body;
    await serviceUser.updateUserService(id, { name, email, password, role });
    return res.status(200).json({ message: 'update complete' });
  } catch (error) {
    return res.status(404).json(error.message);
  }
};

const deleteUserController = async (req, res) => {
  const { id } = req.params;
  await serviceUser.deleteUserService(id);
  return res.status(204).end();
};

module.exports = {
  createUserController,
  findAllUserController,
  findByIdUserController,
  updateUserController,
  deleteUserController,
};
