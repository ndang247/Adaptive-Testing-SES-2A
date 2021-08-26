import React, { useState } from 'react';
import { Container, Button, TextField, Typography, Paper, Grid } from '@material-ui/core';
import useStyles from './loginStyles';
import Navbar from 'src/components/navbar/Navbar';
import Footer from 'src/components/footer/Footer';
import Input from './Input';

const Login = () => {
    const classes = useStyles();
    const [isSignedUp, setIsSignedUp] = useState(false);
    const [showPassword, setShowPassword] = useState(false);
    const handleShowPassword = () => setShowPassword((prevShowPassword) => !prevShowPassword);
    const switchForm = () => {
        setIsSignedUp((prevIsSignedUp) => !prevIsSignedUp);
    };
    const handleSubmit = () => {
    };
    const handleChange = () => {
    };
    return (
        <React.Fragment>
            <Navbar />
            <main>
                <Container component="main" maxWidth="xs">
                    <Paper className={classes.paper} elevation={3}>
                        <Typography variant="h5"> {isSignedUp ? 'Start your Journey Today!' : 'Welcome Back!'} </Typography>
                        <form className={classes.loginForm} onSubmit={handleSubmit}>
                            <Grid container spacing={2}>
                                {
                                    isSignedUp && (
                                        <React.Fragment>
                                            <Input name="firstName" label="First Name" handleChange={handleChange} autoFocus />
                                            <Input name="lastName" label="Last Name" handleChange={handleChange} autoFocus />
                                        </React.Fragment>
                                    )
                                }
                                <Input name="email" label="Email Address" handleChange={handleChange} type="email" />
                                <Input name="password" label="Password" handleChange={handleChange} type={showPassword ? "text" : "password"} handleShowPassword={handleShowPassword} />
                                {isSignedUp && <Input name="confirmPassword" label="Confirm Password" handleChange={handleChange} type="password" />}
                            </Grid>
                            <Button type="submit" fullWidth variant="contained" color="primary" className={classes.submitBtn}>
                                {isSignedUp ? 'Sign Up' : 'Log In'}
                            </Button>
                            <Grid container justify="flex-end">
                                <Grid item>
                                    <Button onClick={switchForm}>
                                        {isSignedUp ? 'Already signed up? Sign in instead!' : 'Haven\'t made an account? Join us now!'}
                                    </Button>
                                </Grid>
                            </Grid>
                        </form>
                    </Paper>
                </Container>
            </main>
            <Footer />
        </React.Fragment>
    );
}

export default Login
