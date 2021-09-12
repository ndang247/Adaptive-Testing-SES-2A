import React from 'react';
import { Box, Container } from '@material-ui/core';
import { QuestionForm, NavBar } from 'src/components';

const CreateQuestion = () => {
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
                <Container maxWidth="sm"><QuestionForm /></Container>
            </Box>
        </>
    );
}

export default CreateQuestion
