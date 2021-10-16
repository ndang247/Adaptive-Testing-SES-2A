import { CenterFocusStrong } from '@material-ui/icons';
import { makeStyles, withThemeCreator } from '@material-ui/styles';

export default makeStyles(() => ({
    root: {
        flexGrow: 1,
    },
    
    appBar: {
        background: 'black',
        boxShadow: 'none',
    },

    color: {
        border: '1px solid white',
        textAlign: 'center',
    },

    image: {
        marginRight: '20px',
        height: '50px',
        display: 'block',
        fontSize: '0',
    },

    text: {
        lineHeight: '50px',
        height: '50px',
    }
}));