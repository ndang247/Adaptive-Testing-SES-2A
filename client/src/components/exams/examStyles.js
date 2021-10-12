import { makeStyles } from '@material-ui/styles';

export default makeStyles((theme) => ({
    position: {
        marginTop: theme.spacing(5),
    },
    paperHead: {
        display: 'flex',
        flexDirection: 'column',
        alignItems: 'center',
        padding: theme.spacing(2),
        marginBottom: theme.spacing(2),
    },
    historyTable: {
        padding: 'normal',
        backgroundColor: "DD3A17",
    },
    table: {
        maxWidth: 2000,
    },
    tableContainer: {
        borderRadius: 15,
        maxWidth: 2000,
    },
    tableHeaderCell: {
        fontWeight: 'bold',
        backgroundColor: theme.palette.common.black,
        color: theme.palette.common.white,
    },
    name: {
        fontWeight: 'bold',
    },
}));