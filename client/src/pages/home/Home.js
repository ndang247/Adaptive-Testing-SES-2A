import React from 'react';
import { Container } from '@material-ui/core';
import useStyles from './homeStyles';
import Navbar from 'src/components/navbar/Navbar';
import Footer from 'src/components/footer/Footer';
import HeadContent from 'src/components/contents/headContent/HeadContent';
import BodyContent from 'src/components/contents/bodyContent/BodyContent';

const Home = () => {
    const classes = useStyles();
    return (
        <React.Fragment>
            <main>
                <Navbar />
                <div className={classes.heroContent}>
                    <HeadContent />
                </div>
                <Container className={classes.cardGrid} maxWidth="md">
                    <BodyContent />
                </Container>
            </main>
            <Footer />
        </React.Fragment>
    );
};

export default Home;
