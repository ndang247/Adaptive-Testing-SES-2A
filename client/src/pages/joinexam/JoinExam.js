import React from 'react';
import { Box, Container } from '@material-ui/core';
import { JoinForm, NavBar } from 'src/components';

const JoinExam = () => {
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
                <Container maxWidth="sm"><JoinForm /></Container>
            </Box>
        </>
    );
}

export default JoinExam