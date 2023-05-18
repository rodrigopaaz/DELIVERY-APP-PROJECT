const chai = require('chai');
const sinon = require('sinon');
const sinonChai = require('sinon-chai');

const { expect } = chai;
chai.use(sinonChai);

const loginService = require('../../services/Login.service');
const loginController = require('../../controllers/Login.controller');
const validateEmail = require('../../middlewares/login.validate');
const validatePassword = require('../../middlewares/login.validate');

const emailZe = 'zebirita@email.com';
const senhaZe = '$#zebirita#$';

describe('Testando a rota Post /login, com sucesso', function () {
  afterEach(function () {
    (sinon.restore());
  });

  it('Testando /login, onde deve retornar um token e enviar um status 200', async function () {
    const res = {};
    const req = { body: {
      email: emailZe,
      password: senhaZe,
    } };

    res.status = sinon.stub().returns(res);
    res.json = sinon.stub().returns();

    sinon
     .stub(loginService, 'loginService')
     .resolves({
      token: 'fakeToken',
      name: 'Cliente Zé Birita',
      email: emailZe,
      role: 'customer',
   });

    await loginController.loginController(req, res);

    expect(res.status).to.have.been.calledWith(200);
    expect(res.json).to.have.been.calledWith({
      token: 'fakeToken',
      name: 'Cliente Zé Birita',
      email: emailZe,
      role: 'customer',
    });
  });

  describe('Testando /login, em caso de falha', function () {
    it('Testando caso não haja um email, retorna um status 400 e um erro', async function () {
      const res = {};
      const req = { body: {
        password: senhaZe,
      } };
  
      res.status = sinon.stub().returns(res);
      res.json = sinon.stub().returns();
  
      // sinon
      // .stub(loginService, 'loginService')
      // .resolves({ message: '"email" must be a valid email' });
  
      await validateEmail.validateEmail(req, res);
  
     expect(res.status).to.have.been.calledWith(400);
     expect(res.json).to.have.been.calledWith({ message: '"email" must be a valid email' });
     });
  
     it('Testando o email seja inválido, retorna status 400 e um erro', async function () {
      const res = {};
      const req = { body: {
        email: 'zegmail.com',
        password: senhaZe,
      } };
  
      res.status = sinon.stub().returns(res);
      res.json = sinon.stub().returns();
  
      // sinon
      // .stub(loginService, 'loginService')
      // .resolves('Not found');
  
      await validateEmail.validateEmail(req, res);
  
     expect(res.status).to.have.been.calledWith(400);
     expect(res.json).to.have.been.calledWith({ message: '"email" must be a valid email' });
     });
  
     it('Testando caso não haja uma senha, retorna status 400 e um erro', async function () {
      const res = {};
      const req = { body: {
        email: emailZe,
      } };
  
      res.status = sinon.stub().returns(res);
      res.json = sinon.stub().returns();
  
      // sinon
      // .stub(loginService, 'loginService')
      // .resolves({ type: null, message: 'Not found' });
  
      await validatePassword.validatePassword(req, res);
  
     expect(res.status).to.have.been.calledWith(400);
     expect(res.json).to.have.been.calledWith({
      message: '"password" is required' });
     });
  
     it('Testando a senha menor de 6 caracteres, retorna status 400 e um erro', async function () {
      const res = {};
      const req = { body: {
        email: emailZe,
        password: '$#z',
      } };
  
      res.status = sinon.stub().returns(res);
      res.json = sinon.stub().returns();
  
      sinon
      .stub(loginService, 'loginService')
      .resolves({ type: null, message: '"password" length must be at least 6 characters long' });
  
      await validatePassword.validatePassword(req, res);
  
     expect(res.status).to.have.been.calledWith(400);
     expect(res.json).to.have.been.calledWith({
      message: '"password" length must be at least 6 characters long' });
     });
  
     afterEach(function () {
      (sinon.restore());
    });
  });    
});
