// ElencoVisite.js
import React from 'react'
import {Button, Container, Grid, Paper, Typography} from "@mui/material";
import {useNavigate} from "react-router-dom";

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

    const handleOpen = (visita) => {
        console.log(visita.date)
        setVisita(visita)
        navigate('/dashboard/visite/visualizzaVisita')
    }

    return (
        <>
            <Typography variant="h4" mb={4}>
                Le tue ultime visite mediche
            </Typography>
            <Grid container spacing={5}>
                {temp.map((visit, index) => (
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
                            }}
                        >
                            <div style={{display: 'flex', flexDirection: 'column', height: '100%'}}>
                                <div style={{flexGrow: 1}}>
                                    <Typography component="h2" variant="h6" color="primary" gutterBottom>
                                        <b>{visit.name}</b>
                                    </Typography>
                                    <Typography color="text.secondary" gutterBottom>
                                        <b>Data:</b> {visit.date}
                                    </Typography>
                                    <Typography color="text.secondary" gutterBottom>
                                        <b>Medico:</b> {visit.doctor}
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