import React from 'react';
import { Container, Typography, Paper, TextField } from '@material-ui/core';
import { LoadingButton } from '@material-ui/lab';
import useStyles from './joinExamFormStyles'
import * as Yup from 'yup';
import { useFormik, Form, FormikProvider } from 'formik';

const JoinExamForm = () => {
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
        <Container component="main" maxWidth="sm" className={classes.position}>
            <Paper className={classes.paperBody} elevation={4}>
                <Typography variant="h1">Join An Exam</Typography>
                <Typography variant="h4" align="center" paddingTop="15px" marginBottom="20px">
                    To start your exam, please enter the room ID and password given to you.
                </Typography>
                <FormikProvider value={formik}>
                    <Form autoComplete="off" noValidate onSubmit={handleSubmit}>
                        <TextField
                            error={Boolean(touched.roomID && errors.roomID)}
                            helperText={touched.roomID && errors.roomID}
                            {...getFieldProps('roomID')}
                            fullWidth
                            label="Room ID"
                            margin="normal"
                            name="roomID"
                            type="text"
                            variant="outlined"
                        />
                        <TextField
                            error={Boolean(touched.password && errors.password)}
                            helperText={touched.password && errors.password}
                            {...getFieldProps('password')}
                            fullWidth
                            label="Password"
                            margin="normal"
                            name="password"
                            type="text"
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

export default JoinExamForm;