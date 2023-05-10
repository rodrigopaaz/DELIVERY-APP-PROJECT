import { expect, test } from '@jest/globals';
import { cleanup, render, screen } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import React from 'react';
import RegisterForms from '../components/registerForms';

describe('Testes da tela de Register', () => {
  beforeEach(() => render(<RegisterForms />));
  afterEach(cleanup);

  test('Testa se há três inputs', () => {
    const inputName = screen.getAllByText('Nome');
    const inputEmail = screen.getAllByText('Email');
    const inputPassword = screen.getAllByText('Senha');

    expect(inputName).toBeInTheDocument();
    expect(inputEmail).toBeInTheDocument();
    expect(inputPassword).toBeInTheDocument();
  });

  test('Testa se há um botão de cadastrar na tela', () => {
    const button = screen.getByRole('button', { name: 'Cadastrar' });

    expect(button).toBeDisabled();
    expect(button).toBeInTheDocument();
  });

  test(
    'Testa se clicar no botão de cadastro aparece uma mensagem caso já exista o usuário',
    () => {
      const button = screen.getByRole('button', { name: 'Cadastrar' });
      const inputName = screen.getAllByText('Nome');
      const inputEmail = screen.getAllByText('Email');
      const inputPassword = screen.getAllByText('Senha');

      userEvent.type(inputName, 'Teste');
      userEvent.type(inputEmail, 'teste@teste.com');
      userEvent.type(inputPassword, 'testeteste');
      userEvent.click(button);

      expect(button).getByLabelText('Usuário já existe');
    },
  );
});
