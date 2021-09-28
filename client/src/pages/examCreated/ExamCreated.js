import React from 'react';
import {
    Typography, Paper, Grid, Table,
    TableContainer, TableHead, TableRow, TableCell,
    TableBody, TablePagination, TableFooter, Link,
} from '@material-ui/core';
import { Link as RouterLink } from 'react-router-dom';
import useStyles from './CreatedStyle';
import CalendarTodayIcon from '@material-ui/icons/CalendarToday';

// const Content = () => {
//     return (<h1>This is the Content</h1>);
// }

function createData(name, type, roomId, password, time, s_date, e_date) {
    return { name, type, roomId, password, time, s_date, e_date };
}

const rows = [
    createData('test1', 'Math', 11111, 11, 10, '2021-09-10','2021-09-10'),
    createData('test2', 'Math', 22222, 22, 20, '2021-09-10','2021-09-10'),
    createData('test3', 'Math', 33333, 33, 30, '2021-09-10','2021-09-10'),
    createData('test4', 'Math', 44444, 44, 40, '2021-09-10','2021-09-10'),
    createData('test5', 'Math', 55555, 55, 50, '2021-09-10','2021-09-10'),
    createData('test6', 'Math', 66666, 66, 60, '2021-09-10','2021-09-10'),
    createData('test7', 'Math', 77777, 77, 70, '2021-09-10','2021-09-10'),
    createData('test8', 'Math', 88888, 88, 80, '2021-09-10','2021-09-10')
];

const ExamHistory = () => {
    const classes = useStyles();
    // Table pagination
    const [page, setPage] = React.useState(0);
    const [rowsPerPage, setRowsPerPage] = React.useState(5);

    const handleChangePage = (event, newPage) => {
        setPage(newPage);
    };

    const handleChangeRowsPerPage = (event) => {
        setRowsPerPage(+event.target.value);
        setPage(0);
    };

    const preventDefault = (event) => event.preventDefault();

    // Main function
    return (
        <>
            <div className={classes.heroContent}></div>
            <Paper className={classes.paperHead}>
                <Typography variant="h4" color='primary'>
                    <h1>Test-Created-History</h1>
                </Typography>
            </Paper>
            <Grid
                container
                spacing={0}
                direction="column"
                alignItems="center"
                justify="center"
                style={{ minHeight: '100vh' }}
            >
                <TableContainer component={Paper} className={classes.tableContainer} >
                    <Table className={classes.table} >
                        <TableHead>
                            <TableRow>
                                <TableCell className={classes.tableHeaderCell}>Test Name</TableCell>
                                <TableCell className={classes.tableHeaderCell}>Test Type</TableCell>
                                <TableCell className={classes.tableHeaderCell}>Room Id</TableCell>
                                <TableCell className={classes.tableHeaderCell}>Password</TableCell>
                                <TableCell className={classes.tableHeaderCell}>Time Limited(min)</TableCell>
                                <TableCell className={classes.tableHeaderCell}>Start Date</TableCell>
                                <TableCell className={classes.tableHeaderCell}>End Date</TableCell>
                            </TableRow>
                        </TableHead>
                        <TableBody>
                            {rows.slice(page * rowsPerPage, page * rowsPerPage + rowsPerPage).map((row) => (
                                <TableRow key={row.name}>
                                    <TableCell component="th" scope="row" className={classes.name}>
                                    <Link component={RouterLink} to="/host/history/question" variant="h6" underline="hover">
                                            {row.name}
                                        </Link>
                                    </TableCell>
                                    <TableCell>{row.type}</TableCell>
                                    <TableCell>{row.roomId}</TableCell>
                                    <TableCell>{row.password}</TableCell>
                                    <TableCell>{row.time}</TableCell>
                                    <TableCell >
                                        <Grid container>
                                            <Grid item={2}>
                                                <CalendarTodayIcon />
                                            </Grid>
                                            <Grid item={10} >
                                                {row.s_date}
                                            </Grid>
                                        </Grid>
                                    </TableCell>
                                    <TableCell >
                                        <Grid container>
                                            <Grid item={2}>
                                                <CalendarTodayIcon />
                                            </Grid>
                                            <Grid item={10} >
                                                {row.e_date}
                                            </Grid>
                                        </Grid>
                                    </TableCell>
                                </TableRow>
                            ))}
                        </TableBody>
                        <TableFooter>
                            <TableRow>
                                <TablePagination
                                    rowsPerPageOptions={[5, 10, 15]}
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
            </Grid>
        </>
    );
}

export default ExamHistory;
