import React, { useEffect, useState } from 'react';
import { useHistory } from 'react-router-dom';
// import Axios from 'axios';
import { requestLogin /* requestData */ } from '../services/requests';
import '../styles/login.css';
import handleToken from '../utils/localStorage';

export default function Login() {
  const history = useHistory();
  const [login, setLogin] = useState({ email: '', password: '' });
  const [invalidUser, setInvalidUser] = useState(false);
  const [isDisabled, setIsDisabled] = useState(true);

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
      history.push(`/${data.role}/products`);
    } catch (error) {
      setInvalidUser(true);
    }
  };

  useEffect(() => {
    validateInputs();
  // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [login]);

  return (
    <div className="main__login">
      <div className="form__login">
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
