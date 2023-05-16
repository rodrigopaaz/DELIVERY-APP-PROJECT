import React, { useState, useEffect, useContext } from 'react';
import { requestData, requestRegister } from '../services/requests';
import AppContext from '../context/Context';

export default function RegisterUser() {
  const [newUser, setNewUser] = useState({
    name: '', email: '', password: '', role: 'seller' });
  const [isDisabled, setIsDisabled] = useState(true);
  const [failedTryRegister, setFailedTryRegister] = useState(false);
  const { setUsers } = useContext(AppContext);

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

  const requestUsers = async () => {
    const users = await requestData('/user');
    setUsers(users);
  };

  const handleSubmit = async () => {
    try {
      await requestRegister('/register', {
        name: newUser.name,
        email: newUser.email,
        password: newUser.password,
        role: newUser.role,
      });
      requestUsers();
    } catch (error) {
      setFailedTryRegister(true);
    }
  };

  useEffect(() => {
    const check = validatePassword(newUser.password)
    && validateEmail(newUser.email) && validateName(newUser.name);
    requestUsers();
    if (check) {
      setIsDisabled(false);
    }
    setFailedTryRegister(false);
  // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [newUser]);

  return (
    <div className="user__register">
      <h3>Cadastrar novo usuário</h3>
      <form>
        <label htmlFor="name">
          <input
            type="text"
            data-testid="admin_manage__input-name"
            id="name"
            placeholder="Nome"
            name="name"
            value={ newUser.name }
            onChange={ ({ target: { name, value } }) => {
              setNewUser({ ...newUser, [name]: value });
            } }
          />
        </label>
        <label htmlFor="email">
          <input
            type="email"
            data-testid="admin_manage__input-email"
            id="email"
            placeholder="Email"
            name="email"
            value={ newUser.email }
            onChange={ ({ target: { name, value } }) => {
              setNewUser({ ...newUser, [name]: value });
            } }
          />
        </label>
        <label htmlFor="password">
          <input
            type="password"
            name="password"
            data-testid="admin_manage__input-password"
            id="password"
            value={ newUser.password }
            placeholder="Password"
            onChange={ ({ target: { name, value } }) => {
              setNewUser({ ...newUser, [name]: value });
            } }
          />
        </label>
        <label htmlFor="role">
          <select
            id="role"
            data-testid="admin_manage__select-role"
            name="role"
            value={ newUser.role }
            onChange={ ({ target: { name, value } }) => {
              setNewUser({ ...newUser, [name]: value });
            } }
          >
            <option value="seller">Vendedor</option>
            <option value="customer">Cliente</option>
          </select>
        </label>
        <button
          type="button"
          data-testid="admin_manage__button-register"
          disabled={ isDisabled }
          onClick={ handleSubmit }
        >
          Cadastrar
        </button>
      </form>
      {failedTryRegister && (
        <p data-testid="admin_manage__element-invalid-register">Usuário já existe</p>
      )}
    </div>
  );
}
