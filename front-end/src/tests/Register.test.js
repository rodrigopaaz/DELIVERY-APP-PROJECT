import { expect, test } from '@jest/globals';
import { cleanup, screen } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import React from 'react';
import RegisterForms from '../components/registerForms';
import AppProvider from '../context/Provider';
import renderWithRouter from '../renderWithRouter';

describe('Testes da tela de Register', () => {
  beforeEach(() => {
    renderWithRouter(<AppProvider><RegisterForms /></AppProvider>);
  });

  afterEach(cleanup);

  test('Testa se há três inputs', () => {
    const inputName = screen.getByText('Nome');
    const inputEmail = screen.getByText('Email');
    const inputPassword = screen.getByText('Senha');

    expect(inputName).toBeInTheDocument();
    expect(inputEmail).toBeInTheDocument();
    expect(inputPassword).toBeInTheDocument();
  });

  test('Testa se há um botão de cadastrar na tela', () => {
    const button1 = screen.getByRole('button', { name: 'Cadastrar' });

    expect(button1).toBeDisabled();
    expect(button1).toBeInTheDocument();
  });
});

describe('Testes do cadastro', () => {
  test(
    'Testa se clicar no botão de cadastro redireciona a pessoa',
    () => {
      const { history } = renderWithRouter(<AppProvider><RegisterForms /></AppProvider>);
      const buttonCa = screen.getByRole('button', { name: 'Cadastrar' });
      const inputName = screen.getAllByText('Nome');
      const inputEmail = screen.getAllByText('Email');
      const inputPassword = screen.getAllByText('Senha');

      userEvent.type(inputName, 'Nathália Andrade');
      userEvent.type(inputEmail, 'teste@teste.com');
      userEvent.type(inputPassword, 'testeteste');
      userEvent.click(buttonCa);

      expect(history.location.pathname).toBe('/');
    },
  );
});
