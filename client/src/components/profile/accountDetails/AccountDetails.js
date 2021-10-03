import React, {useEffect} from 'react';
import {
    Table, Grid, Typography, TableContainer,
    TableBody, TableRow, TableCell, Paper
} from '@material-ui/core';
import useStyles from '../profileStyles';
import { useSelector, useDispatch } from 'react-redux';
import { userSettings } from 'src/redux/actions/settings';

function createUserData(field, info) {
    return { field, info };
}

const AccountDetails = () => {
    const classes = useStyles();
    const user = JSON.parse(localStorage.getItem('profile'));

    const dispatch = useDispatch();
    useEffect(() => {
        dispatch(userSettings(user.email));
    }, []);

    const {userData} = useSelector((state) => state.settings);
    if(!userData) return <>Loading...</>;

    const rows = [
        createUserData('Name:', userData.firstName + ' ' + userData.lastName),
        createUserData('Email Address', userData.email),
        createUserData('Creation Date', userData.dateCreated.slice(0, 10)),
        createUserData('Account Role', userData.role),
    ];

    return (
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