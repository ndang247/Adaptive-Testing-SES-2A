import React from 'react';
import useStyles from './bodyStyles';
import {
    Card, CardMedia, CardContent,
    Typography, CardActions, Button, CardActionArea,
    Link, divider
} from '@material-ui/core';
import { Link as RouterLink } from 'react-router-dom'
import { useMediaQuery } from 'react-responsive'
import { Box } from '@material-ui/system';

const BodyContent = () => {
    const classes = useStyles();
    const isDesktopOrLaptop = useMediaQuery({
        query: '(min-width: 1224px)'
    });

    return (
        <main>
            <Box >
                <Card style={{ marginTop: isDesktopOrLaptop ? '40%' : '0' }} className={classes.card}>
                    <CardActionArea>
                        <CardMedia
                            className={classes.media}
                            image="http://p5.itc.cn/images01/20200825/48701ab3d64b4aada25f4e55a5b695d2.jpeg"
                            alt="random"
                        />
                        <CardContent>
                            <Typography variant="h1" fontFamily="Arial Black" sx={{ marginBottom: 2 }}>For Adap Test</Typography>
                            <Typography variant="h4" fontFamily="Verdana">
                                AdapTest is an online exam system. You are welcome to join us as either a host or a tester. To use our system, you
                                need to register an account first. When you sign-in, you will be transferred to your dashboard page.
                            </Typography>
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
                            alt="Adap Test"
                        />
                        <CardContent>
                            <Typography variant="h1" fontFamily="Arial Black" sx={{ marginBottom: 2 }}>For the Host</Typography>
                            <Typography variant="h4" fontFamily="Verdana">
                                As a host, you can create your own tests. To use that function, you need to sign-in with your AdapTest account.
                                Then you should be able to find "create exam" in the dashboard. You can also review and edit your tests.
                            </Typography>
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
                            alt="Tester"
                        />
                        <CardContent>
                            <Typography variant="h1" fontFamily="Arial Black" sx={{ marginBottom: 2 }}>For the Tester</Typography>
                            <Typography variant="h4" fontFamily="Verdana">
                                As a tester, you can join a test by enter the "Room Pin". To use that function, you need to sign-in with your AdapTest account.
                                Then you should be able to find "Join Exam" in the dashboard. Furthermore, you can also review your exam history by clicking
                                "Exam History" in the dashboard.
                            </Typography>
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
            </Box>
        </main>
    );
};

export default BodyContent;
