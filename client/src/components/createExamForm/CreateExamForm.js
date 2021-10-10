import React, { useState } from 'react';
import {
    Container, Typography, Paper, Grid,
    TextField, Box, Button,
    IconButton, Slider, Input, Autocomplete
} from '@material-ui/core';
import RemoveIcon from '@material-ui/icons/Remove'
import AddIcon from '@material-ui/icons/Add'
import useStyles from './createExamFormStyles';
import { useDispatch } from 'react-redux';
import { createExam } from 'src/redux/actions/exams';

const user = JSON.parse(localStorage.getItem('profile'));

const subjects = ['Math'];

const initialForm = {
    creatorId: user.id,
    title: '',
    questions: [],
    expiryDate: new Date(),
    contentType: ''
}

const CreateExamForm = () => {
    const classes = useStyles();
    const [form, setForm] = useState(initialForm);
    const dispatch = useDispatch();

    // Question Fields
    const [inputFields, setInputFields] = useState([{
        category: '',
        content: '',
        rating: 50,
        correctAnswer: '',
        wrongA: '',
        wrongB: '',
        wrongC: '',
    }]);

    const handleFieldInput = (index, event) => {
        const values = [...inputFields];

        if (event.target.name === 'rating' && (event.target.value < 0 || event.target.value > 100)) {
            handleBlur(index, event, values);
            return;
        }
        values[index][event.target.name] = event.target.value;
        setInputFields(values);
        setForm({ ...form, questions: inputFields });
    }

    // Adding Fields
    const handleAddFields = () => {
        setInputFields([...inputFields, {
            category: '',
            content: '',
            rating: 50,
            correctAnswer: '',
            wrongA: '',
            wrongB: '',
            wrongC: '',
        }]);
    }

    const handleRemoveFields = (index) => {
        const values = [...inputFields];
        values.splice(index, 1);
        setInputFields(values);
    }

    const handleBlur = (index, event, values) => {
        if (event.target.value < 0) values[index][event.target.name] = 0;
        else if (event.target.value > 100) values[index][event.target.name] = 100;
    };

    const handleChange = (e) => {
        // console.log(e.target.value);
        setForm({ ...form, [e.target.name]: e.target.value });
    }

    // Submitting
    const handleSubmit = (e) => {
        e.preventDefault();
        dispatch(createExam(form));
        // console.log(form);
    }

    return (
        <Container component="main" className={classes.position}>
            <Paper className={classes.paperHead}>
                <Typography variant="h3">Exam Creation</Typography>
            </Paper>
            <form autoComplete="off" onSubmit={handleSubmit}>
                <Paper className={classes.paperBody}>
                    <Grid container spacing={2}>
                        <Grid item xs={12}>
                            <TextField
                                name="title"
                                value={form.title}
                                onChange={handleChange}
                                label="Exam Title"
                                variant="outlined"
                                fullWidth
                                required
                            />
                        </Grid>
                        <Grid item xs={12}>
                            <Autocomplete
                                inputValue={form.contentType}
                                onInputChange={(event, newInputValue) => {
                                    setForm({ ...form, contentType: newInputValue });
                                }}
                                options={subjects}
                                renderInput={(params) =>
                                    <TextField
                                        {...params}
                                        name="subject"
                                        label="Exam Subject"
                                        variant="outlined"
                                        required
                                    />}
                            />
                        </Grid>
                        <Grid item xs={12}>
                            <TextField
                                name="expiryDate"
                                onChange={handleChange}
                                label="Due Date"
                                type="datetime-local"
                                InputLabelProps={{ shrink: true }}
                                fullWidth
                                required
                            />
                        </Grid>
                    </Grid>
                </Paper>
                {/* Questions Fields */}
                {inputFields.map((inputField, index) => (
                    <Paper key={index} className={classes.paperBody}>
                        <Grid container spacing={2}>
                            <Grid item xs={12} sm={10}>
                                <TextField
                                    name="content"
                                    label="Question"
                                    variant="outlined"
                                    fullWidth
                                    value={inputField.content}
                                    onChange={event => handleFieldInput(index, event)}
                                    multiline
                                    maxRows={10}
                                    required
                                />
                            </Grid>
                            <Grid item xs={12} sm={2}>
                                <IconButton onClick={() => handleAddFields()}><AddIcon /></IconButton>
                                {inputFields.length > 1 && <IconButton onClick={() => handleRemoveFields(index)}><RemoveIcon /></IconButton>}
                            </Grid>
                            <Grid item xs={12} sm={12}>
                                <TextField
                                    name="category"
                                    label="Category"
                                    variant="outlined"
                                    fullWidth
                                    value={inputField.category}
                                    onChange={event => handleFieldInput(index, event)}
                                    multiline
                                    maxRows={10}
                                    required
                                />
                            </Grid>
                            <Grid item xs={12} sm={6}>
                                <TextField
                                    name="correctAnswer"
                                    label="Correct Answer"
                                    variant="outlined"
                                    fullWidth
                                    value={inputField.correctAnswer}
                                    onChange={event => handleFieldInput(index, event)}
                                    multiline
                                    maxRows={10}
                                    required
                                />
                            </Grid>
                            <Grid item xs={12} sm={6}>
                                <TextField
                                    name="wrongA"
                                    label="Incorrect Answer"
                                    variant="outlined"
                                    fullWidth
                                    value={inputField.wrongA}
                                    onChange={event => handleFieldInput(index, event)}
                                    multiline
                                    maxRows={10}
                                    required
                                />
                            </Grid>
                            <Grid item xs={12} sm={6}>
                                <TextField
                                    name="wrongB"
                                    label="Incorrect Answer"
                                    variant="outlined"
                                    fullWidth
                                    value={inputField.wrongB}
                                    onChange={event => handleFieldInput(index, event)}
                                    multiline
                                    maxRows={10}
                                    required
                                />
                            </Grid>
                            <Grid item xs={12} sm={6}>
                                <TextField
                                    name="wrongC"
                                    label="Incorrect Answer"
                                    variant="outlined"
                                    fullWidth
                                    value={inputField.wrongC}
                                    onChange={event => handleFieldInput(index, event)}
                                    multiline
                                    maxRows={10}
                                    required
                                />
                            </Grid>
                            <Grid item xs={12} align="center" justify="center" alignItems="center">
                                <Typography variant="h5">
                                    Rate the difficulty of this question, the greater the number, the harder it is.
                                </Typography>
                            </Grid>
                            <Grid item xs={10}>
                                <Slider
                                    name="rating"
                                    value={Number(inputField.rating)}
                                    onChange={event => handleFieldInput(index, event)}
                                    color="secondary"
                                />
                            </Grid>
                            <Grid item xs={2}>
                                <Input
                                    name="rating"
                                    value={inputField.rating}
                                    onChange={event => handleFieldInput(index, event)}
                                    className={classes.input}
                                    margin="dense"
                                    inputProps={{
                                        step: 1,
                                        min: 0,
                                        max: 100,
                                        type: 'number'
                                    }}
                                />
                            </Grid>
                        </Grid>
                    </Paper>
                ))}
                <Grid container spacing={0} display="flex" justifyContent="center">
                    <Grid item xs={12} sm={6}>
                        <Box sx={{ py: 2 }}>
                            <Button
                                color="secondary"
                                size="large"
                                fullWidth
                                type="submit"
                                variant="contained"
                                onSubmit={handleSubmit}
                            >
                                Create Test
                            </Button>
                        </Box>
                    </Grid>
                </Grid>
            </form>
        </Container >
    );
}

export default CreateExamForm;