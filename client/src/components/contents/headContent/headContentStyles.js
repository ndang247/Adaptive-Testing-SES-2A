import { makeStyles } from '@material-ui/core/styles';

export default makeStyles((theme) => ({
    heroButtons: {
        marginTop: theme.spacing(4),
        position: 'relative',
    },
    root: {
        minWidth: 350,
    },
    title: {
        fontSize: 14,
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
}));