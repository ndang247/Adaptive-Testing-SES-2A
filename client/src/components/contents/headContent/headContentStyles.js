import { makeStyles } from '@material-ui/styles';

export default makeStyles((theme) => ({
    heroButtons: {
        marginTop: theme.spacing(4),
        position: 'relative',
    },
    root: {
        minWidth: 350,
    },
    title: {
        fontSize: 90,
        fontFamily: 'Pacifico, cursive',
        color: 'white',
    },
    pos: {
        marginBottom: 12,
    },
    blobMotion: {
        position: 'absolute',
        transform: 'translateY(-40%)',
        zIndex: 0,
    },
    blobContent: {
        zIndex: 1,
        position: 'relative'
    },
    joinBtn: {
        display: 'flex',
        justifyContent: 'center'
    }
}));