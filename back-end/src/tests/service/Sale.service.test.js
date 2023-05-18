const { expect } = require('chai');
const sinon = require('sinon');
const { Model } = require('sequelize');

const saleService = require('../../services/sale.service');
const { salesMock } = require('../mocks/Sales.mock');

  describe('Verificando a rota de vendas', function () {
    afterEach(function () {
      sinon.restore();
      });
  describe('listando todos as vendas', function () {
  it('retorna a lista de vendas pelo email', async function () {
  // arrange
  sinon.stub(Model, 'findAll').resolves(salesMock); 
  // act
  const result = await saleService.findUserByEmail('zebirita@email.com');
  // assert
  expect(result).to.deep.equal(salesMock);
  });
  });
});