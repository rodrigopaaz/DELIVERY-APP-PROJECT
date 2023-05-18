const sinon = require('sinon');
const chai = require('chai');
const chaiHttp = require('chai-http');

chai.use(chaiHttp);

const jwt = require('jsonwebtoken');
const app = require('../../api/app');
const { users } = require('../../database/models');
const { userFound, logedUser } = require('../mocks/Login.mock');
const { createdUser, createUser, allUsersWithoutPassword } = require('../mocks/Users.mock');

const { expect } = chai;

describe('Testa as rotas da tabela Users', function () {
  afterEach(function () {
    (sinon.restore());
  });
  describe('Testa método POST na rota /login', function () {
    it('Usuário consegue fazer login com sucesso', async function () {
      sinon.stub(users, 'findOne').resolves(userFound);
      sinon.stub(jwt, 'sign').returns('fakeToken');

      const httpResponse = await chai
              .request(app)
              .post('/login')
              .send({
                email: 'zebirita@email.com',
                password: '$#zebirita#$',
              });

      expect(httpResponse.status).to.be.equal(200);
      expect(httpResponse.body).to.be.deep.equal(logedUser);
    });

    it('Usuário não possui credenciais válidas', async function () {
      sinon.stub(users, 'findOne').resolves(undefined);

      const httpResponse = await chai
              .request(app)
              .post('/login')
              .send({
                email: 'user_invalid@email.com',
                password: 'password_invalid',
              });

      expect(httpResponse.status).to.be.equal(404);
      expect(httpResponse.body.message).to.be.equal('Not Found');
    });
  });

  describe('Testa método POST na rota /users', function () {
    it('Usuário consegue se registrar com sucesso', async function () {
      sinon.stub(users, 'findOne').onCall(0).resolves(undefined).onCall(1)
      .resolves(userFound);
      sinon.stub(users, 'create');
      sinon.stub(jwt, 'sign').returns('fakeToken');

      const httpResponse = await chai
              .request(app)
              .post('/register')
              .send(createUser);

      expect(httpResponse.status).to.be.equal(201);
      expect(httpResponse.body).to.be.deep.equal(createdUser);
    });

    it('Usuário tenta se registrar com credenciais já cadastradas', async function () {
      sinon.stub(users, 'findOne').resolves(userFound);

      const httpResponse = await chai
              .request(app)
              .post('/register')
              .send({
                name: 'Cliente Zé Birita',
                email: 'zebirita@email.com',
                password: '$#zebirita#$',
              });

      expect(httpResponse.status).to.be.equal(409);
      expect(httpResponse.body).to.be.deep.equal('User alredy exists');
    });
  });

  describe('Testa método GET na rota /users', function () {
    it('É possível buscar por todas as pessoas cadastradas', async function () {
      sinon.stub(users, 'findAll').resolves(allUsersWithoutPassword);
      sinon.stub(jwt, 'verify').returns('fakeToken');

      const httpResponse = await chai
              .request(app)
              .get('/user')
              .set('authorization', 'fakeToken');

      expect(httpResponse.status).to.be.equal(200);
      expect(httpResponse.body).to.be.deep.equal(allUsersWithoutPassword);
    });
  });
});