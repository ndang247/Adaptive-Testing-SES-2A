import React, { useState, useEffect, useCallback } from 'react';
import { useHistory } from 'react-router-dom';
import PropTypes from 'prop-types';
import {
    AppBar, Badge, Box, Hidden,
    IconButton, Toolbar
} from '@material-ui/core';
import MenuIcon from '@material-ui/icons/Menu';
import NotificationsIcon from '@material-ui/icons/NotificationsOutlined';
import InputIcon from '@material-ui/icons/Input';
// import logo from 'src/assets/images/logo.png';
import decode from 'jwt-decode';
import { LOGOUT } from 'src/constants/actionType';
import { useDispatch } from 'react-redux';

const DashboardNavbar = ({ onMobileNavOpen, ...rest }) => {
    const [notifications] = useState([]);
    const user = JSON.parse(localStorage.getItem('profile'));
    const dispatch = useDispatch();
    const history = useHistory();

    const logout = useCallback(() => {
        dispatch({ type: LOGOUT });
        history.push('/');
    }, []);

    useEffect(() => {
        if (user) {
            const token = user?.token;
            if (token) {
                const decodedToken = decode(token);
                // console.log(token);
                console.log(new Date(decodedToken?.exp * 1000));
                if (decodedToken?.exp * 1000 < new Date().getTime()) logout();
            }
        }
    }, []);

    return (
        <AppBar elevation={0} {...rest}>
            <Toolbar>
                {/* <RouterLink to="/">
                    <img src={logo} alt="logo" height={60} />
                </RouterLink> */}
                <Box sx={{ flexGrow: 1 }} />
                <Hidden lgDown>
                    <IconButton color="inherit" size="large">
                        <Badge badgeContent={notifications.length} color="primary" variant="dot">
                            <NotificationsIcon />
                        </Badge>
                    </IconButton>
                    <IconButton color="inherit" size="large" onClick={logout}>
                        <InputIcon />
                    </IconButton>
                </Hidden>
                <Hidden lgUp>
                    <IconButton color="inherit" onClick={onMobileNavOpen} size="large">
                        <MenuIcon />
                    </IconButton>
                </Hidden>
            </Toolbar>
        </AppBar>
    );
}

DashboardNavbar.propTypes = {
    onMobileNavOpen: PropTypes.func
}

export default DashboardNavbar;
