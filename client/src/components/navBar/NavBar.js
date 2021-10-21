import React from 'react';
import PropTypes from 'prop-types';
import {
    AppBar, Toolbar, CssBaseline, useScrollTrigger,
    Link
} from '@material-ui/core';
import useStyles from './navBarStyles';
import logo from 'src/assets/images/logo.png';
import { Link as RouterLink } from 'react-router-dom';

function ElevationScroll(props) {
    const { children } = props;
    const trigger = useScrollTrigger({
        disableHysteresis: true,
        threshold: 0,
    });

    return React.cloneElement(children, {
        elevation: trigger ? 4 : 0,
    });
}

ElevationScroll.propTypes = {
    children: PropTypes.element.isRequired,
};

const NavBar = (props) => {
    const classes = useStyles();

    return (
        <div className={classes.root}>
            <CssBaseline />
            <AppBar className={classes.appBar}>
                <Toolbar>
                    <Link color="inherit" component={RouterLink} underline="none" to="/">
                        <img src={logo} alt="logo" height={60} />
                    </Link>
                    {/* <Button className={classes.loginBtn} variant="contained" color="primary">
                        <Link color="inherit" component={RouterLink} underline="none" to="/user/login">Login</Link>
                    </Button> */}
                </Toolbar>
            </AppBar>
        </div>
    );
};

export default NavBar;
