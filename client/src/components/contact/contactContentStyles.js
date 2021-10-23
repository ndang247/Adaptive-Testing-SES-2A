import { makeStyles } from '@material-ui/styles';

export default makeStyles((theme) => ({
    root: {
        minHeight: '10vh',
        display: 'flex',
        justifyContent: 'center',
        alignItems: 'center',
        padding: theme.spacing(5),
    },
    card: {
        minWidth: 750,
        display: 'flex',
        flexDirection: 'column',
        alignItems: 'center',
        padding: theme.spacing(3),
        marginBottom: theme.spacing(2),
        backgroundColor: "#778da9",
    },
    text: {
        fontSize: 20,
    }
}));