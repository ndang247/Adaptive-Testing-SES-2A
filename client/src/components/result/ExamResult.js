import React from 'react';
import { Container, Typography, Paper, Grid } from '@material-ui/core';
import { Button } from '@material-ui/core';
import useStyles from './ExamResultStyles'
import { useFormik, Form, FormikProvider } from 'formik';

const ExamResult = () => {
    const classes = useStyles();

    const formik = useFormik({
    });

    const { handleSubmit } = formik;

    return (
        <Container component="main" maxWidth="sm" className={classes.position}>
            <Paper className={classes.paperBody} elevation={4}>
                <Typography variant="h1">
                    Well Done!
                </Typography>
                <Typography variant="h4" align="center" paddingTop="15px" marginBottom="20px">
                    You have successfully completed your test. Your result is:
                </Typography>
                <Paper className={classes.paperBody2} elevation={20}>
                    <Typography variant="h3">
                        30/40
                </Typography>
                </Paper>
                <FormikProvider value={formik}>
                    <Form noValidate onSubmit={handleSubmit}>
                    <Grid container spacing={2} direction='row'>
                        <Grid item xs={6} sm={20}>
                            <Button
                                className={classes.historyBtn}
                                color="primary"
                                fullWidth
                                margin="normal"
                                size="large"
                                type="submit"
                                variant="contained"
                            >
                                View Exam History
                            </Button>

                        </Grid>
                        <Grid item xs={12} sm={20}>
                        <Button
                                className={classes.dashboardBtn}
                                color="primary"
                                fullWidth
                                margin="normal"
                                size="large"
                                type="submit"
                                variant="contained"
                                onSubmit="handleSubmit"
                            >
                                Dashboard
                            </Button>
                            </Grid>
                        </Grid>

                    </Form>
                </FormikProvider>

            </Paper >
        </Container >
    );
}

export default ExamResult;