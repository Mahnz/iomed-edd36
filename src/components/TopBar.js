import React, {useState} from 'react'
import {
    AppBar,
    Box,
    CssBaseline,
    Divider,
    Drawer,
    Toolbar,
    IconButton,
    Typography,
    List,
    ListItem,
    ListItemButton,
    ListItemText,
    Button
} from '@mui/material'
import {Menu as MenuIcon} from '@mui/icons-material'

export default function TopBar({handleSidebarToggle}) {
    return (
        <AppBar component="nav">
            <Toolbar>
                <IconButton
                    color="inherit"
                    aria-label="open drawer"
                    edge="start"
                    onClick={handleSidebarToggle}
                    sx={{mr: 2, display: {sm: 'none'}}}
                >
                    <MenuIcon/>
                </IconButton>
                <Typography
                    variant="h6"
                    component="div"
                    sx={{flexGrow: 1, display: {xs: 'none', sm: 'block'}}}
                >
                    MedPlatform
                </Typography>
                <Box sx={{display: {xs: 'none', sm: 'block'}}}>
                    <Button sx={{color: '#fff'}}>
                        Home
                    </Button>
                    <Button sx={{color: '#fff'}}>
                        Profile
                    </Button>
                </Box>
            </Toolbar>
        </AppBar>
    );
}