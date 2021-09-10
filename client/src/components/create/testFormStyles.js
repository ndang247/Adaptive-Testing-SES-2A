import { makeStyles } from '@material-ui/styles';

export default makeStyles((theme) => ({
    position: {
        marginTop: theme.spacing(10),
    },
    paperHead: {
        display: 'flex',
        flexDirection: 'column',
        alignItems: 'center',
        padding: theme.spacing(2),
        marginBottom: theme.spacing(2),
    },
    paperBody: {
        display: 'flex',
        flexDirection: 'column',
        alignItems: 'center',
        padding: theme.spacing(2),
        marginBottom: theme.spacing(2),
    },
    testForm: {
        marginTop: theme.spacing(1),
    },
    table: {
        maxWidth: 1500,
    },
    tableContainer: {
        margin: '10px, 10px'
    },
    tableHeader: {
        fontWeight: 'bold',
        backgroundColor: theme.palette.primary.light,
        color: theme.palette.common.white,
    },
    submitBtn: {
        backgroundColor: 'green',
        margin: theme.spacing(2, 0, 2),
    },
    saveBtn: {
        margin: theme.spacing(2, 0, 2),
    },
}));