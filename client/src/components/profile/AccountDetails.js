import React from 'react';
import { 
    Table, Grid, Typography, TableContainer, 
    TableBody, TableRow, TableCell, Paper } from '@material-ui/core';
import useStyles from './profileStyles'

const AccountDetails = () => {
    const classes = useStyles();

    function createUserData(field, info) {
        return {field, info};
    }

    const rows = [
        createUserData('Name:', 'Katarina Smith'),
        createUserData('Email Address', 'katarinasmith05@gmail.com'),
        createUserData('Creation Date', 'September 9, 2021'),
        createUserData('Account Role', 'Host'),
    ];

    return(
        <div>
            <div className={classes.div}>
                <Typography variant="h1" align="center">
                    Account Details
                </Typography>
            </div>
            <div>
                <Grid container spacing={0} alignItems="center">
                <TableContainer component={Paper} className={classes.tableContainer}>
                    <Table className={classes.table}>
                        <TableBody>
                            {rows.map((row) => (
                                <TableRow>
                                    <TableCell>
                                        {row.field}
                                    </TableCell>
                                    <TableCell>
                                        {row.info}
                                    </TableCell>
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