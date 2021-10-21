import { CenterFocusStrong } from '@material-ui/icons';
import { makeStyles, withThemeCreator } from '@material-ui/styles';

export default makeStyles(() => ({
    root: {
        flexGrow: 1,
    },

    appBar: {
        background: '#1e364e',
        boxShadow: 'none',
    },

    image: {
        marginRight: '25px',
        height: '50px',
        display: 'block',
        fontSize: '0',
    },

    text: {
        lineHeight: '50px',
        height: '50px',
    },

    button: {
        lineHeight: '50px',
        height: '50px',
        color: 'white',
        fontSize: '25px',
        '&:hover': {
            backgroundColor: '#fff',
            color: '#3c52b2',
        }
    }
}));