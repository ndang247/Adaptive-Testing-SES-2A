import React, { useEffect } from 'react';
import {
    Typography, Container, CssBaseline, AppBar,
    Toolbar, Divider, LinearProgress
} from '@material-ui/core';
import { Question } from 'src/components';
import { useParams } from 'react-router-dom';
import { useSelector, useDispatch } from 'react-redux';
import { getPastExamsByID } from 'src/redux/actions/exams';

const Exam = () => {
    const { pin } = useParams();
    const { exam } = useSelector((state) => state.exams);
    const dispatch = useDispatch();

    useEffect(() => {
        if (!exam) dispatch(getPastExamsByID(pin));
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
                {exam ? (
                    <>
                        <Divider sx={{ marginTop: 2, marginBottom: 1 }} />
                        <Container sx={{ marginTop: 2, marginBottom: 2 }}>
                            <Typography variant="h1" align="center" fontFamily="fantasy" color="black">{`${exam.contentType} Test`}</Typography>
                        </Container>
                        <Divider sx={{ marginTop: 2, marginBottom: 1 }} />
                        <Question />
                    </>
                ) : (<LinearProgress color="secondary" />)}
            </main>
        </>
    );
}

export default Exam;
