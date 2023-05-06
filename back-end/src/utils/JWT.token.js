const jwt = require('jsonwebtoken');
const fs = require('fs');

const jwtKey = fs.readFileSync('./jwt.evaluation.key', { encoding: 'utf-8' });

const secret = jwtKey || 'secret_key';

const JWT_CONFIG = {
  algorithm: 'HS256',
  expiresIn: '8d',
};

const createToken = ({ name, email, role }) => jwt.sign({ name, email, role }, secret, JWT_CONFIG);

const verifyToken = (token) => jwt.verify(token, secret);

module.exports = { createToken, verifyToken };