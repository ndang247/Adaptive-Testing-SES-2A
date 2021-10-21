import { makeStyles } from '@material-ui/styles';
import layeredWaves from 'src/assets/svg/layered-waves-haikei-header.svg';
import footerLayeredWaves from 'src/assets/svg/layered-waves-haikei-footer.svg';
import { height } from '@material-ui/system';

export default makeStyles((theme) => ({
    icon: {
        marginRight: theme.spacing(2),
    },
    heroContent: {
        backgroundColor: "#778da9",
        padding: theme.spacing(8, 0, 6),
    },
    cardGrid: {
        paddingTop: theme.spacing(8),
        paddingBottom: theme.spacing(8),
    },
    headSpacer: {
        aspectRatio: '960/480',
        width: '100%',
        backgroundRepeat: 'no-repeat',
        backgroundSize: 'cover',
        backgroundPosition: 'center',
    },
    footerSpacer: {
        aspectRatio: '960/480',
        width: '100%',
        backgroundRepeat: 'no-repeat',
        backgroundSize: 'cover',
        backgroundPosition: 'center',
    },
    headLayer: {
        backgroundImage: `url(${layeredWaves})`,
        position: 'sticky',
        zIndex: '-1',
    },
    flip: {
        transform: 'rotate(180deg)',
    },
    footerLayer: {
        backgroundImage: `url(${footerLayeredWaves})`,
        marginTop: '-30%'
    }
}));