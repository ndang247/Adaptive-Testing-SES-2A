import React, { useState } from 'react';
import {
    Paper, Typography, Button, Grid,
    Container, Toolbar, Divider, FormControl,
    FormControlLabel, RadioGroup, Radio
} from '@material-ui/core';
import useStyles from './questionStyles';
import { useSelector, useDispatch } from 'react-redux';
import { getNextQuestion } from 'src/redux/actions/exams';
import { useParams, useHistory } from 'react-router-dom';

const initialForm = {
    answer: ''
};

const Question = () => {
    const { pin, question_id } = useParams();
    const [form, setForm] = useState(initialForm);
    const { exam } = useSelector((state) => state.exams);
    const classes = useStyles();
    const dispatch = useDispatch();
    const history = useHistory();

    const handleChange = (event) => setForm({ ...form, answer: event.target.value });

    const handleSubmit = (e) => {
        e.preventDefault();
        // console.log(form);
        dispatch(getNextQuestion(pin, question_id, form, history));
    }

    return (
        <>
            <div className={classes.paper}>
                <Paper elevation={6} >
                    <Container>
                        <Grid container sx={{ marginLeft: 2 }}>
                            <Grid item>
                                <Toolbar><Typography variant="h2">Question</Typography></Toolbar>
                            </Grid>
                        </Grid>
                    </Container>
                    <Divider />
                    <div>
                        <Typography variant='h3' sx={{ marginLeft: 8, marginTop: 2, marginRight: 3 }}>
                            {exam?.nextQuestion?.content}
                        </Typography>
                    </div>
                </Paper>
            </div>
            <div className={classes.answer}>
                <Paper elevation={6}>
                    <Container>
                        <Grid container sx={{ marginLeft: 2 }}>
                            <Grid item>
                                <Toolbar><Typography variant="h2">Multiple Choice</Typography></Toolbar>
                            </Grid>
                        </Grid>
                    </Container>
                    <Divider />
                    <Container>
                        <Grid container sx={{ marginLeft: 5 }}>
                            {exam && exam?.nextQuestion?.answers.map((answer, index) => (
                                <Grid
                                    key={index}
                                    item
                                    sx={{ marginTop: 2, marginBottom: 14 }}
                                    xs={12}
                                    sm={12}
                                    md={6}
                                    lg={6}
                                >
                                    <FormControl component="fieldset">
                                        <RadioGroup value={form.answer} onChange={handleChange}>
                                            <FormControlLabel value={answer} control={<Radio />} label={answer} />
                                        </RadioGroup>
                                    </FormControl>
                                </Grid>
                            ))}
                        </Grid>
                    </Container>
                </Paper>
            </div>
            <Container align="center">
                {/* <Button 
                    variant="contained" 
                    color="primary"
                    sx={{ marginTop: 2, marginRight: 6 }}
                    onClick={handleUpdate}
                >
                    Update score
                </Button> */}
                {/* {num === exam?.questionIds.length - 1 ? ( */}
                <Button
                    variant="contained"
                    color="primary"
                    onClick={handleSubmit}
                    disabled={form.answer ? false : true}
                >
                    Submit
                </Button>
                {/* ) : ( */}
                {/* <Button
                        variant="contained"
                        color="primary"
                        // onClick={handleNext}
                        disabled={value ? false : true}
                    >
                        Next
                    </Button> */}
                {/* )} */}
            </Container>
        </>
    );
}

export default Question;
