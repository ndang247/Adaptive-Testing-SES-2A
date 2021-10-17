import React from 'react';
import { Container, Grid, Card, CardContent, Typography } from '@material-ui/core';
import useStyles from './ContentStyles';

const ContactContents = () => {
    const classes = useStyles();

    return (
        <Container className={classes.root}>
            <Grid container item xs={8}>
                <Card elevation={10} className={classes.card}>
                    <CardContent>
                        <Typography className={classes.text}>
                            Phone Number: 0423 278 378
                        </Typography>
                    </CardContent>
                </Card>
                <Card elevation={10} className={classes.card}> 
                    <CardContent>
                        <Typography className={classes.text}>
                            Email Address: support@adaptest.com
                        </Typography>
                    </CardContent>
                </Card>
                <Card elevation={10} className={classes.card}>
                    <CardContent>
                        <Typography className={classes.text}>                            
                            In case of emergencies, contact: <br /> <br />
                            Cormac Hegarthy: <br />
                            Ivan David: Ivan.N.David@student.uts.edu.au<br />
                            Justin Chin: <br />
                            Nam Dang: <br />
                            Nitya Patel: <br />
                            Sacha Gilchrist: <br />
                            Yanjunji Zhang: <br />
                            Ziaho Cui: <br />
                        </Typography>
                    </CardContent>
                </Card>
            </Grid>
        </Container >
    );
}

export default ContactContents
