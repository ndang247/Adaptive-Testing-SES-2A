import React from 'react';
import { Container, Typography, Paper, TextField, Box } from '@material-ui/core';
import { LoadingButton } from '@material-ui/lab';
import useStyles from 'src/components/create/JoinExamStyles'
import * as Yup from 'yup';
import { useFormik, Form, FormikProvider } from 'formik';

const JoinExam = () => {
    const classes = useStyles();

    const LoginSchema = Yup.object().shape({
        roomID: Yup.string().required('Room ID is required'),
        password: Yup.string().required('Password is required')
    });

    const formik = useFormik({
        initialValues: {
            roomID: '',
            password: '',
            remember: true
        },
        validationSchema: LoginSchema,
        onSubmit: () => { }
    });

    const { errors, touched, isSubmitting, handleSubmit, getFieldProps } = formik;

    return (
        <React.Fragment>
            <Container component="main" maxWidth="sm">
                <Paper className={classes.paperBody} elevation={4}>
                    <Typography variant="h1">
                        Join An Exam
                    </Typography>
                    <Typography variant="h4" align="center" paddingTop="15px" marginBottom="20px">
                        To join your exam, please enter the room ID and password of your exam room.
                    </Typography>
                    <FormikProvider value={formik}>
                        <Form autoComplete="off" noValidate onSubmit={handleSubmit}>
                            <TextField
                                error={Boolean(touched.roomID && errors.roomID)}
                                fullWidth
                                helperText={touched.roomID && errors.roomID}
                                label="Room ID"
                                margin="normal"
                                name="roomID"
                                type="text"
                                {...getFieldProps('roomID')}
                                variant="outlined"
                            />
                            <TextField
                                error={Boolean(touched.password && errors.password)}
                                fullWidth
                                helperText={touched.password && errors.password}
                                label="Password"
                                margin="normal"
                                name="password"
                                type="text"
                                {...getFieldProps('password')}
                                variant="outlined"
                            />
                            <LoadingButton
                                color="primary"
                                loading={isSubmitting}
                                fullWidth
                                margin="normal"
                                size="large"
                                type="submit"
                                variant="contained"
                            >
                                Join Room
                            </LoadingButton>
                        </Form>
                    </FormikProvider>
                </Paper>
            </Container>
        </React.Fragment>
    );
}

export default JoinExam