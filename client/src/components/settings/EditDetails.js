import React, { useEffect } from 'react';
import {
    Table, Grid, TableContainer, TableBody,
    TableRow, TableCell, TextField, Typography,
    Paper, Button
} from '@material-ui/core';
import useStyles from '../account/profileStyles';
import { useSelector, useDispatch } from 'react-redux';
import { userSettings } from 'src/redux/actions/settings';

function createUserData(label, field, info) {
    return { label, field, info };
}

const EditDetails = () => {
    const classes = useStyles();
    const user = JSON.parse(localStorage.getItem('profile'));

    const dispatch = useDispatch();
    useEffect(() => {
        dispatch(userSettings(user.email));
    }, []);

    const { userData } = useSelector((state) => state.settings);

    if (!userData) return <>Loading...</>;

    const rows = [
        createUserData('name', 'Name', userData.firstName + ' ' + userData.lastName),
        createUserData('email', 'Email Address', userData.email),
        createUserData('password', 'Password', ''),
        createUserData('confirmPassword', 'Confirm Password', ''),
    ];

    // Submitting
    const handleSubmit = () => {
    };

    return (
        <div>
            <div className={classes.div}>
                <Typography variant="h1" align="center">Edit Account Details</Typography>
            </div>
            <div>
                <form onSubmit={handleSubmit}>
                    <Grid container spacing={0} alignItems="center">
                        <TableContainer component={Paper} className={classes.tableContainer}>
                            <Table className={classes.table}>
                                <TableBody>
                                    {rows.map((row) => (
                                        <TableRow key={row.label}>
                                            <TableCell>{row.field}</TableCell>
                                            <TableCell>
                                                <TextField
                                                    className={classes.textField}
                                                    type={row.label === "password" ? "password" : ""}
                                                    value={row.info}
                                                    variant="outlined"
                                                />
                                            </TableCell>
                                        </TableRow>
                                    ))}
                                </TableBody>
                            </Table>
                        </TableContainer>
                        &nbsp;
                        <Button
                            type="submit"
                            fullWidth
                            size="large"
                            variant="contained"
                        >
                            Edit Details
                        </Button>
                    </Grid>
                </form>
            </div>
        </div>
    );
}

export default EditDetails;