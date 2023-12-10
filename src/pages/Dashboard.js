// Dashboard.js
import React, {useState} from 'react'
import Sidebar from '../components/Sidebar.js'
import TopBar from '../components/TopBar.js'
import {Box, Toolbar, Typography} from '@mui/material'

export default function Dashboard() {
    const [isSidebarOpen, setSidebarOpen] = useState(false)

    const handleDrawerToggle = () => {
        setSidebarOpen(!isSidebarOpen)
    }

    return (
        <Box sx={{display: 'flex'}}>
            <TopBar
                isOpen={isSidebarOpen}
                handleDrawerToggle={handleDrawerToggle}
            />
            <Sidebar
                isSidebarOpen={isSidebarOpen}
                handleDrawerToggle={handleDrawerToggle}
            />
            <Box
                component="main"
                sx={{
                    flexGrow: 1,
                    p: 3,
                    transition: 'margin-left 0.3s ease',
                    marginLeft: isSidebarOpen ? 240 : 0,
                }}
            >
                <Toolbar/>
                <Typography>
                    Contenuto della pagina
                </Typography>
            </Box>
        </Box>
    )
}