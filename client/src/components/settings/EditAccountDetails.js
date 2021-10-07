import React, { useState } from 'react';
import {
    Table, Grid, TableContainer, TableBody,
    TableRow, TableCell, TextField, Typography,
    Paper, Button, Alert, IconButton,
    InputAdornment
} from '@material-ui/core';
import useStyles from '../account/accountDetailsStyles';
import { useDispatch, useSelector } from 'react-redux';
import { updateUser } from 'src/redux/actions/users';
import { Icon } from '@iconify/react';
import eyeFill from '@iconify/icons-eva/eye-fill';
import eyeOffFill from '@iconify/icons-eva/eye-off-fill';

const user = JSON.parse(localStorage.getItem('profile'));

function createRow(name, label) {
    return { name, label };
}

const initialForm = {
    firstName: user?.firstName,
    lastName: user?.lastName,
    oldPassword: '',
    newPassword: '',
    confirmNewPassword: ''
}

const EditAccountDetails = () => {
    const [form, setForm] = useState(initialForm);
    const [error, setError] = useState(false);
    const [showPassword, setShowPassword] = useState(false);

    const classes = useStyles();
    const dispatch = useDispatch();
    const { userData, errors } = useSelector((state) => state.users);

    const rows = [
        createRow('firstName', 'First Name'),
        createRow('lastName', 'Last Name'),
        createRow('oldPassword', 'Old Password'),
        createRow('newPassword', 'New Password'),
        createRow('confirmNewPassword', 'Confirm New Password')
    ];

    const handleChange = (e) => {
        setForm({ ...form, [e.target.name]: e.target.value });
    }

    const handleShowPassword = () => setShowPassword((show) => !show);

    // Submitting
    const handleSubmit = (e) => {
        e.preventDefault();
        if (form.newPassword !== form.confirmNewPassword) setError(true);
        else dispatch(updateUser(user.id, form));
    };

    return (
        <div>
            {userData && <Alert severity="success">Account Saved Successfully</Alert>}
            {(error || errors) && <Alert severity="error">{error ? 'Please enter matching new password' : errors.errors}</Alert>}
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
                                                    type={row.name.includes("Password") && !showPassword ? 'password' : 'text'}
                                                    variant="outlined"
                                                    required
                                                    InputProps={{
                                                        endAdornment: (
                                                            <InputAdornment position="end">
                                                                {row.name.includes("Password") && (
                                                                    <IconButton onClick={handleShowPassword} edge="end">
                                                                        <Icon icon={showPassword ? eyeOffFill : eyeFill} />
                                                                    </IconButton>
                                                                )}
                                                            </InputAdornment>
                                                        )
                                                    }}
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