import React, { useMemo, useState } from 'react';
import AppContext from './Context';

export default function AppProvider({ children }) {
  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [role, setRole] = useState('');

  const values = useMemo(() => ({
    name,
    setName,
    email,
    setEmail,
    password,
    setPassword,
    role,
    setRole,
  }), [
    name,
    setName,
    email,
    setEmail,
    password,
    setPassword,
    role,
    setRole,
  ]);

  return (
    <AppContext.Provider value={ values }>
      {children}
    </AppContext.Provider>
  );
}

AppProvider.propTypes = {}.isRequired;
