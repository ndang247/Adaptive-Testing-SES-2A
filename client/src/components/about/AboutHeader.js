import React, { useState, useEffect } from 'react';
import { IconButton, Typography, Container, Collapse } from '@material-ui/core';
import useStyles from './AboutHeaderStyles';
import ExpandMoreIcon from '@material-ui/icons/ExpandMore';

const AboutHeader = () => {
    const classes = useStyles();
    const [checked, setChecked] = useState(false);
    useEffect(() => {
        setChecked(true);
    }, []);
    return (
        <Container main className={classes.root} id="header">
            <Container className={classes.container}>
                <Collapse in={checked} {...(checked ? { timeout: 1000 } : {})} collapsedHeight={104} >
                    <Typography variant="h1" className={classes.titleText}>
                        Who are we?
                    </Typography>
                    <IconButton>
                        <ExpandMoreIcon className={classes.shiftDown} />
                    </IconButton>
                </Collapse>
            </Container>

        </Container>
    );
}

export default AboutHeader
