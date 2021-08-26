import React from 'react';
import PropTypes from 'prop-types';
import {
    AppBar, Toolbar, CssBaseline, useScrollTrigger
} from '@material-ui/core';
import useStyles from './navbarStyles';
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

const Navbar = (props) => {
    const classes = useStyles();

    return (
        <>
            <CssBaseline />
            <AppBar className={classes.appBar}>
                <Toolbar>
                    <RouterLink to="/"><img src={logo} alt="logo" height={100} /></RouterLink>
                </Toolbar>
            </AppBar>
        </>
    );
};

export default Navbar;
