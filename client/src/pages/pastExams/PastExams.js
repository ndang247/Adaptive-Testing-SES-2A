import React from 'react';
import { Box, Container, } from '@material-ui/core';
import { PastExamsLayout } from 'src/components';

const PastExams = () => {
    return (
        <>
            <Box sx={{ backgroundColor: 'background.default', minHeight: '100%', py: 3 }} >
                <Container maxWidth={'lg'}><PastExamsLayout /></Container>
            </Box>
        </>
    );
}

export default PastExams;