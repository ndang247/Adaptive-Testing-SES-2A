import React from 'react';
import {
    Container, Button, Typography, Paper,
    Grid
} from '@material-ui/core';
import useStyles from './dashStyles';
import Navbar from 'src/components/navbar/Navbar';

const StudentDash = () => {
    const classes = useStyles();
    return (
        <React.Fragment>
            <Navbar />
            <Container component="main" maxWidth="sm">
                <Paper className={classes.paperHead} elevation={4}>
                    <Typography variant="h4" color='primary' >
                        Select a Task
                    </Typography>
                </Paper>
                <Grid item xs={8} >
                    <Paper className={classes.paperBody} elevation={2}>
                        <Button
                            className={classes.taskBtn}
                            fullWidth
                            variant="contained"
                            color="primary">
                            Task 1
                        </Button>
                        <Button
                            className={classes.taskBtn}
                            fullWidth
                            variant="contained"
                            color="primary">
                            Task 2
                        </Button>
                        <Button
                            className={classes.taskBtn}
                            fullWidth
                            variant="contained"
                            color="primary">
                            Task 3
                        </Button>
                        <Button
                            className={classes.taskBtn}
                            fullWidth
                            variant="contained"
                            color="primary">
                            Task 4
                        </Button>
                    </Paper>
                </Grid>
            </Container>
        </React.Fragment>
    )
}

export default StudentDash