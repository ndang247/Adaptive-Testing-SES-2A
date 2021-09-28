import React, { useState } from "react";
import { BrowserRouter, Switch, Route } from 'react-router-dom';
import { ThemeProvider, StyledEngineProvider } from '@material-ui/core';
import Theme from 'src/theme';
import {
  Home, Login, Register, Dashboard,
<<<<<<< Updated upstream
  ExamHistory, Exam, CreateTest, CreateQuestion,
  JoinExam, Profile, EditProfile, SubmitQuery
=======
  ExamHistory, Exam,
  CreateTest, CreateQuestion, JoinExam, Profile, EditProfile, SubmitQuery,
  ExamCreated,
  QuestionCreated,
>>>>>>> Stashed changes
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
            <PrivateRoute isAuth={profile} setProfile={setProfile} path="/host/dashboard/account" exact component={Profile} />
            <PrivateRoute isAuth={profile} setProfile={setProfile} path="/host/dashboard/settings" exact component={EditProfile} />
            <PrivateRoute isAuth={profile} setProfile={setProfile} path="/host/create/question" exact component={CreateQuestion} />
            <PrivateRoute isAuth={profile} setProfile={setProfile} path="/host/create/test" exact component={CreateTest} />
            {/* User */}
            <Route path="/user/login" exact component={Login} />
            <Route path="/user/register" exact component={Register} />
<<<<<<< Updated upstream
            <PrivateRoute isAuth={profile} setProfile={setProfile} path="/user/dashboard" exact component={Dashboard} />
            <PrivateRoute isAuth={profile} setProfile={setProfile} path="/user/dashboard/account" exact component={Profile} />
            <PrivateRoute isAuth={profile} setProfile={setProfile} path="/user/dashboard/settings" exact component={EditProfile} />
            <PrivateRoute isAuth={profile} setProfile={setProfile} path="/user/exam" exact component={Exam} />
            <PrivateRoute isAuth={profile} setProfile={setProfile} path="/user/exam/history" exact component={ExamHistory} />
            <PrivateRoute isAuth={profile} setProfile={setProfile} path="/user/exam/joinexam" exact component={JoinExam} />
            <PrivateRoute isAuth={profile} setProfile={setProfile} path="/user/query" exact component={SubmitQuery} />
=======
            <Route path="/host/dashboard" exact component={Dashboard} />
            <Route path="/host/dashboard/account" exact component={Profile} />
            <Route path="/host/dashboard/settings" exact component={EditProfile} />
            <Route path="/user/exam" exact component={Exam} />
            <Route path="/user/history" exact component={ExamHistory} />
            <Route path="/host/question" exact component={CreateQuestion} />
            <Route path="/host/test" exact component={CreateTest} />
            <Route path="/user/joinexam" exact component={JoinExam} />
            <Route path="/user/query" exact component={SubmitQuery} />
            <Route path="/host/history" exact component={ExamCreated} />
            <Route path="/host/history/question" exact component={QuestionCreated} />
>>>>>>> Stashed changes
          </Switch>
        </ThemeProvider>
      </StyledEngineProvider>
    </BrowserRouter>
  );
}

export default App;