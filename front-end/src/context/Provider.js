import React, { useMemo, useState } from 'react';
import AppContext from './Context';

export default function AppProvider({ children }) {
  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [role, setRole] = useState('');
  const [cart, setCart] = useState([]);
  const [sellers, setSellers] = useState([]);
  const [users, setUsers] = useState([]);

  const values = useMemo(() => ({
    name,
    setName,
    email,
    setEmail,
    password,
    setPassword,
    role,
    setRole,
    cart,
    setCart,
    sellers,
    setSellers,
    users,
    setUsers,
  }), [
    name,
    setName,
    email,
    setEmail,
    password,
    setPassword,
    role,
    setRole,
    cart,
    setCart,
    sellers,
    setSellers,
    users,
    setUsers,
  ]);

  return (
    <AppContext.Provider value={ values }>
      {children}
    </AppContext.Provider>
  );
}

AppProvider.propTypes = {}.isRequired;
