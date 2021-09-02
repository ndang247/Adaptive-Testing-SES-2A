import React from 'react';
import { Container } from '@material-ui/core';
import useStyles from './homeStyles';
import { HeadContent, BodyContent, Footer, NavBar } from 'src/components';
import clsx from 'clsx';

const Home = () => {
    const classes = useStyles();
    const headLayer = clsx(classes.headSpacer, classes.headLayer);
    const footerLayer = clsx(classes.footerSpacer, classes.footerLayer);
    return (
        <React.Fragment>
            <main>
                <NavBar />
                <div className={classes.heroContent}>
                    <HeadContent />
                </div>
                <div className={headLayer}></div>
                <Container className={classes.cardGrid} maxWidth="md">
                    <BodyContent />
                </Container>
            </main>
            <div className={footerLayer}></div>
            <Footer />
        </React.Fragment>
    );
};

export default Home;
