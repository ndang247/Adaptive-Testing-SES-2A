import React, { useState } from 'react';
import { Container, Button, Typography, Paper, Grid, Slider, Input } from '@material-ui/core';
import useStyles from './questionFormStyles';
import InputField from './InputField';

const QuestionForm = () => {
    const classes = useStyles();
    const [value, setValue] = useState(50);
    const handleSliderChange = (event, newValue) => {
        setValue(newValue); // although it says event is unused, input and slider breaks without it
    };
    const handleInputChange = (event) => {
        setValue(event.target.value === '' ? '' : Number(event.target.value));
    };
    const handleBlur = () => {
        if (value < 0) {
            setValue(0);
        } else if (value > 100) {
            setValue(100);
        }
    };
    const handleSubmit = (onSubmitProps) => {
        onSubmitProps.resetForm();
    };
    return (
        <>
            <Container component="main" maxWidth={false}>
                <Paper className={classes.paperHead}>
                    <Typography variant="h3">
                        Question Creator
                    </Typography>
                </Paper>
                <Paper className={classes.paper} elevation={3}>
                    <form className={classes.questionForm} onSubmit={handleSubmit}>
                        <Grid container spacing={2}>
                            <InputField name="question" label="Question Info" rowsMax={10} />
                            <InputField name="optionA" label="First Choice" rowsMax={2} />
                            <InputField name="optionB" label="Second Choice" rowsMax={2} />
                            <InputField name="optionC" label="Third Choice" rowsMax={2} />
                            <InputField name="optionD" label="Fourth Choice" rowsMax={2} />
                            <Grid item>
                                <Typography variant="h6"> How difficult is this question? </Typography>
                            </Grid>
                            <Grid container spacing={3}>
                                <Grid item> {/* band-aid fix to the slider edging out until I figure it out*/} </Grid>
                                <Grid item xs>
                                    <Slider
                                        name="rating"
                                        value={typeof value === 'number' ? value : 0}
                                        onChange={handleSliderChange}
                                        aria-labelledby="input-slider"
                                        color="secondary"
                                    /> {/* need someone to help fix this slider edging out of the form*/}
                                </Grid>
                                <Grid item>
                                    <Input
                                        className={classes.input}
                                        value={value}
                                        margin="dense"
                                        onChange={handleInputChange}
                                        onBlur={handleBlur}
                                        inputProps={{
                                            step: 1,
                                            min: 0,
                                            max: 100,
                                            type: 'number',
                                            'aria-labelledby': 'input-slider',
                                        }}
                                    />
                                </Grid>
                            </Grid>
                        </Grid>
                        <Button type="submit" fullWidth variant="contained" color="primary" className={classes.submitBtn}>
                            DONE
                        </Button>
                    </form>
                </Paper>
            </Container>
        </>
    );
}

export default QuestionForm
