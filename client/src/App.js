import React from "react";
import { BrowserRouter, Switch, Route } from 'react-router-dom';
import { ThemeProvider, StyledEngineProvider } from '@material-ui/core';
import Theme from 'src/theme';
import {
  Home, Login, Register, Dashboard, Profile, EditProfile,
  ExamHistory, Exam
} from 'src/pages';
import GlobalStyles from "src/components/GlobalStyles";

const App = () => {
  return (
    <BrowserRouter>
      <StyledEngineProvider injectFirst>
        <ThemeProvider theme={Theme}>
          <GlobalStyles />
          <Switch>
            <Route path="/" exact component={Home} />
            <Route path="/user/login" exact component={Login} />
            <Route path="/user/register" exact component={Register} />
            <Route path="/host/dashboard" exact component={Dashboard} />
            <Route path="/host/dashboard/account" exact component={Profile} />
            <Route path="/host/dashboard/settings" exact component={EditProfile} />
            <Route path="/user/exam" exact component={Exam} />
            <Route path="/user/history" exact component={ExamHistory} />
          </Switch>
        </ThemeProvider>
      </StyledEngineProvider>
    </BrowserRouter>
  );
}

export default App;