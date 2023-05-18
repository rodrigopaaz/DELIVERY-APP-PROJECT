import { BrowserRouter } from 'react-router-dom';
import { screen } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import AppProvider from '../context/Provider';
import App from '../App';
import renderWithRouter from './helpers/renderWithRouter';

describe('Testa a aplicação toda', () => {
  test('Usuário faz o login, adiciona um produto e faz o checkout', async () => {
    renderWithRouter(<AppProvider><BrowserRouter><App /></BrowserRouter></AppProvider>);
    expect(window.location.pathname).toBe('/login');

    const inputEmail = screen.getByPlaceholderText('Email');
    const inputPassword = screen.getByPlaceholderText('Password');
    const btnLogin = screen.getByRole('button', { name: 'Login' });

    userEvent.type(inputEmail, 'zebirita@email.com');
    userEvent.type(inputPassword, '$#zebirita#$');

    expect(btnLogin.disabled).toBe(false);
    userEvent.click(btnLogin);

    const cardProduct = await screen
      .findByTestId('customer_products__element-card-title-1');
    expect(cardProduct).toBeInTheDocument();

    const btnCart = await screen.findByTestId('customer_products__button-cart');
    expect(btnCart).toBeDisabled();

    const addProduct = await screen
      .findByTestId('customer_products__button-card-add-item-1');

    userEvent.click(addProduct);
    expect(btnCart.disabled).toBe(false);
    userEvent.click(btnCart);

    const btnCheckout = await screen.findByRole('button', { name: 'Finalizar Pedido' });
    userEvent.click(btnCheckout);

    const btnDelivered = await screen.findByRole('button', { name: /MARCAR COMO ENTREGUE/i });
    expect(btnDelivered).toBeDisabled();

    const ordersLink = screen
      .getByTestId('customer_products__element-navbar-link-orders');
    userEvent.click(ordersLink);

    const order = await screen.findByTestId('customer_orders__element-order-id-1');
    expect(order).toBeInTheDocument();
  });
});
