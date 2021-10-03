import React from 'react';
import {
    Typography, Paper, Grid, Table,
    TableContainer, TableHead, TableRow, TableCell,
    TableBody, TablePagination, TableFooter, Link,
    Container
} from '@material-ui/core';
import { Link as RouterLink } from 'react-router-dom';
import useStyles from './examStyles';
import CalendarTodayIcon from '@material-ui/icons/CalendarToday';

function createData(id, examTitle, length, password, subject, created, due_date) {
    return { id, examTitle, length, password, subject, created, due_date };
}

// Dummy
const rows = [
    createData('id1', 'AdapTest', 180, 'password', 'Math', '2021-09-10', '2021-09-10'),
    createData('id2', 'AdapTest', 180, 'password', 'Math', '2021-09-10', '2021-09-10'),
    createData('id3', 'AdapTest', 180, 'password', 'Math', '2021-09-10', '2021-09-10'),
    createData('id4', 'AdapTest', 180, 'password', 'Math', '2021-09-10', '2021-09-10'),
    createData('id5', 'AdapTest', 180, 'password', 'Math', '2021-09-10', '2021-09-10'),
];

const headCells = [
    { label: 'Exam ID' },
    { label: 'Exam Title' },
    { label: 'Length' },
    { label: 'Password' },
    { label: 'Subject' },
    { label: 'Created' },
    { label: 'Due Date' }
];

const Exams = () => {
    const classes = useStyles();

    const [page, setPage] = React.useState(0);
    const [rowsPerPage, setRowsPerPage] = React.useState(5);

    const handleChangePage = (event, newPage) => { setPage(newPage) };

    const handleChangeRowsPerPage = (event) => {
        setRowsPerPage(+event.target.value);
        setPage(0);
    };

    return (
        <>
            <Container component="main" maxWidth='lg' className={classes.position}>
                <Paper className={classes.paperHead}>
                    <Typography variant="h3">Exams History</Typography>
                </Paper>
                <TableContainer component={Paper} className={classes.tableContainer}>
                    <Table>
                        <TableHead>
                            <TableRow>
                                {headCells.map((headCell) => (
                                    <TableCell className={classes.tableHeaderCell} key={headCell.label}>{headCell.label}</TableCell>))}
                            </TableRow>
                        </TableHead>
                        <TableBody>
                            {rows.slice(page * rowsPerPage, page * rowsPerPage + rowsPerPage).map((row) => (
                                <TableRow key={row.id}>
                                    <TableCell component="th" scope="row" className={classes.name}>
                                        <Link component={RouterLink} to="/host/dashboard/exam/history" variant="h6" underline="hover">
                                            {row.id}
                                        </Link>
                                    </TableCell>
                                    <TableCell>{row.examTitle}</TableCell>
                                    <TableCell>{row.length}</TableCell>
                                    <TableCell>{row.password}</TableCell>
                                    <TableCell>{row.subject}</TableCell>
                                    <TableCell>{row.created}</TableCell>
                                    <TableCell>{row.due_date}</TableCell>
                                </TableRow>
                            ))}
                        </TableBody>
                        <TableFooter>
                            <TableRow>
                                <TablePagination
                                    rowsPerPageOptions={[5, 10, 15]}
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
            </Container>
        </>
    );
}

export default Exams;
