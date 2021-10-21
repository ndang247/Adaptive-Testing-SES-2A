import { makeStyles } from '@material-ui/styles';

export default makeStyles(() => ({
    root: {
        minHeight: '100vh',
        display: 'flex',
        justifyContent: 'center',
        alignItems: 'center',
    },
    cardRoot: {
        maxWidth: 645,
        background: 'rgba(0,0,0,0.5)',
        margin: '20px',
    },
    media: {
        minHeight: 350,
        minWidth: '100%',
    },
    title: {
        fontFamily: 'Roboto',
        fontWeight: 'Bold',
        fontSize: '2.5em',
        color: '#FFF',
        justifyContent: 'center',
        textAlign: 'center',
    },
    role: {
        fontFamily: 'Roboto',
        fontSize: '1.75em',
        color: '#273469',
        textAlign: 'center',
    },
}));