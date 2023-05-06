import React, { useContext, useEffect } from 'react';
import { Link, useHistory } from 'react-router-dom';
import AppContext from '../context/Context';

export default function Header() {
  const { name, setName, setEmail, role, setRole } = useContext(AppContext);
  const history = useHistory();

  useEffect(() => {
    const user = JSON.parse(localStorage.getItem('user'));
    setName(user.name);
    setEmail(user.email);
    setRole(user.role);
  }, [setEmail, setName, setRole]);

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
        <button
          type="button"
          data-testid="customer_products__element-navbar-link-logout"
          onClick={ () => {
            localStorage.clear();
            history.push('/login');
          } }
        >
          Sair
        </button>
      </nav>
    </div>
  );
}
