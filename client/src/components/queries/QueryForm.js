import React from 'react';
import { Container, Typography, Paper, TextField, TextareaAutosize } from '@material-ui/core';
import { LoadingButton } from '@material-ui/lab';
import useStyles from './QueryFormStyles'
import * as Yup from 'yup';
import { useFormik, Form, FormikProvider } from 'formik';

const SubmitQuery = () => {
    const classes = useStyles();

    const QueryFormSchema = Yup.object().shape({
        fullName: Yup.string().required('Full Name is required'),
        email: Yup.string().required('Email is required'),
        queryBox: Yup.string().required('Query is required')
    });

    const formik = useFormik({
        initialValues: {
            fullName: '',
            email: '',
            queryBox: ''
        },
        validationSchema: QueryFormSchema,
        onSubmit: () => { }
    });

    const { errors, touched, isSubmitting, handleSubmit, getFieldProps } = formik;

    return (
        <Container component="main" maxWidth="sm">
            <Paper className={classes.paperBody} elevation={4}>
                <Typography variant="h1">
                    Submit A Query
                </Typography>
                <Typography variant="h4" align="center" paddingTop="15px" marginBottom="20px">
                    To submit a query, please enter your full name and email address.
                </Typography>
                <FormikProvider value={formik}>
                    <Form autoComplete="off" noValidate onSubmit={handleSubmit}>
                        <TextField
                            error={Boolean(touched.fullName && errors.fullName)}
                            fullWidth
                            helperText={touched.fullName && errors.fullName}
                            label="Full Name"
                            margin="normal"
                            name="fullName"
                            type="text"
                            {...getFieldProps('fullName')}
                            variant="outlined"
                        />
                        <TextField
                            error={Boolean(touched.email && errors.email)}
                            fullWidth
                            helperText={touched.email && errors.email}
                            label="Email"
                            margin="normal"
                            name="email"
                            type="text"
                            {...getFieldProps('email')}
                            variant="outlined"
                        />
                        <TextField
                            error={Boolean(touched.queryBox && errors.queryBox)}
                            fullWidth
                            helperText={touched.queryBox && errors.queryBox}
                            label="Query"
                            margin="normal"
                            name="queryBox"
                            type="text"
                            {...getFieldProps('queryBox')}
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
                            Submit Query
                        </LoadingButton>
                    </Form>
                </FormikProvider>
            </Paper>
        </Container>
    );
}

export default SubmitQuery;