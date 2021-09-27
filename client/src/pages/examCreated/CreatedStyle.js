import { makeStyles } from '@material-ui/styles';

export default makeStyles((theme) => ({
    paperHead: {
        display: 'flex',
        flexDirection: 'column',
        alignItems: 'center',
        padding: theme.spacing(2),
        marginTop: theme.spacing(1),
        marginBottom: theme.spacing(4),
    },
    heroContent: {
        backgroundColor: "#778da9",
        padding: theme.spacing(10, 0, 6),
    },
    historyTable: {
        padding: 'normal',
        backgroundColor: "DD3A17",
    },
    table: {
        maxWidth: 1200,
    },
    tableContainer: {
        borderRadius: 15,
        margin: '10px, 10px',
        maxWidth: 1200,
        marginBottom: theme.spacing(6),
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