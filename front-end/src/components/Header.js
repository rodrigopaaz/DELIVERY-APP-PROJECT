import React, { useContext, useEffect } from 'react';
import { Link, useHistory } from 'react-router-dom';
import AppContext from '../context/Context';
import '../styles/header.css';

export default function Header() {
  const { name, setName, setEmail, role, setRole, setCart } = useContext(AppContext);
  const history = useHistory();

  useEffect(() => {
    const user = JSON.parse(localStorage.getItem('user'));
    setName(user.name);
    setEmail(user.email);
    setRole(user.role);
  }, [setEmail, setName, setRole]);

  const handleSeller = () => (
    <Link
      to={ `/${role}/orders` }
      data-testid="customer_products__element-navbar-link-orders"
    >
      PEDIDOS
    </Link>
  );

  const handleCustomer = () => (
    <>
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
    </>
  );

  const handleAdmin = () => (
    <Link
      to={ `/${role}/manage` }
      data-testid="customer_products__element-navbar-link-orders"
    >
      GERENCIAR USUÁRIO
    </Link>
  );

  const handleUser = () => {
    switch (role) {
    case 'seller':
      return handleSeller();
    case 'customer':
      return handleCustomer();
    default:
      return handleAdmin();
    }
  };

  return (
    <div className="div__header">
      <nav className="nav__header">
        {handleUser()}
        <div className="container__header">
          <p
            className="name__header"
            data-testid="customer_products__element-navbar-user-full-name"
          >
            {name}
          </p>
          <button
            type="button"
            className="button__header"
            data-testid="customer_products__element-navbar-link-logout"
            onClick={ () => {
              localStorage.clear();
              history.push('/login');
              setCart([]);
            } }
          >
            Sair
          </button>

        </div>
      </nav>
    </div>
  );
}
