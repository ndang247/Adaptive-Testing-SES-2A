import React from 'react';
import { Container, Box } from '@material-ui/core';
import { EditProfileLayout } from 'src/components';

const EditProfile = () => {
    return (
        <>
            <EditProfileLayout />
            <Box sx={{ backgroundColor: 'background.default', minHeight: '100%', py: 3 }} >
                <Container maxWidth={false}>
                </Container>
            </Box>
        </>
    );
}

export default EditProfile;
