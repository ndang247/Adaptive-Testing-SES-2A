import React, { useEffect } from 'react';
import {
    Container, Typography, Paper, Table,
    TableContainer, TableHead, TableRow, TableCell,
    TableBody, TablePagination, TableFooter, Link,
    Skeleton
} from '@material-ui/core';
import { Link as RouterLink } from 'react-router-dom';
import useStyles from './examStyles';
import { DateTime } from 'luxon';
import { useSelector } from 'react-redux';
import { getExamsByCreator } from 'src/redux/actions/exams';
import { useDispatch } from 'react-redux';


const headCells = [
    { label: 'Exam ID' },
    { label: 'Exam Title' },
    { label: 'Creator' },
    { label: 'Subject' },
    { label: 'Created Date' },
    { label: 'Due Date' }
];

const Exams = () => {
    const classes = useStyles();
    const { exams, loading } = useSelector((state) => state.exams);
    const dispatch = useDispatch();
    const user = JSON.parse(localStorage.getItem('profile'));

    useEffect(() => {
        if (user?.id) dispatch(getExamsByCreator(user?.id));
    }, [user?.id]);

    const [page, setPage] = React.useState(0);
    const [rowsPerPage, setRowsPerPage] = React.useState(5);

    const handleChangePage = (event, newPage) => { setPage(newPage) };

    const handleChangeRowsPerPage = (event) => {
        setRowsPerPage(+event.target.value);
        setPage(0);
    };

    const getDateCreated = (dateCreated) => {
        const date = DateTime.fromISO(dateCreated).toLocal();
        return date.day + "-" + date.month + "-" + date.year + " at " + date.hour + ":" + date.minute + ":" + date.second;
    }

    // if (!exams.length && !loading) return 'No exams';

    return (
        <>
            <Container component="main" maxWidth='lg' className={classes.position}>
                <Paper className={classes.paperHead}>
                    <Typography variant="h3">Exams History</Typography>
                </Paper>
                {(!exams.length && !loading) ?
                    (<Typography className={classes.paperHead} variant="h3">No exams</Typography>)
                    : (<TableContainer component={Paper} className={classes.tableContainer}>
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
                                                <Link component={RouterLink} to={`/host/dashboard/exam/${exam._id}`} variant="h6" underline="hover">
                                                    {exam._id}
                                                </Link>
                                            </TableCell>
                                            <TableCell>{exam.title}</TableCell>
                                            <TableCell>{`${exam.creatorId?.firstName} ${exam.creatorId?.lastName}`}</TableCell>
                                            <TableCell>{exam.contentType}</TableCell>
                                            <TableCell>{getDateCreated(exam.dateCreated)}</TableCell>
                                            <TableCell>{getDateCreated(exam.expiryDate)}</TableCell>
                                        </TableRow>
                                    ))}
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

export default Exams;
