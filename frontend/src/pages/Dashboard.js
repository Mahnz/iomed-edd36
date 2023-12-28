// Dashboard.js
import React, {useState, useEffect} from 'react'
import Cookies from 'universal-cookie'
import {Navigate, Route, Routes, useNavigate} from "react-router-dom"
import {
    styled, CssBaseline, Box, Container, Toolbar,
    Drawer as MuiDrawer, AppBar as MuiAppBar,
    Typography, Divider, Tooltip, IconButton, Badge,
    List, ListItemButton, ListItemIcon, ListItemText, useTheme
} from '@mui/material'
import {
    Menu as MenuIcon,
    Settings as SettingsIcon,
    ChevronLeft, Healing, Person,
    Home, FormatListBulleted, GroupAdd
} from '@mui/icons-material'
import {FontAwesomeIcon} from "@fortawesome/react-fontawesome"
import {faBell, faCircleUser, faNotesMedical} from "@fortawesome/free-solid-svg-icons"

// IMPORT DEI VARI COMPONENTI
import ElencoVisite from '../components/ElencoVisite.js'
import HomeContent from "../components/HomeContent.js"
import MyProfile from "../components/MyProfile.js"
import NotificationsPanel from "../components/NotificationsPanel.js"
import UserIconPanel from "../components/UserIconPanel.js"
import VisitaMedica from "../components/VisitaMedica.js"
import InserimentoVisitaMedica from "../components/InserimentoVisitaMedica.js"
import ElencoUtenti from "../components/ElencoUtenti.js"
import RichiestaAutorizzazione from "../components/RichiestaAutorizzazione.js"
import Impostazioni from "../components/Impostazioni.js"

import "../style/dashboard.css"

