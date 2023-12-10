// Sidebar.js
import React from 'react';
import {Drawer, IconButton, List, ListItem, ListItemIcon, ListItemText, Toolbar, Typography} from '@mui/material';
import {
    People as PeopleIcon,
    Dashboard as DashboardIcon,
    ChevronLeft as ChevronLeftIcon,
    ChevronRight as ChevronRightIcon
} from '@mui/icons-material';


export default function Sidebar({isSidebarOpen, handleDrawerToggle}) {
    const drawerWidth = 240;
    return (
        <Drawer
            variant="permanent"
            open={isSidebarOpen}
            onClose={handleDrawerToggle}
            sx={{
                width: drawerWidth,
                flexShrink: 0,
                '& .MuiDrawer-paper': {
                    width: drawerWidth,
                    boxSizing: 'border-box',
                    transition: 'width 0.2s ease',
                    overflowX: 'hidden',
                },
            }}
        >
            <Toolbar>
                <IconButton
                    onClick={handleDrawerToggle}
                    sx={{
                        marginLeft: isSidebarOpen ? 'auto' : 0,
                        display: isSidebarOpen ? 'none' : 'inherit',
                    }}
                >
                    {isSidebarOpen ? <ChevronLeftIcon/> : <ChevronRightIcon/>}
                </IconButton>
            </Toolbar>
            <div sx={{overflow: 'auto'}}>
                <List>
                    <ListItem>
                        <ListItemIcon>
                            <DashboardIcon/>
                        </ListItemIcon>
                        <ListItemText primary="Dashboard"/>
                    </ListItem>
                    <ListItem>
                        <ListItemIcon>
                            <PeopleIcon/>
                        </ListItemIcon>
                        <ListItemText primary="Users"/>
                    </ListItem>
                    {/* Aggiungi altre voci della sidebar secondo necessità */}
                </List>
            </div>
        </Drawer>
    );
}