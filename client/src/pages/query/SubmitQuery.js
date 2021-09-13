import React from 'react';
import { Box, Container } from '@material-ui/core';
import { QueryForm, NavBar } from 'src/components';

const SubmitQuery = () => {
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
                <Container maxWidth="sm"><QueryForm /></Container>
            </Box>
        </>
    );
}

export default SubmitQuery