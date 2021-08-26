import { makeStyles } from '@material-ui/core/styles';

export default makeStyles((theme) => ({
    paper: {
        display: 'flex',
        flexDirection: 'column',
        alignItems: 'center',
        padding: theme.spacing(3),
        marginTop: theme.spacing(8),
        marginBottom: theme.spacing(5)
    },
    loginForm: {
        width: '100%',
        marginTop: theme.spacing(1),
    },
    submitBtn: {
        margin: theme.spacing(2, 0, 2),
        // can someone please change the color to green? I can't figure it out
    }
}));