import { expect, test } from '@jest/globals';
import { screen } from '@testing-library/react';
import React from 'react';
import { act } from 'react-dom/test-utils';
import Header from '../components/Header';
import AppProvider from '../context/Provider';
import renderWithRouter from '../renderWithRouter';

const email = 'teste@teste.com';

describe('Testes da Header', () => {
  afterEach(() => {
    localStorage.clear();
  });

  test('Testa se há um link para página de produtos', () => {
    localStorage.setItem('user', JSON.stringify([{
      email,
    }]));
    const { history } = renderWithRouter(<AppProvider><Header /></AppProvider>);
    act(() => {
      history.push('/products');
    });
    const Link = screen.getByRole('link', { name: 'PRODUTOS' });

    expect(Link).toBeInTheDocument();
  });

  test('Testa se há um link para página de orders', () => {
    localStorage.setItem('user', JSON.stringify([{
      email,
    }]));
    const { history } = renderWithRouter(<AppProvider><Header /></AppProvider>);
    act(() => {
      history.push('/orders');
    });
    const Link = screen.getByRole('link', { name: 'MEUS PEDIDOS' });

    expect(Link).toBeInTheDocument();
  });

  // test('Testa se há o nome no header', () => {
  //   const name = screen.getByTestId('customer_products__element-navbar-user-full-name');

  //   expect(name[0]).toBeInTheDocument();
  // });

  test('Testa se há um botão de Logout na tela que redireciona para o login', () => {
    localStorage.setItem('user', JSON.stringify([{
      email,
    }]));
    const { history } = renderWithRouter(<AppProvider><Header /></AppProvider>);
    act(() => {
      history.push('/login');
    });
    const button = screen.getByRole('button', { name: 'Sair' });

    expect(button).toBeInTheDocument();
  });
});
