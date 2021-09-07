import { makeStyles } from '@material-ui/styles';

export default makeStyles((theme) => ({
    root:{
        flexGrow: 1,
    },

    paper:{
        display: 'flex',
        flexWrap: 'wrap',
        flexDirection: 'column',
        alignItems: 'center',
        '& > *': {
        margin: theme.spacing(1),
        width: theme.spacing(150),
        height: theme.spacing(60),
        borderRadius: 25,
        },
    },

    answer:{
        display: 'flex',
        flexWrap: 'wrap',
        flexDirection: 'column',
        alignItems: 'center',
        '& > *': {
        margin: theme.spacing(1),
        width: theme.spacing(150),
        height: theme.spacing(40),
        borderRadius: 25,
        },
    },

}));