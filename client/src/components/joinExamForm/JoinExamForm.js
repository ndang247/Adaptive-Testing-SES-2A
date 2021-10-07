import React from 'react';
import { useHistory } from 'react-router-dom';
import { Container, Typography, Paper, TextField } from '@material-ui/core';
import { LoadingButton } from '@material-ui/lab';
import useStyles from './joinExamFormStyles'
import * as Yup from 'yup';
import { useFormik, Form, FormikProvider } from 'formik';

const JoinExamForm = () => {
    const classes = useStyles();
    const history = useHistory();

    const JoinRoomSchema = Yup.object().shape({
        pin: Yup.string().required('Room PIN is required')
    });

    const formik = useFormik({
        initialValues: {
            pin: "",
            remember: true
        },
        validationSchema: JoinRoomSchema,
        onSubmit: () => { }
    });

    const { errors, touched, values, isSubmitting, handleSubmit, getFieldProps } = formik;

    return (
        <Container component="main" maxWidth="sm" className={classes.position}>
            <Paper className={classes.paperBody} elevation={4}>
                <Typography variant="h1">Join An Exam</Typography>
                <Typography variant="h4" align="center" paddingTop="15px" marginBottom="20px">
                    To start your exam, please enter the room PIN given to you.
                </Typography>
                <FormikProvider value={formik}>
                    <Form autoComplete="off" noValidate onSubmit={handleSubmit}>
                        <TextField
                            error={Boolean(touched.pin && errors.pin)}
                            fullWidth
                            helperText={touched.pin && errors.pin}
                            {...getFieldProps('pin')}
                            label="Room PIN"
                            margin="normal"
                            name="pin"
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