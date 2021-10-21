import { makeStyles } from '@material-ui/styles';
import about from 'src/assets/images/about.jpg';

export default makeStyles(() => ({
    root: {
        height: '100vh',
        backgroundImage: `url(${about})`,
        backgroundRepeat: 'no-repeat',
        backgroundSize: 'cover',
    },
}));