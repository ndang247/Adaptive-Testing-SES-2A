import React from 'react';
import { useHistory } from 'react-router-dom';
import { Container, Typography, Paper, TextField } from '@material-ui/core';
import { LoadingButton } from '@material-ui/lab';
import useStyles from './joinFormStyles'
import * as Yup from 'yup';
import { useFormik, Form, FormikProvider } from 'formik';
import { useDispatch } from 'react-redux';
import { joinExam } from 'src/redux/actions/examroom';

const JoinExam = () => {
    const classes = useStyles();
    const history = useHistory();
    const dispatch = useDispatch();

    const JoinRoomSchema = Yup.object().shape({
        roomPIN: Yup.string().required('Room PIN is required'),
    });

    const formik = useFormik({
        initialValues: {
            roomPIN: '',
            remember: true
        },
        validationSchema: JoinRoomSchema,
        onSubmit: () => {
            dispatch(joinExam(values, history));
        }
    });

    const { errors, touched, values, isSubmitting, handleSubmit, getFieldProps } = formik;

    return (
        <Container component="main" maxWidth="sm">
            <Paper className={classes.paperBody} elevation={4}>
                <Typography variant="h1">
                    Join An Exam
                </Typography>
                <Typography variant="h4" align="center" paddingTop="15px" marginBottom="20px">
                    To start your exam, please enter the room PIN given to you.
                </Typography>
                <FormikProvider value={formik}>
                    <Form autoComplete="off" noValidate onSubmit={handleSubmit}>
                        <TextField
                            error={Boolean(touched.roomPIN && errors.roomPIN)}
                            fullWidth
                            helperText={touched.roomPIN && errors.roomPIN}
                            label="Room PIN"
                            margin="normal"
                            name="roomPIN"
                            type="text"
                            {...getFieldProps('roomPIN')}
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