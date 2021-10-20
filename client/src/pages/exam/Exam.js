import React from 'react';
import {
    Typography, Container, CssBaseline, AppBar,
    Toolbar, Divider,
} from '@material-ui/core';
import { Question } from 'src/components';

const Exam = () => {
    return (
        <>
            <main>
                <CssBaseline />
                <AppBar position="relative">
                    <Toolbar>
                        <Typography variant="h2">
                            AdapTest
                        </Typography>
                    </Toolbar>
                </AppBar>
                <Divider sx={{ marginTop: 2, marginBottom: 1 }} />
                <Container sx={{ marginTop: 2, marginBottom: 2 }}>
                    <Typography variant="h1" align="center" fontFamily="fantasy" color="black">
                        Math Test
                    </Typography>
                </Container>
                <Divider sx={{ marginTop: 2, marginBottom: 1 }} />
                <Question />
            </main>
        </>
    );
}

export default Exam;
