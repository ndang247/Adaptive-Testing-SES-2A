import React from 'react';
import { Typography, Link } from '@material-ui/core';

const Copyright = () => {
    return (
        <Typography variant="body2" color="black" align="center">
            {'Copyright © '}
            <Link color="inherit" href="/">Adapt Test</Link>{' '}
            {new Date().getFullYear()}
            {'.'}
        </Typography>
    );
};

export default Copyright;
