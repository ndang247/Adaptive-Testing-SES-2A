import React, { useState } from 'react';
import { useFormik, Form, FormikProvider } from "formik";
import clsx from 'clsx';
import {
    Container, Typography, Paper, Grid,
    TextField, InputAdornment, Box,
    Button, IconButton, Slider, Input
} from '@material-ui/core';
import RemoveIcon from '@material-ui/icons/Remove'
import AddIcon from '@material-ui/icons/Add'
import Autocomplete from '@material-ui/lab/Autocomplete';
import useStyles from './testFormStyles';

// For the selecting combo box
const subjects = ['Math', 'Physics', 'Chemistry', 'Biology', 'English', 'Boss Stage'];

const TestForm = () => {
    const classes = useStyles();

    // Select Box
    const [value, setValue] = useState(null);
    const [inputValue, setInputValue] = useState('');

    // Time Input
    const [timeValues, setTimeValues] = useState({ time: '' });
    const handleChange = (prop) => (event) => setTimeValues({ ...values, [prop]: event.target.value });

    // Question Fields
    const [inputFields, setInputFields] = useState([
        {
            content: '',
            correctAnswer: '',
            wrongAnswers: ['', '', ''],
            rating: '',
        },
    ]);

    const handleFieldInput = (index, event) => {
        const values = [...inputFields];
        values[index][event.target.content] = event.target.value;
        setInputFields(values);
    }

    // Slider Setting
    const [sliderValue, setSliderValue] = useState(50);

    const handleSliderChange = (sliderEvent, newSliderValue) => setSliderValue(newSliderValue);

    const handleInputChange = (sliderEvent) => {
        setSliderValue(sliderEvent.target.sliderValue === '' ? '' : Number(sliderEvent.target.sliderValue));
    };

    const handleBlur = () => {
        if (sliderValue < 0) setSliderValue(0);
        else if (sliderValue > 100) setSliderValue(100);
    };

    // Submitting
    const formik = useFormik({
        initialValues: {
            title: "",
            contentType: "",
            testLength: "",
            expiryDate: "",
        },
        onSubmit: async () => {
        }
    });

    const { errors, touched, values, isSubmitting, handleSubmit, getFieldProps } = formik;

    return (
        <Container component="main" className={classes.position}>
            <Paper className={classes.paperHead}>
                <Typography variant="h3">
                    Test Creation
                </Typography>
            </Paper>
            <FormikProvider value={formik}>
                <Form autoComplete="off" noValidate onSubmit={handleSubmit}>
                    <Paper className={classes.paperBody}>
                        <Grid container spacing={2}>
                            <Grid item xs={12}>
                                <TextField
                                    name="title"
                                    label="Title of the Test"
                                    variant="outlined"
                                    fullWidth
                                    error={Boolean(touched.title && errors.title)}
                                    helperText={touched.title && errors.title}
                                    {...getFieldProps("title")}
                                />
                            </Grid>
                            <Grid item xs={12}>
                                <Autocomplete
                                    value={value}
                                    onChange={(event, newValue) => {
                                        setValue(newValue);
                                    }}
                                    inputValue={inputValue}
                                    onInputChange={(event, newInputValue) => {
                                        setInputValue(newInputValue);
                                    }}
                                    options={subjects}
                                    renderInput={(params) =>
                                        <TextField {...params}
                                            name="contentType"
                                            label="Test Subject"
                                            variant="outlined"
                                            {...getFieldProps("contentType")}
                                        />}
                                />
                            </Grid>
                            <Grid item xs={12}>
                                <TextField
                                    label="Maximum Allowed Time"
                                    name="testLength"
                                    className={clsx(classes.margin, classes.textField)}
                                    InputProps={{
                                        endAdornment: <InputAdornment position="end">minutes</InputAdornment>,
                                    }}
                                    variant="outlined"
                                    fullWidth
                                    type="number"
                                    {...getFieldProps("testLength")}
                                />
                            </Grid>
                            <Grid item xs={12}>
                                <TextField
                                    name="expiryDate"
                                    label="Test to be completed by"
                                    type="datetime-local"
                                    InputLabelProps={{
                                        shrink: true,
                                    }}
                                    fullWidth
                                    {...getFieldProps("expiryDate")}
                                />
                            </Grid>
                        </Grid>
                    </Paper>
                    {/* Questions Fields*/}
                    <Paper className={classes.paperBody}>
                        {inputFields.map((inputField, index) => (
                            <Grid container spacing={2} key={index}>
                                <Grid item xs={12} sm={10}>
                                    <TextField
                                        name="content"
                                        label="Question Info"
                                        variant="outlined"
                                        fullWidth
                                        value={inputField.content}
                                        multiline
                                        maxRows={10}
                                        onChange={event => handleFieldInput(index, event)}
                                    />
                                </Grid>
                                <Grid item xs={12} sm={2}>
                                    <IconButton>
                                        <AddIcon />
                                    </IconButton>
                                    <IconButton>
                                        <RemoveIcon />
                                    </IconButton>
                                </Grid>
                                <Grid item xs={12} sm={6}>
                                    <TextField
                                        name="correctAnswer"
                                        label="Input Correct Answer Here"
                                        variant="outlined"
                                        fullWidth
                                        value={inputField.correctAnswer}
                                        multiline
                                        maxRows={10}
                                    />
                                </Grid>
                                <Grid item xs={12} sm={6}>
                                    <TextField
                                        name="content"
                                        label="Question Info"
                                        variant="outlined"
                                        fullWidth
                                        value={inputField.wrongAnswers[0]}
                                        multiline
                                        maxRows={10}
                                    />
                                </Grid>
                                <Grid item xs={12} sm={6}>
                                    <TextField
                                        name="content"
                                        label="Question Info"
                                        variant="outlined"
                                        fullWidth
                                        value={inputField.wrongAnswers[1]}
                                        multiline
                                        maxRows={10}
                                    />
                                </Grid>
                                <Grid item xs={12} sm={6}>
                                    <TextField
                                        name="content"
                                        label="Question Info"
                                        variant="outlined"
                                        fullWidth
                                        value={inputField.wrongAnswers[2]}
                                        multiline
                                        maxRows={10}
                                    />
                                </Grid>
                                <Grid item xs={0}> </Grid>
                                <Grid item xs={10}>
                                    <Slider
                                        name="rating"
                                        value={typeof value === 'number' ? value : 0}
                                        onChange={handleSliderChange}
                                        aria-labelledby="input-slider"
                                        color="secondary"
                                        {...getFieldProps("rating")}
                                    />
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
                        ))}
                    </Paper>
                    <Grid
                        container
                        spacing={0}
                        direction="column"
                        alignItems="center"
                        justify="center"
                    >
                        <Grid container spacing={2}>
                            <Grid item xs={12} sm={6}>
                                <Box sx={{ py: 2 }}>
                                    <Button
                                        color="primary"
                                        fullWidth
                                        size="large"
                                        type="submit"
                                        variant="contained"
                                    >
                                        Save Test
                                    </Button>
                                </Box>
                            </Grid>
                            <Grid item xs={12} sm={6}>
                                <Box sx={{ py: 2 }}>
                                    <Button
                                        color="secondary"
                                        fullWidth
                                        size="large"
                                        type="submit"
                                        variant="contained"
                                    >
                                        Create Test
                                    </Button>
                                </Box>
                            </Grid>
                        </Grid>
                    </Grid>
                </Form>
            </FormikProvider>
        </Container >
    );
}

export default TestForm;