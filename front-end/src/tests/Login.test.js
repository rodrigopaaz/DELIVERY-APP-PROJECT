import { expect, test } from '@jest/globals';
import { cleanup, render, screen } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import React from 'react';
import App from '../App';
import Login from '../pages/Login';

describe('Testes da tela de login', () => {
  beforeEach(() => render(<Login />));
  afterEach(cleanup);

  test('Testa se há dois inputs', () => {
    const inputEmail = screen.getAllByPlaceholderText('Email');
    const inputPassword = screen.getAllByPlaceholderText('Password');

    expect(inputEmail).toBeInTheDocument();
    expect(inputPassword).toBeInTheDocument();
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
    userEvent.click(button);

    expect(button).toBeDisabled();
    expect(button).getByLabelText('Usuário inválido');
  });

  test('Testa se clicar no botão de registro é redirecionado', () => {
    const { history } = render(<App />);
    const button = screen.getByRole('button', { name: 'Register' });
    const inputEmail = screen.getAllByPlaceholderText('Email');
    const inputPassword = screen.getAllByPlaceholderText('Password');

    userEvent.type(inputEmail, 'teste@teste.com');
    userEvent.type(inputPassword, 'testeteste');
    userEvent.click(button);

    expect(history.location.pathname).toBe('/register');
  });
});
