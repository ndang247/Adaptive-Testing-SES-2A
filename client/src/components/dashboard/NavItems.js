import { NavLink as RouterLink, matchPath, useHistory } from 'react-router-dom';
import PropTypes from 'prop-types';
import { Button, ListItem } from '@material-ui/core';

const NavItems = ({ href, icon: Icon, title, ...rest }) => {
    const history = useHistory();

    const active = href ? !!matchPath({
        path: href,
        end: false
    }, history.location.pathname) : false;

    return (
        <ListItem
            disableGutters
            sx={{ display: 'flex', py: 0 }}
            {...rest}
        >
            <Button
                component={RouterLink}
                sx={{
                    color: 'text.secondary',
                    fontWeight: 'medium',
                    justifyContent: 'flex-start',
                    letterSpacing: 0,
                    py: 1.25,
                    textTransform: 'none',
                    width: '100%',
                    ...(active && { color: 'primary.main' }),
                    '& svg': { mr: 1 }
                }}
                to={href}
            >
                {Icon && (<Icon size="20" />)}
                <span>{title}</span>
            </Button>
        </ListItem>
    );
}

NavItems.propTypes = {
    href: PropTypes.string,
    icon: PropTypes.elementType,
    title: PropTypes.string
}

export default NavItems;