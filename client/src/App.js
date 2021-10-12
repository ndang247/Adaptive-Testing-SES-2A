import React, { useState } from "react";
import { BrowserRouter, Switch, Route } from 'react-router-dom';
import { ThemeProvider, StyledEngineProvider } from '@material-ui/core';
import Theme from 'src/theme';
import {
  Home, Login, Register, Dashboard,
  PastExams, Exam, CreateExam, JoinExam,
  Account, Settings, Query, Exams, Result
} from 'src/pages';
import GlobalStyles from "src/components/GlobalStyles";
import PrivateRoute from "src/routes/PrivateRoute";

const App = () => {
  const [profile, setProfile] = useState(JSON.parse(localStorage.getItem('profile')));

  return (
    <BrowserRouter>
      <StyledEngineProvider injectFirst>
        <ThemeProvider theme={Theme}>
          <GlobalStyles />
          <Switch>
            {/* Host */}
            <Route path="/" exact component={Home} />
            <Route path="/host/login" exact component={Login} />
            <Route path="/host/register" exact component={Register} />
            <PrivateRoute isAuth={profile} setProfile={setProfile} path="/host/dashboard" exact component={Dashboard} />
            <PrivateRoute isAuth={profile} setProfile={setProfile} path="/host/dashboard/account" exact component={Account} />
            <PrivateRoute isAuth={profile} setProfile={setProfile} path="/host/dashboard/settings" exact component={Settings} />
            <PrivateRoute isAuth={profile} setProfile={setProfile} path="/host/dashboard/exam/create" exact component={CreateExam} />
            <PrivateRoute isAuth={profile} setProfile={setProfile} path="/host/dashboard/exam/history" exact component={Exams} />

            {/* User */}
            <Route path="/user/login" exact component={Login} />
            <Route path="/user/register" exact component={Register} />
            <PrivateRoute isAuth={profile} setProfile={setProfile} path="/user/dashboard" exact component={Dashboard} />
            <PrivateRoute isAuth={profile} setProfile={setProfile} path="/user/dashboard/account" exact component={Account} />
            <PrivateRoute isAuth={profile} setProfile={setProfile} path="/user/dashboard/settings" exact component={Settings} />
            {/* <PrivateRoute isAuth={profile} setProfile={setProfile} path="/user/exam/:pin" exact component={Exam} /> */}
            <PrivateRoute isAuth={profile} setProfile={setProfile} path="/user/dashboard/exam/history" exact component={PastExams} />
            <PrivateRoute isAuth={profile} setProfile={setProfile} path="/user/dashboard/exam/joinexam" exact component={JoinExam} />
            <PrivateRoute isAuth={profile} setProfile={setProfile} path="/user/dashboard/query" exact component={Query} />
            <PrivateRoute isAuth={profile} setProfile={setProfile} path="/user/dashboard/exam/result" exact component={Result} />
          </Switch>
        </ThemeProvider>
      </StyledEngineProvider>
    </BrowserRouter>
  );
}

export default App;