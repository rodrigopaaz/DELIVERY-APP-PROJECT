import React from 'react';
import Card from '../components/Cards';
import AppProvider from '../context/Provider';
import renderWithRouter from '../renderWithRouter';

describe('Testes da página de cards', () => {
  beforeEach(() => renderWithRouter(<AppProvider><Card /></AppProvider>));
});
