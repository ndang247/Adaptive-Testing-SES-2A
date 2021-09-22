import React from 'react';
import { Container, Box } from '@material-ui/core';
import { ProfileLayout } from 'src/components';

const Profile = () => {
    return (
        <>
            <Box sx={{ backgroundColor: 'background.default', minHeight: '100%', py: 3 }} >
                <Container maxWidth={'lg'}>
                    <ProfileLayout />
                </Container>
            </Box>
        </>
    );
}

export default Profile;
