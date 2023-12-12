// Dashboard.js
import React, {useState, useEffect} from 'react'
import {
    styled,
    createTheme,
    ThemeProvider,
    CssBaseline,
    Box,
    Drawer as MuiDrawer,
    AppBar as MuiAppBar,
    Toolbar,
    List,
    Typography,
    Divider,
    IconButton,
    Badge,
    Container,
    ListItemButton, ListItemIcon, ListItemText, ListSubheader
} from '@mui/material'

import {
    Menu,
    ChevronLeft,
    Notifications,
    Assignment,
    Healing,
    Person,
    Home,
    Settings,
    AccountCircleRounded
} from '@mui/icons-material'
import VisiteMediche from '../components/VisiteMediche.js'
import HomeContent from "../components/HomeContent.js";
import MyProfile from "../components/MyProfile.js";
import NotificationsPanel from "../components/NotificationsPanel.js";

const drawerWidth = 240

const AppBar = styled(MuiAppBar, {shouldForwardProp: (prop) => prop !== 'open',})
(({theme, open}) => ({
    zIndex: theme.zIndex.drawer + 1,
    transition: theme.transitions.create(['width', 'margin'], {
        easing: theme.transitions.easing.sharp,
        duration: theme.transitions.duration.leavingScreen,
    }),
    ...(open && {
        marginLeft: drawerWidth,
        width: `calc(100% - ${drawerWidth}px)`,
        transition: theme.transitions.create(['width', 'margin'], {
            easing: theme.transitions.easing.sharp,
            duration: theme.transitions.duration.enteringScreen,
        }),
    }),
}))

const Drawer = styled(MuiDrawer, {shouldForwardProp: (prop) => prop !== 'open'})(
    ({theme, open}) => ({
        '& .MuiDrawer-paper': {
            position: 'relative',
            whiteSpace: 'nowrap',
            width: drawerWidth,
            transition: theme.transitions.create('width', {
                easing: theme.transitions.easing.sharp,
                duration: theme.transitions.duration.enteringScreen,
            }),
            boxSizing: 'border-box',
            ...(!open && {
                overflowX: 'hidden',
                transition: theme.transitions.create('width', {
                    easing: theme.transitions.easing.sharp,
                    duration: theme.transitions.duration.leavingScreen,
                }),
                width: theme.spacing(7),
                [theme.breakpoints.up('sm')]: {
                    width: theme.spacing(9),
                },
            }),
        },
    }),
)

