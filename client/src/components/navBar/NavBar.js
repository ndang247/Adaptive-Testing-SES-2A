import React from 'react';
import PropTypes from 'prop-types';
import {
    AppBar, Toolbar, CssBaseline, useScrollTrigger,
    Link, Grid, Button, Typography
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
                    <Grid container>
                        <Grid item xs={0} >
                            <Link color="inherit" component={RouterLink} underline="none" to="/">
                                <Grid container>
                                    <Grid item xs={0}>
                                        <img src={logo} alt="logo" className={classes.image} />
                                    </Grid>
                                    <Grid item xs={0}>
                                        <Typography color="white" variant="h3" className={classes.text}>
                                            AdapTest
                                        </Typography>
                                    </Grid>
                                </Grid>
                            </Link>
                        </Grid>
                        <Grid item xs={0} style={{ flex: 1 }}>
                        </Grid>
                        <Grid item xs={0}>
                            <Link color="inherit" component={RouterLink} underline="none" to="/about-us">
                                <Button className={classes.button}>
                                    About Us
                                </Button>
                            </Link>
                        </Grid>
                    </Grid>
                </Toolbar>
            </AppBar>
        </div>
    );
};

export default NavBar;
