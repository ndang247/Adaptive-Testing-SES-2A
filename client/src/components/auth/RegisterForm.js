import React, { useState } from 'react';
import { useFormik, Form, FormikProvider } from "formik";
import {
    Box, Checkbox, FormHelperText, Link,
    TextField, Typography, InputAdornment, IconButton
} from '@material-ui/core';
import * as Yup from 'yup';
import { Link as RouterLink, useHistory } from 'react-router-dom';
import { Icon } from "@iconify/react";
import eyeFill from "@iconify/icons-eva/eye-fill";
import eyeOffFill from "@iconify/icons-eva/eye-off-fill";
import { LoadingButton } from "@material-ui/lab";

const RegisterForm = () => {
    const history = useHistory();
    const [showPassword, setShowPassword] = useState(false);

    const RegisterSchema = Yup.object().shape({
        firstName: Yup.string().min(2, "Too Short!").max(50, "Too Long!").required("First name required"),
        lastName: Yup.string().min(2, "Too Short!").max(50, "Too Long!").required("Last name required"),
        email: Yup.string().email("Email must be a valid email address").required("Email is required"),
        password: Yup.string().required("Password is required"),
        confirmPassword: Yup.string().required("Please confirm your password"),
    });

    const formik = useFormik({
        initialValues: {
            firstName: "",
            lastName: "",
            email: "",
            password: "",
            confirmPassword: "",
        },
        validationSchema: RegisterSchema,
        onSubmit: () => { }
    });

    const { errors, touched, values, isSubmitting, setFieldValue, handleSubmit, getFieldProps } = formik;

    return (
        <>
            <FormikProvider value={formik}>
                <Form autoComplete="off" noValidate onSubmit={handleSubmit}>
                    <Box sx={{ mb: 3 }}>
                        <Typography
                            color="textPrimary"
                            variant="h2"
                        >
                            Create new account
                        </Typography>
                        <Typography
                            color="textSecondary"
                            gutterBottom
                            variant="body2"
                        >
                            Use your email to create new account
                        </Typography>
                    </Box>
                    <TextField
                        error={Boolean(touched.firstName && errors.firstName)}
                        fullWidth
                        helperText={touched.firstName && errors.firstName}
                        label="First name"
                        margin="normal"
                        name="firstName"
                        variant="outlined"
                        {...getFieldProps("firstName")}

                    />
                    <TextField
                        error={Boolean(touched.lastName && errors.lastName)}
                        fullWidth
                        helperText={touched.lastName && errors.lastName}
                        label="Last name"
                        margin="normal"
                        name="lastName"
                        variant="outlined"
                        {...getFieldProps("lastName")}

                    />
                    <TextField
                        error={Boolean(touched.email && errors.email)}
                        fullWidth
                        helperText={touched.email && errors.email}
                        label="Email Address"
                        margin="normal"
                        name="email"
                        type="email"
                        variant="outlined"
                        {...getFieldProps("email")}

                    />
                    <TextField
                        error={Boolean(touched.password && errors.password)}
                        fullWidth
                        helperText={touched.password && errors.password}
                        label="Password"
                        margin="normal"
                        name="password"
                        type="password"
                        variant="outlined"
                        {...getFieldProps("password")}
                        InputProps={{
                            endAdornment: (
                                <InputAdornment position="end">
                                    <IconButton
                                        edge="end"
                                        onClick={() => setShowPassword((prev) => !prev)}
                                    >
                                        <Icon icon={showPassword ? eyeFill : eyeOffFill} />
                                    </IconButton>
                                </InputAdornment>
                            ),
                        }}
                    />
                    <Box
                        sx={{
                            alignItems: 'center',
                            display: 'flex',
                            ml: -1
                        }}
                    >
                        <Checkbox
                            checked={values.policy}
                            name="policy"
                        />
                        <Typography
                            color="textSecondary"
                            variant="body1"
                        >
                            I have read the
                            {' '}
                            <Link
                                color="primary"
                                component={RouterLink}
                                to="#"
                                underline="always"
                                variant="h6"
                            >
                                Terms and Conditions
                            </Link>
                        </Typography>
                    </Box>
                    {Boolean(touched.policy && errors.policy) && (
                        <FormHelperText error>
                            {errors.policy}
                        </FormHelperText>
                    )}
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
                    <Typography
                        color="textSecondary"
                        variant="body1"
                    >
                        Have an account?
                        {' '}
                        <Link component={RouterLink} to="/user/login" variant="h6" underline="hover">
                            Sign in
                        </Link>
                    </Typography>
                </Form>
            </FormikProvider>
        </>
    );
}

export default RegisterForm;
