const { expect } = require('chai');
const sinon = require('sinon');

const usersService = require('../../services/user.service');
const usersModel = require('../../database/models/User.model');
const { allUsers,
createUser,
idUserUp,
idRemove,
mockUpdate } = require('../mocks/Users.mock');

describe('Verificando a rota de usuários', function () {
describe('listando todos os usuários', function () {
it('retorna a lista completa de usuários', async function () {
// arrange
sinon.stub(usersModel, 'findAll').resolves(allUsers); 
// act
const result = await usersService.findAllUserService();
// assert
expect(result.type).to.be.equal(null);
expect(result.message).to.deep.equal(allUsers);
});
});

describe('busca de um usuário', function () {
it('retorna um erro caso receba um ID inválido', async function () {
// act
const result = await usersService.findByIdUserService('a'); 
// assert
expect(result.type).to.equal(404); // olhar mensagem de erro
expect(result.message).to.equal('Not Found');
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
sinon.stub(usersModel, 'findByPk').resolves(allUsers[0]); 
// act
const result = await usersService.findByIdUserService(1);
// assert
expect(result.type).to.equal(null);
expect(result.message).to.deep.equal(allUsers[0]);
});
});

describe('cadastro de um usuário com valores válidos', function () {
it('retorna o ID do usuário cadastrado', async function () {
// arrange
sinon.stub(usersModel, 'create').resolves(1);
sinon.stub(usersModel, 'findByPk').resolves(allUsers[1]); 
// act
const result = await usersService.createUserService(createUser);
// assert
expect(result.type).to.equal(null);
expect(result.message).to.deep.equal(createUser);
});
});

describe('Testa a função atualização do usuário', function () {
it('Faz a atualização de um usuário pelo id', async function () {
sinon.stub(usersModel, 'findByPk').resolves(idUserUp);
sinon.stub(usersModel, 'update').resolves(mockUpdate);

const product = { 
id: 1, 
name: 'Skol Lata 350ml', 
price: 2.20,
urlImage: 'http://localhost:3001/images/skol_lata_350ml.jpg' };
const responde = await usersService.updateProductService(1, product);

expect(responde.type).to.be.deep.equal(null);
expect(responde.message).to.be.deep.equal({ id: 1, 
name: 'Skol Lata 350ml', 
price: 2.20,
urlImage: 'http://localhost:3001/images/skol_lata_350ml.jpg' });
});
});

describe('Testa a camada service para a função de deletar', function () {
it('Faz a remoção de um usuário pelo id', async function () {
const result = { type: null };

sinon.stub(usersModel, 'findByPk').resolves([idRemove]);
sinon.stub(usersModel, 'destroy').resolves(undefined);

const response = await usersService.deleteProductService(2);

expect(response).to.be.deep.equal(result);
});

it('Tenta fazer a remoção de um usuário com um id que não existe', async function () {
const result = { type: 404, message: 'Not Found' };

sinon.stub(usersModel, 'findByPk').resolves();
sinon.stub(usersModel, 'destroy').resolves(idRemove);

const response = await usersService.remove(999);

expect(response).to.be.deep.equal(result);
});
});

afterEach(function () {
sinon.restore();
});
});
