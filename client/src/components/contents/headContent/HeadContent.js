import React, { useEffect } from 'react';
import {
    Container, Typography, Grid, Card,
    CardContent, CardActions, Button, Grow
} from '@material-ui/core';
import useStyles from './headContentStyles';
import KUTE from 'kute.js';
import { useMediaQuery } from 'react-responsive'

const HeadContent = () => {
    const classes = useStyles();
    const isDesktopOrLaptop = useMediaQuery({
        query: '(min-width: 1224px)'
    });

    useEffect(() => {
        if (isDesktopOrLaptop) {
            KUTE.fromTo(
                "#blob1",
                { path: "#blob1" },
                { path: "#blob2" },
                { repeat: 999, duration: 3000, yoyo: true }
            ).start();
        }
    });

    return (
        <Container maxWidth="md">
            <section>
                <div className={classes.blobContent}>
                    <Typography component="h2" variant="h2" align="center" color="textPrimary" gutterBottom>
                        Welcome To Adapt Test
                    </Typography>
                </div>
                {isDesktopOrLaptop && (
                    <svg
                        className={classes.blobMotion}
                        id="visual"
                        viewBox="0 0 960 540"
                        width="960" height="540"
                        xmlns="http://www.w3.org/2000/svg" xmlnsXlink="http://www.w3.org/1999/xlink"
                        version="1.1">
                        <g transform="translate(443.13183242255457 297.2706619827954)">
                            <path
                                id="blob1"
                                d="M141.6 -141C186.6 -96.6 228.3 -48.3 220.5 -7.8C212.8 32.8 155.5 65.5 110.5 95.9C65.5 126.2 32.8 154.1 -11.4 165.5C-55.6 177 -111.3 171.9 -133.8 141.6C-156.3 111.3 -145.6 55.6 -142 3.7C-138.3 -48.3 -141.6 -96.6 -119.1 -141C-96.6 -185.3 -48.3 -225.7 0 -225.7C48.3 -225.7 96.6 -185.3 141.6 -141"
                                fill="#1e364e">
                            </path>
                        </g>
                        <g transform="translate(459.46109140520144 252.39697149448457)" style={{ visibility: 'hidden' }}>
                            <path
                                id="blob2"
                                d="M158 -149.5C194.8 -121.2 207.9 -60.6 202.3 -5.7C196.6 49.3 172.2 98.5 135.4 141.2C98.5 183.9 49.3 219.9 8.7 211.2C-31.8 202.5 -63.6 149 -87.1 106.3C-110.6 63.6 -125.8 31.8 -141.7 -15.9C-157.6 -63.6 -174.3 -127.3 -150.8 -155.6C-127.3 -183.9 -63.6 -177 -1.5 -175.4C60.6 -173.9 121.2 -177.8 158 -149.5"
                                fill="#1e364e">
                            </path>
                        </g>
                    </svg>
                )}
            </section>
            <div className={classes.heroButtons}>
                <Grow in>
                    <Grid container spacing={2} justifyContent="center">
                        <Grid item>
                            <Card elevation={6} className={classes.root}>
                                <CardContent>
                                    <Typography className={classes.title} color="textSecondary" gutterBottom>
                                        Word of the Day
                                    </Typography>
                                    <Typography variant="h5" component="h2">
                                        benevolent
                                    </Typography>
                                    <Typography className={classes.pos} color="textSecondary">
                                        adjective
                                    </Typography>
                                    <Typography variant="body2" component="p">
                                        well meaning and kindly.
                                        <br />
                                        {'"a benevolent smile"'}
                                    </Typography>
                                </CardContent>
                                <CardActions>
                                    <Button size="small">Learn More</Button>
                                </CardActions>
                            </Card>
                        </Grid>
                        <Grid item>
                            <Card elevation={6} className={classes.root}>
                                <CardContent>
                                    <Typography className={classes.title} color="textSecondary" gutterBottom>
                                        Word of the Day
                                    </Typography>
                                    <Typography variant="h5" component="h2">
                                        benevolent
                                    </Typography>
                                    <Typography className={classes.pos} color="textSecondary">
                                        adjective
                                    </Typography>
                                    <Typography variant="body2" component="p">
                                        well meaning and kindly.
                                        <br />
                                        {'"a benevolent smile"'}
                                    </Typography>
                                </CardContent>
                                <CardActions>
                                    <Button size="small">Learn More</Button>
                                </CardActions>
                            </Card>
                        </Grid>
                    </Grid>
                </Grow>
            </div>
        </Container>
    );
};

export default HeadContent;