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
    const [boxValue, setBoxValue] = useState(null);
    const [inputValue, setInputValue] = useState('');

    // Time Input
    const [timeValues, setTimeValues] = useState({ time: '' });
    const handleChange = (prop) => (event) => setTimeValues({ ...values, [prop]: event.target.value });

    // Question Fields
    const [inputFields, setInputFields] = useState([
        {
            content: '',
            correctAnswer: '',
            wrongA: '',
            wrongB: '',
            wrongC: '',
            rating: '',
        },
    ]);

    const handleFieldInput = (index, event) => {
        const values = [...inputFields];
        values[index][event.target.name] = event.target.value;
        setInputFields(values);
    }

    // Adding Fields
    const handleAddFields = () => {
        setInputFields([...inputFields, {
            content: '',
            correctAnswer: '',
            wrongA: '',
            wrongB: '',
            wrongC: '',
            rating: '',
        }]);
    }

    const handleRemoveFields = (index) => {
        const values = [...inputFields];
        if (index !== 0) {
            values.splice(index, 1);
            setInputFields(values);
        };
    }

    // Slider Setting
    const [sliderValue, setSliderValue] = useState(50);

    const handleSliderChange = (event, newValue) => setSliderValue(newValue);

    const handleInputChange = (event) => {
        setSliderValue(event.target.value === '' ? '' : Number(event.target.value));
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
                                    value={boxValue}
                                    onChange={(event, newValue) => {
                                        setBoxValue(newValue);
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
                    {inputFields.map((inputField, index) => (
                        <Paper className={classes.paperBody}>
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
                                    <IconButton onClick={() => handleAddFields()}>
                                        <AddIcon />
                                    </IconButton>
                                    <IconButton onClick={() => handleRemoveFields(index)}>
                                        <RemoveIcon />
                                    </IconButton>
                                </Grid>
                                <Grid item xs={12} sm={6}>
                                    <TextField
                                        name="correctAnswer"
                                        label="Correct Answer"
                                        variant="outlined"
                                        fullWidth
                                        value={inputField.correctAnswer}
                                        onChange={event => handleFieldInput(index, event)}
                                    />
                                </Grid>
                                <Grid item xs={12} sm={6}>
                                    <TextField
                                        name="wrongA"
                                        label="Incorrect Answer"
                                        variant="outlined"
                                        fullWidth
                                        value={inputField.wrongA}
                                        multiline
                                        maxRows={10}
                                        onChange={event => handleFieldInput(index, event)}
                                    />
                                </Grid>
                                <Grid item xs={12} sm={6}>
                                    <TextField
                                        name="wrongB"
                                        label="Incorrect Answer"
                                        variant="outlined"
                                        fullWidth
                                        value={inputField.wrongB}
                                        multiline
                                        maxRows={10}
                                        onChange={event => handleFieldInput(index, event)}
                                    />
                                </Grid>
                                <Grid item xs={12} sm={6}>
                                    <TextField
                                        name="wrongC"
                                        label="Incorrect Answer"
                                        variant="outlined"
                                        fullWidth
                                        value={inputField.wrongC}
                                        multiline
                                        maxRows={10}
                                        onChange={event => handleFieldInput(index, event)}
                                    />
                                </Grid>
                                <Grid item xs={12} align="center" justify="center" alignItems="center">
                                    <Typography variant="h5">Rate the difficulty of this question, the greater the number, the harder it is.</Typography>
                                </Grid>
                                <Grid item xs={10}>
                                    <Slider
                                        name="rating"
                                        value={typeof sliderValue === 'number' ? sliderValue : 0}
                                        onChange={handleSliderChange}
                                        aria-labelledby="input-slider"
                                        color="secondary"
                                        {...getFieldProps("rating")}
                                    />
                                </Grid>
                                <Grid item xs={2}>
                                    <Input
                                        className={classes.input}
                                        value={sliderValue}
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
                        </Paper>
                    ))}
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