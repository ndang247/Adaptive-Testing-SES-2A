import React from 'react';
import {
    Typography, Paper, Container, Table,
    TableContainer, TableHead, TableRow, TableCell,
    TableBody, TablePagination, TableFooter, Link
} from '@material-ui/core';
import useStyles from './pastExamsStyles';

function createData(title, length, subject, due_date) {
    return { title, length, subject, due_date };
}

const rows = [
    createData('test1', 180, 'Math', '2021-09-10'),
    createData('test2', 180, 'Math', '2021-09-10'),
    createData('test3', 180, 'Math', '2021-09-10'),
    createData('test4', 180, 'Math', '2021-09-10'),
    createData('test5', 180, 'Math', '2021-09-10'),
];

const headCells = [
    { label: 'Exam Title' },
    { label: 'Length' },
    { label: 'Subject' },
    { label: 'Due Date' }
];

const ExamHistory = () => {
    const classes = useStyles();

    const [page, setPage] = React.useState(0);
    const [rowsPerPage, setRowsPerPage] = React.useState(5);

    const handleChangePage = (event, newPage) => setPage(newPage);

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
                <TableContainer component={Paper} className={classes.tableContainer} >
                    <Table className={classes.table} >
                        <TableHead>
                            <TableRow>
                                {headCells.map((headCell) => (
                                    <TableCell className={classes.tableHeaderCell} key={headCell.label}>{headCell.label}</TableCell>))}
                            </TableRow>
                        </TableHead>
                        <TableBody>
                            {rows.slice(page * rowsPerPage, page * rowsPerPage + rowsPerPage).map((row) => (
                                <TableRow key={row.title}>
                                    <TableCell component="th" scope="row" className={classes.name}>
                                        <Link href="#">{row.title}</Link>
                                    </TableCell>
                                    <TableCell>{row.length}</TableCell>
                                    <TableCell>{row.subject}</TableCell>
                                    <TableCell>{row.due_date}</TableCell>
                                </TableRow>))}
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

export default ExamHistory;
