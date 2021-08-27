import { makeStyles } from '@material-ui/core/styles';

export default makeStyles((theme) => ({
    paperHead: {
        display: 'flex',
        flexDirection: 'column',
        alignItems: 'center',
        padding: theme.spacing(2),
        marginTop: theme.spacing(15),
        marginBottom: theme.spacing(4)
    },
    paperBody: {
        display: 'flex',
        flexDirection: 'column',
        alignItems: 'center',
        padding: theme.spacing(2),
    },
    taskBtn: {
        margin: theme.spacing(1, 0, 1),
    },
}));