import React from 'react';
import { useHistory } from 'react-router-dom';
import {
    Container, Typography, Paper, TextField,
    Alert
} from '@material-ui/core';
import { LoadingButton } from '@material-ui/lab';
import useStyles from './joinExamFormStyles'
import * as Yup from 'yup';
import { useFormik, Form, FormikProvider } from 'formik';
import { useSelector, useDispatch } from 'react-redux';
import { validateExamPin } from 'src/redux/actions/exams';

const JoinExamForm = () => {
    const classes = useStyles();
    const history = useHistory();
    const dispatch = useDispatch();
    const { validationErrors } = useSelector((state) => state.exams);

    const JoinRoomSchema = Yup.object().shape({
        pin: Yup.string().required('Room PIN/ID is required, This is an id you received from host.')
    });

    const formik = useFormik({
        initialValues: {
            pin: "",
        },
        validationSchema: JoinRoomSchema,
        onSubmit: () => { dispatch(validateExamPin(values, history)) }
    });

    const { errors, touched, values, isSubmitting, handleSubmit, getFieldProps } = formik;

    return (
        <Container component="main" maxWidth="sm" className={classes.position}>
            {validationErrors && (<><Alert variant="filled" severity="error">{validationErrors}</Alert>&nbsp;</>)}
            <Paper className={classes.paperBody} elevation={4}>
                <Typography variant="h1">Join An Exam</Typography>
                <Typography variant="h4" align="center" paddingTop="15px" marginBottom="20px">
                    To start your exam, please enter the room PIN/ID given to you.
                </Typography>
                <FormikProvider value={formik}>
                    <Form autoComplete="off" noValidate onSubmit={handleSubmit}>
                        <TextField
                            error={Boolean(touched.pin && errors.pin)}
                            helperText={touched.pin && errors.pin}
                            {...getFieldProps('pin')}
                            fullWidth
                            label="Room PIN/ID"
                            margin="normal"
                            name="pin"
                            type="text"
                            variant="outlined"
                        />
                        <LoadingButton
                            className={classes.submitBtn}
                            color="primary"
                            loading={validationErrors ? false : isSubmitting}
                            fullWidth
                            margin="normal"
                            size="large"
                            type="submit"
                            variant="contained"
                            disableElevation={true}
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