export default function Dashboard() {
    const [open, setOpen] = React.useState(false)
    const [selectedTab, setSelectedTab] = useState("H")
    const [pageTitle, setPageTitle] = useState("Benvenuto, NomeUtente")
    const [openNotifications, setOpenNotifications] = useState(false);


    const toggleDrawer = () => {
        setOpen(!open)
    }

    const handleSelectTab = (value) => {
        setSelectedTab(value)
    }
    const handleCloseNotifications = () => {
        setOpenNotifications(!openNotifications)
    }

    useEffect(() => {
        if (selectedTab === "H") {
            document.title = 'MedPlatform - Home';
            setPageTitle("Benvenuto, NomeUtente")
        } else if (selectedTab === "V") {
            document.title = 'MedPlatform - Ultime visite';
            setPageTitle("Le tue ultime visite")
        } else if (selectedTab === "P") {
            document.title = 'MedPlatform - Il mio profilo';
            setPageTitle("Il tuo profilo")
        } else if (selectedTab === "S") {
            document.title = 'MedPlatform - Impostazioni';
            setPageTitle("Impostazioni")
        }
    }, [selectedTab])

    return (
        // <ThemeProvider theme={defaultTheme}>
        <Box sx={{display: 'flex'}}>
            <CssBaseline/>
            <AppBar position="absolute" open={open}>
                <Toolbar
                    sx={{
                        pr: '24px', // keep right padding when drawer closed
                    }}
                >
                    <IconButton
                        edge="start"
                        color="inherit"
                        aria-label="open drawer"
                        onClick={toggleDrawer}
                        sx={{
                            marginRight: '36px',
                            ...(open && {display: 'none'}),
                        }}
                    >
                        <Menu/>
                    </IconButton>
                    <Typography
                        component="h1"
                        variant="h6"
                        color="inherit"
                        noWrap
                        sx={{flexGrow: 1}}
                    >
                        MedPlatform
                    </Typography>
                    <IconButton color="inherit" onClick={handleCloseNotifications}>
                        <Badge badgeContent={4} color="secondary">
                            <Notifications/>
                        </Badge>
                    </IconButton>
                    <IconButton color="inherit">
                        <Badge color="secondary">
                            <AccountCircleRounded/>
                        </Badge>
                    </IconButton>
                </Toolbar>
                <NotificationsPanel
                    open={openNotifications}
                    onClose={handleCloseNotifications}
                />
            </AppBar>

            <Drawer variant="permanent" open={open}>
                <Toolbar
                    sx={{
                        display: 'flex',
                        alignItems: 'center',
                        justifyContent: 'flex-end',
                        px: [1],
                    }}
                >
                    <IconButton onClick={toggleDrawer}>
                        <ChevronLeft/>
                    </IconButton>
                </Toolbar>
                <Divider/>
                <List component="nav">
                    {/*  Qui aggiungere tutte le voci necessarie alla Sidebar */}
                    <ListItemButton onClick={() => handleSelectTab("H")}>
                        <ListItemIcon>
                            <Home/>
                        </ListItemIcon>
                        <ListItemText primary="Home"/>
                    </ListItemButton>
                    <ListItemButton onClick={() => handleSelectTab("V")}>
                        <ListItemIcon>
                            <Healing/>
                        </ListItemIcon>
                        <ListItemText primary="Visite mediche"/>
                    </ListItemButton>
                    <ListItemButton onClick={() => handleSelectTab("P")}>
                        <ListItemIcon>
                            <Person/>
                        </ListItemIcon>
                        <ListItemText primary="Il mio profilo"/>
                    </ListItemButton>
                    <ListItemButton onClick={() => handleSelectTab("S")}>
                        <ListItemIcon>
                            <Settings/>
                        </ListItemIcon>
                        <ListItemText primary="Impostazioni"/>
                    </ListItemButton>

                    <Divider sx={{my: 1}}/>

                    {/* Qui è possibile aggiungere le voci di un menù secondario (idea: visite dell'ultimo anno, mese, settimana */}
                    <ListSubheader component="div" inset>
                        Saved reports
                    </ListSubheader>
                    <ListItemButton>
                        <ListItemIcon>
                            <Assignment/>
                        </ListItemIcon>
                        <ListItemText primary="Ultimo mese"/>
                    </ListItemButton>
                    <ListItemButton>
                        <ListItemIcon>
                            <Assignment/>
                        </ListItemIcon>
                        <ListItemText primary="Ultimo anno"/>
                    </ListItemButton>
                </List>
            </Drawer>
            <Box
                component="main"
                sx={{
                    backgroundColor: (theme) =>
                        theme.palette.mode === 'light'
                            ? theme.palette.grey[100]
                            : theme.palette.grey[900],
                    flexGrow: 1,
                    height: '100vh',
                    overflow: 'auto',
                }}
            >
                <Toolbar/>
                <Container maxWidth="lg" sx={{mt: 4, mb: 4}}>
                    <Typography variant="h4" mb={4}>
                        {pageTitle}
                    </Typography>
                    {selectedTab === "H" &&
                        <HomeContent handleSelectTab={handleSelectTab}/>
                    }
                    {selectedTab === "P" &&
                        <>
                            <MyProfile/>
                        </>

                    }
                    {selectedTab === "V" &&
                        <VisiteMediche/>
                    }
                </Container>
            </Box>
        </Box>
    )
}