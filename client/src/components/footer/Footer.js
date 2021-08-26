import React from 'react';
import useStyles from './footerStyles';
import Copyright from './Copyright';
import { Typography } from '@material-ui/core';
import footer from 'src/assets/images/footer.png';
import { useMediaQuery } from 'react-responsive'

const Footer = () => {
    const classes = useStyles();
    const isDesktopOrLaptop = useMediaQuery({
        query: '(min-width: 768px)'
    });

    return (
        <footer className={classes.footer}>
            {/* <Typography variant="h6" align="center" gutterBottom>
                Footer
            </Typography>
            <Typography variant="subtitle1" align="center" color="textSecondary" component="p">
                Something here to give the footer a purpose!
            </Typography> */}
            {isDesktopOrLaptop && (
                <Typography style={{ display: 'flex', justifyContent: 'flex-end' }}>
                    <img src={footer} alt="footer-illustration" height={400} />
                </Typography>
            )}
            <Copyright />
        </footer>
    );
};

export default Footer;
