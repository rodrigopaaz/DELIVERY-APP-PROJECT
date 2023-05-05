import React, { useContext, useEffect } from 'react';
import { Link } from 'react-router-dom';
import AppContext from '../context/Context';

export default function Header() {
  const { name, setName, setEmail, role, setRole } = useContext(AppContext);

  useEffect(() => {
    const login = JSON.parse(localStorage.getItem('login'));
    setName(login.name);
    setEmail(login.email);
    setRole(login.role);
  }, [setEmail, setName, setRole]);

  const clearData = () => {
    localStorage.clear();
  };

  return (
    <div>
      <nav>
        <Link
          to={ `/${role}/products` }
          data-testid="customer_products__element-navbar-link-products"
        >
          PRODUTOS
        </Link>
        <Link
          to={ `/${role}/orders` }
          data-testid="customer_products__element-navbar-link-orders"
        >
          MEUS PEDIDOS
        </Link>
        <p data-testid="customer_products__element-navbar-user-full-name">
          {name}
        </p>
        <Link
          to="/login"
          data-testid="customer_products__element-navbar-link-logout"
          onClick={ clearData }
        >
          Sair
        </Link>
      </nav>
    </div>
  );
}
