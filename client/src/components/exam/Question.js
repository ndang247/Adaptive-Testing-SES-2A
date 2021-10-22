import React, { useEffect, useState } from 'react';
import {
    Paper, Typography, Button, Grid,
    Container, Toolbar, Divider, FormControl,
    FormControlLabel, RadioGroup, Radio
} from '@material-ui/core';
import useStyles from './questionStyles';
import { useSelector } from 'react-redux';
import { shuffle } from './shuffle';

const Question = () => {
    const [value, setValue] = useState('');
    const [num, setNum] = useState(0);
    const [choices, setChoices] = useState([]);
    const { exam } = useSelector((state) => state.exams);
    const classes = useStyles();

    useEffect(() => {
        setValue('');
        if (exam) setChoices(shuffle(exam?.questionIds[num].answers));
    }, [num]);

    const handleChange = (event) => setValue(event.target.value);

    const handleNext = () => {
        if (num < exam?.questionIds.length - 1) setNum(prevState => prevState + 1);
    }

    // const handleUpdate = () => {
    //     document.getElementById('nextButton').disabled = 0;
    //     document.getElementById('updateButton').disabled = 1;
    // }
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
                            {exam?.questionIds[num].content}
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
                            {exam && choices.map((answer, index) => (
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
                                        <RadioGroup value={value} onChange={handleChange}>
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
                {num === exam?.questionIds.length - 1 ? (
                    <Button
                        variant="contained"
                        color="primary"
                        onClick={handleNext}
                        disabled={value ? false : true}
                    >
                        Submit
                    </Button>
                ) : (
                    <Button
                        variant="contained"
                        color="primary"
                        onClick={handleNext}
                        disabled={value ? false : true}
                    >
                        Next
                    </Button>
                )}
            </Container>
        </>
    );
}

export default Question;
