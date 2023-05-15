import React from 'react';
import './App.css';

import { BrowserRouter, Redirect, Route, Switch } from 'react-router-dom';
import Login from './pages/Login';
import Products from './pages/products';
import register from './pages/register';

function App() {
  return (
    <div className="App">
      <BrowserRouter>
        <Switch>
          <Route exact path="/" render={ () => <Redirect to="/login" /> } />
          <Route exact path="/login" component={ Login } />
          <Route exact path="/register" component={ register } />
          <Route exact path="/customer/products" component={ Products } />
        </Switch>
      </BrowserRouter>
    </div>
  );
}

export default App;
