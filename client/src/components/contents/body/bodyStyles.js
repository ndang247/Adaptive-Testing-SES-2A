import { makeStyles } from '@material-ui/styles';

export default makeStyles((theme) => ({
    card: {
        // height: '100%',
        // display: 'flex',
        // flexDirection: 'column',
        marginBottom: theme.spacing(5),
    },
    cardMedia: {
        paddingTop: '56.25%', // 16:9
    },
    cardContent: {
        flexGrow: 1,
    },
    media: {
        height: 350,
    },
}));