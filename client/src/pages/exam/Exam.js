import React, { useEffect } from 'react';
import {
    Typography, Container, CssBaseline, AppBar,
    Toolbar, Divider, LinearProgress
} from '@material-ui/core';
import { Question } from 'src/components';
import { useHistory } from 'react-router-dom';
import { useSelector } from 'react-redux';
import { Result } from 'src/components';

const Exam = () => {
    const { exam, loading } = useSelector((state) => state.exams);
    const history = useHistory();

    useEffect(() => {
        if (!exam) {
            window.alert("Page refreshed. The exam will now terminate.");
            history.push('/user/dashboard');
        }
    }, []);

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
                {loading ? (<LinearProgress color="secondary" />) : exam?.nextQuestion ? (
                    <>
                        <Divider sx={{ marginTop: 2, marginBottom: 1 }} />
                        <Container sx={{ marginTop: 2, marginBottom: 2 }}>
                            <Typography
                                variant="h1"
                                align="center"
                                fontFamily="fantasy"
                                color="black"
                            >
                                {`${exam?.test?.title}`}
                            </Typography>
                        </Container>
                        <Divider sx={{ marginTop: 2, marginBottom: 1 }} />
                        <Question />
                    </>
                ) : <Result />}
            </main>
        </>
    );
}

export default Exam;
