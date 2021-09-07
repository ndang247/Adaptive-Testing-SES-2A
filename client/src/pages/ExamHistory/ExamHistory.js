import React from 'react'
import {
    Container, Button, Typography, Paper,
    Grid, Table, TableContainer, TableHead, TableRow,
    TableCell, TableBody, TablePagination, TableFooter, Link
} from '@material-ui/core';
import useStyles from './HistoryStyle';
import CalendarTodayIcon from '@material-ui/icons/CalendarToday';


const Content = () => {
    return <h1>This is the Content</h1>
}

function createData(name, date, type, result, rank) {
    return { name, date, type, result, rank };
}

const rows = [
    createData('test1','2021/01/01', 'Math', 1, 1),
    createData('test2','2021/01/02', 'English', 14, 2),
    createData('test3','2021/01/03', 'Math', 1, 3),
    createData('test4','2021/01/04', 'Math', 10, 3),
    createData('test5','2021/01/05', 'Math', 60, 3),
    createData('test6','2021/01/06', 'Math', 19, 3),
    createData('test7','2021/01/07', 'Math', 15, 3),
    createData('test8','2021/01/08', 'Math', 160, 3)
];

const ExamHistory = () => {
    const classes = useStyles();
    //TablePagination
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

    //main function
    return (
        <><div className={classes.heroContent}></div>
            <Paper className={classes.paperHead}>
                <Typography variant="h4" color='primary'>
                    <h1>TestHistory</h1>
                </Typography>
            </Paper>

            <Grid
            container
            spacing={0}
            direction="column"
            alignItems="center"
            justify="center"
            style={{ minHeight: '100vh' }}>
                
            <TableContainer component={Paper} className={classes.tableContainer} >
                <Table className={classes.table} >
                    <TableHead>
                        <TableRow>
                            <TableCell className={classes.tableHeaderCell}>Test Name</TableCell>
                            <TableCell className={classes.tableHeaderCell}>Date of Time</TableCell>
                            <TableCell className={classes.tableHeaderCell}>Type</TableCell>
                            <TableCell className={classes.tableHeaderCell}>Result</TableCell>
                            <TableCell className={classes.tableHeaderCell}>Rank</TableCell>
                        </TableRow>
                    </TableHead>

                    <TableBody>
                        {rows.slice(page * rowsPerPage, page * rowsPerPage + rowsPerPage).map((row) => (
                            <TableRow key={row.name}>
                                <TableCell component="th" scope="row" className={classes.name}>
                                <Link href="#" onClick={preventDefault}>
                                    {row.name}
                                </Link>
                                </TableCell>
                                <TableCell >
                                    <Grid container>
                                        <Grid item={2}>
                                            <CalendarTodayIcon />
                                        </Grid>
                                        <Grid item={10} >
                                            {row.date}
                                        </Grid>
                                    </Grid>
                                </TableCell>
                                <TableCell >{row.type}</TableCell>
                                <TableCell >{row.result}</TableCell>
                                <TableCell >{row.rank}</TableCell>
                            </TableRow>
                        ))}
                    </TableBody>
                    <TableFooter>
                        <TableRow>
                        <TablePagination
                            rowsPerPageOptions={[5,10,15]}
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
            </Grid></>
    )
}
export default ExamHistory


