import React from 'react';
import { Container, Box } from '@material-ui/core';
import { AccountDetailsLayout } from 'src/components';

const Account = () => {
    return (
        <>
            <Box sx={{ backgroundColor: 'background.default', minHeight: '100%', py: 3 }} >
                <Container maxWidth={'lg'}><AccountDetailsLayout /></Container>
            </Box>
        </>
    );
}

export default Account;
