// ElencoVisite.js
import React, {useState, useEffect} from 'react'
import {useNavigate} from "react-router-dom"
import axios from "axios"
import Cookies from "universal-cookie"
import {Button, Container, Grid, Paper, Typography} from "@mui/material"

export default function ElencoVisite({setVisita}) {

    // TODO - Da rimuovere quando le visite vengono lette da IPFS
    const temp = [
        {
            name: "Visita allergologica",
            date: "12/12/2021",
            doctor: "Mario Rossi"
        },
        {
            name: "Visita oculistica",
            date: "04/10/2021",
            doctor: "Rario Mossi"
        },
        {
            name: "Visita cardiologica",
            date: "12/09/2021",
            doctor: "Mario Rossi"
        },
        {
            name: "Visita dermatologica",
            date: "12/09/2021",
            doctor: "Mario Rossi"
        },
        {
            name: "Visita ortopedica",
            date: "12/09/2021",
            doctor: "Mario Rossi"
        },
        {
            name: "Visita ortopedica",
            date: "12/09/2021",
            doctor: "Mario Rossi"
        },
        {
            name: "Visita ortopedica",
            date: "12/09/2021",
            doctor: "Mario Rossi"
        },
        {
            name: "Visita ortopedica",
            date: "12/09/2021",
            doctor: "Mario Rossi"
        },
        {
            name: "Visita ortopedica",
            date: "12/09/2021",
            doctor: "Mario Rossi"
        },
        {
            name: "Visita ortopedica",
            date: "12/09/2021",
            doctor: "Mario Rossi"
        },
    ]
    const navigate = useNavigate()
    const cookies = new Cookies()
    const [visite, setVisite] = useState([])

    useEffect(() => {
        const fetchVisiteMediche = async () => {
            try {
                // TODO - Da rimuovere quando il codice fiscale viene letto dal cookie
                // const codiceFiscale = cookies.get('codiceFiscale')
                const codiceFiscale = 'MZZDNC02B23A662Z'
                const response = await axios.get(`http://localhost:3001/api/ipfs/getAllVisiteByCF/${codiceFiscale}`)
                setVisite(response.data.visite)
            } catch (error) {
                console.error("Errore durante il recupero delle visite mediche:", error)
            }
        }

        fetchVisiteMediche()
    }, []) // Avviato solo al primo rendering della pagina

    const handleOpen = (visita) => {
        setVisita(visita)
        navigate('/dashboard/visite/visualizzaVisita')
    }

    return (
        <>
            <Typography variant="h4" mb={4}>
                Le tue ultime visite mediche
            </Typography>
            <Grid container spacing={5}>
                {visite.map((visit, index) => (
                    <Grid item xs={12} md={8} lg={6} key={index}>
                        <Paper
                            sx={{
                                p: 2,
                                borderRadius: 2,
                                display: 'flex',
                                flexDirection: 'column',
                                height: 220,
                                transition: 'box-shadow 0.2s',
                                '&:hover': {
                                    boxShadow: '0 4px 8px rgba(0, 0, 0, 0.4)',
                                },
                            }}>
                            <div style={{display: 'flex', flexDirection: 'column', height: '100%'}}>
                                <div style={{flexGrow: 1}}>
                                    <Typography component="h2" variant="h6" color="primary" gutterBottom>
                                        <b>{visit.nomeVisita}</b>
                                    </Typography>
                                    <Typography color="text.secondary" gutterBottom>
                                        <b>Data:</b> {visit.dataVisita}
                                    </Typography>
                                    <Typography color="text.secondary" gutterBottom>
                                        <b>Medico:</b> {visit.medico}
                                    </Typography>
                                    <Typography color="text.secondary" sx={{flex: 1}}>
                                        <b>Ultimo aggiornamento:</b> 13:50, 11/12/2021
                                    </Typography>
                                </div>
                                <Container sx={{textAlign: 'center', pb: 1}}>
                                    <Button variant="contained" color="primary" onClick={() => handleOpen(visit)}>
                                        VISUALIZZA DETTAGLI
                                    </Button>
                                </Container>
                            </div>
                        </Paper>
                    </Grid>
                ))}
            </Grid>
        </>
    )
}