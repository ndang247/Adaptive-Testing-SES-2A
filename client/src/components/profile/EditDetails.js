import React, {useEffect} from 'react';
import {
    Table, Grid, TableContainer, TableBody,
    TableRow, TableCell, TextField, Typography, Paper
} from '@material-ui/core';
import useStyles from './profileStyles';
import { useSelector, useDispatch } from 'react-redux';
import { userSettings } from 'src/redux/actions/settings';

function createUserData(id, field, info) {
    return { id, field, info };
}

const EditDetails = () => {
    const classes = useStyles();
    const user = JSON.parse(localStorage.getItem('profile'));

    const dispatch = useDispatch();
    useEffect(() => {
        dispatch(userSettings(user.email));
    }, []);

    const {userData} = useSelector((state) => state.settings);
    if(!userData) return <>Loading...</>;

    const rows = [
        createUserData('name', 'Name:', userData.firstName + ' ' + userData.lastName),
        createUserData('email', 'Email Address', userData.email),
        createUserData('password', 'Password', ''),
        createUserData('password', 'Confirm Password', ''),
    ];

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