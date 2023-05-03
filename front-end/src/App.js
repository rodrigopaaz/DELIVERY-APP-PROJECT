import React from 'react';
import './App.css';
    
import { Route, Switch } from 'react-router-dom';
import Login from './pages/Login';
import register from './pages/register';

function App() {
  return (
    <div className="App">
          <Switch>
        <Route exact path="/" component={ Login } />
        <Route exact path="/login" component={ Login } />
        <Route exact path="/register" component={ register } />
      </Switch>
    </div>
  );
}

export default App;
