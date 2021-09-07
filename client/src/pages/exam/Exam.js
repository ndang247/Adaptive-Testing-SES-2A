import React from 'react'
import {
    Paper, Typography, Button, Grid,
    Container, CssBaseline, AppBar, Toolbar,
    Divider,
} from '@material-ui/core';
import useStyles from './examStyles';
// import { HeadContent, BodyContent, Footer, NavBar } from 'src/components';

const Exam = () => {
    const classes = useStyles();
    return (
        <React.Fragment>
            <main >
                <CssBaseline />
                <AppBar position="relative">
                    <Toolbar>
                        <Typography variant="h2">
                            AdapTest
                        </Typography>
                    </Toolbar>
                </AppBar>
                <div >
                    <Typography variant="h1" align="center">
                        Math Test
                    </Typography>
                </div>
                <Divider />
                <div>
                    <Grid container flexDirection="column" alignItems="revert">
                        <Grid xs={3}>
                            <Typography variant="h3" align="center" color="Highlight" fontStyle="oblique">
                                Time Left :
                            </Typography>
                        </Grid>
                        <Grid xs={3}>
                            <Typography variant="h3" align="center" color="Highlight">
                                29:59
                            </Typography>
                        </Grid>
                    </Grid>
                </div>
                <Divider />
                <div className={classes.paper} >
                    <Paper elevation={10} >
                        <Container>
                            <Grid container>
                                <Grid xs={11}>
                                    <Toolbar>
                                        <Typography variant="h1">
                                            Question 1
                                        </Typography>
                                    </Toolbar>
                                </Grid>

                                <Grid xs={1} >
                                    <Toolbar>
                                        <Typography variant="h1" >
                                            1/40
                                        </Typography>
                                    </Toolbar>
                                </Grid>
                            </Grid>
                        </Container>
                        <Divider />
                        <div>
                            <Typography variant="h1" >
                                If I have ten apples, Chris wants to take 3 apples from me.
                                How many apples will be left.
                            </Typography>
                        </div>
                    </Paper>
                </div>
                <div className={classes.answer} >
                    <Paper elevation={10} align="center">
                        <Grid container>
                            <Grid xs={8}>
                                <Toolbar>
                                    <Typography variant="h1">
                                        Multiple choice
                                    </Typography>
                                </Toolbar>
                            </Grid>
                        </Grid>
                        {/* End of Multiple Choice title, should not change */}
                        <Divider />
                        {/* 4 answer buttons */}
                        <div className={classes.answer}>
                            <Grid container >
                                <Grid xs={6}>
                                    <Button>
                                        <Typography variant="h1">
                                            A. 7
                                        </Typography>
                                    </Button>
                                </Grid>

                                <Grid xs={6}>
                                    <Button>
                                        <Typography variant="h1">
                                            B. 6
                                        </Typography>
                                    </Button>
                                </Grid>

                                <Grid xs={6}>
                                    <Button>
                                        <Typography variant="h1">
                                            C. 5
                                        </Typography>
                                    </Button>
                                </Grid>

                                <Grid xs={6}>
                                    <Button>
                                        <Typography variant="h1">
                                            D. 9
                                        </Typography>
                                    </Button>
                                </Grid>
                            </Grid>
                        </div>
                    </Paper>
                </div>
                <div align="center">
                    <Button variant="contained" color="primary">
                        Next
                    </Button>
                </div>
            </main>
        </React.Fragment>
    );
}

export default Exam;
