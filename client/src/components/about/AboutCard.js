import React from 'react';
import { Container, Grid } from '@material-ui/core';
import useStyles from './AboutCardStyles';
import CardInfo from './CardInfo';
import info from './info';
import useWindowPosition from './useWindowPosition';

const AboutCard = () => {
    const classes = useStyles();
    useWindowPosition("header");

    return (
        <Container main className={classes.root}>
            <Grid container spacing={2}>
                <Grid item xs={6}>
                    <CardInfo info={info[0]} />
                </Grid>
                <Grid item xs={6}>
                    <CardInfo info={info[1]} />
                </Grid>
                <Grid item xs={6}>
                    <CardInfo info={info[2]} />
                </Grid>
                <Grid item xs={6}>
                    <CardInfo info={info[3]} />
                </Grid>
                <Grid item xs={6}>
                    <CardInfo info={info[4]} />
                </Grid>
                <Grid item xs={6}>
                    <CardInfo info={info[5]} />
                </Grid>
                <Grid item xs={6}>
                    <CardInfo info={info[6]} />
                </Grid>
                <Grid item xs={6}>
                    <CardInfo info={info[7]} />
                </Grid>
            </Grid>
        </Container >
    );
}

export default AboutCard
