import React from "react";
import { BrowserRouter, Switch, Route } from 'react-router-dom';

// Pages
import Home from 'src/pages/home/Home';
import Login from './pages/login/Login';

const App = () => {
  return (
    <BrowserRouter>
      <Switch>
        <Route path="/" exact component={Home} />
        <Route path="/login" component={Login} />
      </Switch>
    </BrowserRouter>
  );
}

export default App;
