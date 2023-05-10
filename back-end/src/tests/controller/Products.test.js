const chai = require('chai');
const sinon = require('sinon');
const sinonChai = require('sinon-chai');

const { expect } = chai;
chai.use(sinonChai);

const productsService = require('../../services/product.service');
const productsController = require('../../controllers/products.controller');
const { product, createProduct, idProductUp } = require('../mocks/Products.mock');

const skol = 'Skol Lata 250ml';
const url = 'http://localhost:3001/images/skol_lata_350ml.jpg';

describe('Teste de unidade do Controller', function () {
 describe('Listando os produtos', function () {
  it('Deve retornar o status 200 e a lista', async function () {
// arrange
   const res = {};
   const req = {};

   res.status = sinon.stub().returns(res);
   res.json = sinon.stub().returns();

   sinon
    .stub(productsService, 'findAllProcuctService')
    .resolves({ type: null,
message: [
      {
        id: 1,
        name: skol,
        price: 2.2,
        urlImage: url,
      },
      {
        id: 2,
        name: 'Heineken 600ml',
        price: 7.5,
        urlImage: 'http://localhost:3001/images/heineken_600ml.jpg',
      },
    ] });
// act
   await productsController.findAllProcuctController(req, res);
// assert
   expect(res.status).to.have.been.calledWith(200);
   expect(res.json).to.have.been.calledWith([
    {
      id: 1,
      name: skol,
      price: 2.2,
      urlImage: url,
    },
    {
      id: 2,
      name: 'Heineken 600ml',
      price: 7.5,
      urlImage: 'http://localhost:3001/images/heineken_600ml.jpg',
    },
  ]);
});
});

 describe('Buscando uma produto pelo id', function () {
  it('deve responder com 200 e os dados do banco quando existir', async function () {
// Arrange
  const res = {};
  const req = {
   params: { id: 1 },
  };

  res.status = sinon.stub().returns(res);
  res.json = sinon.stub().returns();

  sinon
   .stub(productsService, 'findByIdProdService')
   .resolves({ type: null,
     message: {
       id: 1,
       name: skol,
       price: 2.20,
      urlImage: url,
} });

// Act
   await productsController.findByIdProdController(req, res);
// Assert
   expect(res.status).to.have.been.calledWith(200);
   expect(res.json).to.have.been.calledWith({
    id: 1,
    name: skol,
    price: 2.20,
    urlImage: 'http://localhost:3001/images/skol_lata_350ml.jpg',
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
   .stub(productsService, 'findByIdProdService')
   .resolves({ type: 404, message: 'Not Found' });
// Act
  await productsController.findByIdProdController(req, res);
// Assert
  expect(res.status).to.have.been.calledWith(404);
  expect(res.json).to.have.been.calledWith({ message: 'Not Found' });
});
});

 describe('Cadastrando um novo produto', function () {
  it('ao enviar dados válidos deve salvar com sucesso!', async function () {
// Arrange
const res = {};
const req = {
body: product,
};

res.status = sinon.stub().returns(res);
res.json = sinon.stub().returns();

sinon
.stub(productsService, 'createProcuctService')
.resolves({ type: null, message: createProduct });

// Act
await productsController.createProcuctController(req, res);
// Assert
expect(res.status).to.have.been.calledWith(201);
expect(res.json).to.have.been.calledWith(createProduct);
});
});

describe('Testa a camada controller para a função de atualização', function () {
it('Faz a atualização de um produto pelo id', async function () {
const req = { params: { id: 1 }, body: idProductUp };
const res = {};

res.status = sinon.stub().returns(res);
res.json = sinon.stub().returns();

sinon.stub(productsService, 'updateProductService').resolves({ type: null, message: idProductUp });

await productsController.updateProductController(req, res);

expect(res.status).to.have.been.calledWith(200);
expect(res.json).to.have.been.calledWith(idProductUp);
});
});

describe('Testa a camada controller para a função de deletar', function () {
it('Faz a remoção de um produto através do id', async function () {
const res = {};
const req = { params: { id: 1 } };

res.status = sinon.stub().returns(res);
res.end = sinon.stub().returns();

sinon.stub(productsService, 'deleteProductService').resolves({ type: null });

await productsController.deleteProductController(req, res);

expect(res.status).to.have.been.calledWith(204);
});

// it('Faz a remoção de um produto através do id que não existe', async function () {
// const req = { params: { id: 999 } };
// const res = {};

// res.status = sinon.stub().returns(res);
// res.json = sinon.stub().returns();

// sinon.stub(productsService, 'deleteProductService')
//  .resolves({});

// await productsController.deleteProductController(req, res);

// expect(res.status).to.have.been.calledWith(404);
// expect(res.json).to.have.been.calledWith({ });
// });
});

afterEach(function () {
sinon.restore();
});
});
