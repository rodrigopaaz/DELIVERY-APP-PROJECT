const { expect } = require('chai');
const sinon = require('sinon');
const { Model } = require('sequelize');

const jwt = require('jsonwebtoken');
const usersService = require('../../services/user.service');
const {
createUser,
idUserUp,
idRemove,
createdUser, 
idUserUpdated,
userToUpdate, 
allUsersWithoutPassword } = require('../mocks/Users.mock');

describe('Verificando a rota de usuários', function () {
  afterEach(function () {
    sinon.restore();
    });
describe('listando todos os usuários', function () {
it('retorna a lista completa de usuários', async function () {
// arrange
sinon.stub(Model, 'findAll').resolves(allUsersWithoutPassword);
// act
const result = await usersService.findAllUserService();
// assert
expect(result).to.deep.equal(allUsersWithoutPassword);
});
});

describe('busca de um usuário', function () {
it('retorna um erro caso receba um ID inválido', async function () {
  // arrange
sinon.stub(Model, 'findByPk').resolves(null);
// act
const result = await usersService.findByIdUserService('a'); 
// assert
expect(result).to.equal(null);
});

// it('retorna um erro caso não exista o usuário', async function () {
// // arrange
// sinon.stub(usersModel, 'findByPk').resolves(undefined); 
// // act
// const result = await usersService.findByIdUserService(1); 
// // assert
// expect(result.type).to.equal('PRODUCT_NOT_FOUND'); // olhar mensagem de erro
// expect(result.message).to.equal('Product not found');
// });

it('retorna um usuário caso o ID exista', async function () {
// arrange
sinon.stub(Model, 'findByPk').resolves({
  id: 1,
  name: 'Delivery App Admin',
  email: 'adm@deliveryapp.com',
  password: 'a4c86edecc5aee06eff8fdeda69e0d04',
  role: 'administrator',
}); 
// act
const result = await usersService.findByIdUserService(1);
// assert
expect(result).to.deep.equal({
  id: 1,
  name: 'Delivery App Admin',
  email: 'adm@deliveryapp.com',
  password: 'a4c86edecc5aee06eff8fdeda69e0d04',
  role: 'administrator',
});
});
});

describe('cadastro de um usuário com valores válidos', function () {
it('retorna o ID do usuário cadastrado', async function () {
// arrange
sinon.stub(Model, 'create').resolves(createdUser);
sinon.stub(Model, 'findOne').resolves(null);
sinon.stub(jwt, 'sign').returns('fakeToken');
// act
const result = await usersService.createUserService(createUser);
// assert
expect(result).to.deep.equal(createdUser);
});
});

describe('Testa a função atualização do usuário', function () {
it('Faz a atualização de um usuário pelo id', async function () {
sinon.stub(Model, 'findByPk').resolves(idUserUp);
sinon.stub(Model, 'update').resolves(idUserUpdated);

const responde = await usersService.updateUserService(2, userToUpdate);

expect(responde).to.be.deep.equal(idUserUpdated);
});
});

describe('Testa a camada service para a função de deletar', function () {
it('Faz a remoção de um usuário pelo id', async function () {
const result = { status: 204 };

sinon.stub(Model, 'findByPk').resolves(idRemove);
sinon.stub(Model, 'destroy').resolves(undefined);

const response = await usersService.deleteUserService(2);

expect(response).to.be.deep.equal(result);
});
});
});
