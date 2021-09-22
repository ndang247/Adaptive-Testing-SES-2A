import { makeStyles } from '@material-ui/styles';

export default makeStyles((theme) => ({
    paperBody: {
        display: 'flex',
        flexDirection: 'column',
        alignItems: 'center',
        padding: theme.spacing(5),
    },
    submitBtn: {
        marginTop: theme.spacing(2),
    },
}));