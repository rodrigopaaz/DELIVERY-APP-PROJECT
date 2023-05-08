import React from 'react';
import './App.css';

import { Route, Switch, Redirect } from 'react-router-dom';
import Login from './pages/Login';
import register from './pages/register';
import Products from './pages/products';
import Checkout from './pages/Checkout';

function App() {
  return (
    <div className="App">
      <Switch>
        <Route exact path="/" render={ () => <Redirect to="/login" /> } />
        <Route exact path="/login" component={ Login } />
        <Route exact path="/register" component={ register } />
        <Route exact path="/customer/checkout" component={ Checkout } />
        <Route exact path="/customer/products" component={ Products } />
      </Switch>
    </div>
  );
}

export default App;
