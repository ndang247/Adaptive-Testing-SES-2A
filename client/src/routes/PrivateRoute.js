import React, { useEffect } from 'react';
import { Redirect, Route } from 'react-router-dom';

const PrivateRoute = ({ isAuth, setProfile, path, exact, component: Component, ...rest }) => {

    useEffect(() => {
        if (!isAuth && JSON.parse(localStorage.getItem('profile'))) {
            setProfile(JSON.parse(localStorage.getItem('profile')));
        }
    }, [isAuth, setProfile]);

    return <Route exact {...rest} render={(props) => {
        if (isAuth || JSON.parse(localStorage.getItem('profile'))) {
            return <Component />
        }
        else {
            return <Redirect to={{ pathname: path.includes("host") ? "/host/login" : "/user/login", state: { from: props.location } }} />
        }
    }}
    />
}

export default PrivateRoute;
