import React, { useEffect } from 'react';
import { Link as RouterLink, useHistory } from 'react-router-dom';
import PropTypes from 'prop-types';
import {
    Avatar, Box, Divider, Drawer,
    Hidden, List, Typography
} from '@material-ui/core';
import {
    BarChart as BarChartIcon, Settings as SettingsIcon, User as UserIcon
} from 'react-feather';
import { NavItems } from 'src/components';

// Dummy user
const user = {
    avatar: '/static/images/avatars/avatar_6.png',
    occupation: 'Senior Developer',
    name: 'Katarina Smith'
}

const items = [
    {
        href: '/host/dashboard/home',
        icon: BarChartIcon,
        title: 'Dashboard'
    },
    {
        href: '/host/dashboard/account',
        icon: UserIcon,
        title: 'Account'
    },
    {
        href: '/host/dashboard/setting',
        icon: SettingsIcon,
        title: 'Settings'
    },
]

const DashboardSidebar = ({ onMobileClose, openMobile }) => {
    const history = useHistory();

    useEffect(() => {
        if (openMobile && onMobileClose) onMobileClose();
    }, [history.location.pathname]);

    const Content = (
        <Box sx={{ display: 'flex', flexDirection: 'column', height: '100%' }}>
            <Box sx={{ alignItems: 'center', display: 'flex', flexDirection: 'column', p: 2 }}>
                <Avatar
                    component={RouterLink}
                    src={user.avatar}
                    sx={{ cursor: 'pointer', width: 64, height: 64 }}
                    to="/host/dashboard/account"
                />
                <Typography color="textPrimary" variant="h5">{user.name}</Typography>
                <Typography color="textSecondary" variant="body2">{user.occupation}</Typography>
            </Box>
            <Divider />
            <Box sx={{ p: 2 }}>
                <List>
                    {items.map((item) => (
                        <NavItems
                            href={item.href}
                            key={item.title}
                            title={item.title}
                            icon={item.icon}
                        />))}
                </List>
            </Box>
        </Box>
    );

    return (
        <>
            <Hidden lgUp>
                <Drawer
                    anchor="left"
                    onClose={onMobileClose}
                    open={openMobile}
                    variant="temporary"
                    PaperProps={{ sx: { width: 256 } }}>
                    {Content}
                </Drawer>
            </Hidden>
            <Hidden xlDown>
                <Drawer
                    anchor="left"
                    open
                    variant="persistent"
                    PaperProps={{ sx: { width: 256, top: 64, height: 'calc(100% - 64px)' } }}>
                    {Content}
                </Drawer>
            </Hidden>
        </>
    );
}

DashboardSidebar.propTypes = {
    onMobileClose: PropTypes.func,
    openMobile: PropTypes.bool
}

DashboardSidebar.defaultProps = {
    onMobileClose: () => { },
    openMobile: false
}

export default DashboardSidebar;
