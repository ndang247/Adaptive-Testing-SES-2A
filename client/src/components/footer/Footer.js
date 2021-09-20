import React from 'react';
import useStyles from './footerStyles';
import Copyright from './Copyright';
import { Typography, Button, Grid, Container, Divider, Paper } from '@material-ui/core';
import footer from 'src/assets/images/footer.png';
import { useMediaQuery } from 'react-responsive'

const Footer = () => {
    const classes = useStyles();
    const isDesktopOrLaptop = useMediaQuery({
        query: '(min-width: 768px)'
    });

    const preventDefault = (event) => event.preventDefault();

    return (
        <footer className={classes.footer}>
            {<><Typography variant="h1" align="center" gutterBottom>
                AdapTest
            </Typography>
                {/* Spacing */}  
                <div className={classes.paper}>
                    <Paper >
                    </Paper>
                </div>
                
                {/* First list */}
                <Grid container >
                    <Grid xs={3} >
                        <Container >
                            <Typography variant="h2" align="left" color="black" component="p">
                                Our Company
                            </Typography>
                            <Typography variant="subtitle1" align="left" color="black" component="p">
                                About Us
                            </Typography>
                            <Typography variant="subtitle1" align="left" color="black" component="p">
                                Our Facebook
                            </Typography>
                            <Typography variant="subtitle1" align="left" color="black" component="p">
                                Our Twitter
                            </Typography>
                            <Typography variant="subtitle1" align="left" color="black" component="p">
                                Our Instagram
                            </Typography>
                        </Container>
                    </Grid>

                    {/* Second list */}
                    <Grid xs={3}>
                        <Container>
                            <Typography variant="h2" align="left" color="black" component="p">
                                Our Service
                            </Typography>
                            <Typography variant="subtitle1" align="left" color="black" component="p">
                                For Host
                            </Typography>
                            <Typography variant="subtitle1" align="left" color="black" component="p">
                                For Tester
                            </Typography>
                        </Container>
                    </Grid>

                    {/* Third list */}
                    <Grid xs={3}>
                        <Container>
                            <Typography variant="h2" align="left" color="black" component="p">
                                Test
                            </Typography>
                            <Typography variant="subtitle1" align="left" color="black" component="p">
                                Create Your Own Test
                            </Typography>
                            <Typography variant="subtitle1" align="left" color="black" component="p">
                                Find Your Test List
                            </Typography>
                            <Typography variant="subtitle1" align="left" color="black" component="p">
                                Join Your Test
                            </Typography>
                            <Typography variant="subtitle1" align="left" color="black" component="p">
                                Find Your Test History
                            </Typography>
                        </Container>
                    </Grid>

                    {/* FooterImage */}
                    <Grid>
                        {isDesktopOrLaptop && (
                            <Typography style={{ display: 'flex', justifyContent: 'flex-end' }}>
                                <img src={footer} alt="footer-illustration" height={300} />
                            </Typography>
                        )}
                    </Grid>
                </Grid>
            </>}


            {/* {isDesktopOrLaptop && (
                <Typography style={{ display: 'flex', justifyContent: 'flex-end' }}>
                    <img src={footer} alt="footer-illustration" height={300} />
                </Typography>
            )} */}
            <Copyright />
        </footer>
    );
};

export default Footer;
