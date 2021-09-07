import React from 'react';
import { Box, Container, } from '@material-ui/core';
import { LoginForm, NavBar } from 'src/components';

const Login = () => {
    return (
        <>
            <NavBar />
            <Box
                sx={{
                    backgroundColor: 'background.default',
                    display: 'flex',
                    flexDirection: 'column',
                    height: '100%',
                    justifyContent: 'center'
                }}
            >
                <Container maxWidth="sm"><LoginForm /></Container>
            </Box>
        </>
    );
}

export default Login;
