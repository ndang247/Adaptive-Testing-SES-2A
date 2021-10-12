import React from 'react';
import useStyles from './footerStyles';
import Copyright from './Copyright';
import { Typography, Grid, Container } from '@material-ui/core';
import footer from 'src/assets/images/footer.png';
import { useMediaQuery } from 'react-responsive'

const Footer = () => {
    const classes = useStyles();
    const isDesktopOrLaptop = useMediaQuery({
        query: '(min-width: 1224px)'
    });

    return (
        <footer className={classes.footer}>
            <>
                <Typography variant="h1" align="center" gutterBottom>AdapTest</Typography>
                &nbsp;
                <Container>
                    <Grid container>
                        <Grid item xs={12} sm={12} lg={isDesktopOrLaptop ? 3 : 4}>
                            <Typography textAlign="center" variant="h2" align="left" color="black" component="p">
                                Our Company
                            </Typography>
                            <Typography textAlign="center" variant="subtitle1" align="left" color="black" component="p">
                                About Us
                            </Typography>
                            <Typography textAlign="center" variant="subtitle1" align="left" color="black" component="p">
                                Our Facebook
                            </Typography>
                            <Typography textAlign="center" variant="subtitle1" align="left" color="black" component="p">
                                Our Twitter
                            </Typography>
                            <Typography textAlign="center" variant="subtitle1" align="left" color="black" component="p">
                                Our Instagram
                            </Typography>
                        </Grid>
                        <Grid item xs={12} sm={12} lg={isDesktopOrLaptop ? 3 : 4}>
                            <Typography textAlign="center" variant="h2" align="left" color="black" component="p">
                                Our Service
                            </Typography>
                            <Typography textAlign="center" variant="subtitle1" align="left" color="black" component="p">
                                For Host
                            </Typography>
                            <Typography textAlign="center" variant="subtitle1" align="left" color="black" component="p">
                                For Tester
                            </Typography>
                        </Grid>
                        <Grid item xs={12} sm={12} lg={isDesktopOrLaptop ? 3 : 4}>
                            <Typography textAlign="center" variant="h2" align="left" color="black" component="p">
                                Test
                            </Typography>
                            <Typography textAlign="center" variant="subtitle1" align="left" color="black" component="p">
                                Create Your Own Test
                            </Typography>
                            <Typography textAlign="center" variant="subtitle1" align="left" color="black" component="p">
                                Find Your Test List
                            </Typography>
                            <Typography textAlign="center" variant="subtitle1" align="left" color="black" component="p">
                                Join Your Test
                            </Typography>
                            <Typography textAlign="center" variant="subtitle1" align="left" color="black" component="p">
                                Find Your Test History
                            </Typography>
                        </Grid>
                        {isDesktopOrLaptop && (
                            <Grid item xs={12} sm={12} lg={3} sx={{ marginTop: -15, }}>
                                <div style={{ display: 'flex', justifyContent: 'flex-end', }}>
                                    <img src={footer} alt="footer-illustration" height={300} />
                                </div>
                            </Grid>
                        )}
                    </Grid>
                </Container>
                &nbsp;
            </>
            <Copyright />
        </footer>
    );
};

export default Footer;