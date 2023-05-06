import React, { useMemo, useState } from 'react';
import AppContext from './Context';

export default function AppProvider({ children }) {
  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [role, setRole] = useState('');
  const [totalPrice, setTotalPrice] = useState([]);
  const [cart, setCart] = useState([]);

  const values = useMemo(() => ({
    name,
    setName,
    email,
    setEmail,
    password,
    setPassword,
    role,
    setRole,
    totalPrice,
    setTotalPrice,
    cart,
    setCart,
  }), [
    name,
    setName,
    email,
    setEmail,
    password,
    setPassword,
    role,
    setRole,
    totalPrice,
    setTotalPrice,
    cart,
    setCart,
  ]);

  return (
    <AppContext.Provider value={ values }>
      {children}
    </AppContext.Provider>
  );
}

AppProvider.propTypes = {}.isRequired;
