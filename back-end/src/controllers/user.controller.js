const {
  createUserService,
  findAllUserService,
  findByIdUserService,
  updateUserService,
  deleteUserService,
} = require('../services/user.service');

const createUserController = async (req, res) => {
  try {
    const { name, email, password } = req.body;
    const result = await createUserService({
      name,
      email,
      password,
      role: 'customer',
    });
    res.status(201).json(result);
  } catch (error) {
    res.status(409).json(error.message);
  }
};

const findAllUserController = async (_req, res) => {
  const result = await findAllUserService();
  if (!result) {
    res.status(404).json({ message: 'Not Found' });
  }
  res.status(200).json(result);
};

const findByIdUserController = async (req, res) => {
  const { id } = req.params;
  const result = await findByIdUserService(id);
  if (!result) {
    res.status(404).json({ message: 'Not Found' });
  }
  res.status(200).json(result);
};

const updateUserController = async (req, res) => {
  const { id } = req.params;
  const { name, email, password, role } = req.body;
  const result = await updateUserService(id, { name, email, password, role });
  res.status(200).json(result);
};

const deleteUserController = async (req, res) => {
  const { id } = req.params;
  await deleteUserService(id);
  res.status(204).end();
};

module.exports = {
  createUserController,
  findAllUserController,
  findByIdUserController,
  updateUserController,
  deleteUserController,
};
