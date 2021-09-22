import React from 'react';
import {
    Grid, Table, TableContainer, TableBody,
    TableRow, TableCell, TextField, Typography,
    Paper
} from '@material-ui/core';
import useStyles from './profileStyles';

function createUserData(id, field, info) {
    return { id, field, info };
}

const rows = [
    createUserData('name', 'Name:', 'Katarina Smith'),
    createUserData('email', 'Email Address', 'katarinasmith05@gmail.com'),
    createUserData('password', 'Password', 'temppassword'),
    createUserData('password', 'Confirm Password', ''),
];

const EditDetails = () => {
    const classes = useStyles();

    return (
        <div>
            <div className={classes.div}>
                <Typography variant="h1" align="center">
                    Edit Account Details
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
                                        <TableCell align="justify">
                                            <TextField className={classes.textField} id={row.id} type={row.id === "password" ? "password" : ""} defaultValue={row.info} variant="outlined" />
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

export default EditDetails