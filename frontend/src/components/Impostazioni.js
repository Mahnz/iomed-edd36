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
    Switch, Dialog, DialogTitle, DialogContent, DialogActions, TextField, Button, IconButton, Tooltip, CircularProgress,
} from '@mui/material'
import {Brightness4, Brightness7} from "@mui/icons-material"
import axios from "axios"


export default function Impostazioni({mode, toggleMode}) {
    const cookies = new Cookies()
    const navigate = useNavigate()
    const [showOverlay, setShowOverlay] = useState(false)
    const emailRegex = /^[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,}$/i;

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
    }, [])

    // ? CAMBIO TEAM DARK/LIGHT MODE
    const handleDarkModeChange = () => {
        toggleMode()
    }

    const [changePasswordDialog, setChangePasswordDialog] = useState(false)
    const [currentPassword, setCurrentPassword] = useState('')
    const [newPassword, setNewPassword] = useState('')
    const handleChangePassword = async () => {
        // BLOCKCHAIN fatto
        // todo - Chiamata alla blockchain per cambiare la password
        await axios.post("http://localhost:3001/api/bc/changePass", {
            type: cookies.get("type"),
            token: cookies.get("token"),
            currentPassword: currentPassword,
            newPassword: newPassword
        }).then(res => alert(res.data)).catch(e => alert(e.response))
        setChangePasswordDialog(false)
    }
    const handleCloseDialogChangePassword = () => {
        setChangePasswordDialog(false)
        setCurrentPassword('')
        setNewPassword('')
    }


    const [deleteAccountDialog, setDeleteAccountDialog] = useState(false)
    const [deleteData, setDeleteData] = useState({
        email: '',
        password: '',
        confirmPassword: ''
    })
    const [errorsDelete, setErrorsDelete] = useState({
        email: {
            state: false,
            message: ''
        },
        password: {
            state: false,
            message: ''
        },
        confirmPassword: {
            state: false,
            message: ''
        }
    })
    const handleChangeDelete = (e) => {
        const {name, value} = e.target
        if (name === "deleteEmail") {
            setDeleteData({
                ...deleteData,
                email: value
            })
        } else if (name === "deletePassword") {
            setDeleteData({
                ...deleteData,
                password: value
            })
        } else if (name === "deleteConfirmPassword") {
            setDeleteData({
                ...deleteData,
                confirmPassword: value
            })
        }
    }
    useEffect(() => {
        if (deleteData.email) {
            setErrorsDelete({
                ...errorsDelete,
                email: {
                    state: true,
                    message: 'Campo obbligatorio'
                }
            })
        } else {
            setErrorsDelete({
                ...errorsDelete,
                email: {
                    state: false,
                    message: ''
                }
            })
        }
    }, [deleteData.email])

    useEffect(() => {
        if (deleteData.password) {
            setErrorsDelete({
                ...errorsDelete,
                password: {
                    state: true,
                    message: 'Campo obbligatorio'
                }
            })
        } else {
            setErrorsDelete({
                ...errorsDelete,
                password: {
                    state: false,
                    message: ''
                }
            })
        }
    }, [deleteData.password])

    useEffect(() => {
        if (deleteData.confirmPassword) {
            setErrorsDelete({
                ...errorsDelete,
                confirmPassword: {
                    state: true,
                    message: 'Campo obbligatorio'
                }
            })
        } else {
            setErrorsDelete({
                ...errorsDelete,
                confirmPassword: {
                    state: false,
                    message: ''
                }
            })
        }
    }, [deleteData.confirmPassword])

    const handleDeleteAccount = async () => {
        // BLOCKCHAIN fatto
        if (!deleteData.email) {
            setErrorsDelete({
                ...errorsDelete,
                email: {
                    state: true,
                    message: 'Campo obbligatorio'
                }
            })
        } else {
            if (!emailRegex.test(deleteData.email)) {
                setErrorsDelete({
                    ...errorsDelete,
                    email: {
                        state: true,
                        message: "Inserire un'email valida"
                    }
                })
            } else {
                setErrorsDelete({
                    ...errorsDelete,
                    email: {
                        state: false,
                        message: ''
                    }
                })
                if (deleteData.password && deleteData.confirmPassword) {
                    if (deleteData.password === deleteData.confirmPassword) {
                        setShowOverlay(true)
                        await axios.post("http://localhost:3001/api/bc/deleteUser", {
                            email: deleteData.email,
                            password: deleteData.password,
                            type: cookies.get("type"),
                            token: cookies.get("token")
                        }).then(res => alert(res.data)).catch(e => alert(e.response))
                        setDeleteAccountDialog(false)

                        // ? RIMOZIONE DI TUTTI I COOKIE DELL'UTENTE
                        cookies.remove("token", {path: '/'})
                        cookies.remove("type", {path: '/'})
                        cookies.remove("firstName", {path: '/'})
                        cookies.remove("lastName", {path: '/'})
                        cookies.remove("theme", {path: '/'})
                        setShowOverlay(false)

                        navigate('/homepage')
                    } else {
                        setErrorsDelete({
                            ...errorsDelete,
                            password: {
                                state: true,
                                message: 'Le password non coincidono'
                            },
                            confirmPassword: {
                                state: true,
                                message: 'Le password non coincidono'
                            }
                        })
                    }
                } else {
                    setErrorsDelete({
                        ...errorsDelete,
                        password: {
                            state: true,
                            message: 'Campo obbligatorio'
                        },
                        confirmPassword: {
                            state: true,
                            message: 'Campo obbligatorio'
                        }
                    })
                }
            }
        }
    }
    const handleCloseDialogDeleteAccount = () => {
        setDeleteAccountDialog(false)
        setDeleteData({
            email: '',
            password: '',
            confirmPassword: ''
        })
    }

    return (
        <>
            {showOverlay && (
                <div
                    style={{
                        position: 'fixed',
                        top: 0,
                        left: 0,
                        width: '100%',
                        height: '100%',
                        background: 'rgba(0, 0, 0, 0.5)',
                        display: 'flex',
                        justifyContent: 'center',
                        alignItems: 'center',
                        zIndex: 999,
                    }}
                >
                    <CircularProgress color="success"/>
                </div>
            )}
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
                                <ListItemText primary="Registrazione di nuove visite"/>
                                <ListItemSecondaryAction>
                                    <Switch
                                        edge="end"
                                        onChange={() => handleNotificationChange('nuoveVisite')}
                                        checked={notification.nuoveVisite}
                                    />
                                </ListItemSecondaryAction>
                            </ListItem>
                            <ListItem>
                                <ListItemText primary="Richieste di autorizzazione"/>
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
                    <TextField type="password"
                               name="currentPassword"
                               margin="dense"
                               label="Password corrente"
                               fullWidth
                               value={currentPassword}
                               onChange={(e) => setCurrentPassword(e.target.value)}
                               required
                    />
                    <TextField type="password"
                               name="newPassword"
                               margin="dense"
                               label="Nuova password"
                               fullWidth
                               value={newPassword}
                               onChange={(e) => setNewPassword(e.target.value)}
                               required
                    />
                </DialogContent>
                <DialogActions>
                    <Button onClick={() => handleCloseDialogChangePassword()} color="primary" autoFocus>
                        Annulla
                    </Button>
                    <Button onClick={handleChangePassword} color="primary" variant="contained">
                        Conferma
                    </Button>
                </DialogActions>
            </Dialog>

            {/* Dialog per l'eliminazione dell'account */}
            <Dialog open={deleteAccountDialog} onClose={() => handleCloseDialogDeleteAccount()}>
                <DialogTitle sx={{color: '#e60c0c'}}>Eliminazione account</DialogTitle>
                <DialogContent>
                    <Typography variant="body1">
                        Per eliminare definitivamente l'account, inserisci tutti i dati di seguito. <br/>Una volta
                        eliminato l'account, sarà necessario registrarsi nuovamente per accedere ai tuoi dati
                        medici.
                    </Typography>
                    <TextField type="email"
                               name="deleteEmail"
                               margin="dense"
                               label="Inserire email"
                               fullWidth
                               value={deleteData.email}
                               onChange={handleChangeDelete}
                               required
                               error={errorsDelete.email.state}
                               helperText={errorsDelete.email.state && errorsDelete.email.message}
                    />
                    <TextField type="password"
                               name="deletePassword"
                               margin="dense"
                               label="Inserire password"
                               fullWidth
                               value={deleteData.password}
                               onChange={handleChangeDelete}
                               required
                               error={errorsDelete.password.state}
                               helperText={errorsDelete.password.state && errorsDelete.password.message}
                    />
                    <TextField type="password"
                               name="deleteConfirmPassword"
                               margin="dense"
                               label="Conferma password"
                               fullWidth
                               value={deleteData.confirmPassword}
                               onChange={handleChangeDelete}
                               required
                               error={errorsDelete.confirmPassword.state}
                               helperText={errorsDelete.confirmPassword.state && errorsDelete.confirmPassword.message}
                    />
                </DialogContent>
                <DialogActions>
                    <Button onClick={() => handleCloseDialogDeleteAccount()} color="error" variant="contained"
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