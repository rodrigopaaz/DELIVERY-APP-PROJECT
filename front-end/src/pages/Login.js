import React, { useContext, useEffect, useState } from 'react';
import { useHistory } from 'react-router-dom';
import { requestLogin } from '../services/requests';
import '../styles/login.css';
import handleToken from '../utils/localStorage';
import AppContext from '../context/Context';
import logo from '../images/ze-logo.png';

export default function Login() {
  const history = useHistory();
  const [login, setLogin] = useState({ email: '', password: '' });
  const [invalidUser, setInvalidUser] = useState(false);
  const [isDisabled, setIsDisabled] = useState(true);
  const { setEmail } = useContext(AppContext);

  const validateInputs = () => {
    const NUMBERSIX = 6;
    const emailRegex = /^[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,}$/i;
    const isValidEmail = emailRegex.test(login.email);
    const isValisPassword = login.password.trim().length >= NUMBERSIX;
    if (isValidEmail && isValisPassword) {
      setIsDisabled(false);
    } else {
      setIsDisabled(true);
    }
  };

  const validateData = async () => {
    try {
      const data = await requestLogin('/login', {
        email: login.email,
        password: login.password,
      });
      handleToken(data);
      if (data.role === 'admin') {
        history.push('/admin/manage');
      } else if (data.role === 'customer') {
        history.push('/customer/products');
      } else if (data.role === 'seller') {
        history.push('/seller/orders');
      }
    } catch (error) {
      setInvalidUser(true);
    }
  };

  useEffect(() => {
    const user = JSON.parse(localStorage.getItem('user'));
    if (user) {
      if (user.role === 'admin') {
        history.push('/admin/manage');
      } else if (user.role === 'customer') {
        history.push('/customer/products');
      } else if (user.role === 'seller') {
        history.push('/seller/orders');
      }
    }
    validateInputs();
  // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [login], [history]);

  return (
    <div className="main__login">
      <div className="form__login">
        <img src={ logo } alt="logo do birita" />
        <h5>Delivery</h5>
        <form>
          <label htmlFor="email">
            <input
              type="email"
              data-testid="common_login__input-email"
              id="email"
              placeholder="Email"
              name="email"
              value={ login.email }
              onChange={ ({ target: { name, value } }) => {
                setLogin({ ...login, [name]: value });
                setEmail(value);
                validateInputs();
              } }
            />
          </label>
          <label htmlFor="password">
            <input
              type="password"
              name="password"
              data-testid="common_login__input-password"
              id="password"
              value={ login.password }
              placeholder="Password"
              onChange={ ({ target: { name, value } }) => {
                setLogin({ ...login, [name]: value });
                validateInputs();
              } }
            />
          </label>
          {invalidUser && (
            <p data-testid="common_login__element-invalid-email">
              Usuário inválido
            </p>
          )}
          <button
            type="button"
            data-testid="common_login__button-login"
            disabled={ isDisabled }
            onClick={ validateData }
          >
            Login
          </button>
          <button
            type="button"
            data-testid="common_login__button-register"
            onClick={ () => history.push('/register') }
          >
            Register
          </button>
        </form>
      </div>
    </div>
  );
}
