import React from 'react';
import { Container } from '@material-ui/core';
import useStyles from './homeStyles';
import Navbar from 'src/components/navbar/Navbar';
import Footer from 'src/components/footer/Footer';
import HeadContent from 'src/components/contents/headContent/HeadContent';
import BodyContent from 'src/components/contents/bodyContent/BodyContent';
import clsx from 'clsx';

const Home = () => {
    const classes = useStyles();
    const headLayer = clsx(classes.headSpacer, classes.headLayer);
    const footerLayer = clsx(classes.footerSpacer, classes.footerLayer);
    return (
        <React.Fragment>
            <main>
                <Navbar />
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
