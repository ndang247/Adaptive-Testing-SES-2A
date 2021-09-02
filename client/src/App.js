import React from "react";
import { BrowserRouter, Switch, Route } from 'react-router-dom';
import { ThemeProvider, StyledEngineProvider } from '@material-ui/core';
import Theme from 'src/theme';
import {
  Home, Login, Register, UserDashboard,
  HostDashboard
} from 'src/pages';
import GlobalStyles from "src/components/GlobalStyles";
import NavBar from "src/components/navbar/NavBar";

const App = () => {
  return (
    <BrowserRouter>
      <StyledEngineProvider injectFirst>
        <ThemeProvider theme={Theme}>
          <GlobalStyles />
          <NavBar />
          <Switch>
            <Route path="/" exact component={Home} />
            <Route path="/user/login" exact component={Login} />
            <Route path="/user/register" exact component={Register} />
            <Route path="/user/dashboard" exact component={UserDashboard} />
            <Route path="/host/dashboard" exact component={HostDashboard} />
          </Switch>
        </ThemeProvider>
      </StyledEngineProvider>
    </BrowserRouter>
  );
}

export default App;