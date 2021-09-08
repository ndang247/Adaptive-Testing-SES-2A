import React from 'react';
import { Divider, Grid, Typography } from '@material-ui/core';
import useStyles from './profileStyles'

const AccountDetails = () => {
    const classes = useStyles();

    return(
        <div>
            <div className={classes.div}>
                <Typography variant="h1" align="center">
                    Account Details
                </Typography>
            </div>
            <div>
                <Grid container direction="row" 
                        justifyContent="center" 
                        alignItems="center"
                        spacing={10}
                        className={classes.grid}>
                    <Grid item xs={1}>
                        Name:
                    </Grid>
                    <Grid item xs={1}>
                        Katarina Smith
                    </Grid>
                </Grid>
                <Grid container direction="row" 
                        justifyContent="center" 
                        alignItems="center"
                        spacing={10}
                        className={classes.grid}>
                    <Grid item xs={1}>
                        Email:
                    </Grid>
                    <Grid item xs={1}>
                        katarinasmith09@gmail.com
                    </Grid>
                </Grid>
            </div>
        </div>
    );
}

export default AccountDetails