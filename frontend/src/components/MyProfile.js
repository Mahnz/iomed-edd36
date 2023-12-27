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
    IconButton
} from '@mui/material'
import {Close, Done} from '@mui/icons-material'
import Paziente from '../exPatient.json'

export default function MyProfile() {
    const cookies = new Cookies()
    const navigate = useNavigate()
    // todo - Settare medico a null
    const [medico, setMedico] = useState(false)
    const [utente, setUtente] = useState({
        requests: [
            {
                id: 1,
                firstName: "Mario",
                lastName: "Rossi"
            },
            {
                id: 2,
                firstName: "Luigi",
                lastName: "Verdi"
            },
            {
                id: 3,
                firstName: "Giovanni",
                lastName: "Bianchi"
            },
            {
                id: 4,
                firstName: "Giuseppe",
                lastName: "Neri"
            },
            {
                id: 5,
                firstName: "Giacomo",
                lastName: "Gialli"
            },
            {
                id: 6,
                firstName: "Gianluca",
                lastName: "Blu"
            },
            {
                id: 7,
                firstName: "Gianmarco",
                lastName: "Verdi"
            },
            {
                id: 8,
                firstName: "Gianluigi",
                lastName: "Bianchi"
            },
            {
                id: 9,
                firstName: "Giancarlo",
                lastName: "Neri"
            },
            {
                id: 10,
                firstName: "Gianfranco",
                lastName: "Gialli"
            },
            {
                id: 11,
                firstName: "Gianpiero",
                lastName: "Blu"
            },
            {
                id: 12,
                firstName: "Gianluigi",
                lastName: "Verdi"
            },
            {
                id: 13,
                firstName: "Gianmarco",
                lastName: "Bianchi"
            },
            {
                id: 14,
                firstName: "Gianluigi",
                lastName: "Neri"
            },
            {
                id: 15,
                firstName: "Giancarlo",
                lastName: "Gialli"
            },
            {
                id: 16,
                firstName: "Gianfranco",
                lastName: "Blu"
            },
            {
                id: 17,
                firstName: "Gianpiero",
                lastName: "Verdi"
            },
            {
                id: 18,
                firstName: "Gianluigi",
                lastName: "Bianchi"
            },
            {
                id: 19,
                firstName: "Gianmarco",
                lastName: "Neri"
            },
            {
                id: 20,
                firstName: "Gianluigi",
                lastName: "Gialli"
            },
            {
                id: 21,
                firstName: "Giancarlo",
                lastName: "Blu"
            },
            {
                id: 22,
                firstName: "Gianfranco",
                lastName: "Verdi"
            },
            {
                id: 23,
                firstName: "Gianpiero",
                lastName: "Bianchi"
            },
            {
                id: 24,
                firstName: "Gianluigi",
                lastName: "Neri"
            },
        ]
    })

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
                // navigate('/homepage')
            }
        }

        fetchUserData()
    })


    const handleConfirm = async (id) => {
        let CF = cookies.get("token");
        console.log("Medico: " + id)
        await axios.post(`http://localhost:3001/api/bc/confirmRequest`, {
            token: CF,
            id: id
        }).then(res => {
                console.log(res.data);
                const requests = [...utente.requests]
                const filteredRequests = requests.filter((request) => {
                    request.id !== id
                })
                setUtente((...prev) => ({
                    ...prev,
                    requests: filteredRequests
                }))
            }
        ).catch(e => console.log(e))
    }

    const handleCancel = async (id) => {
        let CF = cookies.get("token");
        await axios.post(`http://localhost:3001/api/bc/deleteRequest`, {
            token: CF,
            id: id
        }).then(res => {
            console.log(res.data);
            const requests = [...utente.requests]
            const filteredRequests = requests.filter((request) => {
                request.id !== id
            })
            setUtente((...prev) => ({
                ...prev,
                requests: filteredRequests
            }))
        }).catch(e => console.log(e))
    }

    return (
        <>
            <Typography variant="h4" mb={4}>
                Il mio profilo
            </Typography>

            {/* ? Stampa dei dati personali dell'utente */}
            <Grid container spacing={3}>
                <Grid item xs={12} md={7}>
                    <Paper sx={{pt: 2, pr: 2, pl: 2}}>
                        <Typography variant="h5" ml={2} color="primary">
                            Informazioni Personali
                        </Typography>
                        <List>
                            <ListItem>
                                <ListItemText
                                    primary={Paziente.firstName}
                                    secondary="Nome"
                                />
                            </ListItem>
                            <ListItem>
                                <ListItemText
                                    primary={Paziente.lastName}
                                    secondary="Cognome"
                                />
                            </ListItem>
                            <ListItem>
                                <ListItemText
                                    primary={Paziente.sex === "M" ? "Maschio" : "Femmina"}
                                    secondary="Sesso"
                                />
                            </ListItem>
                            <ListItem>
                                <ListItemText
                                    primary={Paziente.birthDate}
                                    secondary="Data di nascita"
                                />
                            </ListItem>
                            <ListItem>
                                <ListItemText
                                    primary={Paziente.birthPlace}
                                    secondary="Luogo di nascita"
                                />
                            </ListItem>
                        </List>
                    </Paper>
                </Grid>

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
                                            primary={utente.telefonoUfficio}
                                            secondary="Telefono ufficio"
                                        />
                                    </ListItem>
                                </List>
                            </Paper>
                        </Grid>
                    )
                    : (
                        // todo - Elenco delle amicizie, da mostrare solo se paziente, map su utente.requests
                        //        (ogni elemento possiede id, firstName e lastName)
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
                                    primary={Paziente.province}
                                    secondary="Provincia di residenza"
                                />
                            </ListItem>
                            <ListItem>
                                <ListItemText
                                    primary={Paziente.city}
                                    secondary="Città di residenza"
                                />
                            </ListItem>
                            <ListItem>
                                <ListItemText
                                    primary={Paziente.cap}
                                    secondary="CAP"
                                />
                            </ListItem>
                            <ListItem>
                                <ListItemText
                                    primary={Paziente.address}
                                    secondary="Indirizzo di residenza"
                                />
                            </ListItem>
                            <ListItem>
                                <ListItemText
                                    primary={Paziente.telefono}
                                    secondary="Telefono personale"
                                />
                            </ListItem>
                            <ListItem>
                                <ListItemText
                                    primary={Paziente.CF}
                                    secondary="Codice Fiscale"
                                />
                            </ListItem>
                            <ListItem>
                                <ListItemText
                                    primary={Paziente.email}
                                    secondary="Email"
                                />
                            </ListItem>
                        </List>
                    </Paper>
                </Grid>
            </Grid>
        </>
    )
}