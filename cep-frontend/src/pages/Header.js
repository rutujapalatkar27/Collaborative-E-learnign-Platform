import React from 'react';
import { styled } from '@mui/system';
import AppBar from '@mui/material/AppBar';
import Toolbar from '@mui/material/Toolbar';
import Typography from '@mui/material/Typography';
import Button from '@mui/material/Button';
import { useNavigate } from 'react-router-dom';

const useStyles = styled((theme) => ({
    root: {
        backgroundColor: '#3f51b5',
        minHeight: 56,
    },
    toolbar: {
        flexGrow: 1,
    },
    logoutButton: {
        color: 'white',
    },
}));

function Header() {
    const classes = useStyles();
    const reactNavigator = useNavigate();

    function handleLogoutClick() {
        localStorage.clear();
        localStorage.removeItem('email');
        localStorage.removeItem('username');
        localStorage.removeItem('type');
        reactNavigator('/signin');
    }

    return (
        <AppBar position="static" className={classes.root}>
            <Toolbar className={classes.toolbar}>
                <Typography variant="h6" sx={{ flexGrow: 1 }}>
                    Collaborative E-Learning Platform
                </Typography>
                <Button color="inherit" onClick={handleLogoutClick} className={classes.logoutButton}>
                    Logout
                </Button>
            </Toolbar>
        </AppBar>
    );
}

export default Header;