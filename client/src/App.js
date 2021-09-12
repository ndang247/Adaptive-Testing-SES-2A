import React from "react";
import { BrowserRouter, Switch, Route } from 'react-router-dom';
import { ThemeProvider, StyledEngineProvider } from '@material-ui/core';
import Theme from 'src/theme';
import {
  Home, Login, Register, Dashboard,
  ExamHistory, Exam,
  CreateTest, CreateQuestion, JoinExam, 
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
            <Route path="/user/exam" exact component={Exam} />
            <Route path="/user/history" exact component={ExamHistory} />
            <Route path="/host/question" exact component={CreateQuestion} />
            <Route path="/host/test" exact component={CreateTest} />
            <Route path="/user/joinexam" exact component={JoinExam} />
          </Switch>
        </ThemeProvider>
      </StyledEngineProvider>
    </BrowserRouter>
  );
}

export default App;