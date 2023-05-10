import { expect, test } from '@jest/globals';
import { render, screen } from '@testing-library/react';
import React from 'react';
import { act } from 'react-dom/test-utils';
import Header from '../components/Header';

describe('Testes da Header', () => {
  test('Testa se há um link para página de produtos', () => {
    const { history } = render(<Header />);
    act(() => {
      history.push('/products');
    });

    const text = screen.getByText(/PRODUTOS/i);

    expect(text).toBeInTheDocument();
  });

  test('Testa se há um link para página de orders', () => {
    const { history } = render(<Header />);
    act(() => {
      history.push('/orders');
    });

    const text = screen.getByText(/MEUS PEDIDOS/i);

    expect(text).toBeInTheDocument();
  });

  // test('Testa se há o nome no header', () => {
  //   const text = screen.getByText(/MEUS PEDIDOS/i);

  //   expect(text).toBeInTheDocument();
  // });

  test('Testa se há um botão de Logout na tela que redireciona para o login', () => {
    const { history } = render(<Header />);
    act(() => {
      history.push('/login');
    });
    const button = screen.getByRole('button', { name: 'Sair' });

    expect(button).toBeInTheDocument();
  });
});
