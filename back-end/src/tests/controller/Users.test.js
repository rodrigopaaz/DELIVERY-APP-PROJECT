const chai = require('chai');
const sinon = require('sinon');
const sinonChai = require('sinon-chai');

const { expect } = chai;
chai.use(sinonChai);

const usersService = require('../../services/user.service');
const usersController = require('../../controllers/user.controller');
const { allUsers, createUser, idUserUp, users } = require('../mocks/Users.mock');

describe('Teste de unidade do Controller', function () {
  afterEach(function () {
    sinon.restore();
    });
describe('Listando os usuários', function () {
it('Deve retornar o status 200 e a lista', async function () {
// arrange
const res = {};
const req = {};

res.status = sinon.stub().returns(res);
res.json = sinon.stub().returns();

sinon
.stub(usersService, 'findAllUserService')
.resolves(allUsers);
// act
await usersController.findAllUserController(req, res);
// assert
expect(res.status).to.have.been.calledWith(200);
expect(res.json).to.have.been.calledWith(allUsers);
});
});

describe('Buscando um usuário pelo id', function () {
it('deve responder com 200 e os dados do banco quando existir', async function () {
// Arrange
const res = {};
const req = {
params: { id: 1 },
};

res.status = sinon.stub().returns(res);
res.json = sinon.stub().returns();

sinon
.stub(usersService, 'findByIdUserService')
.resolves({
  id: 1,
  name: 'Delivery App Admin',
  email: 'adm@deliveryapp.com',
  password: 'a4c86edecc5aee06eff8fdeda69e0d04',
  role: 'administrator',
});

// Act
await usersController.findByIdUserController(req, res);
// Assert
expect(res.status).to.have.been.calledWith(200);
expect(res.json).to.have.been.calledWith({
  id: 1,
  name: 'Delivery App Admin',
  email: 'adm@deliveryapp.com',
  password: 'a4c86edecc5aee06eff8fdeda69e0d04',
  role: 'administrator',
});
});

it('ao passar um id inválido deve retornar um erro', async function () {
// Arrange
const res = {};
const req = {
params: { id: 'abc' }, 
};

res.status = sinon.stub().returns(res);
res.json = sinon.stub().returns();

sinon
.stub(usersService, 'findByIdUserService')
.resolves(null);
// Act
await usersController.findByIdUserController(req, res);
// Assert
expect(res.status).to.have.been.calledWith(404);
expect(res.json).to.have.been.calledWith({ message: 'Not Found' });
});
});

describe('Cadastrando um novo usuário', function () {
it('ao enviar dados válidos deve salvar com sucesso!', async function () {
// Arrange
const res = {};
const req = {
body: users,
};

res.status = sinon.stub().returns(res);
res.json = sinon.stub().returns();

sinon
.stub(usersService, 'createUserService')
.resolves(createUser);

// Act
await usersController.createUserController(req, res);
// Assert
expect(res.status).to.have.been.calledWith(201);
expect(res.json).to.have.been.calledWith(createUser);
});
});

describe('Testa a camada controller para a função de atualização', function () {
it('Faz a atualização de um usuário pelo id', async function () {
  const res = {};
  const req = { params: { id: 1 }, body: idUserUp };

res.status = sinon.stub().returns(res);
res.json = sinon.stub().returns();

sinon.stub(usersService, 'updateUserService').resolves(idUserUp);

await usersController.updateUserController(req, res);

expect(res.status).to.have.been.calledWith(200);
expect(res.json).to.have.been.calledWith({
  message: 'update complete',
});
});
});

describe('Testa a camada controller para a função de deletar', function () {
it('Faz a remoção de um usuário através do id', async function () {
const res = {};
const req = { params: { id: 1 } };

res.status = sinon.stub().returns(res);
res.end = sinon.stub().returns();

sinon.stub(usersService, 'deleteUserService').resolves({ type: null });

await usersController.deleteUserController(req, res);

expect(res.status).to.have.been.calledWith(204);
});

it('Faz a remoção de um usuário através do id que não existe', async function () {
const res = {};
const req = { params: { id: 999 } };

res.status = sinon.stub().returns(res);
res.json = sinon.stub().returns();

sinon.stub(usersService, 'deleteUserService').resolves();

await usersController.deleteUserController(req, res);

expect(res.status).to.have.been.calledWith(404);
// expect(res.json.message).to.be.equal('Not Found');
});
});
});