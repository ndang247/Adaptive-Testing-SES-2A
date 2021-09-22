import React from 'react';
import useStyles from './bodyStyles';
import {
    Card, CardMedia, CardContent,
    Typography, CardActions, Button, CardActionArea,
    Link
} from '@material-ui/core';
import { Link as RouterLink } from 'react-router-dom'
import { useMediaQuery } from 'react-responsive'

const BodyContent = () => {
    const classes = useStyles();
    const isDesktopOrLaptop = useMediaQuery({
        query: '(min-width: 1224px)'
    });

    return (
        <main>
            <Card style={{ marginTop: isDesktopOrLaptop ? '40%' : '0' }} className={classes.card}>
                <CardActionArea>
                    <CardMedia
                        className={classes.media}
                        image="http://p5.itc.cn/images01/20200825/48701ab3d64b4aada25f4e55a5b695d2.jpeg"
                        title="random"
                    />
                    <CardContent>
                        <Typography variant="h1" font="Arial">For Adap Test</Typography>
                        <Typography variant="sub1">???</Typography>
                    </CardContent>
                </CardActionArea>
                <CardActions>
                    <Button size="small" color="primary">
                        <Link color="inherit" component={RouterLink} underline="none" to="">
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
                        <Link color="inherit" component={RouterLink} underline="none" to="/host/login" >
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
                        <Link color="inherit" component={RouterLink} underline="none" to="/user/login" >
                            Join As Tester
                        </Link>
                    </Button>
                </CardActions>
            </Card>
        </main>
    );
};

export default BodyContent;
