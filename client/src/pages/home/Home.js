import React from 'react';
import { Container } from '@material-ui/core';
import useStyles from './homeStyles';
import { Head, Body, Footer, NavBar } from 'src/components';
import clsx from 'clsx';
import { useMediaQuery } from 'react-responsive';
import { Box } from '@material-ui/system';

const Home = () => {
    const classes = useStyles();
    const headLayer = clsx(classes.headSpacer, classes.headLayer);
    const footerLayer = clsx(classes.footerSpacer, classes.footerLayer);
    const isDesktopOrLaptop = useMediaQuery({
        query: '(min-width: 1224px)'
    });

    return (
        <React.Fragment>
            <main>
                <NavBar />
                <div className={classes.heroContent}>
                    <Head />
                </div>
                <Box height={100}>
                    {isDesktopOrLaptop && <div className={headLayer}></div>}
                </Box>
                <Container className={classes.cardGrid} maxWidth="md">
                    <Body />
                </Container>
            </main>
            {isDesktopOrLaptop && <div className={footerLayer}></div>}
            <Footer />
        </React.Fragment>
    );
};

export default Home;
