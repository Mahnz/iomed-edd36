import React, {useState, useEffect} from 'react'
import Cookies from "universal-cookie"
import axios from "axios"
import {useNavigate} from "react-router-dom"
import {
    Typography,
    Paper,
    Grid,
    List,
    ListItem,
    ListItemText,
    ListItemButton,
    Divider,
    IconButton, CircularProgress, Snackbar, Alert
} from '@mui/material'
import {Close, Done} from '@mui/icons-material'

export default function MyProfile() {
    const cookies = new Cookies()
    const navigate = useNavigate()
    const [medico, setMedico] = useState(null)
    const [utente, setUtente] = useState({requests: []})

    useEffect(() => {
        const fetchUserData = async () => {
            if (cookies.get("token")) {
                if (cookies.get("type") === "medico") {
                    setMedico(true)
                    let id = cookies.get("token")
                    await axios.get(`http://localhost:3001/api/bc/getDoctor/${id}`)
                        .then(res => {
                            console.log(res)
                            setUtente(res.data)
                        }).catch(e => console.log(e))
                } else {
                    setMedico(false)
                    let CF = cookies.get("token")
                    await axios.get(`http://localhost:3001/api/bc/getPatient/${CF}`)
                        .then(res => {
                            console.log(res)
                            setUtente(res.data)
                        }).catch(e => console.log(e))
                }
            } else {
                navigate('/homepage')
            }
        }
        fetchUserData()
    }, [])

    const [showOverlay, setShowOverlay] = useState(false)
    const [openSnackbar, setOpenSnackbar] = useState(false);
    const [snackbar, setSnackbar] = useState({
        state: null,
        message: ''
    })
    const handleCloseSnackbar = (event, reason) => {
        if (reason === 'clickaway') {
            return;
        }
        setOpenSnackbar(false);
    };

    const handleConfirm = async (id) => {
        let CF = cookies.get("token");

        try {
            setShowOverlay(true)
            const response = await axios.post(`http://localhost:3001/api/bc/confirmRequest`, {
                token: CF,
                id: id
            })
            if (response.status === 200) {
                console.log(response.data);
                const requests = [...utente.requests]
                const filteredRequests = requests.filter((request) => {
                    request.id !== id
                })
                setUtente((...prev) => ({
                    ...prev,
                    requests: filteredRequests
                }))
                setSnackbar({
                    state: 'success',
                    message: 'Autorizzazione concessa al medico ' + id + '!'
                })
            }
        } catch (e) {
            console.log("Errore: " + e.response.status)
        } finally {
            setShowOverlay(false)
            setOpenSnackbar(true)
            console.log("Richiesta accettata correttamente")
        }
    }

    const handleCancel = async (id) => {
        let CF = cookies.get("token")
        try {
            setShowOverlay(true)
            const response = await axios.post(`http://localhost:3001/api/bc/deleteRequest`, {
                token: CF,
                id: id
            })

            if (response.status === 200) {
                console.log(response.data);
                const requests = [...utente.requests]
                const filteredRequests = requests.filter((request) => {
                    request.id !== id
                })
                setUtente((...prev) => ({
                    ...prev,
                    requests: filteredRequests
                }))
                setSnackbar({
                    state: 'error',
                    message: 'Autorizzazione rifiutata per ' + response.data.firstName + ' ' + response.data.lastName + '!'
                })
            }
        } catch (e) {
            console.log("Errore: " + e.response.status)
        } finally {
            setShowOverlay(false)
            setOpenSnackbar(true)
            console.log("Richiesta cancellata correttamente")
        }
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
                Il mio profilo
            </Typography>

            {/* Stampa dei dati personali dell'utente */}
            <Grid container spacing={3}>
                <Grid item xs={12} md={7}>
                    <Paper sx={{pt: 2, pr: 2, pl: 2}}>
                        <Typography variant="h5" ml={2} color="primary">
                            Informazioni Personali
                        </Typography>
                        <List>
                            <ListItem>
                                <ListItemText
                                    primary={utente.firstName}
                                    secondary="Nome"
                                />
                            </ListItem>
                            <ListItem>
                                <ListItemText
                                    primary={utente.lastName}
                                    secondary="Cognome"
                                />
                            </ListItem>
                            <ListItem>
                                <ListItemText
                                    primary={utente.sex === "M" ? "Maschio" : "Femmina"}
                                    secondary="Sesso"
                                />
                            </ListItem>
                            <ListItem>
                                <ListItemText
                                    primary={utente.birthDate}
                                    secondary="Data di nascita"
                                />
                            </ListItem>
                            <ListItem>
                                <ListItemText
                                    primary={utente.birthPlace}
                                    secondary="Luogo di nascita"
                                />
                            </ListItem>
                        </List>
                    </Paper>
                </Grid>

                {/* Stampa dei dati professionali dell'utente, se medico */}
                {medico
                    ? (
                        <Grid item xs={12} md={5}>
                            <Paper sx={{pt: 2, pr: 2, pl: 2}}>
                                <Typography variant="h5" ml={2} color="primary">
                                    Informazioni professionali
                                </Typography>
                                <List>
                                    <ListItem>
                                        <ListItemText
                                            primary={utente.id}
                                            secondary="ID"
                                        />
                                    </ListItem>
                                    <ListItem>
                                        <ListItemText
                                            primary={utente.hospital}
                                            secondary="Ospedale di riferimento"
                                        />
                                    </ListItem>
                                    <ListItem>
                                        <ListItemText
                                            primary={utente.spec}
                                            secondary="Specializzazione"
                                        />
                                    </ListItem>
                                    <ListItem>
                                        <ListItemText
                                            primary={utente.telefonoUfficio ? utente.telefonoUfficio : "-"}
                                            secondary="Telefono ufficio"
                                        />
                                    </ListItem>
                                </List>
                            </Paper>
                        </Grid>
                    )
                    : (
                        // ? Stampa delle autorizzazioni in attesa, se paziente
                        <Grid item xs={12} md={5}>
                            <Paper sx={{pt: 2, pr: 2, pl: 2, height: 425}}>
                                <Typography variant="h5" color="primary" sx={{ml: 2, mb: 1}}>
                                    Autorizzazioni in attesa
                                </Typography>
                                <List className="List" sx={{maxHeight: '85%', overflow: 'auto'}}>
                                    {utente.requests.length === 0 ? (
                                            <ListItem disablePadding>
                                                <ListItemButton>
                                                    <ListItemText primary="Nessuna richiesta presente"/>
                                                </ListItemButton>
                                            </ListItem>
                                        )
                                        : (
                                            utente.requests.map((medico, index) => {
                                                return (
                                                    <>
                                                        <ListItem disablePadding key={index}>
                                                            <ListItemButton>
                                                                <ListItemText
                                                                    primary={`${medico.firstName} ${medico.lastName}`}
                                                                    secondary={medico.id}
                                                                />
                                                                <IconButton
                                                                    onClick={() => handleConfirm(medico.id)}>
                                                                    <Done color="success" fontSize="medium"/>
                                                                </IconButton>
                                                                <IconButton
                                                                    onClick={() => handleCancel(medico.id)}>
                                                                    <Close color="error" fontSize="medium"/>
                                                                </IconButton>
                                                            </ListItemButton>
                                                        </ListItem>
                                                        {index !== utente.requests.length - 1 && <Divider/>}
                                                    </>
                                                )
                                            }))
                                    }
                                </List>
                            </Paper>
                        </Grid>
                    )
                }

                <Grid item xs={12} md={7}>
                    <Paper sx={{pt: 2, pr: 2, pl: 2}}>
                        <Typography variant="h5" ml={2} color="primary">
                            Informazioni di Contatto
                        </Typography>
                        <List>
                            <ListItem>
                                <ListItemText
                                    primary={utente.province}
                                    secondary="Provincia di residenza"
                                />
                            </ListItem>
                            <ListItem>
                                <ListItemText
                                    primary={utente.city}
                                    secondary="Città di residenza"
                                />
                            </ListItem>
                            <ListItem>
                                <ListItemText
                                    primary={utente.cap}
                                    secondary="CAP"
                                />
                            </ListItem>
                            <ListItem>
                                <ListItemText
                                    primary={utente.address}
                                    secondary="Indirizzo di residenza"
                                />
                            </ListItem>
                            <ListItem>
                                <ListItemText
                                    primary={utente.telefono}
                                    secondary="Telefono personale"
                                />
                            </ListItem>
                            <ListItem>
                                <ListItemText
                                    primary={utente.CF}
                                    secondary="Codice Fiscale"
                                />
                            </ListItem>
                            <ListItem>
                                <ListItemText
                                    primary={utente.email}
                                    secondary="Email"
                                />
                            </ListItem>
                        </List>
                    </Paper>
                </Grid>
            </Grid>

            <Snackbar open={openSnackbar} autoHideDuration={6000} onClose={handleCloseSnackbar}>
                <Alert onClose={handleCloseSnackbar} severity={snackbar.state} sx={{width: '100%'}}>
                    {snackbar.message}
                </Alert>
            </Snackbar>
        </>
    )
}