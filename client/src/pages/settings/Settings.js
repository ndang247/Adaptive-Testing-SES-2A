import React from 'react';
import { Container, Box } from '@material-ui/core';
import { EditAccountDetailsLayout } from 'src/components';

const Settings = () => {
    return (
        <>
            <Box sx={{ backgroundColor: 'background.default', minHeight: '100%', py: 3 }} >
                <Container maxWidth={'lg'}>
                    <EditAccountDetailsLayout />
                </Container>
            </Box>
        </>
    );
}

export default Settings;
