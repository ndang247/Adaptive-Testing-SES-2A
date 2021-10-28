import React, { useState } from 'react';
import { useFormik, Form, FormikProvider } from "formik";
import {
    Box, Checkbox, FormHelperText, Link,
    TextField, Typography, InputAdornment, IconButton,
    Alert
} from '@material-ui/core';
import * as Yup from 'yup';
import { Link as RouterLink, useHistory } from 'react-router-dom';
import { Icon } from "@iconify/react";
import eyeFill from "@iconify/icons-eva/eye-fill";
import eyeOffFill from "@iconify/icons-eva/eye-off-fill";
import { LoadingButton } from "@material-ui/lab";
import { useDispatch, useSelector } from 'react-redux';
import { hostRegister, register } from 'src/redux/actions/auth';

const RegisterForm = () => {
    const [showPassword, setShowPassword] = useState(false);
    const dispatch = useDispatch();
    const history = useHistory();
    const { authErrors } = useSelector((state) => state.auth);

    const RegisterSchema = Yup.object().shape({
        firstName: Yup.string().min(2, "Too Short!").max(50, "Too Long!").required("First name required"),
        lastName: Yup.string().min(2, "Too Short!").max(50, "Too Long!").required("Last name required"),
        email: Yup.string().email("Email must be a valid email address").required("Email is required"),
        password: Yup.string().required("Password is required"),
        confirmPassword: Yup.string().required("Please confirm your password"),
        policy: Yup.boolean().oneOf([true], "You must accept the terms and conditions")
    });

    const formik = useFormik({
        initialValues: {
            firstName: "",
            lastName: "",
            email: "",
            password: "",
            confirmPassword: "",
            policy: false
        },
        validationSchema: RegisterSchema,
        onSubmit: async () => {
            if (history.location.pathname === "/user/register") {
                dispatch(register(values, history));
            } else {
                dispatch(hostRegister(values, history));
            }
        }
    });

    const { errors, touched, values, isSubmitting, handleSubmit, getFieldProps } = formik;

    return (
        <>
            {authErrors && (<><Alert variant="filled" severity="error">{authErrors.errors}</Alert>&nbsp;</>)}
            <FormikProvider value={formik}>
                <Form autoComplete="off" noValidate onSubmit={handleSubmit}>
                    <Box sx={{ mb: 3 }}>
                        <Typography color="textPrimary" variant="h2" >Create new account</Typography>
                        <Typography color="textSecondary" gutterBottom variant="body2" >
                            Use your email to create new account
                        </Typography>
                    </Box>
                    <TextField
                        error={Boolean(touched.firstName && errors.firstName)}
                        helperText={touched.firstName && errors.firstName}
                        {...getFieldProps("firstName")}
                        fullWidth
                        label="First Name"
                        margin="normal"
                        name="firstName"
                        variant="outlined"
                    />
                    <TextField
                        error={Boolean(touched.lastName && errors.lastName)}
                        helperText={touched.lastName && errors.lastName}
                        {...getFieldProps("lastName")}
                        fullWidth
                        label="Last Name"
                        margin="normal"
                        name="lastName"
                        variant="outlined"
                    />
                    <TextField
                        error={Boolean(touched.email && errors.email)}
                        helperText={touched.email && errors.email}
                        {...getFieldProps("email")}
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
                        {...getFieldProps("password")}
                        fullWidth
                        label="Password"
                        margin="normal"
                        name="password"
                        type={showPassword ? "text" : "password"}
                        variant="outlined"
                        InputProps={{
                            endAdornment: (
                                <InputAdornment position="end">
                                    <IconButton edge="end" onClick={() => setShowPassword((prev) => !prev)}>
                                        <Icon icon={showPassword ? eyeOffFill : eyeFill} />
                                    </IconButton>
                                </InputAdornment>)
                        }}
                    />
                    <TextField
                        error={Boolean(touched.confirmPassword && errors.confirmPassword)}
                        helperText={touched.confirmPassword && errors.confirmPassword}
                        {...getFieldProps("confirmPassword")}
                        fullWidth
                        label="Confirm Password"
                        margin="normal"
                        name="confirmPassword"
                        type="password"
                        variant="outlined"
                    />
                    <Box sx={{ alignItems: 'center', display: 'flex', ml: -1 }}>
                        <Checkbox {...getFieldProps("policy")} checked={values.policy} name="policy" />
                        <Typography color="textSecondary" variant="body1" >
                            I have read the {' '}
                            <Link
                                color="primary"
                                component={RouterLink}
                                to="#"
                                underline="hover"
                                variant="h6"
                            >
                                Terms and Conditions
                            </Link>
                        </Typography>
                    </Box>
                    {Boolean(touched.policy && errors.policy) && (
                        <FormHelperText error>{errors.policy}</FormHelperText>)}
                    <Box sx={{ py: 2 }}>
                        <LoadingButton
                            color="primary"
                            loading={isSubmitting}
                            fullWidth
                            size="large"
                            type="submit"
                            variant="contained"
                        >
                            Sign up now
                        </LoadingButton>
                    </Box>
                    <Typography color="textSecondary" variant="body1">
                        Have an account?{' '}
                        <Link
                            component={RouterLink}
                            to={history.location.pathname === "/user/register" ? "/user/login" : "/host/login"}
                            variant="h6"
                            underline="hover">
                            Sign in
                        </Link>
                    </Typography>
                </Form>
            </FormikProvider>
        </>
    );
}

export default RegisterForm;
