import { makeStyles } from '@material-ui/styles';

export default makeStyles((theme) => ({
    position: {
        marginTop: theme.spacing(5),
    },
    paperBody: {
        display: 'flex',
        flexDirection: 'column',
        alignItems: 'center',
        padding: theme.spacing(5),
    },
    paperBody2: {
        display: 'felx',
        flexDirection: 'column',
        alignItems: 'center',
        marginTop: theme.spacing[10],
        padding: theme.spacing(4),
       
    },
    historyBtn: {
        marginTop: theme.spacing(5),
    },
    dashboardBtn: {
        marginTop: theme.spacing[15],
    },
}));