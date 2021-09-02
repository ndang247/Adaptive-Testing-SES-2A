import React, { useState } from 'react'
import { Link as RouterLink, useHistory } from 'react-router-dom';
import * as Yup from 'yup';
import { useFormik, Form, FormikProvider } from 'formik';
import {
    Box, Grid, Link, TextField,
    Typography, InputAdornment, IconButton, Button
} from '@material-ui/core';
import FacebookIcon from 'src/assets/svg/Facebook';
import GoogleIcon from 'src/assets/svg/Google';
import { Icon } from '@iconify/react';
import eyeFill from '@iconify/icons-eva/eye-fill';
import eyeOffFill from '@iconify/icons-eva/eye-off-fill';
import { LoadingButton } from '@material-ui/lab';

const LoginForm = () => {
    const history = useHistory();
    const [showPassword, setShowPassword] = useState(false);

    const LoginSchema = Yup.object().shape({
        email: Yup.string().email('Email must be a valid email address').required('Email is required'),
        password: Yup.string().required('Password is required')
    });

    const formik = useFormik({
        initialValues: {
            email: '',
            password: '',
            remember: true
        },
        validationSchema: LoginSchema,
        onSubmit: () => history.push('/dashboard/restaurant')
    });

    const { errors, touched, values, isSubmitting, handleSubmit, getFieldProps } = formik;

    const handleShowPassword = () => setShowPassword((show) => !show);

    return (
        <FormikProvider value={formik}>
            <Form autoComplete="off" noValidate onSubmit={handleSubmit}>
                <Box sx={{ mb: 3 }}>
                    <Typography
                        color="textPrimary"
                        variant="h2"
                    >
                        Sign in
                    </Typography>
                    <Typography
                        color="textSecondary"
                        gutterBottom
                        variant="body2"
                    >
                        Sign in on the internal platform
                    </Typography>
                </Box>
                <Grid container spacing={3}>
                    <Grid
                        item
                        xs={12}
                        md={6}
                    >
                        <Button
                            color="primary"
                            fullWidth
                            startIcon={<FacebookIcon />}
                            onClick={handleSubmit}
                            size="large"
                            variant="contained"
                        >
                            Login with Facebook
                        </Button>
                    </Grid>
                    <Grid
                        item
                        xs={12}
                        md={6}
                    >
                        <Button
                            fullWidth
                            startIcon={<GoogleIcon />}
                            onClick={handleSubmit}
                            size="large"
                            variant="contained"
                        >
                            Login with Google
                        </Button>
                    </Grid>
                </Grid>
                <Box
                    sx={{
                        pb: 1,
                        pt: 3
                    }}
                >
                    <Typography
                        align="center"
                        color="textSecondary"
                        variant="body1"
                    >
                        or login with email address
                    </Typography>
                </Box>
                <TextField
                    error={Boolean(touched.email && errors.email)}
                    fullWidth
                    helperText={touched.email && errors.email}
                    label="Email Address"
                    margin="normal"
                    name="email"
                    type="email"
                    {...getFieldProps('email')}
                    variant="outlined"
                />
                <TextField
                    error={Boolean(touched.password && errors.password)}
                    fullWidth
                    helperText={touched.password && errors.password}
                    label="Password"
                    margin="normal"
                    name="password"
                    type="password"
                    {...getFieldProps('password')}
                    variant="outlined"
                    InputProps={{
                        endAdornment: (
                            <InputAdornment position="end">
                                <IconButton onClick={handleShowPassword} edge="end">
                                    <Icon icon={showPassword ? eyeOffFill : eyeFill} />
                                </IconButton>
                            </InputAdornment>
                        )
                    }}
                />
                <Box sx={{ py: 2 }}>
                    <LoadingButton
                        color="primary"
                        loading={isSubmitting}
                        fullWidth
                        size="large"
                        type="submit"
                        variant="contained"
                    >
                        Sign in now
                    </LoadingButton>
                </Box>
                <Typography
                    color="textSecondary"
                    variant="body1"
                >
                    Don&apos;t have an account?
                    {' '}
                    <Link component={RouterLink} to="/user/register" variant="h6" underline="hover">
                        Sign up
                    </Link>
                </Typography>
            </Form>
        </FormikProvider>
    );
}

export default LoginForm;
