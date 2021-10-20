import { makeStyles } from '@material-ui/styles';

export default makeStyles((theme) => ({
    root: {
        display: 'flex',
        justifyContent: 'center',
        alignItems: 'center',
        minHeight: '100vh',
    },
    container: {
        textAlign: 'center',
    },
    titleText: {
        fontFamily: 'Pacifico',
        color: '#ADBDFF',
        fontSize: "3.5em",
        marginTop: '6vh',
    },
    shiftDown: {
        color: "#E0E1DD",
        fontSize: "4em",
    }
}));