export default function Dashboard({mode, toggleMode}) {
    const cookies = new Cookies()
    const navigate = useNavigate()
    const theme = useTheme()

    // ? GESTIONE DELLA APERTURA/CHIUSURA DELLA SIDEBAR
    const [loggedUser, setLoggedUser] = useState(null)
    const [medico, setMedico] = useState(null)

    const [openDrawer, setOpenDrawer] = useState(false)
    const toggleDrawer = () => {
        setOpenDrawer(!openDrawer)
    }

    useEffect(() => {
        if (!cookies.get("token")) {
            console.log("Login non effettuato. Reindirizzamento...")
            navigate("/homepage")
        } else {
            if (cookies.get("type") === "medico") {
                setMedico(true)
                setLoggedUser(cookies.get("firstName") + " " + cookies.get("lastName"))
            } else {
                setMedico(false)
                setLoggedUser(cookies.get("firstName") + " " + cookies.get("lastName"))
            }
        }
    }, [])

    // ? GESTIONE DELLE TAB
    const [selectedTab, setSelectedTab] = useState("H")
    const [selectedVisita, setSelectedVisita] = useState("")
    const handleSelectTab = (value) => {
        setSelectedTab(value)
    }
    useEffect(() => {
        if (selectedTab === "H") {
            document.title = 'IOMed - Home'
            navigate('/dashboard/home')
        } else if (selectedTab === "V" && !medico) {
            document.title = 'IOMed - Ultime visite'
            navigate('/dashboard/visite')
            setSelectedVisita("")
        } else if (selectedTab === "P") {
            document.title = 'IOMed - Il mio profilo'
            navigate('/dashboard/profilo')
        } else if (selectedTab === "I" && medico) {
            document.title = 'IOMed - Nuova visita'
            navigate('/dashboard/inserimentoVisita')
        } else if (selectedTab === "N" && medico) {
            document.title = 'IOMed - Aggiungi assistito'
            navigate('/dashboard/aggiungiAssistito')
        } else if (selectedTab === "E") {
            if (medico) {
                document.title = 'IOMed - Elenco assistiti'
                navigate('/dashboard/listaAssistiti')
            } else {
                document.title = 'IOMed - Elenco medici'
                navigate('/dashboard/mediciAutorizzati')
            }
        } else if (selectedTab === "S") {
            document.title = 'IOMed - Impostazioni'
            navigate('/dashboard/impostazioni')
        }
    }, [selectedTab])


    // ? GESTIONE DEL PANNELLO A DISCESA DELLE NOTIFICHE
    const [anchorNtf, setAnchorNtf] = useState(null)
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
                        sx={{flexGrow: 1, color: theme.palette.common.white}}
                    >
                        IOMed
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
                    <Tooltip title="Vai alla home" placement="right">
                        <ListItemButton
                            onClick={() => handleSelectTab("H")}
                            sx={selectedTab === 'H' ? {
                                borderLeft: '4px solid #2196f3',
                                backgroundColor: 'rgba(33, 150, 243, 0.1)'
                            } : {}}>
                            <ListItemIcon>
                                <Home/>
                            </ListItemIcon>
                            <ListItemText primary="Home"/>
                        </ListItemButton>
                    </Tooltip>
                    {!medico && (
                        <Tooltip title="Elenco visite mediche" placement="right">
                            <ListItemButton
                                onClick={() => handleSelectTab('V')}
                                sx={selectedTab === 'V' ? {
                                    borderLeft: '4px solid #2196f3',
                                    backgroundColor: 'rgba(33, 150, 243, 0.1)'
                                } : {}}>
                                <ListItemIcon>
                                    <Healing/>
                                </ListItemIcon>
                                <ListItemText primary="Visite mediche"/>
                            </ListItemButton>
                        </Tooltip>
                    )}
                    <Tooltip placement="right"
                             title={medico ? "Elenco assistiti" : "Medici autorizzati"}>
                        <ListItemButton
                            onClick={() => handleSelectTab("E")}
                            sx={selectedTab === 'E' ? {
                                borderLeft: '4px solid #2196f3',
                                backgroundColor: 'rgba(33, 150, 243, 0.1)'
                            } : {}}>
                            <ListItemIcon>
                                <FormatListBulleted/>
                            </ListItemIcon>
                            <ListItemText primary={medico ? "Elenco assistiti" : "Medici autorizzati"}/>
                        </ListItemButton>
                    </Tooltip>

                    {medico && (
                        <Tooltip title="Aggiungi visita" placement="right">
                            <ListItemButton
                                onClick={() => handleSelectTab('I')}
                                sx={selectedTab === 'I' ? {
                                    borderLeft: '4px solid #2196f3',
                                    backgroundColor: 'rgba(33, 150, 243, 0.1)'
                                } : {}}>
                                <ListItemIcon>
                                    <FontAwesomeIcon icon={faNotesMedical} size="lg"/>
                                </ListItemIcon>
                                <ListItemText primary="Aggiungi visita"/>
                            </ListItemButton>
                        </Tooltip>
                    )}
                    {medico && (
                        <Tooltip title="Aggiungi assistito" placement="right">
                            <ListItemButton
                                onClick={() => handleSelectTab('N')}
                                sx={selectedTab === 'N' ? {
                                    borderLeft: '4px solid #2196f3',
                                    backgroundColor: 'rgba(33, 150, 243, 0.1)'
                                } : {}}>
                                <ListItemIcon>
                                    <GroupAdd/>
                                </ListItemIcon>
                                <ListItemText primary="Aggiungi assistito"/>
                            </ListItemButton>
                        </Tooltip>
                    )}

                    <Tooltip title="Il mio profilo" placement="right">
                        <ListItemButton
                            onClick={() => handleSelectTab('P')}
                            sx={selectedTab === 'P' ? {
                                borderLeft: '4px solid #2196f3',
                                backgroundColor: 'rgba(33, 150, 243, 0.1)'
                            } : {}}>
                            <ListItemIcon>
                                <Person/>
                            </ListItemIcon>
                            <ListItemText primary="Il mio profilo"/>
                        </ListItemButton>
                    </Tooltip>
                    <Divider sx={{my: 1}}/>
                    <Tooltip title="Impostazioni" placement="right">
                        <ListItemButton
                            onClick={() => handleSelectTab('S')}
                            sx={selectedTab === 'S' ? {
                                borderLeft: '4px solid #2196f3',
                                backgroundColor: 'rgba(33, 150, 243, 0.1)'
                            } : {}}>
                            <ListItemIcon>
                                <SettingsIcon/>
                            </ListItemIcon>
                            <ListItemText primary="Impostazioni"/>
                        </ListItemButton>
                    </Tooltip>
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
                        <Route path="/home" element={<HomeContent handleSelectTab={handleSelectTab}/>}/>
                        <Route path="/profilo" element={<MyProfile/>}/>

                        <Route path="/visite"
                               element={medico
                                   ? <Navigate to='/dashboard/home' replace/>
                                   : <ElencoVisite setVisita={setSelectedVisita}/>
                               }
                        />
                        <Route path="/listaAssistiti/visite"
                               element={medico
                                   ? <ElencoVisite setVisita={setSelectedVisita}/>
                                   : <Navigate to='/dashboard/home' replace/>
                               }
                        />

                        <Route path="/visite/visualizzaVisita"
                               element={medico
                                   ? <Navigate to='/dashboard/home' replace/>
                                   : <VisitaMedica visita={selectedVisita}/>
                               }
                        />
                        <Route path="/listaAssistiti/visite/visualizzaVisita"
                               element={medico
                                   ? <VisitaMedica visita={selectedVisita}/>
                                   : <Navigate to='/dashboard/home' replace/>
                               }
                        />

                        {medico && <Route path="/inserimentoVisita" element={<InserimentoVisitaMedica/>}/>}
                        {medico && <Route path="/aggiungiAssistito" element={<RichiestaAutorizzazione/>}/>}
                        <Route path="/mediciAutorizzati"
                               element={medico
                                   ? <Navigate to='/dashboard/home' replace/>
                                   : <ElencoUtenti/>
                               }
                        />
                        <Route path="/listaAssistiti"
                               element={!medico
                                   ? <Navigate to='/dashboard/home' replace/>
                                   : <ElencoUtenti/>
                               }
                        />

                        <Route path="/impostazioni" element={<Impostazioni mode={mode} toggleMode={toggleMode}/>}/>
                        <Route path="*" element={<Navigate to='/dashboard/home' replace/>}/>
                    </Routes>
                </Container>
            </Box>
        </Box>
    )
}

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