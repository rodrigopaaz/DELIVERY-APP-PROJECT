import { expect, test } from '@jest/globals';
import { screen } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import React from 'react';
import Card from '../components/Cards';
import AppProvider from '../context/Provider';
import renderWithRouter from '../renderWithRouter';

describe('Testes da página de cards', () => {
  beforeEach(() => renderWithRouter(
    <AppProvider>
      <Card
        id={ 1 }
        name="Skol Lata 250ml"
        price="2.20"
        urlImage="fake"
        quantity={ 1 }
      />

    </AppProvider>,
  ));

  test('Testa se há um card para página de produtos', async () => {
    const card = screen.getByText('Skol Lata 250ml');

    expect(card).toBeInTheDocument();
  });

  test('Testa se há uma imagem na página de produtos', async () => {
    const image = screen.getByTestId('customer_products__img-card-bg-image-1');

    expect(image).toBeInTheDocument();
  });

  test('Testa se há um botão de Incrementar na tela', () => {
    const button = screen.getByRole('button', { name: '+' });
    const input = screen.getByTestId('customer_products__input-card-quantity-1');

    expect(button).toBeInTheDocument();
    userEvent.click(button);

    // expect(input).toBe(2);
  });

  test('Testa se há um botão de Decrementar na tela', () => {
    const button = screen.getByRole('button', { name: '-' });
    const input = screen.getByTestId('customer_products__input-card-quantity-1');

    expect(button).toBeInTheDocument();
    userEvent.click(button);

    // expect(input).toBe(1);
  });
});
