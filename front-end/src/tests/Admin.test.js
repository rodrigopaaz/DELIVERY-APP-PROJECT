import { expect, test } from '@jest/globals';
import { screen } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import RegisterUser from '../components/registerUser';
import AppProvider from '../context/Provider';
import renderWithRouter from './helpers/renderWithRouter';

describe('Testes dos inputs da página de Admin', () => {
  beforeEach(() => renderWithRouter(<AppProvider><RegisterUser /></AppProvider>));
  afterEach(() => {
    localStorage.clear();
  });

  test('Testa se há três inputs e um select', () => {
    localStorage.setItem('user', JSON.stringify({
      email: 'adm@deliveryapp.com',
      name: 'Delivery App Admin',
      role: 'administrator',
      token: 'fakeToken',
    }));
    const inputName = screen.getByPlaceholderText('Nome');
    const inputEmail = screen.getByPlaceholderText('Email');
    const inputPassword = screen.getByPlaceholderText('Password');
    const select = screen.getByRole('option', { name: 'Vendedor' });

    expect(inputName).toBeInTheDocument();
    expect(inputEmail).toBeInTheDocument();
    expect(inputPassword).toBeInTheDocument();
    expect(select).toBeInTheDocument();
  });

  test('Testa se há um botão de cadastrar na tela', () => {
    const button1 = screen.getByRole('button', { name: 'Cadastrar' });

    expect(button1).toBeDisabled();
    expect(button1).toBeInTheDocument();
  });
});

describe('Testes inputs inválidos da página de Admin', () => {
  beforeEach(() => renderWithRouter(<AppProvider><RegisterUser /></AppProvider>));
  afterEach(() => {
    localStorage.clear();
  });
  test('Testa se ao digitar um nome inválido, aparece uma mensagem de erro', () => {
    const button = screen.getByRole('button', { name: 'Cadastrar' });
    const inputName = screen.getByPlaceholderText('Nome');
    const inputEmail = screen.getByPlaceholderText('Email');
    const inputPassword = screen.getByPlaceholderText('Password');

    userEvent.type(inputName, 'Nath');
    userEvent.type(inputEmail, 'teste@testes.com');
    userEvent.type(inputPassword, 'testeteste');

    expect(button).toBeDisabled();
  });

  test('Testa se ao digitar um email inválido, aparece uma mensagem de erro', () => {
    const button = screen.getByRole('button', { name: 'Cadastrar' });
    const inputName = screen.getByPlaceholderText('Nome');
    const inputEmail = screen.getByPlaceholderText('Email');
    const inputPassword = screen.getByPlaceholderText('Password');

    userEvent.type(inputName, 'Nathália Resende');
    userEvent.type(inputEmail, 'testeteste.com');
    userEvent.type(inputPassword, 'testeteste');

    expect(button).toBeDisabled();
  });

  test('Testa se ao digitar um password inválido, aparece uma mensagem de erro', () => {
    const button = screen.getByRole('button', { name: 'Cadastrar' });
    const inputName = screen.getByPlaceholderText('Nome');
    const inputEmail = screen.getByPlaceholderText('Email');
    const inputPassword = screen.getByPlaceholderText('Password');

    userEvent.type(inputName, 'Nathália Andrade');
    userEvent.type(inputEmail, 'teste@teste.com');
    userEvent.type(inputPassword, 'tes');

    expect(button).toBeDisabled();
  });
});
