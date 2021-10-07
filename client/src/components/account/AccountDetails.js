import React from 'react';
import {
    Table, Grid, Typography, TableContainer,
    TableBody, TableRow, TableCell, Paper
} from '@material-ui/core';
import useStyles from './accountDetailsStyles';

function createUserData(field, info) {
    return { field, info };
}

const AccountDetails = () => {
    const classes = useStyles();
    const user = JSON.parse(localStorage.getItem('profile'));

    const rows = [
        createUserData('Name', user.firstName + ' ' + user.lastName),
        createUserData('Email Address', user.email),
        // createUserData('Creation Date', user.dateCreated.slice(0, 10)),
        createUserData('Account Role', user.role)
    ];

    return (
        <div>
            <div className={classes.div}>
                <Typography variant="h1" align="center">Account Details</Typography>
            </div>
            <div>
                <Grid container spacing={0} alignItems="center">
                    <TableContainer component={Paper} className={classes.tableContainer}>
                        <Table className={classes.table}>
                            <TableBody>
                                {rows.map((row) => (
                                    <TableRow key={row.field}>
                                        <TableCell>{row.field}</TableCell>
                                        <TableCell>{row.info}</TableCell>
                                    </TableRow>
                                ))}
                            </TableBody>
                        </Table>
                    </TableContainer>
                </Grid>
            </div>
        </div>
    );
}

export default AccountDetails