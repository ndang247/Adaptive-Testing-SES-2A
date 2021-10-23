import React from 'react';
import { CssBaseline } from '@material-ui/core';
import { NavBar, ContactHeader, ContactContents,} from 'src/components'
import useStyles from './ContactStyles';

const Contact = () => {
    const classes = useStyles();
    return (
        <>
            <div className={classes.root}>
                <NavBar />
                <ContactHeader />
                <ContactContents />
            </div>
        </>
    )
}

export default Contact
