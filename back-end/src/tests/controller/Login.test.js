const chai = require('chai');
const sinon = require('sinon');
const sinonChai = require('sinon-chai');

const { expect } = chai;
chai.use(sinonChai);

const loginService = require('../../services/Login.service');
const loginController = require('../../controllers/Login.controller');

describe('Testando a rota Post /login, com sucesso', function () {
  it('Testando /login, onde deve retornar um token e enviar um status 200', async function () {
    const res = {};
    const req = {};

    res.status = sinon.stub().returns(res);
    res.json = sinon.stub().returns();

    sinon
     .stub(loginService, 'loginService')
     .resolves({ type: null, message: 'fakeToken' });

    await loginController.loginController(req, res);

    expect(res.status).to.have.been.calledWith(200);
    expect(res.json).to.have.been.calledWith('fakeToken');
  });

  afterEach(function () {
    (sinon.restore());
  });
});

describe('Testando /login, em caso de falha', function () {
  it('Testando caso não haja um email, onde deve retornar um status 400 e uma mensagem de erro', async function () {
    const res = {};
    const req = {};

    res.status = sinon.stub().returns(res);
    res.json = sinon.stub().returns();

    sinon
    .stub(loginService, 'loginService')
    .resolves({ type: null, message: '"email" must be a valid email' });

    await loginController.loginController(req, res);

   expect(res.status).to.have.been.calledWith(400);
   expect(res.json).to.have.been.calledWith('"email" must be a valid email');
   });

   it('Testando o email seja inválido, onde deve retornar um status 404 e uma mensagem de erro', async function () {
    const res = {};
    const req = {};

    res.status = sinon.stub().returns(res);
    res.json = sinon.stub().returns();

    sinon
    .stub(loginService, 'loginService')
    .resolves({ type: null, message: 'Not found' });

    await loginController.loginController(req, res);

   expect(res.status).to.have.been.calledWith(404);
   expect(res.json).to.have.been.calledWith('Not found');
   });

   it('Testando caso não haja um password, onde deve retornar um status 404 e uma mensagem de erro', async function () {
    const res = {};
    const req = {};

    res.status = sinon.stub().returns(res);
    res.json = sinon.stub().returns();

    sinon
    .stub(loginService, 'loginService')
    .resolves({ type: null, message: 'Not found' });

    await loginController.loginController(req, res);

   expect(res.status).to.have.been.calledWith(404);
   expect(res.json).to.have.been.calledWith('Not found');
   });

   it('Testando o password com menos de 6 caracteres, onde deve retornar um status 400 e uma mensagem de erro', async function () {
    const res = {};
    const req = {};

    res.status = sinon.stub().returns(res);
    res.json = sinon.stub().returns();

    sinon
    .stub(loginService, 'loginService')
    .resolves({ type: null, message: '"password" length must be at least 6 characters long' });

  await loginController.loginController(req, res);

   expect(res.status).to.have.been.calledWith(400);
   expect(res.json).to.have.been.calledWith('"password" length must be at least 6 characters long');
   });

   afterEach(function () {
    (sinon.restore());
  });
});    