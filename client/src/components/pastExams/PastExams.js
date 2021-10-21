import React, { useEffect, useState } from 'react';
import {
    Typography, Paper, Container, Table,
    TableContainer, TableHead, TableRow, TableCell,
    TableBody, TablePagination, TableFooter, Link,
    Skeleton
} from '@material-ui/core';
import useStyles from './pastExamsStyles';
import { useSelector, useDispatch } from 'react-redux';
import { getPastExamsByID } from 'src/redux/actions/exams';

const headCells = [
    { label: 'Exam ID' },
    { label: 'Exam Title' },
    { label: 'Subject' },
    { label: 'Score' }
];

const ExamHistory = () => {
    const classes = useStyles();
    const { exams, loading } = useSelector((state) => state.exams);
    const dispatch = useDispatch();
    const user = JSON.parse(localStorage.getItem('profile'));

    useEffect(() => {
        if (user?.id) dispatch(getPastExamsByID(user?.id));
    }, [user?.id]);

    const [page, setPage] = useState(0);
    const [rowsPerPage, setRowsPerPage] = useState(5);

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
                {(!exams.length && !loading) ?
                    (<Typography className={classes.paperHead} variant="h3">No Past Exams Completed </Typography>)
                    : (<TableContainer component={Paper} className={classes.tableContainer} >
                        {loading ?
                            <Skeleton variant="rectangular" width="100%">
                                <div style={{ paddingTop: '50%' }} />
                            </Skeleton>
                            :
                            (<Table>
                                <TableHead>
                                    <TableRow>
                                        {headCells.map((headCell) => (
                                            <TableCell className={classes.tableHeaderCell} key={headCell.label}>{headCell.label}</TableCell>))}
                                    </TableRow>
                                </TableHead>
                                <TableBody>
                                    {exams.slice(page * rowsPerPage, page * rowsPerPage + rowsPerPage).map((exam) => (
                                        <TableRow key={exam._id}>
                                            <TableCell component="th" scope="row" className={classes.name}>
                                                <Link href="#">{exam._id}</Link>
                                            </TableCell>
                                            <TableCell>{exam.title}</TableCell>
                                            <TableCell>{exam.contentType}</TableCell>
                                            <TableCell>{exam.rating}</TableCell>
                                        </TableRow>))}
                                </TableBody>
                                <TableFooter>
                                    <TableRow>
                                        <TablePagination
                                            rowsPerPageOptions={[5, 10, 15]}
                                            count={exams.length}
                                            rowsPerPage={rowsPerPage}
                                            page={page}
                                            onPageChange={handleChangePage}
                                            onRowsPerPageChange={handleChangeRowsPerPage}
                                        />
                                    </TableRow>
                                </TableFooter>
                            </Table>)}
                    </TableContainer>)}
            </Container>
        </>
    );
}

export default ExamHistory;