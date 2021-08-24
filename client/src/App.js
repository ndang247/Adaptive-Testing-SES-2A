import React from "react";
import { BrowserRouter, Switch, Route } from 'react-router-dom';
import Home from 'src/pages/home/Home';

const App = () => {
  return (
    <BrowserRouter>
      <Switch>
        <Route path="/" exact component={Home} />
      </Switch>
    </BrowserRouter>
  );
}

export default App;
