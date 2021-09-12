import React from 'react';
import { Container, Typography, Paper, TextField } from '@material-ui/core';
import { LoadingButton } from '@material-ui/lab';
import useStyles from './JoinFormStyles'
import * as Yup from 'yup';
import { useFormik, Form, FormikProvider } from 'formik';

const JoinExam = () => {
    const classes = useStyles();

    const JoinRoomSchema = Yup.object().shape({
        roomID: Yup.string().required('Room ID is required'),
        password: Yup.string().required('Password is required')
    });

    const formik = useFormik({
        initialValues: {
            roomID: '',
            password: '',
            remember: true
        },
        validationSchema: JoinRoomSchema,
        onSubmit: () => { }
    });

    const { errors, touched, isSubmitting, handleSubmit, getFieldProps } = formik;

    return (
        <Container component="main" maxWidth="sm">
            <Paper className={classes.paperBody} elevation={4}>
                <Typography variant="h1">
                    Join An Exam
                </Typography>
                <Typography variant="h4" align="center" paddingTop="15px" marginBottom="20px">
                    To start your exam, please enter the room ID and password given to you.
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
                            className={classes.submitBtn}
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
    );
}

export default JoinExam;