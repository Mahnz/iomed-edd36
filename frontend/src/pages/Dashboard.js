// Dashboard.js
import React, {useState, useEffect} from 'react'
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
    Tooltip
} from '@mui/material'

import {
    Menu as MenuIcon,
    ChevronLeft,
    Healing,
    Person,
    Home,
} from '@mui/icons-material'
import {FontAwesomeIcon} from "@fortawesome/react-fontawesome";
import {faBell, faCircleUser} from "@fortawesome/free-solid-svg-icons";

import ElencoVisite from '../components/ElencoVisite.js'
import HomeContent from "../components/HomeContent.js";
import MyProfile from "../components/MyProfile.js";
import NotificationsPanel from "../components/NotificationsPanel.js";
import UserIconPanel from "../components/UserIconPanel.js";

import Cookies from 'universal-cookie'
import {useNavigate, Redirect, Route, Switch } from "react-router-dom";

const drawerWidth = 240
import "../style/dashboard.css"

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
    // ? GESTIONE DELLA APERTURA/CHIUSURA DELLA SIDEBAR
    const [openDrawer, setOpenDrawer] = React.useState(false)
    const toggleDrawer = () => {
        setOpenDrawer(!openDrawer)
    }

    /* TODO - Verifica dinamica del cookie: se non è settato, l'utente viene rimandato alla pagina di login; altrimenti,
              continua la propria navigazione nella dashboard*/
    const [loggedUser, setLoggedUser] = useState("test")
    const cookies = new Cookies();
    // useEffect(() => {
    //     let loggedUsername = cookies.get("email")
    //     if (!loggedUsername) {
    //         console.log("Login non effettuato. Reindirizzamento...")
    //         navigate("/login");
    //         return
    //     } else {
    //         setLoggedUser(loggedUsername)
    //     }
    //     init(loggedUsername).then(() => console.log("Inizializzazione effettuata"))
    // }, [])

    // ? GESTIONE DELLE TAB
    const [selectedTab, setSelectedTab] = useState("H")
    const [pageTitle, setPageTitle] = useState("Benvenuto, " + loggedUser)
    const history = useHistory();
    const handleSelectTab = (value) => {
        setSelectedTab(value)
    }
    useEffect(() => {
        if (selectedTab === "H") {
            document.title = 'MedPlatform - Home';
            setPageTitle("Benvenuto, " + loggedUser)
        } else if (selectedTab === "V") {
            document.title = 'MedPlatform - Ultime visite';
            setPageTitle("Le tue ultime visite mediche")
        } else if (selectedTab === "P") {
            document.title = 'MedPlatform - Il mio profilo';
            setPageTitle("Il tuo profilo")
        } else if (selectedTab === "S") {
            document.title = 'MedPlatform - Impostazioni';
            setPageTitle("Impostazioni")
        }
    }, [selectedTab])


    // ? GESTIONE DEL PANNELLO A DISCESA DELLE NOTIFICHE
    const [anchorNtf, setAnchorNtf] = React.useState(null);
    const openNtfPanel = Boolean(anchorNtf);
    const handleClickNtfPanel = (event) => {
        setAnchorNtf(event.currentTarget);
    };
    const handleCloseNtfPanel = () => {
        setAnchorNtf(null);
    };
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
    const [anchorUser, setAnchorUser] = React.useState(null);
    const openUserPanel = Boolean(anchorUser);
    const handleClickUserPanel = (event) => {
        setAnchorUser(event.currentTarget);
    };
    const handleCloseUserPanel = () => {
        setAnchorUser(null);
    };

    return (
        <Box sx={{display: 'flex'}}>
            <CssBaseline/>
            <AppBar position="absolute" open={openDrawer}>
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
                            ...(openDrawer && {display: 'none'}),
                        }}
                    >
                        <MenuIcon/>
                    </IconButton>
                    {/*<Typography*/}
                    {/*    component="h1"*/}
                    {/*    variant="h5"*/}
                    {/*    className="brandText"*/}
                    {/*    color="red"*/}
                    {/*    sx={{flexGrow: 1}}*/}
                    {/*    noWrap*/}
                    {/*>*/}
                    {/*    Med*/}
                    {/*</Typography>*/}
                    {/*<Typography*/}
                    {/*    component="h1"*/}
                    {/*    variant="h5"*/}
                    {/*    className="brandText"*/}
                    {/*    color="secondary"*/}
                    {/*    sx={{flexGrow: 1}}*/}
                    {/*    display="inline"*/}
                    {/*>*/}
                    {/*    Platform*/}
                    {/*</Typography>*/}

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
                            sx={{pl: 2}}
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
                    <Typography variant="h4" mb={4}>
                        {pageTitle}
                    </Typography>
                    <Switch>
                        <Route path="/dashboard/:component">
                            {/* Blocco di codice fornito sopra */}
                        </Route>
                        <Route path="/dashboard/visita/:id">
                            {/* Blocco di codice fornito sopra */}
                        </Route>
                        {/* Aggiungi questa route alla fine del tuo Switch */}
                        <Route path="/dashboard/*">
                            {/* Gestisci eventuali valori non validi */}
                            <Redirect to="/dashboard/h"/>
                        </Route>
                    </Switch>
                    {selectedTab === "H" && <HomeContent handleSelectTab={handleSelectTab}/>}
                    {selectedTab === "P" && <MyProfile/>}
                    {selectedTab === "V" && <ElencoVisite/>}
                </Container>
            </Box>
        </Box>
    )
}