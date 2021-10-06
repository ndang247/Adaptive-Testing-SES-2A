import React from 'react';
import { Box, Container } from '@material-ui/core';
import { QueryFormLayout } from 'src/components';

const Query = () => {
    return (
        <>
            <Box sx={{ backgroundColor: 'background.default', minHeight: '100%', py: 3 }} >
                <Container maxWidth={'lg'}><QueryFormLayout /></Container>
            </Box>
        </>
    );
}

export default Query