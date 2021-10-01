import React, { useState, useEffect } from "react";
import { BrowserRouter, Switch, Route } from 'react-router-dom';
import { ThemeProvider, StyledEngineProvider } from '@material-ui/core';
import Theme from 'src/theme';
import {
  Home, Login, Register, Dashboard,
  ExamHistory, Exam, CreateTest, CreateQuestion, 
  JoinExam, Profile, EditProfile, SubmitQuery, 
  ExamCreated, QuestionCreated
} from 'src/pages';
import GlobalStyles from "src/components/GlobalStyles";
import PrivateRoute from "src/routes/PrivateRoute";
import { getQuestions } from 'src/redux/actions/question';
import { useDispatch } from 'react-redux';

const App = () => {
  const [profile, setProfile] = useState(JSON.parse(localStorage.getItem('profile')));

  const dispatch = useDispatch();
    
  useEffect(() => {
      dispatch(getQuestions("614042516f6abc6cc5dc59d8", "6140434a2bb7b7dc2b4970dc"));
  }, []);

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
            <PrivateRoute isAuth={profile} setProfile={setProfile} path="/host/history" exact component={ExamCreated} />
            <PrivateRoute isAuth={profile} setProfile={setProfile} path="/host/history/question" exact component={QuestionCreated} />
            {/* User */}
            <Route path="/user/login" exact component={Login} />
            <Route path="/user/register" exact component={Register} />
            <PrivateRoute isAuth={profile} setProfile={setProfile} path="/user/dashboard" exact component={Dashboard} />
            <PrivateRoute isAuth={profile} setProfile={setProfile} path="/user/dashboard/account" exact component={Profile} />
            <PrivateRoute isAuth={profile} setProfile={setProfile} path="/user/dashboard/settings" exact component={EditProfile} />
            <PrivateRoute isAuth={profile} setProfile={setProfile} path="/user/exam" exact component={Exam} />
            <PrivateRoute isAuth={profile} setProfile={setProfile} path="/user/exam/history" exact component={ExamHistory} />
            <PrivateRoute isAuth={profile} setProfile={setProfile} path="/user/exam/joinexam" exact component={JoinExam} />
            <PrivateRoute isAuth={profile} setProfile={setProfile} path="/user/query" exact component={SubmitQuery} />
            
          </Switch>
        </ThemeProvider>
      </StyledEngineProvider>
    </BrowserRouter>
  );
}

export default App;