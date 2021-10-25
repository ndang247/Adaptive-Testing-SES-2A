import React, { useEffect } from 'react';
import {
    Typography, Container, CssBaseline, AppBar,
    Toolbar, Divider, LinearProgress, Link
} from '@material-ui/core';
import { Question } from 'src/components';
import { useParams, useHistory } from 'react-router-dom';
import { useSelector } from 'react-redux';
// import { validateExamPin } from 'src/redux/actions/exams';
import { Link as RouterLink } from 'react-router-dom';

const Exam = () => {
    const { pin } = useParams();
    // const [form] = useState({ pin });
    const { exam, loading } = useSelector((state) => state.exams);
    // const dispatch = useDispatch();
    const history = useHistory();

    useEffect(() => {
        if (!exam && window.confirm("Continue to your dashboard?")) {
            history.push('/user/dashboard');
        }
        // if (!exam) dispatch(validateExamPin(form, history));
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
                                {`${exam?.test?.contentType} Test`}
                            </Typography>
                        </Container>
                        <Divider sx={{ marginTop: 2, marginBottom: 1 }} />
                        <Question />
                    </>
                ) : (
                    <>
                        <Divider sx={{ marginTop: 2, marginBottom: 1 }} />
                        <Container sx={{ marginTop: 2, marginBottom: 2 }}>
                            <Typography
                                variant="h1"
                                align="center"
                                fontFamily="fantasy"
                                color="black"
                            >
                                Congratulation, you can view your score in your dashboard!
                                &nbsp;
                                <Link color="inherit" component={RouterLink} to="/user/dashboard/exam/history">here</Link>
                            </Typography>
                        </Container>
                        <Divider sx={{ marginTop: 2, marginBottom: 1 }} />
                    </>
                )}
            </main>
        </>
    );
}

export default Exam;
