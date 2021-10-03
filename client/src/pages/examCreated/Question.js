import React from 'react'
import { makeStyles } from '@material-ui/styles';
import {
    Grid, Paper, Typography,
    Container, Toolbar, Divider,
} from '@material-ui/core';

const useStyles = makeStyles((theme) => ({
    paper: {
        display: 'flex',
        flexWrap: 'wrap',
        flexDirection: 'column',
        alignItems: 'center',
        marginBottom: theme.spacing(5),

        '& > *': {
            margin: theme.spacing(1),
            width: theme.spacing(100),
            height: theme.spacing(40),
            //borderRadius: 25,
        },
    },
    paper2: {
        border: '3px solid #A0AEF0',

    },
    grid: {
        backgroundColor: "#E3E6F4",
    }
}));

const Question = () => {
    const classes = useStyles();
    return (
        <div className={classes.paper} >
            <Paper elevation={10} className={classes.paper2}>
                <Container className={classes.grid}>
                    <Grid container>
                        <Grid xs={10}>
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
                <Grid container >
                    <Grid xs={6}>
                        <Typography variant="h1">
                            A. 7
                        </Typography>
                    </Grid>

                    <Grid xs={6}>
                        <Typography variant="h1">
                            B. 6
                        </Typography>
                    </Grid>

                    <Grid xs={6}>
                        <Typography variant="h1">
                            C. 5
                        </Typography>
                    </Grid>

                    <Grid xs={6}>
                        <Typography variant="h1">
                            D. 9
                        </Typography>
                    </Grid>
                </Grid>
                <Grid>
                    <Typography variant="h1" color="#5379F3" >
                        Answer: A
                    </Typography>
                </Grid>
            </Paper>
        </div>
    )
}

export default Question
