import React from 'react';
import {
    Container, Typography, Paper, TextField,
    Alert
} from '@material-ui/core';
import { LoadingButton } from '@material-ui/lab';
import useStyles from './queryFormStyles'
import * as Yup from 'yup';
import { useFormik, Form, FormikProvider } from 'formik';
import { createQuery } from 'src/redux/actions/queries';
import { useDispatch, useSelector } from 'react-redux';

const SubmitQuery = () => {
    const user = JSON.parse(localStorage.getItem('profile'));
    const classes = useStyles();
    const dispatch = useDispatch();
    const { msg } = useSelector((state) => state.queries);

    const QueryFormSchema = Yup.object().shape({
        fullName: Yup.string().required('Full Name is required'),
        email: Yup.string().required('Email is required'),
        query: Yup.string().required('Query is required')
    });

    const formik = useFormik({
        initialValues: {
            creatorId: user.id,
            fullName: user.firstName + ' ' + user.lastName,
            email: user.email,
            query: ''
        },
        validationSchema: QueryFormSchema,
        onSubmit: () => { dispatch(createQuery(values)) }
    });

    const { errors, touched, values, isSubmitting, handleSubmit, getFieldProps } = formik;

    return (
        <Container component="main" maxWidth="sm" className={classes.position}>
            {msg && (<><Alert variant="filled" severity="success">{msg.msg}</Alert>&nbsp;</>)}
            <Paper className={classes.paperBody} elevation={4}>
                <Typography variant="h1">Submit A Query</Typography>
                <Typography variant="h4" align="center" paddingTop="15px" marginBottom="20px">
                    Please submit any questions or feedback.
                </Typography>
                <FormikProvider value={formik}>
                    <Form autoComplete="off" noValidate onSubmit={handleSubmit}>
                        <TextField
                            error={Boolean(touched.query && errors.query)}
                            helperText={touched.query && errors.query}
                            {...getFieldProps('query')}
                            fullWidth
                            label="Query"
                            margin="normal"
                            name="query"
                            type="text"
                            variant="outlined"
                        />
                        <LoadingButton
                            className={classes.submitBtn}
                            color="primary"
                            loading={!msg ? isSubmitting : false}
                            fullWidth
                            margin="normal"
                            size="large"
                            type="submit"
                            variant="contained"
                            disableElevation={true}
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