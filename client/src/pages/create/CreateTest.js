import React from 'react';
import { Box, Container, } from '@material-ui/core';
import { TestForm, NavBar } from 'src/components';

const CreateTest = () => {
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
                <Container maxWidth="sm"><TestForm /></Container>
            </Box>
        </>
    );
}

export default CreateTest