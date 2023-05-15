import { expect, test } from '@jest/globals';
import { cleanup, screen } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import React from 'react';
import Login from '../pages/Login';
import renderWithRouter from '../renderWithRouter';

describe('Testes da tela de login', () => {
  beforeEach(() => renderWithRouter(<Login />));
  afterEach(cleanup);

  test('Testa se há dois inputs', () => {
    const inputEmail = screen.getAllByPlaceholderText('Email');
    const inputPassword = screen.getAllByPlaceholderText('Password');

    expect(inputEmail[0]).toBeInTheDocument();
    expect(inputPassword[0]).toBeInTheDocument();
  });

  test('Testa se há um botão de login na tela', () => {
    const button = screen.getByRole('button', { name: 'Login' });

    expect(button).toBeDisabled();
    expect(button).toBeInTheDocument();
  });

  test('Testa se há um botão de Register na tela', () => {
    const button = screen.getByRole('button', { name: 'Register' });

    expect(button).toBeInTheDocument();
  });

  test('Testa se ao digitar um email inválido, aparece uma mensagem de erro', () => {
    const button = screen.getByRole('button', { name: 'Login' });
    const inputEmail = screen.getAllByPlaceholderText('Email');
    const inputPassword = screen.getAllByPlaceholderText('Password');

    userEvent.type(inputEmail, 'testeteste.com');
    userEvent.type(inputPassword, 'testeteste');

    expect(button).toBeDisabled();
  });
});

describe('Testes da tela de login', () => {
  test('Testa se clicar no botão de registro é redirecionado', () => {
    const { history } = renderWithRouter(<Login />);
    const button = screen.getByRole('button', { name: 'Register' });

    userEvent.click(button);
    console.log(history);
    expect(history.location.pathname).toBe('/register');
  });
});
