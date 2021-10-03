import React from 'react';
import { Box, Container, } from '@material-ui/core';
import { ExamsLayout } from 'src/components';

const Exams = () => {
    return (
        <>
            <Box sx={{ backgroundColor: 'background.default', minHeight: '100%', py: 3 }} >
                <Container maxWidth={'lg'}><ExamsLayout /></Container>
            </Box>
        </>
    );
}

export default Exams;