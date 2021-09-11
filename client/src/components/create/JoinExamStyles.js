import { makeStyles } from '@material-ui/styles';

export default makeStyles((theme) => ({
    paperBody: {
        display: 'flex',
        flexDirection: 'column',
        alignItems: 'center',
        marginTop: theme.spacing(30),
        padding: theme.spacing(5),
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