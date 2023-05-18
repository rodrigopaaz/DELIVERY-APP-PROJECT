import React from 'react';
import { Redirect, Route, Switch } from 'react-router-dom';
import './App.css';
import AdminPage from './pages/admin';
import Checkout from './pages/Checkout';
import Login from './pages/Login';
import OrderDetails from './pages/OrderDetails';
import Orders from './pages/Orders';
import Products from './pages/products';
import register from './pages/register';

function App() {
  return (
    <div className="App">
      <Switch>
        <Route exact path="/" render={ () => <Redirect to="/login" /> } />
        <Route exact path="/login" component={ Login } />
        <Route exact path="/register" component={ register } />
        <Route exact path="/customer/checkout" component={ Checkout } />
        <Route exact path="/customer/products" component={ Products } />
        <Route exact path="/customer/orders/:id" component={ OrderDetails } />
        <Route exact path="/customer/orders" component={ Orders } />
        <Route exact path="/seller/orders" component={ Orders } />
        <Route exact path="/seller/orders/:id" component={ OrderDetails } />
        <Route exact path="/admin/manage" component={ AdminPage } />
      </Switch>
    </div>
  );
}

export default App;
