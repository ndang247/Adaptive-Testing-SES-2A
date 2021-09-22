import React from "react";
import { BrowserRouter, Switch, Route } from 'react-router-dom';
import { ThemeProvider, StyledEngineProvider } from '@material-ui/core';
import Theme from 'src/theme';
import {
  Home, Login, Register, Dashboard,
  ExamHistory, Exam, CreateTest, CreateQuestion,
  JoinExam, Profile, EditProfile, SubmitQuery
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
            <Route path="/host/login" exact component={Login} />
            <Route path="/host/register" exact component={Register} />
            <Route path="/host/dashboard" exact component={Dashboard} />
            <Route path="/host/dashboard/account" exact component={Profile} />
            <Route path="/host/dashboard/settings" exact component={EditProfile} />
            <Route path="/host/create/question" exact component={CreateQuestion} />
            <Route path="/host/create/test" exact component={CreateTest} />

            <Route path="/user/login" exact component={Login} />
            <Route path="/user/register" exact component={Register} />
            <Route path="/user/dashboard" exact component={Dashboard} />
            <Route path="/user/dashboard/account" exact component={Profile} />
            <Route path="/user/dashboard/settings" exact component={EditProfile} />
            <Route path="/user/exam" exact component={Exam} />
            <Route path="/user/exam/history" exact component={ExamHistory} />
            <Route path="/user/exam/joinexam" exact component={JoinExam} />
            <Route path="/user/query" exact component={SubmitQuery} />
          </Switch>
        </ThemeProvider>
      </StyledEngineProvider>
    </BrowserRouter>
  );
}

export default App;