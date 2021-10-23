import React, { useState, useEffect } from 'react';
import { IconButton, Typography, Container, Collapse } from '@material-ui/core';
import useStyles from './contactHeaderStyles';
import ExpandMoreIcon from '@material-ui/icons/ExpandMore';

const ContactHeader = () => {
    const classes = useStyles();
    const [checked, setChecked] = useState(false);
    useEffect(() => {
        setChecked(true);
    }, []);
    return (
        <Container main className={classes.root}>
            <Container className={classes.container}>
                <Collapse in={checked} {...(checked ? { timeout: 1000 } : {})} collapsedHeight={104}>
                    <Typography variant="h1" className={classes.titleText}>
                        Contact Us
                    </Typography>
                    <IconButton>
                        <ExpandMoreIcon className={classes.shiftDown} />
                    </IconButton>
                </Collapse>
            </Container>

        </Container>
    );
};

export default ContactHeader;
