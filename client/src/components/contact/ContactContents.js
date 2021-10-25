import React from 'react';
import { Container, Grid, Card, CardContent, Typography } from '@material-ui/core';
import useStyles from './contactContentStyles';

const ContactContents = () => {
    const classes = useStyles();

    return (
        <Container className={classes.root}>
            <Grid container justifyContent="center">
                <Grid item xs={12}>
                    <Card elevation={10} className={classes.card}>
                        <CardContent>
                            <Typography variant="body1" className={classes.text}>
                                Phone Number: 0423 278 378
                            </Typography>
                        </CardContent>
                    </Card>
                </Grid>
                <Grid item xs={12}>
                    <Card elevation={10} className={classes.card}>
                        <CardContent>
                            <Typography variant="body1" className={classes.text}>
                                Email Address: support@adaptest.com
                            </Typography>
                        </CardContent>
                    </Card>
                </Grid>
                <Grid item xs={12}>
                    <Card elevation={10} className={classes.card}>
                        <CardContent>
                            <Typography variant="body1" className={classes.text} align="center">
                                In case of emergencies, contact: <br /> <br />
                                Cormac.Hegarthy@student.uts.edu.au<br />
                                Ivan.N.David@student.uts.edu.au<br />
                                Justin.W.Chin@student.uts.edu.au<br />
                                Nam.Dang-1@student.uts.edu.au<br />
                                Nitya.Patel@student.uts.edu.au<br />
                                Sacha.Gilchrist@student.uts.edu.au<br />
                                Yanjunji.Zhang-1@student.uts.edu.au<br />
                                Zihao.Cui-1@student.uts.edu.au<br />
                            </Typography>
                        </CardContent>
                    </Card>
                </Grid>
            </Grid>
        </Container>
    );
}

export default ContactContents;
