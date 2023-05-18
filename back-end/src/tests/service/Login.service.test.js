const { expect } = require('chai');
const sinon = require('sinon');
const { Model } = require('sequelize');

const jwt = require('jsonwebtoken');
const loginService = require('../../services/Login.service');

const { loginUser, logedUser, user } = require('../mocks/Login.mock');

describe('Verificando a rota de login', function () {
  afterEach(function () {
    sinon.restore();
    });
  it('faz o login com sucesso', async function () {
  // arrange
  sinon.stub(Model, 'findOne').resolves(user);
  sinon.stub(jwt, 'sign').returns('fakeToken');
  // act
  const result = await loginService.loginService(loginUser.email, loginUser.password);
  // assert
  expect(result).to.deep.equal(logedUser);
});
});