import { expect, test } from '@jest/globals';
import { screen } from '@testing-library/react';
import React from 'react';
import { act } from 'react-dom/test-utils';
import Header from '../components/Header';
import AppProvider from '../context/Provider';
import renderWithRouter from '../renderWithRouter';

const dataTest = 'customer_products__element-navbar-link-orders';

describe('Testes da Header da página de produtos', () => {
  beforeEach(() => localStorage.setItem('user', JSON.stringify({
    name: 'Cliente Zé Birita',
    email: 'zebirita@email.com',
    role: 'customer',
    token: 'fakeToken',
  })));
  afterEach(() => {
    localStorage.clear();
  });

  test('Testa se há um link para página de produtos', async () => {
    const { history } = renderWithRouter(<AppProvider><Header /></AppProvider>);
    act(() => {
      history.push('/products');
    });
    const Link = screen.getByTestId('customer_products__element-navbar-link-products');

    expect(Link).toBeInTheDocument();
  });

  test('Testa se há um link para página de orders', () => {
    const { history } = renderWithRouter(<AppProvider><Header /></AppProvider>);
    act(() => {
      history.push('/orders');
    });
    const Link = screen
      .getByTestId(dataTest);

    expect(Link).toBeInTheDocument();
  });

  test('Testa se há um botão de Logout na tela que redireciona para o login', () => {
    const { history } = renderWithRouter(<AppProvider><Header /></AppProvider>);
    act(() => {
      history.push('/login');
    });
    const button = screen.getByRole('button', { name: 'Sair' });

    expect(button).toBeInTheDocument();
  });
});

describe('Testes da Header da página de Admin', () => {
  beforeEach(() => localStorage.setItem('user', JSON.stringify({
    email: 'adm@deliveryapp.com',
    name: 'Delivery App Admin',
    role: 'administrator',
    token: 'fakeToken',
  })));
  afterEach(() => {
    localStorage.clear();
  });

  test('Testa se há um link para página de Admin/manage', async () => {
    const { history } = renderWithRouter(<AppProvider><Header /></AppProvider>);
    act(() => {
      history.push('/admin/manage');
    });
    const Link = screen.getByTestId(dataTest);

    expect(Link).toBeInTheDocument();
  });

  test('Testa se há um botão de Sair na tela que redireciona para o login', () => {
    const { history } = renderWithRouter(<AppProvider><Header /></AppProvider>);
    act(() => {
      history.push('/login');
    });
    const button1 = screen.getByRole('button', { name: 'Sair' });

    expect(button1).toBeInTheDocument();
  });
});

describe('Testes da Header da página do vendedor', () => {
  beforeEach(() => localStorage.setItem('user', JSON.stringify({
    email: 'fulana@deliveryapp.com',
    name: 'Fulana Pereira',
    role: 'seller',
    token: 'fakeToken',
  })));
  afterEach(() => {
    localStorage.clear();
  });

  test('Testa se há um link para página de /seller/orders', async () => {
    const { history } = renderWithRouter(<AppProvider><Header /></AppProvider>);
    act(() => {
      history.push('/seller/orders');
    });
    const Link = screen.getByTestId('customer_products__element-navbar-link-orders');

    expect(Link).toBeInTheDocument();
  });

  test('Testa se há um botão de Sair na tela que redireciona para o login', () => {
    const { history } = renderWithRouter(<AppProvider><Header /></AppProvider>);
    act(() => {
      history.push('/login');
    });
    const button2 = screen.getByRole('button', { name: 'Sair' });

    expect(button2).toBeInTheDocument();
  });
});
