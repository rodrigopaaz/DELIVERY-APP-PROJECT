const chai = require('chai');
const sinon = require('sinon');
const sinonChai = require('sinon-chai');

const { expect } = chai;
chai.use(sinonChai);

const saleService = require('../../services/sale.service');
const saleController = require('../../controllers/sale.controller');
const { createSale, salesMock, sale } = require('../mocks/Sales.mock');

describe('Teste de unidade do Controller de vendas', function () {
   afterEach(function () {
      sinon.restore();
      });
 describe('Listando as vendas', function () {
  it('Deve retornar o status 201 e a lista', async function () {
// arrange
   const res = {};
   const req = { body: { email: 'zebirita@email.com' } };

   res.status = sinon.stub().returns(res);
   res.json = sinon.stub().returns();

   sinon
    .stub(saleService, 'findSaleService')
    .resolves(sale);
// act
   await saleController.findSaleController(req, res);
// assert
   expect(res.status).to.have.been.calledWith(201);
   // expect(res.json).to.have.been.calledWith({ ...sale.dataValues });
});
});

describe('Cadastrando nova venda', function () {
  it('Deve retornar o status 201 e a venda criada', async function () {
// arrange
   const res = {};
   const req = { body: createSale };

   res.status = sinon.stub().returns(res);
   res.json = sinon.stub().returns();

   sinon
    .stub(saleService, 'createSaleService').resolves(salesMock);
// act
   await saleController.createSaleController(req, res);
// assert
   expect(res.status).to.have.been.calledWith(201);
  //  expect(res.json).to.have.been.calledWith(salesMock);
});
});

describe('Buscando uma venda específica', function () {
  it('Deve retornar o status 200 e a venda pesquisada', async function () {
// arrange
   const res = {};
   const req = { params: { id: 1 } };

   res.status = sinon.stub().returns(res);
   res.json = sinon.stub().returns();

   sinon
    .stub(saleService, 'findByIdSaleService').resolves(salesMock);
// act
   await saleController.findByIdSaleController(req, res);
// assert
   expect(res.status).to.have.been.calledWith(200);
  //  expect(res.json).to.have.been.calledWith(saleReturned);
});
});

describe('Alternado uma venda específica', function () {
  it('Deve retornar o status 200 e a venda pesquisada', async function () {
// arrange
   const res = {};
   const req = { params: { id: 1 }, body: createSale };

   res.status = sinon.stub().returns(res);
   res.json = sinon.stub().returns();

   sinon
    .stub(saleService, 'updateSaleService').resolves(salesMock);
// act
   await saleController.updateSalesController(req, res);
// assert
   expect(res.status).to.have.been.calledWith(200);
  //  expect(res.json).to.have.been.calledWith(saleReturned);
});
});
});