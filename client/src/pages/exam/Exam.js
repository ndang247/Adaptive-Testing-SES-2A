import React, { useEffect } from 'react'
import {
    Paper, Typography, Button, Grid,
    Container, CssBaseline, AppBar, Toolbar,
    Divider,
} from '@material-ui/core';
import useStyles from './examStyles';
import { useSelector } from 'react-redux';
// import { HeadContent, BodyContent, Footer, NavBar } from 'src/components';

const Exam = () => {
    const classes = useStyles();
    const {questionData, loading} = useSelector((state) => state.question);
    console.log(questionData);
    if (!questionData) return <>Loading...</>;

    return (
        <React.Fragment>
            <main>
                <CssBaseline />
                <AppBar position="relative">
                    <Toolbar>
                        <Typography variant="h2">
                            AdapTest
                        </Typography>
                    </Toolbar>
                </AppBar>
                <div >
                    <Typography variant="h1" align="center">
                        Math Test
                    </Typography>
                </div>
                <Divider />
                <div>
                    <Grid container flexDirection="column" alignItems="revert">
                        <Grid item xs={3}>
                            <Typography variant="h3" align="center" color="Highlight" fontStyle="oblique">
                                Time Left :
                            </Typography>
                        </Grid>
                        <Grid item xs={3}>
                            <Typography variant="h3" align="center" color="Highlight">
                                29:59
                            </Typography>
                        </Grid>
                    </Grid>
                </div>
                <Divider />
                <div className={classes.paper} >
                    <Paper elevation={10} >
                        <Container>
                            <Grid container>
                                <Grid item xs={11}>
                                    <Toolbar>
                                        <Typography variant="h1">
                                            Question 1
                                        </Typography>
                                    </Toolbar>
                                </Grid>

                                <Grid item xs={1} >
                                    <Toolbar>
                                        <Typography variant="h1" >
                                            1/40
                                        </Typography>
                                    </Toolbar>
                                </Grid>
                            </Grid>
                        </Container>
                        <Divider />
                        <div>
                            <Typography variant="h1" >
                                {questionData.content}
                            </Typography>
                        </div>
                    </Paper>
                </div>
                <div className={classes.answer} >
                    <Paper elevation={10} align="center">
                        <Grid container>
                            <Grid item xs={8}>
                                <Toolbar>
                                    <Typography variant="h1">
                                        Multiple choice
                                    </Typography>
                                </Toolbar>
                            </Grid>
                        </Grid>
                        {/* End of Multiple Choice title, should not change */}
                        <Divider />
                        {/* 4 answer buttons */}
                        <div className={classes.answer}>
                            <Grid container >
                                <Grid item xs={6}>
                                    <Button>
                                        <Typography variant="h1">
                                            {questionData.correctAnswer}
                                        </Typography>
                                    </Button>
                                </Grid>
                                {questionData.wrongAnswers.map((wrongAnswer) => (
                                    <Grid key={wrongAnswer} item xs={6}>
                                    <Button>
                                        <Typography variant="h1">
                                            {wrongAnswer}
                                        </Typography>
                                    </Button>
                                    </Grid>
                                ))}
                            </Grid>
                        </div>
                    </Paper>
                </div>
                <div align="center">
                    <Button variant="contained" color="primary">
                        Next
                    </Button>
                </div>
            </main>
        </React.Fragment>
    );
}

export default Exam;
