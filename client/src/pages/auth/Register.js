import React from 'react';
import { Box, Container, } from '@material-ui/core';
import { RegisterForm } from 'src/components';

const Register = () => {
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
                <RegisterForm />
            </Container>
        </Box>
    );
}

export default Register;
