const { expect } = require('chai');
const sinon = require('sinon');

const productsService = require('../../services/product.service');
const productsModel = require('../../database/models');
const { allProducts, idProduct, idRemove, mockUpdate,
idProductUp, 
createProduct } = require('../mocks/Products.mock');

describe('Verificando a rota de produtos', function () {
describe('listando todos os produtos', function () {
it('retorna a lista completa de produtos', async function () {
// arrange
sinon.stub(productsModel, 'findAll').resolves(allProducts); 
// act
const result = await productsService.findAllProcuctService();
// assert
expect(result.type).to.be.equal(null);
expect(result.message).to.deep.equal(allProducts);
});
});

describe('busca de um produto', function () {
it('retorna um erro caso receba um ID inválido', async function () {
// act
const result = await productsService.findByIdProdService('a'); 
// assert
expect(result.type).to.equal(404); // olhar mensagem de erro
expect(result.message).to.equal('Not Found');
});

it('retorna um erro caso não exista o produto', async function () {
// arrange
sinon.stub(productsModel, 'findByPk').resolves(undefined); 
// act
const result = await productsService.findByIdProdService(1); 
// assert
expect(result.type).to.equal(404); // olhar mensagem de erro
expect(result.message).to.equal('Not Found');
});

it('retorna um produto caso o ID exista', async function () {
// arrange
sinon.stub(productsModel, 'findByPK').resolves(allProducts[0]); 
// act
const result = await productsService.findByIdProdService(1);
// assert
expect(result.type).to.equal(null);
expect(result.message).to.deep.equal(allProducts[0]);
});
});

describe('cadastro de um produto com valores válidos', function () {
it('retorna o ID do produto cadastrado', async function () {
// arrange
sinon.stub(productsModel, 'create').resolves(1);
sinon.stub(productsModel, 'findByPk').resolves(allProducts[1]); 
// act
const result = await productsService.createProcuctService(createProduct);
// assert
expect(result.type).to.equal(null);
expect(result.message).to.deep.equal(createProduct);
});
});

describe('Testa a função atualização do produto', function () {
it('Faz a atualização de um produto pelo id', async function () {
sinon.stub(productsModel, 'findByPk').resolves(idProductUp);
sinon.stub(productsModel, 'update').resolves(mockUpdate);

const product = { 
id: 1, 
name: 'Skol Lata 350ml', 
price: 2.20,
urlImage: 'http://localhost:3001/images/skol_lata_350ml.jpg' };
const responde = await productsService.updateProductService(1, product);

expect(responde.type).to.be.deep.equal(null);
expect(responde.message).to.be.deep.equal({ id: 1, 
name: 'Skol Lata 350ml', 
price: 2.20,
urlImage: 'http://localhost:3001/images/skol_lata_350ml.jpg' });
});
});

describe('Testa a camada service para a função de deletar', function () {
it('Faz a remoção de um produto pelo id', async function () {
const result = { type: null };

sinon.stub(productsModel, 'findByPk').resolves([idRemove]);
sinon.stub(productsModel, 'destroy').resolves(undefined);

const response = await productsService.deleteProductService(idProduct);

expect(response).to.be.deep.equal(result);
});

it('Tenta fazer a remoção de um produto com um id que não existe', async function () {
const result = { type: 404, message: 'Not Found' };

sinon.stub(productsModel, 'findByPk').resolves();
sinon.stub(productsModel, 'destroy').resolves(idRemove);

const response = await productsService.remove(999);

expect(response).to.be.deep.equal(result);
});
});

afterEach(function () {
sinon.restore();
});
});