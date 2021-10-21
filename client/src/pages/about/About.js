import React from 'react';
import { CssBaseline } from '@material-ui/core';
import { NavBar, AboutHeader, AboutCard } from 'src/components';
import useStyles from './AboutStyles';

const About = () => {
    const classes = useStyles();
    return (
        <>
            <div className={classes.root}>
                <NavBar />
                <CssBaseline />
                <AboutHeader />
                <AboutCard />
            </div>
        </>
    );
}

export default About;
