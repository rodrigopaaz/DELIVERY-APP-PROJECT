import React, { useContext, useEffect, useState } from 'react';
import { Redirect } from 'react-router-dom/cjs/react-router-dom.min';
import AppContext from '../context/Context';
import { requestLogin, requestData } from '../services/requests';
import handleToken from '../utils/localStorage';

export default function RegisterForms() {
  const [isDisabled, setIsDisabled] = useState(true);
  const [isLogged, setIsLogged] = useState(false);
  const [failedTryLogin, setFailedTryLogin] = useState(false);
  const {
    name,
    setName,
    email,
    setEmail,
    password,
    setPassword,
  } = useContext(AppContext);

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

  // const handleSubmit = async () => {
  //   const status201 = 201;
  //   try {
  //     // faz a requisição HTTP para o endpoint que salva o usuário no banco de dados
  //     const response = await axios.post('endpoint', {
  //       name,
  //       email,
  //       password,
  //     });

  //     if (response.status === status201) {
  //       // se a requisição for bem sucedida, navega para a nova rota
  //       history.push('/register');
  //     }
  //   } catch (error) {
  //     // caso ocorra algum erro na requisição, exibe uma mensagem de erro
  //     console.error(error);
  //     setIsValid(true);
  //   }
  // };

  const handleSubmit = async () => {
    try {
      const token = await requestLogin('/register', { name, email, password });
      const { role } = await requestData('/login/role', { email, password });
      handleToken(token, role);
      setIsLogged(true);
    } catch (error) {
      setFailedTryLogin(true);
      setIsLogged(false);
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

  if (isLogged) return <Redirect to="/products" />;

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
      {
        (failedTryLogin)
          ? (
            <p data-testid="login__input_invalid_login_alert">
              {
                `O endereço de e-mail ou a senha não estão corretos.
                    Por favor, tente novamente.`
              }
            </p>
          )
          : null
      }
    </div>
  );
}
