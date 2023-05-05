import React, { useContext, useEffect, useState } from 'react';
import { useHistory } from 'react-router-dom';
import AppContext from '../context/Context';
import { requestLogin } from '../services/requests';
import handleToken from '../utils/localStorage';

export default function RegisterForms() {
  const [isDisabled, setIsDisabled] = useState(true);
  const [failedTryLogin, setFailedTryLogin] = useState(false);
  const { name, setName, email,
    setEmail, password, setPassword } = useContext(AppContext);

  const history = useHistory();

  const validatePassword = (passwordToVerify) => {
    const NUMBER_SIX = 6;
    return passwordToVerify.length >= NUMBER_SIX;
  };

  const validateEmail = (emailToVerify) => {
    const regex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    return regex.test(emailToVerify);
  };

  const validateName = (nameToVerify) => {
    const NUMBER_TWELVE = 12;
    return nameToVerify.length >= NUMBER_TWELVE;
  };

  const handleSubmit = async () => {
    try {
      const data = await requestLogin('/register', {
        name,
        email,
        password,
      });
      handleToken(data);
      history.push(`/${data.role}/products`);
    } catch (error) {
      setFailedTryLogin(true);
    }
  };

  useEffect(() => {
    const check = validatePassword(password)
    && validateEmail(email) && validateName(name);
    if (check) {
      setIsDisabled(false);
    }
    setFailedTryLogin(false);
  }, [name, email, password]);

  return (
    <div>
      <form>
        <label htmlFor="name">
          Nome
          <input
            type="text"
            data-testid="common_register__input-name"
            id="name"
            placeholder="Seu nome"
            name="name"
            value={ name }
            onChange={ ({ target: { value } }) => setName(value) }
          />
        </label>
        <label htmlFor="email">
          Email
          <input
            type="email"
            data-testid="common_register__input-email"
            id="email"
            placeholder="seu-email@site.com.br"
            name="email"
            value={ email }
            onChange={ ({ target: { value } }) => setEmail(value) }
          />
        </label>
        <label htmlFor="password">
          Senha
          <input
            type="password"
            name="password"
            data-testid="common_register__input-password"
            id="password"
            value={ password }
            placeholder="Password"
            onChange={ ({ target: { value } }) => setPassword(value) }
          />
        </label>
        <button
          type="button"
          data-testid="common_register__button-register"
          disabled={ isDisabled }
          onClick={ handleSubmit }
        >
          Cadastrar
        </button>
      </form>
      {failedTryLogin && (
        <p data-testid="common_register__element-invalid_register">Usuário já existe</p>
      )}
    </div>
  );
}
