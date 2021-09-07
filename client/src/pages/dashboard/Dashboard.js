import React from 'react';
import { Container, Box } from '@material-ui/core';
import { DashboardLayout } from 'src/components';

const Dashboard = () => {
    return (
        <>
            <DashboardLayout />
            <Box sx={{ backgroundColor: 'background.default', minHeight: '100%', py: 3 }} >
                <Container maxWidth={false}>
                </Container>
            </Box>
        </>
    );
}

export default Dashboard;
