import React from 'react';
import { Box, Container, } from '@material-ui/core';
import { LoginForm } from 'src/components';

const Login = () => {
    return (
        <Box
            sx={{
                backgroundColor: 'background.default',
                display: 'flex',
                flexDirection: 'column',
                height: '100%',
                justifyContent: 'center'
            }}
        >
            <Container maxWidth="sm">
                <LoginForm />
            </Container>
        </Box>
    );
}

export default Login;
