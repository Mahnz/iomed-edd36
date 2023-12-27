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
    // TODO - Settare medico a null
    const [medico, setMedico] = useState(false)
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
                // navigate('/homepage')
            }
        }

        fetchUserData()
    })


    const handleConfirm = async (id) => {
        let CF = cookies.get("token");
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
                <Grid item xs={12} md={6}>
                    <Paper sx={{p: 2}}>
                        <Typography variant="h5" ml={2}>
                            Informazioni Personali
                        </Typography>
                        <List>
                            <ListItem>
                                <ListItemText
                                    primary="Nome"
                                    secondary={Paziente.firstName}
                                />
                            </ListItem>
                            <ListItem>
                                <ListItemText
                                    primary="Cognome"
                                    secondary={Paziente.lastName}
                                />
                            </ListItem>
                            <ListItem>
                                <ListItemText
                                    primary="Sesso"
                                    secondary={Paziente.sex === "M" ? "Maschio" : "Femmina"}
                                />
                            </ListItem>
                            <ListItem>
                                <ListItemText
                                    primary="Data di nascita"
                                    secondary={Paziente.birthDate}
                                />
                            </ListItem>
                            <ListItem>
                                <ListItemText
                                    primary="Luogo di nascita"
                                    secondary={Paziente.birthPlace}
                                />
                            </ListItem>
                        </List>
                    </Paper>
                </Grid>
                <Grid item xs={12} md={6}>
                    <Paper sx={{p: 2}}>
                        <Typography variant="h5" ml={2}>
                            Informazioni di Contatto
                        </Typography>
                        <List>
                            <ListItem>
                                <ListItemText
                                    primary="Provincia"
                                    secondary={Paziente.province}
                                />
                            </ListItem>
                            <ListItem>
                                <ListItemText
                                    primary="Città"
                                    secondary={Paziente.city}
                                />
                            </ListItem>
                            <ListItem>
                                <ListItemText
                                    primary="CAP"
                                    secondary={Paziente.cap}
                                />
                            </ListItem>
                            <ListItem>
                                <ListItemText
                                    primary="Indirizzo"
                                    secondary={Paziente.address}
                                />
                            </ListItem>
                            <ListItem>
                                <ListItemText
                                    primary="Telefono"
                                    // TODO - Cambiare "phoneNumber" con "telefono"
                                    secondary={Paziente.phoneNumber}
                                />
                            </ListItem>
                            <ListItem>
                                <ListItemText
                                    primary="CF"
                                    secondary={Paziente.CF}
                                />
                            </ListItem>
                            <ListItem>
                                <ListItemText
                                    primary="Email"
                                    secondary={Paziente.email}
                                />
                            </ListItem>
                        </List>
                    </Paper>
                </Grid>

                {medico && (
                    <Grid item xs={12} md={6}>
                        <Paper sx={{p: 2}}>
                            <Typography variant="h5" ml={2}>
                                Informazioni professionali
                            </Typography>
                            <List>
                                <ListItem>
                                    <ListItemText
                                        primary="ID"
                                        secondary={utente.id}
                                    />
                                </ListItem>
                                <ListItem>
                                    <ListItemText
                                        primary="Ospedale di riferimento"
                                        secondary={utente.hospital}
                                    />
                                </ListItem>
                                <ListItem>
                                    <ListItemText
                                        primary="Specializzazione"
                                        secondary={utente.spec}
                                    />
                                </ListItem>
                                <ListItem>
                                    <ListItemText
                                        primary="Telefono ufficio"
                                        secondary={utente.telefonoUfficio}
                                    />
                                </ListItem>
                            </List>
                        </Paper>
                    </Grid>
                )}

                {!medico
                    && (
                        <Grid item xs={12} md={6}>
                            <Paper sx={{p: 2}}>
                                <Typography variant="h5" ml={2}>
                                    Informazioni Personali
                                </Typography>
                                <List>
                                    <ListItem>
                                        <ListItemText
                                            primary="Nome"
                                            secondary={Paziente.firstName}
                                        />
                                    </ListItem>
                                    <ListItem>
                                        <ListItemText
                                            primary="Cognome"
                                            secondary={Paziente.lastName}
                                        />
                                    </ListItem>
                                    <ListItem>
                                        <ListItemText
                                            primary="Sesso"
                                            secondary={Paziente.sex === "M" ? "Maschio" : "Femmina"}
                                        />
                                    </ListItem>
                                    <ListItem>
                                        <ListItemText
                                            primary="Data di nascita"
                                            secondary={Paziente.birthDate}
                                        />
                                    </ListItem>
                                    <ListItem>
                                        <ListItemText
                                            primary="Luogo di nascita"
                                            secondary={Paziente.birthPlace}
                                        />
                                    </ListItem>
                                </List>
                            </Paper>
                        </Grid>
                    )
                }

                {/* TODO - Elenco delle amicizie, da mostrare solo se paziente, map su utente.requests  (ogni elemento possiede id,firstName e lastName) */}
                {!medico
                    && (
                        <Grid item xs={12} md={6}>
                            <Paper sx={{p: 2}}>
                                <Typography variant="h5" ml={2}>
                                    Autorizzazioni in attesa
                                </Typography>
                                <List>
                                    {utente.requests.length === 0 ? (
                                            <ListItem disablePadding>
                                                <ListItemButton>
                                                    <ListItemText primary="Nessuna richiesta presente"/>
                                                </ListItemButton>
                                            </ListItem>
                                        )
                                        : (
                                            utente.requests.map((medico, index) => {
                                                <React.Fragment key={index}>
                                                    <ListItem disablePadding
                                                              secondaryAction={
                                                                  <>
                                                                      <IconButton edge="end">
                                                                          <Done color="success" fontSize="medium"/>
                                                                      </IconButton>
                                                                      <IconButton edge="end">
                                                                          <Close color="error" fontSize="medium"/>
                                                                      </IconButton>
                                                                  </>
                                                              }>
                                                        <ListItemButton>
                                                            <ListItemText
                                                                primary="Rossi Mario"
                                                                secondary="6215634214e1wsd4q2"
                                                            />
                                                        </ListItemButton>
                                                    </ListItem>
                                                    {/*<Divider/>*/}
                                                </React.Fragment>
                                            }))
                                    }
                                </List>
                                {/*<List>*/}
                                {/*    <ListItem disablePadding*/}
                                {/*              secondaryAction={*/}
                                {/*                  <>*/}
                                {/*                      <IconButton edge="end">*/}
                                {/*                          <Done color="success" fontSize="medium"/>*/}
                                {/*                      </IconButton>*/}
                                {/*                      <IconButton edge="end">*/}
                                {/*                          <Close color="error" fontSize="medium"/>*/}
                                {/*                      </IconButton>*/}
                                {/*                  </>*/}
                                {/*              }>*/}
                                {/*        <ListItemButton>*/}
                                {/*            <ListItemText*/}
                                {/*                primary="Rossi Mario"*/}
                                {/*                secondary="6215634214e1wsd4q2"*/}
                                {/*            />*/}
                                {/*        </ListItemButton>*/}
                                {/*    </ListItem>*/}
                                {/*    <Divider/>*/}
                                {/*    <ListItem disablePadding*/}
                                {/*              secondaryAction={*/}
                                {/*                  <>*/}
                                {/*                      <IconButton edge="end"*/}
                                {/*                                  onClick={() => handleConfirm(medico.id)}>*/}
                                {/*                          <Done color="success" fontSize="medium"/>*/}
                                {/*                      </IconButton>*/}
                                {/*                      <IconButton edge="end"*/}
                                {/*                                  onClick={axios.post(() => handleCancel(medico.id)}>*/}
                                {/*                          <Close color="error" fontSize="medium"/>*/}
                                {/*                      </IconButton>*/}
                                {/*                  </>*/}
                                {/*              }>*/}
                                {/*        <ListItemButton>*/}
                                {/*            <ListItemText*/}
                                {/*                primary="Verdi Giovanni"*/}
                                {/*                secondary="y1238721eijswscweqd"*/}
                                {/*            />*/}
                                {/*        </ListItemButton>*/}
                                {/*    </ListItem>*/}
                                {/*</List>*/}
                            </Paper>
                        </Grid>
                    )}
            </Grid>
        </>
    )
}