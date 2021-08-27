import React from "react";
import { BrowserRouter, Switch, Route } from 'react-router-dom';

// Pages
import Home from 'src/pages/home/Home';
import Login from 'src/pages/login/Login';
import StudentDash from 'src/pages/dashboard/StudentDash';
import MakerDash from "src/pages/dashboard/MakerDash";

const App = () => {
  return (
    <BrowserRouter>
      <Switch>
        <Route path="/" exact component={Home} />
        <Route path="/login" exact component={Login} />
        <Route path="/student" exact component={StudentDash} />
        <Route path="/maker" exact component={MakerDash} />
      </Switch>
    </BrowserRouter>
  );
}

export default App;