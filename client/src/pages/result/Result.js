import React from 'react';
import { Box, Container } from '@material-ui/core';
import { ExamResultLayout } from 'src/components';

const Result = () => {
    return (
        <>
            <Box sx={{ backgroundColor: 'background.default', minHeight: '100%', py: 3 }} >
                <Container maxWidth={'lg'}><ExamResultLayout /></Container>
            </Box>
        </>
    );
}

export default Result;