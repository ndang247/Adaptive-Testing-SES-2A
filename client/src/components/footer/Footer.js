import React from 'react';
import useStyles from './footerStyles';
import Copyright from './Copyright';
import { Typography, Grid } from '@material-ui/core';
import footer from 'src/assets/images/footer.png';
import { useMediaQuery } from 'react-responsive'

const Footer = () => {
    const classes = useStyles();
    const isDesktopOrLaptop = useMediaQuery({
        query: '(min-width: 768px)'
    });

    return (
        <footer className={classes.footer}>
            <>
                <Typography variant="h1" align="center" gutterBottom>AdapTest</Typography>
                &nbsp;
                <Grid container>
                    <Grid item xs={12} sm={6} lg={4}>
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
                    <Grid item xs={12} sm={6} lg={4}>
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
                    <Grid item xs={12} sm={6} lg={4}>
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
                </Grid>
                &nbsp;
                <div style={{ display: 'flex', justifyContent: 'flex-end' }}>
                    {isDesktopOrLaptop && (<img src={footer} alt="footer-illustration" height={300} />)}
                </div>
            </>
            <Copyright />
        </footer>
    );
};

export default Footer;
