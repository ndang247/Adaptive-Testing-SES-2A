import { makeStyles } from '@material-ui/styles';

export default makeStyles((theme) => ({
    paper: {
        display: 'flex',
        flexDirection: 'column',
        alignItems: 'center',
        padding: theme.spacing(2),
    },
    paperHead: {
        display: 'flex',
        flexDirection: 'column',
        alignItems: 'center',
        padding: theme.spacing(2),
        marginBottom: theme.spacing(2),
    },
    questionForm: {
        marginTop: theme.spacing(1),
    },
    submitBtn: {
        margin: theme.spacing(2, 0, 2),
    },
    input: {
        width: 38,
    }
}));