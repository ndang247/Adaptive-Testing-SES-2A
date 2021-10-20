import { makeStyles } from '@material-ui/styles';

export default makeStyles((theme) => ({
    heroButtons: {
        marginTop: theme.spacing(4),
        position: 'relative',
    },
    root: {
        minWidth: 200,
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
        transform: 'translateY(-65%)',
        zIndex: 0,
    },
    blobContent: {
        zIndex: 1,
        position: 'relative',
        marginTop: '50px'
    },
    joinBtn: {
        display: 'flex',
        justifyContent: 'center'
    }
}));