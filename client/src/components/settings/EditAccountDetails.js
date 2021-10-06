import React, { useState } from 'react';
import {
    Table, Grid, TableContainer, TableBody,
    TableRow, TableCell, TextField, Typography,
    Paper, Button
} from '@material-ui/core';
import useStyles from '../account/accountDetailsStyles';

const user = JSON.parse(localStorage.getItem('profile'));

function createRow(name, label) {
    return { name, label };
}

const initialForm = {
    name: user.firstName + ' ' + user.lastName,
    email: user.email,
    oldPassword: '',
    newPassword: ''
}

const EditAccountDetails = () => {
    const [form, setForm] = useState(initialForm);
    const classes = useStyles();

    const rows = [
        createRow('name', 'Name'),
        createRow('email', 'Email Address'),
        createRow('oldPassword', 'Old Password'),
        createRow('newPassword', 'New Password')
    ];

    const handleChange = (e) => {
        // console.log(e.target.value);
        setForm({ ...form, [e.target.name]: e.target.value });
    }

    // Submitting
    const handleSubmit = (e) => {
        e.preventDefault();
        console.log(form);
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
                                        <TableRow key={row.name}>
                                            <TableCell>{row.label}</TableCell>
                                            <TableCell>
                                                <TextField
                                                    name={row.name}
                                                    value={form[row.name]}
                                                    onChange={handleChange}
                                                    className={classes.textField}
                                                    type={row.name === 'oldPassword' ? 'password'
                                                        : row.name === 'newPassword' ? 'password'
                                                            : ''}
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
                            disableElevation={true}
                        >
                            Save Details
                        </Button>
                    </Grid>
                </form>
            </div>
        </div>
    );
}

export default EditAccountDetails;