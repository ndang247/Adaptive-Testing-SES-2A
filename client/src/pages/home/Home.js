import React from 'react';
import { Container, Button } from '@material-ui/core';
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
                <Container color="text.primary" clone>
                    <Button href="./login" size="medium" color="primary">
                        Login Page
                    </Button>
                </Container>
            </main>
            <div className={footerLayer}></div>
            <Footer />
        </React.Fragment>
    );
};

export default Home;
