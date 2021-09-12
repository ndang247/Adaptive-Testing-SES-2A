import React, { useState } from 'react';
import clsx from 'clsx';
import {
    Container, Button, Typography,
    Paper, Grid, Table, TableContainer,
    TableHead, TableBody, TableRow,
    TableCell, TablePagination, TableFooter,
    TextField, InputAdornment, ButtonGroup
} from '@material-ui/core';
import Autocomplete from '@material-ui/lab/Autocomplete';
import useStyles from './testFormStyles';

// For the selecting combo box
const subjects = ['Math', 'Physics', 'Chemistry', 'Biology', 'English', 'Boss Stage'];

const TestForm = () => {
    const classes = useStyles();

    // Tables View
    function createData(question, difficulty) {
        return { question, difficulty };
    };
    const rows = [
        createData('Toaster dropped on my head', 92),
        createData('Time to get a new phone', 87),
        createData('My 6s+ Survived for 6 years', 97),
        createData('Until the fire nation attacked', 42),
        createData('It became burnt toast', 58),
        createData('Not because of the toaster that dropped on my head', 1),
        createData('It was because I forgot the peanut butter', 24),
        createData('ココロに刻むんだ WATER BLUE', 101),
    ];
    const [page, setPage] = useState(0);
    const [rowsPerPage, setRowsPerPage] = useState(5);

    // Page Swapper
    const handleChangePage = (event, newPage) => {
        setPage(newPage);
    };
    const handleChangeRowsPerPage = (event) => {
        setRowsPerPage(+event.target.value);
        setPage(0);
    };

    // Select Box
    const [value, setValue] = useState(null);
    const [inputValue, setInputValue] = useState('');

    // Time Input
    const [values, setValues] = useState({ time: '' });
    const handleChange = (prop) => (event) => {
        setValues({ ...values, [prop]: event.target.value });
    };

    //Submitting
    const handleSubmit = () => {
    };
    return (
        <Container component="main" className={classes.position}>
            <Paper className={classes.paperHead}>
                <Typography variant="h3">
                    Test Creation
                </Typography>
            </Paper>
            <form className={classes.testForm} onSubmit={handleSubmit}>
                <Paper className={classes.paperBody}>
                    <Grid container spacing={2}>
                        <Grid item xs={12}>
                            <TextField name="Title" label="Title of the Test" id="test-title" variant="outlined" fullWidth />
                        </Grid>
                        <Grid item xs={12}>
                            <Autocomplete
                                value={value}
                                onChange={(event, newValue) => {
                                    setValue(newValue);
                                }}
                                inputValue={inputValue}
                                onInputChange={(event, newInputValue) => {
                                    setInputValue(newInputValue);
                                }}
                                id="test-content"
                                options={subjects}
                                renderInput={(params) =>
                                    <TextField {...params}
                                        name="content"
                                        id="test-content"
                                        label="Test Subject"
                                        variant="outlined"
                                    />}
                            />
                        </Grid>
                        <Grid item xs={12}>
                            <TextField
                                label="Maximum Allowed Time"
                                id="test-max-duration"
                                className={clsx(classes.margin, classes.textField)}
                                InputProps={{
                                    endAdornment: <InputAdornment position="end">minutes</InputAdornment>,
                                }}
                                variant="outlined"
                                fullWidth
                                type="number"
                            />
                        </Grid>
                        <Grid item xs={12}>
                            <TextField
                                id="test-expiry-date"
                                label="Test to be completed by"
                                type="datetime-local"
                                defaultValue="2021-09-10T20:00"
                                InputLabelProps={{
                                    shrink: true,
                                }}
                                fullWidth
                            />
                        </Grid>
                        <Grid item xs={12}>
                            <TextField name="room-id" label="Room ID" id="room-id" variant="outlined" fullWidth />
                        </Grid>
                        <Grid item xs={12}>
                            <TextField name="room-pin" label="Unique Room Pin" id="room-pin" variant="outlined" fullWidth />
                        </Grid>
                    </Grid>
                </Paper>
                <Grid
                    container
                    spacing={0}
                    direction="column"
                    alignItems="center"
                    justify="center"
                >
                    <TableContainer component={Paper} className={classes.tableContainer} >
                        <Table className={classes.table} >
                            <TableHead>
                                <TableRow>
                                    <TableCell className={classes.tableHeader}> Question Info </TableCell>
                                    <TableCell className={classes.tableHeader}> Difficulty </TableCell>
                                </TableRow>
                            </TableHead>
                            <TableBody>
                                {rows.slice(page * rowsPerPage, page * rowsPerPage + rowsPerPage).map((row) => (
                                    <TableRow key={row.name}>
                                        <TableCell component="th" scope="row">
                                            {row.question}
                                        </TableCell>
                                        <TableCell>
                                            {row.difficulty}
                                        </TableCell>
                                    </TableRow>
                                ))}
                            </TableBody>
                            <TableFooter>
                                <TableRow>
                                    <TablePagination
                                        rowsPerPageOptions={[5, 10, 20]}
                                        component="div"
                                        count={rows.length}
                                        rowsPerPage={rowsPerPage}
                                        page={page}
                                        onPageChange={handleChangePage}
                                        onRowsPerPageChange={handleChangeRowsPerPage}
                                    />
                                </TableRow>
                            </TableFooter>
                        </Table>
                    </TableContainer>
                    <Grid container justify="flex">
                        <Grid item>
                            <ButtonGroup>
                                <Button Button type="submit" fullWidth variant="contained" color="primary" className={classes.submitBtn}>
                                    CREATE TEST
                                </Button>
                                <Button Button type="reset" fullWidth variant="contained" color="secondary" className={classes.saveBtn}>
                                    SAVE TEST
                                </Button>
                            </ButtonGroup>
                        </Grid>
                    </Grid>
                </Grid>
            </form>
        </Container>
    );
}

export default TestForm;