import React, { useState } from 'react'
import { Link as RouterLink, useHistory } from 'react-router-dom';
import * as Yup from 'yup';
import { useFormik, Form, FormikProvider } from 'formik';
import {
    Box, Grid, Link, TextField,
    Typography, InputAdornment, IconButton, Button,
    Alert
} from '@material-ui/core';
import FacebookIcon from 'src/assets/svg/Facebook';
import GoogleIcon from 'src/assets/svg/Google';
import { Icon } from '@iconify/react';
import eyeFill from '@iconify/icons-eva/eye-fill';
import eyeOffFill from '@iconify/icons-eva/eye-off-fill';
import { LoadingButton } from '@material-ui/lab';
import { useDispatch, useSelector } from 'react-redux';
import { hostLogin, login } from 'src/redux/actions/auth';

const LoginForm = () => {
    const [showPassword, setShowPassword] = useState(false);
    const dispatch = useDispatch();
    const history = useHistory();
    const { authErrors } = useSelector((state) => state.auth);

    const LoginSchema = Yup.object().shape({
        email: Yup.string().email('Email must be a valid email address').required('Email is required'),
        password: Yup.string().required('Password is required')
    });

    const formik = useFormik({
        initialValues: {
            email: "",
            password: "",
            remember: true
        },
        validationSchema: LoginSchema,
        onSubmit: async () => {
            if (history.location.pathname === "/user/login") {
                dispatch(login(values, history));
            } else {
                dispatch(hostLogin(values, history));
            }
        }
    });

    const { errors, touched, values, isSubmitting, handleSubmit, getFieldProps } = formik;

    const handleShowPassword = () => setShowPassword((show) => !show);

    return (
        <>
            {authErrors && (<><Alert variant="filled" severity="error">{authErrors.errors}</Alert>&nbsp;</>)}
            <FormikProvider value={formik}>
                <Form autoComplete="off" noValidate onSubmit={handleSubmit}>
                    <Box sx={{ mb: 3 }}>
                        <Typography color="textPrimary" variant="h2">
                            Sign in
                        </Typography>
                        <Typography color="textSecondary" gutterBottom variant="body2">
                            Sign in on the internal platform
                        </Typography>
                    </Box>
                    <Grid container spacing={3}>
                        <Grid item xs={12} md={6}>
                            <Button
                                color="primary"
                                fullWidth
                                startIcon={<FacebookIcon />}
                                size="large"
                                variant="contained"
                                onClick={handleSubmit}
                            >
                                Login with Facebook
                            </Button>
                        </Grid>
                        <Grid item xs={12} md={6}>
                            <Button
                                fullWidth
                                startIcon={<GoogleIcon />}
                                size="large"
                                variant="contained"
                                onClick={handleSubmit}
                            >
                                Login with Google
                            </Button>
                        </Grid>
                    </Grid>
                    <Box sx={{ pb: 1, pt: 3 }}>
                        <Typography align="center" color="textSecondary" variant="body1">
                            or login with email address
                        </Typography>
                    </Box>
                    <TextField
                        error={Boolean(touched.email && errors.email)}
                        helperText={touched.email && errors.email}
                        {...getFieldProps('email')}
                        fullWidth
                        label="Email Address"
                        margin="normal"
                        name="email"
                        type="email"
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
                        type={showPassword ? "text" : "password"}
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
                    <Typography color="textSecondary" variant="body1">
                        Don&apos;t have an account?
                        {' '}
                        <Link
                            component={RouterLink}
                            to={history.location.pathname === "/user/login" ? "/user/register" : "/host/register"}
                            variant="h6"
                            underline="hover">
                            Sign up
                        </Link>
                    </Typography>
                </Form>
            </FormikProvider>
        </>
    );
}

export default LoginForm;
