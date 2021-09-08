import React from 'react';
import { Grid, TextField, Typography } from '@material-ui/core';
import useStyles from './profileStyles'

const EditDetails = () => {
    const classes = useStyles();

    return(
        <div>
            <div className={classes.div}>
                <Typography variant="h1" align="center">
                    Edit Account Details
                </Typography>
            </div>
            <div>
                <Grid container direction="row" 
                        justifyContent="center" 
                        alignItems="center"
                        spacing={10}
                        className={classes.grid}>
                    <Grid item xs={3} align="right">
                        Name:
                    </Grid>
                    <Grid item xs={3}>
                        <TextField defaultValue="Katarina Smith" variant="filled"/>
                    </Grid>
                </Grid>
                <Grid container direction="row" 
                        justifyContent="center" 
                        alignItems="center"
                        spacing={10}
                        className={classes.grid}>
                    <Grid item xs={3} align="right">
                        Email:
                    </Grid>
                    <Grid item xs={3}>
                        <TextField defaultValue="katarinasmith09@gmail.com" variant="filled"/>
                    </Grid>
                </Grid>
            </div>
        </div>
    );
}

export default EditDetails