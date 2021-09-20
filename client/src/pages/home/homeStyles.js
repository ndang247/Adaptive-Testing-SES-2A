import { makeStyles } from '@material-ui/styles';
import layeredWaves from 'src/assets/svg/layered-waves-haikei.svg';
import footerLayeredWaves from 'src/assets/svg/layered-waves-haikei-footer.svg';

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
        aspectRatio: '960/100',
        width: '100%',
        backgroundRepeat: 'no-repeat',
        backgroundSize: 'cover',
    },
    footerSpacer: {
        aspectRatio: '960/100',
        width: '100%',
        backgroundRepeat: 'no-repeat',
        backgroundSize: 'cover',
        backgroundPosition: 'center',
    },
    headLayer: {
        backgroundImage: `url(${layeredWaves})`,
    },
    flip: {
        transform: 'rotate(180deg)',
    },
    footerLayer: {
        backgroundImage: `url(${footerLayeredWaves})`,
    }
}));