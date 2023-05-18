import { expect, test } from '@jest/globals';
import { cleanup, screen } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import React from 'react';
import AppProvider from '../context/Provider';
import Login from '../pages/Login';
import renderWithRouter from './helpers/renderWithRouter';

describe('Testes da tela de login', () => {
  beforeEach(() => renderWithRouter(<AppProvider><Login /></AppProvider>));

  afterEach(cleanup);

  test('Testa se há dois inputs para o cliente', () => {
    localStorage.setItem('user', JSON.stringify({
      name: 'Cliente Zé Birita',
      email: 'zebirita@email.com',
      role: 'customer',
      token: 'fakeToken',
    }));
    const inputEmail = screen.getAllByPlaceholderText('Email');
    const inputPassword = screen.getAllByPlaceholderText('Password');

    expect(inputEmail[0]).toBeInTheDocument();
    expect(inputPassword[0]).toBeInTheDocument();
  });

  test('Testa se há dois inputs para o vendedor', () => {
    localStorage.setItem('user', JSON.stringify({
      email: 'fulana@deliveryapp.com',
      name: 'Fulana Pereira',
      role: 'seller',
      token: 'fakeToken',
    }));
    const inputEmail = screen.getAllByPlaceholderText('Email');
    const inputPassword = screen.getAllByPlaceholderText('Password');

    expect(inputEmail[0]).toBeInTheDocument();
    expect(inputPassword[0]).toBeInTheDocument();
  });

  test('Testa se há dois inputs para o admin', () => {
    localStorage.setItem('user', JSON.stringify({
      email: 'adm@deliveryapp.com',
      name: 'Delivery App Admin',
      role: 'administrator',
      token: 'fakeToken',
    }));
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

  test('Testa se ao digitar um password inválido, aparece uma mensagem de erro', () => {
    const button = screen.getByRole('button', { name: 'Login' });
    const inputEmail = screen.getAllByPlaceholderText('Email');
    const inputPassword = screen.getAllByPlaceholderText('Password');

    userEvent.type(inputEmail, 'teste@teste.com');
    userEvent.type(inputPassword, 'test');

    expect(button).toBeDisabled();
  });
});

describe('Testes da tela de login', () => {
  test('Testa se clicar no botão de registro é redirecionado', () => {
    const { history } = renderWithRouter(<AppProvider><Login /></AppProvider>);
    const button = screen.getByRole('button', { name: 'Register' });

    userEvent.click(button);
    expect(history.location.pathname).toBe('/register');
  });
});
