// Dashboard.js
import React, {useState, useEffect, useMemo} from 'react'
import {
    styled,
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
    ListItemButton, ListItemIcon, ListItemText, ListSubheader,
    Tooltip, useMediaQuery, createTheme, ThemeProvider
} from '@mui/material'

import {
    Menu as MenuIcon,
    ChevronLeft,
    Healing,
    Person,
    Home,
    PersonAddAlt1,
    Brightness7, Brightness4
} from '@mui/icons-material'
import {FontAwesomeIcon} from "@fortawesome/react-fontawesome"
import {faBell, faCircleUser} from "@fortawesome/free-solid-svg-icons"

import ElencoVisite from '../components/ElencoVisite.js'
import HomeContent from "../components/HomeContent.js"
import MyProfile from "../components/MyProfile.js"
import NotificationsPanel from "../components/NotificationsPanel.js"
import UserIconPanel from "../components/UserIconPanel.js"

import Cookies from 'universal-cookie'
import "../style/dashboard.css"
import {Navigate, Route, Routes, useNavigate} from "react-router-dom"
import VisitaMedica from "../components/VisitaMedica.js"
import InserimentoVisitaMedica from "../components/InserimentoVisitaMedica.js"

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
    })
)

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
    }),)

export default function Dashboard() {
    const prefersDarkMode = useMediaQuery('(prefers-color-scheme: dark)');

    const theme = useMemo(
        () =>
            createTheme({
                palette: {
                    mode: prefersDarkMode ? 'dark' : 'light',
                }
            }),
        [prefersDarkMode],
    );

    // ? GESTIONE DELLA APERTURA/CHIUSURA DELLA SIDEBAR
    const [openDrawer, setOpenDrawer] = useState(false)
    const toggleDrawer = () => {
        setOpenDrawer(!openDrawer)
    }

    /* TODO - Verifica dinamica del cookie: se non è settato, l'utente viene rimandato alla pagina di login altrimenti,
              continua la propria navigazione nella dashboard*/
    const [loggedUser, setLoggedUser] = useState("test")
    const cookies = new Cookies()
    const navigate = useNavigate()
    // useEffect(() => {
    //     let loggedUsername = cookies.get("email")
    //     if (!loggedUsername) {
    //         console.log("Login non effettuato. Reindirizzamento...")
    //         navigate("/login")
    //         return
    //     } else {
    //         setLoggedUser(loggedUsername)
    //     }
    //     init(loggedUsername).then(() => console.log("Inizializzazione effettuata"))
    // }, [])
    const handleLogout = () => {
        // cookies.remove(["email", "password"])
        navigate("/homepage")
    }

    // ? GESTIONE DELLE TAB
    const [selectedTab, setSelectedTab] = useState("")
    const [selectedVisita, setSelectedVisita] = useState("")
    const handleSelectTab = (value) => {
        setSelectedTab(value)
    }
    useEffect(() => {
        if (selectedTab === "H") {
            document.title = 'MedPlatform - Home'
            navigate('/dashboard/home')
        } else if (selectedTab === "V") {
            document.title = 'MedPlatform - Ultime visite'
            navigate('/dashboard/visite')
            setSelectedVisita("")
        } else if (selectedTab === "P") {
            document.title = 'MedPlatform - Il mio profilo'
            navigate('/dashboard/profilo')
        } else if (selectedTab === "I") {
            document.title = 'MedPlatform - Nuova visita'
            navigate('/dashboard/inserimentoVisita')
        } else if (selectedTab === "S") {
            document.title = 'MedPlatform - Impostazioni'
            navigate('/dashboard/settings')
        }
    }, [selectedTab])


    // ? GESTIONE DEL PANNELLO A DISCESA DELLE NOTIFICHE
    const [anchorNtf, setAnchorNtf] = React.useState(null)
    const openNtfPanel = Boolean(anchorNtf)
    const handleClickNtfPanel = (event) => {
        setAnchorNtf(event.currentTarget)
    }
    const handleCloseNtfPanel = () => {
        setAnchorNtf(null)
    }
    const [notifArray, setNotifArray] = useState([
        {
            id: 0,
            type: 'Nuovo referto aggiunto',
            message: 'È stato caricato un nuovo file di referto. Clicca per visualizzarlo.'
        },
        {
            id: 1,
            type: 'Richiesta autorizzazione',
            message: 'Richiesta di accesso ai dati: Medico COGNOME_Nome'
        }])
    const deleteNotification = (id) => {
        setNotifArray(notifArray.filter((ntf) => ntf.id !== id))
    }
    const deleteAllNotifications = () => {
        setNotifArray([])
    }


    // ? GESTIONE DELLE PANNELLO A DISCESA DELL'UTENTE
    const [anchorUser, setAnchorUser] = useState(null)
    const openUserPanel = Boolean(anchorUser)
    const handleClickUserPanel = (event) => {
        setAnchorUser(event.currentTarget)
    }
    const handleCloseUserPanel = () => {
        setAnchorUser(null)
    }

    return (
        <ThemeProvider theme={theme}>
            <Box sx={{display: 'flex'}}>
                <CssBaseline/>
                <AppBar position="absolute" open={openDrawer}>
                    <Toolbar
                        sx={{
                            pr: '24px',
                        }}
                    >
                        <IconButton
                            edge="start"
                            color="inherit"
                            aria-label="open drawer"
                            onClick={toggleDrawer}
                            sx={{
                                marginRight: '36px',
                                ...(openDrawer && {display: 'none'}),
                            }}
                        >
                            <MenuIcon/>
                        </IconButton>
                        <Typography
                            component="h1"
                            variant="h5"
                            color="inherit"
                            noWrap
                            sx={{flexGrow: 1}}
                        >
                            MedPlatform
                        </Typography>

                        {/* PANNELLO A DISCESA SULL'ICONA DELLE NOTIFICHE */}
                        <Tooltip title={
                            notifArray.length === 0
                                ? 'Nessuna notifica'
                                : notifArray.length === 1 ? `Hai ${notifArray.length} nuova notifica!` : `Hai ${notifArray.length} nuove notifiche!`
                        }>
                            <IconButton
                                id="notification-button"
                                color="inherit"
                                aria-controls={openNtfPanel ? 'notification-panel' : undefined}
                                aria-haspopup="true"
                                aria-expanded={openNtfPanel ? 'true' : undefined}
                                onClick={handleClickNtfPanel}
                            >
                                <Badge badgeContent={notifArray.length} color="secondary">
                                    <FontAwesomeIcon icon={faBell} style={{color: "#ffffff",}}
                                                     shake={notifArray.length > 0}/>
                                </Badge>
                            </IconButton>
                        </Tooltip>
                        <NotificationsPanel
                            anchorEl={anchorNtf}
                            openPanel={openNtfPanel}
                            handleClose={handleCloseNtfPanel}
                            notifArray={notifArray}
                            deleteNotification={deleteNotification}
                            deleteAllNotifications={deleteAllNotifications}
                        />

                        {/* PANNELLO A DISCESA SULL'ICONA DELL'UTENTE */}
                        <Tooltip title="Azioni sul profilo">
                            <IconButton
                                id="user-icon-button"
                                color="inherit"
                                aria-controls={openUserPanel ? 'user-icon-panel' : undefined}
                                aria-haspopup="true"
                                aria-expanded={openUserPanel ? 'true' : undefined}
                                onClick={handleClickUserPanel}
                                sx={{ml: 1}}
                            >
                                <Badge color="secondary">
                                    <FontAwesomeIcon icon={faCircleUser} style={{color: "#ffffff",}}/>
                                </Badge>
                            </IconButton>
                        </Tooltip>
                        <UserIconPanel
                            anchorEl={anchorUser}
                            openPanel={openUserPanel}
                            handleClose={handleCloseUserPanel}
                            setSelectedTab={setSelectedTab}
                            setLoggedUser={setLoggedUser}
                        />

                        {/* PULSANTE PER SWITCHARE TRA LIGHT E DARK MODE */}
                        <Tooltip title="Passa alla modalità chiara"
                        //     title={{theme.palette.mode === 'dark'
                        //     ? "Passa alla modalità scura"
                        //     : "Passa alla modalità chiara"
                        // }}
                        >
                            < IconButton
                                id="mode-button"
                                color="inherit"
                                // onClick={toggleDarkMode}
                                sx={{ml: 1}}
                            >
                                <Badge color="secondary">
                                    {theme.palette.mode === 'dark' ? <Brightness7/> : <Brightness4/>}
                                </Badge>
                            </IconButton>
                        </Tooltip>
                    </Toolbar>
                </AppBar>

                <Drawer variant="permanent" open={openDrawer}>
                    <Toolbar sx={{
                        display: 'flex',
                        alignItems: 'center',
                        justifyContent: 'flex-end',
                        px: [1],
                    }}>
                        <IconButton onClick={toggleDrawer}>
                            <ChevronLeft/>
                        </IconButton>
                    </Toolbar>

                    <Divider/>

                    <List component="nav">
                        <ListItemButton
                            onClick={() => handleSelectTab("H")}
                            className={selectedTab === 'H' ? 'selected-tab' : ''}>
                            <ListItemIcon>
                                <Home/>
                            </ListItemIcon>
                            <ListItemText primary="Home"/>
                        </ListItemButton>
                        <ListItemButton
                            onClick={() => handleSelectTab('V')}
                            className={selectedTab === 'V' ? 'selected-tab' : ''}>
                            <ListItemIcon>
                                <Healing/>
                            </ListItemIcon>
                            <ListItemText primary="Visite mediche"/>
                        </ListItemButton>
                        <ListItemButton
                            onClick={() => handleSelectTab('P')}
                            className={selectedTab === 'P' ? 'selected-tab' : ''}>
                            <ListItemIcon>
                                <Person/>
                            </ListItemIcon>
                            <ListItemText primary="Il mio profilo"/>
                        </ListItemButton>
                        <ListItemButton
                            onClick={() => handleSelectTab('I')}
                            className={selectedTab === 'I' ? 'selected-tab' : ''}>
                            <ListItemIcon>
                                <PersonAddAlt1/>
                            </ListItemIcon>
                            <ListItemText primary="Inserimento visita"/>
                        </ListItemButton>

                        <Divider sx={{my: 1}}/>

                        {/* Qui è possibile aggiungere le voci di un menù secondario (idea: visite dell'ultimo anno, mese, settimana */}
                        <ListSubheader component="div" inset>
                            Saved reports
                        </ListSubheader>
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
                        <Routes>
                            <Route index
                                   element={<HomeContent handleSelectTab={handleSelectTab}/>}/>
                            <Route path="/home" element={<HomeContent handleSelectTab={handleSelectTab}/>}/>
                            <Route path="/visite" element={<ElencoVisite setVisita={setSelectedVisita}/>}/>
                            <Route path="/visite/visualizzaVisita"
                                   element={<VisitaMedica visita={selectedVisita}/>}/>
                            <Route path="/profilo" element={<MyProfile/>}/>
                            <Route path="/inserimentoVisita" element={<InserimentoVisitaMedica/>}/>

                            <Route path="*" element={<Navigate to='/dashboard/home' replace/>}/>
                        </Routes>
                    </Container>
                </Box>
            </Box>
        </ThemeProvider>
    )
}