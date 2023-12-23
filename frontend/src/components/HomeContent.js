import React, {useState, useEffect} from 'react'
import {useNavigate} from "react-router-dom"
import {Grid, Card, CardContent, Typography, CardActions, Button} from "@mui/material";
import Cookies from "universal-cookie"

export default function HomeContent({handleSelectTab}) {
    const cookies = new Cookies()
    const navigate = useNavigate()
    const [loggedUser, setLoggedUser] = useState("Mario Rossi")
    const [medico, setMedico] = useState(false)

    useEffect(() => {
        // TODO - Da abilitare quando i cookie vengono settati correttamente
        // if (!cookies.get("token")) {
        //     console.log("Nessun utente loggato")
        //     navigate("/homepage")
        // } else {
        //     if (cookies.get("type") === "medico") {
        //         setMedico(true)
        //     } else if (cookies.get("type") === "paziente") {
        //         setMedico(false)
        //     }
        //     setLoggedUser(cookies.get("firstName") + " " + cookies.get("lastName"))
        // }
    }, [])

    return (
        <>
            <Typography variant="h4" mb={4}>
                Benvenuto, {loggedUser}
            </Typography>
            <Grid container spacing={3}>
                <Grid item xs={12} sm={6} md={4}>
                    <Card sx={{
                        transition: 'box-shadow 0.2s',
                        '&:hover': {
                            boxShadow: '0 2px 6px rgba(0, 0, 0, 0.4)',
                        }
                    }}>
                        <CardContent>
                            <Typography component="h2" variant="h6" color="primary" gutterBottom>
                                <b>Il mio profilo</b>
                            </Typography>
                            <Typography color="text.secondary">
                                Visualizza e modifica le informazioni del tuo profilo.
                            </Typography>
                        </CardContent>
                        <CardActions>
                            <Button size="small" color="primary" onClick={() => handleSelectTab("P")}>
                                Vai al profilo
                            </Button>
                        </CardActions>
                    </Card>
                </Grid>

                {!medico && (
                    <Grid item xs={12} sm={6} md={4}>
                        <Card sx={{
                            transition: 'box-shadow 0.2s',
                            '&:hover': {
                                boxShadow: '0 2px 6px rgba(0, 0, 0, 0.4)',
                            }
                        }}>
                            <CardContent>
                                <Typography component="h2" variant="h6" color="primary" gutterBottom>
                                    <b>Ultime visite</b>
                                </Typography>
                                <Typography color="text.secondary">
                                    Consulta l'elenco delle tue ultime visite mediche.
                                </Typography>
                            </CardContent>
                            <CardActions>
                                <Button size="small" color="primary" onClick={() => handleSelectTab("V")}>
                                    Vai alle visite
                                </Button>
                            </CardActions>
                        </Card>
                    </Grid>
                )}

                {medico && (
                    <Grid item xs={12} sm={6} md={4}>
                        <Card sx={{
                            transition: 'box-shadow 0.2s',
                            '&:hover': {
                                boxShadow: '0 2px 6px rgba(0, 0, 0, 0.4)',
                            }
                        }}>
                            <CardContent>
                                <Typography component="h2" variant="h6" color="primary" gutterBottom>
                                    <b>Registra visita medica</b>
                                </Typography>
                                <Typography color="text.secondary">
                                    Registra nel database una nuova visita medica per un paziente registrato.
                                </Typography>
                            </CardContent>
                            <CardActions>
                                <Button size="small" color="primary" onClick={() => handleSelectTab("I")}>
                                    Vai all'inserimento
                                </Button>
                            </CardActions>
                        </Card>
                    </Grid>
                )}

                <Grid item xs={12} sm={6} md={4}>
                    <Card sx={{
                        transition: 'box-shadow 0.2s',
                        '&:hover': {
                            boxShadow: '0 2px 6px rgba(0, 0, 0, 0.4)',
                        }
                    }}>
                        <CardContent>
                            <Typography component="h2" variant="h6" color="primary" gutterBottom>
                                {medico
                                    ? <b>Medici autorizzati</b>
                                    : <b>Elenco assistiti</b>
                                }
                            </Typography>
                            <Typography color="text.secondary">
                                {medico
                                    ? "Visualizza, aggiungi o rimuovi i medici autorizzati ad accedere alle tue informazioni."
                                    : "Visualizza un elenco di tutti i pazienti assistiti e ricerca mediante il codice fiscale."
                                }
                            </Typography>
                        </CardContent>
                        <CardActions>
                            <Button size="small" variant="outlined" color="primary"
                                    onClick={() => handleSelectTab("E")}>
                                Vai
                            </Button>
                        </CardActions>
                    </Card>
                </Grid>
            </Grid>
        </>
    )
}