import React from 'react';
import useStyles from './bodyContentStyles';
import {
    Grid, Card, CardMedia, CardContent,
    Typography, CardActions, Button, CardActionArea, Container,
    Box, Link, Paper
} from '@material-ui/core';
import { Link as RouterLink } from 'react-router-dom';
import adapTest from 'src/assets/images/adapTest.jpg';
import testing from 'src/assets/images/testing.jpg'
import { useMediaQuery } from 'react-responsive'

const BodyContent = () => {
    const classes = useStyles();
    return (
        <main >
            <Card className={classes.card}>
                <CardActionArea>
                    <CardMedia
                        className={classes.media}
                        image="http://p5.itc.cn/images01/20200825/48701ab3d64b4aada25f4e55a5b695d2.jpeg"
                        title="random"
                    />
                    <CardContent>
                        <Typography variant="h1" font= "Arial">For Adap Test</Typography>
                        <Typography variant="sub1">???</Typography>
                    </CardContent>
                </CardActionArea>
                <CardActions>
                <Button size="small" color="primary">
                        <Link
                            color="inherit"
                            component={RouterLink}
                            underline="none"
                            to=""
                        >
                            About Adap-Test
                        </Link>
                    </Button>
                </CardActions>
            </Card>

            <Card className={classes.card}>
                <CardActionArea>
                    <CardMedia
                        className={classes.media}
                        image="https://2j61yv256vxd12hdls206jrv-wpengine.netdna-ssl.com/wp-content/uploads/2020/10/books-scaled.jpg"
                        title="Adap Test"
                    />
                    <CardContent>
                        <Typography variant="h1">For the Host</Typography>
                        <Typography variant="sub1">???</Typography>
                    </CardContent>
                </CardActionArea>
                <CardActions>
                    <Button size="small" color="primary">
                        <Link
                            color="inherit"
                            component={RouterLink}
                            underline="none"
                            to="/host/login"
                        >
                            Join As Host
                        </Link>
                    </Button>
                </CardActions>
            </Card>

            <Card className={classes.card}>
                <CardActionArea>
                    <CardMedia
                        className={classes.media}
                        image="https://www.eliteserien.no/videotest/_/image/fa0769e4-2da7-486b-b347-bb992f911e43:ad8b9078aa6a3b757fbe68d82beb4b22fec95228/wide-1600-900/test.jpg"
                        title="Tester"
                    />
                    <CardContent>
                        <Typography variant="h1">For the Tester</Typography>
                        <Typography variant="sub1">???</Typography>
                    </CardContent>
                </CardActionArea>
                <CardActions>
                    <Button size="small" color="primary">
                        <Link
                            color="inherit"
                            component={RouterLink}
                            underline="none"
                            to="/user/login"
                        >
                            Join As Tester
                        </Link>
                    </Button>
                </CardActions>
            </Card>
        </main>
        /* {cards.map((card) => (
            <Grid item key={card} xs={12} sm={6} md={4}>
                <Card className={classes.card}>
                    <CardMedia
                        className={classes.cardMedia}
                        image="https://source.unsplash.com/random"
                        title="Image title"
                    />
                    <CardContent className={classes.cardContent}>
                        <Typography gutterBottom variant="h5" component="h2">
                            Heading
                        </Typography>
                        <Typography>
                            This is a media card. You can use this section to describe the content.
                        </Typography>
                    </CardContent>
                    <CardActions>
                        <Button size="small" color="primary">
                            View
                        </Button>
                        <Button size="small" color="primary">
                            Edit
                        </Button>
                    </CardActions>
                </Card>
            </Grid>
        ))} */


    );
};

export default BodyContent;
