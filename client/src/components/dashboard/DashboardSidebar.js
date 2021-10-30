import React, { useEffect } from 'react';
import { Link as RouterLink, useHistory } from 'react-router-dom';
import PropTypes from 'prop-types';
import {
    Avatar, Box, Divider, Drawer,
    Hidden, List, Typography
} from '@material-ui/core';
import {
    BarChart as BarChartIcon, Settings as SettingsIcon, User as UserIcon, PlusCircle as PlusCircleIcon,
    LogIn as LogInIcon, List as ListIcon, HelpCircle as HelpCircleIcon
} from 'react-feather';
import { NavItems } from 'src/components';
import { Host } from 'src/constants/role';
import { getUserById } from 'src/redux/actions/users';
import { useDispatch, useSelector } from 'react-redux';

const hostItems = [
    {
        href: '/host/dashboard',
        icon: BarChartIcon,
        title: 'Dashboard'
    },
    {
        href: '/host/dashboard/exam/create',
        icon: PlusCircleIcon,
        title: 'Create Exam'
    },
    {
        href: '/host/dashboard/exam/history',
        icon: ListIcon,
        title: 'Exams'
    },
    {
        href: '/host/dashboard/account',
        icon: UserIcon,
        title: 'Account'
    },
    {
        href: '/host/dashboard/settings',
        icon: SettingsIcon,
        title: 'Settings'
    },
]

const userItems = [
    {
        href: '/user/dashboard',
        icon: BarChartIcon,
        title: 'Dashboard'
    },
    {
        href: '/user/dashboard/exam/joinexam',
        icon: LogInIcon,
        title: 'Join Exam'
    },
    {
        href: '/user/dashboard/exam/history',
        icon: ListIcon,
        title: 'Exam History'
    },
    {
        href: '/user/dashboard/query',
        icon: HelpCircleIcon,
        title: 'Query'
    },
    {
        href: '/user/dashboard/account',
        icon: UserIcon,
        title: 'Account'
    },
    {
        href: '/user/dashboard/settings',
        icon: SettingsIcon,
        title: 'Settings'
    },
]

const DashboardSidebar = ({ onMobileClose, openMobile }) => {
    const history = useHistory();
    const user = JSON.parse(localStorage.getItem('profile'));
    const { userData } = useSelector((state) => state.users);
    const dispatch = useDispatch();

    useEffect(() => {
        if (openMobile && onMobileClose) onMobileClose();
        if (!userData) dispatch(getUserById(user.id));
    }, [history.location.pathname]);

    const Content = (
        <Box sx={{ display: 'flex', flexDirection: 'column', height: '100%' }}>
            <Box sx={{ alignItems: 'center', display: 'flex', flexDirection: 'column', p: 2 }}>
                <Avatar
                    component={RouterLink}
                    src={userData?.avatar ? userData?.avatar : ""}
                    sx={{ cursor: 'pointer', width: 64, height: 64 }}
                    to="/host/dashboard/account"
                />
                <Typography color="textPrimary" variant="h5">{`${user.firstName} ${user.lastName}`}</Typography>
                <Typography color="textSecondary" variant="body2">{user.role}</Typography>
            </Box>
            <Divider />
            <Box sx={{ p: 2 }}>
                <List>
                    {user.role === Host ?
                        hostItems.map((item) => (
                            <NavItems
                                href={item.href}
                                key={item.title}
                                title={item.title}
                                icon={item.icon}
                            />)) :
                        userItems.map((item) => (
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
            <Hidden lgDown>
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
