import React from 'react'
import Question from './Question'
import { Container, Typography, Paper, Grid } from '@material-ui/core';
import { makeStyles } from '@material-ui/styles';
const useStyles = makeStyles((theme) => ({
    container: {
        paddingTop: theme.spacing(10),
    },
    paperHead: {
        display: 'flex',
        flexDirection: 'column',
        alignItems: 'center',
        padding: theme.spacing(2),
        marginTop: theme.spacing(1),
        marginBottom: theme.spacing(4),
    },
    heroContent: {
        backgroundColor: "#778da9",
        padding: theme.spacing(10, 0, 6),
    },
}))

const QuestionCreated = () => {
    const classes = useStyles();
    return (
        <><div className={classes.heroContent}></div>
            <Paper className={classes.paperHead}>
                <Typography variant="h4" color='primary'>
                    <h1>Test-Created-History</h1>
                </Typography>

                <Container className ={classes.container}>
                    <Question />
                    <Question />
                    <Question />
                    <Question />
                    <Question />
                    <Question />
                    <Question />
                    <Question />
                    <Question />
                </Container>
            </Paper></>
    )
}

export default QuestionCreated
