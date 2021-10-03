import React from 'react';
import { Box, Container, } from '@material-ui/core';
import { CreateExamFormLayout } from 'src/components';

const CreateExam = () => {
    return (
        <>
            <Box sx={{ backgroundColor: 'background.default', minHeight: '100%', py: 3 }} >
                <Container maxWidth={'lg'}><CreateExamFormLayout /></Container>
            </Box>
        </>
    );
}

export default CreateExam;