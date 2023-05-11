const { expect } = require('chai');
const sinon = require('sinon');
const { Model } = require('sequelize');

const productsService = require('../../services/product.service');
const { allProducts, idProduct, product, idRemove,
idProductUp, 
createProduct } = require('../mocks/Products.mock');

const url = 'http://localhost:3001/images/skol_lata_350ml.jpg';
const skol = 'Skol Lata 250ml';

describe('Verificando a rota de produtos', function () {
describe('listando todos os produtos', function () {
it('retorna a lista completa de produtos', async function () {
// arrange
sinon.stub(Model, 'findAll').resolves(allProducts); 
// act
const result = await productsService.findAllProcuctService();
// assert
// expect(result.type).to.be.equal(null);
expect(result).to.deep.equal(allProducts);
});
});

describe('busca de um produto', function () {
// it('retorna um erro caso receba um ID inválido', async function () {
// // act
// const result = await productsService.findByIdProdService('a'); 
// // assert
// expect(result).to.equal(null);
// });

it('retorna um produto caso o ID exista', async function () {
// arrange
sinon.stub(Model, 'findOne').resolves({
  id: 1,
  name: skol,
  price: 2.20,
  urlImage: url,
  }); 
// act
const result = await productsService.findByIdProdService(1);
// assert
expect(result).to.deep.equal({
  id: 1,
  name: skol,
  price: 2.20,
  urlImage: url,
  });
});
});

describe('cadastro de um produto com valores válidos', function () {
it('retorna o ID do produto cadastrado', async function () {
// arrange
sinon.stub(Model, 'create').resolves(12);
sinon.stub(Model, 'findByPk').resolves(product); 
// act
const result = await productsService.createProcuctService(createProduct);
// assert
expect(result).to.deep.equal(createProduct);
});
});

describe('Testa a função atualização do produto', function () {
it('Faz a atualização de um produto pelo id', async function () {
sinon.stub(Model, 'findByPk').resolves({
  id: 1,
  name: skol,
  price: 2.20,
  urlImage: url,
  });
sinon.stub(Model, 'update').resolves(idProductUp);

const responde = await productsService.updateProductService(1);

expect(responde).to.be.deep.equal(idProductUp);
});
});

describe('Testa a camada service para a função de deletar', function () {
it('Faz a remoção de um produto pelo id', async function () {
  const result = { status: 204 };
  
sinon.stub(Model, 'findByPk').resolves(idRemove);
sinon.stub(Model, 'destroy').resolves(undefined);

const response = await productsService.deleteProductService(idProduct);

expect(response).to.be.deep.equal(result);
});
});

afterEach(function () {
sinon.restore();
});
});