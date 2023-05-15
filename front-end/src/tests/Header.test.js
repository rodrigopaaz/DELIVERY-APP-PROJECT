import { expect, test } from '@jest/globals';
import { screen } from '@testing-library/react';
import React from 'react';
import Header from '../components/Header';
import AppProvider from '../context/Provider';
import renderWithRouter from '../renderWithRouter';

describe('Testes da Header', () => {
  test('Testa se há um link para página de produtos', () => {
    const { history } = renderWithRouter(<AppProvider><Header /></AppProvider>);
    const Link = screen.getByRole('link', { name: 'PRODUTOS' });

    userEvent.click(Link);
    expect(history.location.pathname).toBe('/products');
  });

  // test('Testa se há um link para página de orders', () => {
  //   const { history } = renderWithRouter(<AppProvider><Header /></AppProvider>);
  //   const Link = screen.getByRole('link', { name: 'MEUS PEDIDOS' });

  //   userEvent.click(Link);
  //   expect(history.location.pathname).toBe('/orders');
  // });

  // test('Testa se há o nome no header', () => {
  //   const name = screen.getByTestId('customer_products__element-navbar-user-full-name');

  //   expect(name[0]).toBeInTheDocument();
  // });

  // test('Testa se há um botão de Logout na tela que redireciona para o login', () => {
  //   const { history } = renderWithRouter(<AppProvider><Header /></AppProvider>);
  //   const Link = screen.getByRole('link', { name: 'Sair' });

  //   userEvent.click(Link);
  //   expect(history.location.pathname).toBe('/login');
  // });
});
