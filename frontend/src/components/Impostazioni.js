import React, {useEffect, useState} from 'react'
import {useNavigate} from "react-router-dom"
import Cookies from "universal-cookie"
import {
    Typography,
    Paper,
    Grid,
    List,
    ListItem,
    ListItemButton,
    ListItemText,
    ListItemSecondaryAction,
    Switch, Dialog, DialogTitle, DialogContent, DialogActions, TextField, Button, IconButton, Tooltip,
} from '@mui/material'
import {Brightness4, Brightness7} from "@mui/icons-material"


export default function Impostazioni({mode, toggleMode}) {
    const cookies = new Cookies()
    const navigate = useNavigate()

    const [notification, setNotification] = useState({
        email: true,
        messages: false,
        nuoveVisite: true,
        autorizzazioni: true
    })
    const [btnDisabled, setBtnDisabled] = useState(true)
    const handleNotificationChange = (type) => {
        setNotification((prev) => ({
            ...prev,
            [type]: !prev[type],
        }))
        setBtnDisabled(false)
    }
    const handleSaveNotifications = () => {
        cookies.set('notifications', notification, {
            path: '/',
            expires: new Date(Date.now() + 3600000),
            sameSite: 'Strict'
        })
        setBtnDisabled(true)
    }
    useEffect(() => {

        if (cookies.get('notifications')) {
            setNotification(cookies.get('notifications'))
        }
    }, []);


    const handleDarkModeChange = () => {
        toggleMode()
    }

    const [currentPassword, setCurrentPassword] = useState('')
    const [newPassword, setNewPassword] = useState('')
    const [changePasswordDialog, setChangePasswordDialog] = useState(false)
    const handleChangePassword = () => {
        // BLOCKCHAIN
        // todo - Chiamata alla blockchain per cambiare la password
        setChangePasswordDialog(false)
    }


    const [deleteAccountDialog, setDeleteAccountDialog] = useState(false)
    const [deleteData, setDeleteData] = useState({
        email: '',
        password: '',
        confirmPassword: ''
    })
    const handleChangeDelete = (e) => {
        setDeleteData((prev) => ({
            ...prev,
            [e.target.name]: e.target.value
        }))
    }
    const handleDeleteAccount = () => {
        // BLOCKCHAIN
        // todo - Chiamata alla blockchain per eliminare definitivamente l'account dell'utente
        setDeleteAccountDialog(false)
        // navigate('/homepage')
    }

    return (
        <>
            <Typography variant="h4" mb={4}>
                Impostazioni
            </Typography>

            <Grid container spacing={3}>
                <Grid item xs={12} md={6}>
                    <Paper sx={{p: 2}}>
                        <Typography variant="h6" color="primary">
                            Notifiche
                        </Typography>
                        <List>
                            <ListItem>
                                <ListItemText primary="SMS"/>
                                <ListItemSecondaryAction>
                                    <Switch
                                        edge="end"
                                        onChange={() => handleNotificationChange('messaggi')}
                                        checked={notification.messages}
                                    />
                                </ListItemSecondaryAction>
                            </ListItem>
                            <ListItem>
                                <ListItemText primary="Email"/>
                                <ListItemSecondaryAction>
                                    <Switch
                                        edge="end"
                                        onChange={() => handleNotificationChange('email')}
                                        checked={notification.email}
                                    />
                                </ListItemSecondaryAction>
                            </ListItem>
                            <ListItem>
                                <ListItemText primary="Aggiunta di nuove visite"/>
                                <ListItemSecondaryAction>
                                    <Switch
                                        edge="end"
                                        onChange={() => handleNotificationChange('nuoveVisite')}
                                        checked={notification.nuoveVisite}
                                    />
                                </ListItemSecondaryAction>
                            </ListItem>
                            <ListItem>
                                <ListItemText primary="Richiesta di autorizzazione"/>
                                <ListItemSecondaryAction>
                                    <Switch
                                        edge="end"
                                        onChange={() => handleNotificationChange('autorizzazioni')}
                                        checked={notification.autorizzazioni}
                                    />
                                </ListItemSecondaryAction>
                            </ListItem>
                        </List>
                        {!btnDisabled && (
                            <Button variant="contained" onClick={handleSaveNotifications}>
                                Salva Modifiche
                            </Button>
                        )}

                    </Paper>
                </Grid>

                <Grid item xs={12} md={6}>
                    <Paper sx={{p: 2}}>
                        <Typography variant="h6" color="primary">
                            Tema dell'applicazione
                        </Typography>
                        <List>
                            <ListItem>
                                <ListItemText
                                    primary={mode === "light" ? "Abilita tema scuro" : "Abilita tema chiaro"}/>
                                <ListItemSecondaryAction>
                                    <Tooltip placement="right"
                                             title={mode === "light" ? "Passa al tema scuro" : "Passa al tema chiaro"}>
                                        <IconButton sx={{ml: 1}} onClick={handleDarkModeChange} color="inherit">
                                            {mode === 'light' ? <Brightness4/> : <Brightness7/>}
                                        </IconButton>
                                    </Tooltip>
                                </ListItemSecondaryAction>
                            </ListItem>
                        </List>
                    </Paper>
                </Grid>

                <Grid item xs={12} md={6}>
                    <Paper sx={{p: 2}}>
                        <Typography variant="h6" color="primary">
                            Sicurezza dell'account
                        </Typography>
                        <List>
                            <ListItemButton onClick={() => setChangePasswordDialog(true)}>
                                <ListItemText primary="Cambia password"/>
                            </ListItemButton>
                            <ListItemButton onClick={() => setDeleteAccountDialog(true)}>
                                <ListItemText primary="Elimina account" sx={{color: '#e60c0c'}}/>
                            </ListItemButton>
                        </List>
                    </Paper>
                </Grid>
            </Grid>

            {/* Dialog per il cambio password */}
            <Dialog open={changePasswordDialog} onClose={() => setChangePasswordDialog(false)}>
                <DialogTitle>Cambia password</DialogTitle>
                <DialogContent>
                    <TextField
                        margin="dense"
                        label="Password corrente"
                        type="password"
                        fullWidth
                        value={currentPassword}
                        onChange={(e) => setCurrentPassword(e.target.value)}
                        required
                    />
                    <TextField
                        margin="dense"
                        label="Nuova password"
                        type="password"
                        fullWidth
                        value={newPassword}
                        onChange={(e) => setNewPassword(e.target.value)}
                        required
                    />
                </DialogContent>
                <DialogActions>
                    <Button onClick={() => setChangePasswordDialog(false)} color="primary" autoFocus>
                        Annulla
                    </Button>
                    <Button onClick={handleChangePassword} color="primary" variant="contained">
                        Conferma
                    </Button>
                </DialogActions>
            </Dialog>

            {/* Dialog per l'eliminazione dell'account */}
            <Dialog open={deleteAccountDialog} onClose={() => setDeleteAccountDialog(false)}>
                <DialogTitle sx={{color: '#e60c0c'}}>Eliminazione account</DialogTitle>
                <DialogContent>
                    <Typography variant="body1">
                        Per eliminare definitivamente l'account, inserisci tutti i dati di seguito. <br/>Una volta
                        eliminato
                        l'account, sarà necessario registrarsi nuovamente per accedere ai tuoi dati medici.
                    </Typography>
                    <TextField type="text"
                               name="deleteEmail"
                               margin="dense"
                               label="Inserire email"
                               fullWidth
                               value={deleteData.email}
                               onChange={handleChangeDelete}
                               required
                    />
                    <TextField type="password"
                               name="deleteEmail"
                               margin="dense"
                               label="Inserire password"
                               fullWidth
                               value={deleteData.password}
                               onChange={handleChangeDelete}
                               required
                    />
                    <TextField type="password"
                               margin="dense"
                               label="Conferma password"
                               fullWidth
                               value={deleteData.confirmPassword}
                               onChange={handleChangeDelete}
                               required
                    />
                </DialogContent>
                <DialogActions>
                    <Button onClick={() => setDeleteAccountDialog(false)} color="error" variant="contained"
                            autoFocus>
                        Annulla
                    </Button>
                    <Button onClick={handleDeleteAccount} color="error">
                        Elimina account
                    </Button>
                </DialogActions>
            </Dialog>
        </>
    )
}