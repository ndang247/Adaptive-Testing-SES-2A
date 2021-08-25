import React from 'react';
import {
    Container, Typography, Grid, Card,
    CardContent, CardActions, Button, Grow
} from '@material-ui/core';
import useStyles from './headContentStyles';

const HeadContent = () => {
    const classes = useStyles();
    
    return (
        <Container maxWidth="sm">
            <Typography component="h2" variant="h2" align="center" color="textPrimary" gutterBottom>
                Welcome To Adapt Test
            </Typography>
            <Typography variant="h6" align="center" color="textSecondary" paragraph>
                (insert description here)
            </Typography>
            <div className={classes.heroButtons}>
                <Grow in>
                    <Grid container spacing={2} justifyContent="center">
                        <Grid item>
                            <Card elevation={6} className={classes.root}>
                                <CardContent>
                                    <Typography className={classes.title} color="textSecondary" gutterBottom>
                                        Word of the Day
                                    </Typography>
                                    <Typography variant="h5" component="h2">
                                        benevolent
                                    </Typography>
                                    <Typography className={classes.pos} color="textSecondary">
                                        adjective
                                    </Typography>
                                    <Typography variant="body2" component="p">
                                        well meaning and kindly.
                                        <br />
                                        {'"a benevolent smile"'}
                                    </Typography>
                                </CardContent>
                                <CardActions>
                                    <Button size="small">Learn More</Button>
                                </CardActions>
                            </Card>
                        </Grid>
                        <Grid item>
                            <Card elevation={6} className={classes.root}>
                                <CardContent>
                                    <Typography className={classes.title} color="textSecondary" gutterBottom>
                                        Word of the Day
                                    </Typography>
                                    <Typography variant="h5" component="h2">
                                        benevolent
                                    </Typography>
                                    <Typography className={classes.pos} color="textSecondary">
                                        adjective
                                    </Typography>
                                    <Typography variant="body2" component="p">
                                        well meaning and kindly.
                                        <br />
                                        {'"a benevolent smile"'}
                                    </Typography>
                                </CardContent>
                                <CardActions>
                                    <Button size="small">Learn More</Button>
                                </CardActions>
                            </Card>
                        </Grid>
                    </Grid>
                </Grow>
            </div>
        </Container>
    );
};

export default HeadContent;
