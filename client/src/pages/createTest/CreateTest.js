import React from 'react';
import { Box, Container, } from '@material-ui/core';
import { TestFormLayout } from 'src/components';
const CreateTest = () => {
    return (
        <>
            <Box sx={{ backgroundColor: 'background.default', minHeight: '100%', py: 3 }} >
                <Container maxWidth={'lg'}>
                    <TestFormLayout />
                </Container>
            </Box>
        </>
    );
}

export default CreateTest;