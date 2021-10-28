import React, { useEffect } from 'react';
import {
    Typography, Container, Divider, LinearProgress,
    Link, Alert
} from '@material-ui/core';
import { Link as RouterLink, useParams } from 'react-router-dom';
import { useDispatch, useSelector } from 'react-redux';
import { getScoreByExamId } from 'src/redux/actions/scores';
import { Champion } from 'src/constants/rank';

const Result = () => {
    const { pin } = useParams();
    const { loading, score, errors } = useSelector((state) => state.scores);
    const dispatch = useDispatch();

    useEffect(() => {
        if (!score) dispatch(getScoreByExamId(pin));
    }, []);

    return (
        <>
            {loading && !errors ? (<LinearProgress color="secondary" />) : (
                <>
                    <Divider sx={{ marginTop: 2, marginBottom: 1 }} />
                    <Container sx={{ marginTop: 2, marginBottom: 2 }}>
                        <Typography variant="h1" align="center" fontFamily="fantasy" color="black">
                            {errors ? (
                                (<>
                                    <Alert variant="filled" severity="error">{
                                        `${errors}. Please check your score in your dashboard exam history`
                                    }</Alert>
                                    <Link color="inherit" component={RouterLink} to="/user/dashboard">Back to dashboard</Link>
                                </>)
                            ) : (
                                <>
                                    Congratulation on finishing your exam. {score?.title === Champion ? `You placed at a ${score?.title} level. You are the best and are very knowledgeable at the topic! Amazing work!` : `You placed at a ${score?.title} level, keep trying your best to improve!`}
                                    &nbsp;
                                    Alternatively, you can view your score in your dashboard!
                                    &nbsp;
                                    <Link color="inherit" component={RouterLink} to="/user/dashboard/exam/history">here</Link>
                                </>
                            )}
                        </Typography>
                    </Container>
                    <Divider sx={{ marginTop: 2, marginBottom: 1 }} />
                </>
            )}
        </>
    );
}

export default Result;
