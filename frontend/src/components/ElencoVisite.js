// ElencoVisite.js
import React, {useState, useEffect} from 'react'
import {useLocation, useNavigate} from "react-router-dom"
import axios from "axios"
import Cookies from "universal-cookie"
import {Button, Container, Grid, Link, Paper, Typography} from "@mui/material"
import {ArrowBack} from "@mui/icons-material";

export default function ElencoVisite({setVisita, codiceUtente}) {
    const navigate = useNavigate()
    const location = useLocation();
    const cookies = new Cookies()
    const [visite, setVisite] = useState([])
    const [medico, setMedico] = useState(null)

    useEffect(() => {
        const fetchVisiteMediche = async () => {
            try {
                if (cookies.get("token")) {
                    if (cookies.get("type") === "medico") {
                        setMedico(true)
                        await axios.get(`http://localhost:3001/api/ipfs/getAllVisiteByCF/${location.state}`)
                            .then(res => setVisite(res.data.visite)).catch(e => console.log(e));
                    } else if (cookies.get("type") === "paziente") {
                        setMedico(false)
                        let CF = cookies.get('token')

                        const response = await axios.get(`http://localhost:3001/api/bc/getCF/${CF}`)
                        if (response.status === 200) {
                            await axios.get(`http://localhost:3001/api/ipfs/getAllVisiteByCF/${response.data}`)
                                .then(res => setVisite(res.data.visite)).catch(e => console.log(e));
                        }
                    }
                }
            } catch (error) {
                console.error("Errore durante il recupero delle visite mediche:", error)
            }
        }
        fetchVisiteMediche()
    }, []) // Avviato solo al primo rendering della pagina

    const handleOpen = (visit) => {
        setVisita(visit)
        console.log(visit)
        if (medico) {
            navigate('/dashboard/listaAssistiti/visite/visualizzaVisita')
        } else {
            navigate('/dashboard/visite/visualizzaVisita')
        }
    }

    return (
        <>
            <Typography variant="h4" mb={4}>
                Le tue ultime visite mediche
            </Typography>
            <Grid container spacing={5}>
                {visite.length === 0
                    ? (
                        <Grid item xs={12}
                              sx={{display: 'flex', justifyContent: 'center', height: '100vh', mt: 6}}>
                            <Typography variant="h5">
                                <em>Non sono presenti visite mediche</em>
                            </Typography>
                        </Grid>
                    ) : (
                        visite.map((visit, index) => (
                            <Grid item xs={12} md={8} lg={6} key={index}>
                                <Paper
                                    sx={{
                                        p: 2,
                                        borderRadius: 2,
                                        display: 'flex',
                                        flexDirection: 'column',
                                        height: 200,
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
                                        </div>
                                        <Container sx={{textAlign: 'center', pb: 1}}>
                                            <Button variant="contained" color="primary"
                                                    onClick={() => handleOpen(visit)}>
                                                VISUALIZZA DETTAGLI
                                            </Button>
                                        </Container>
                                    </div>
                                </Paper>
                            </Grid>
                        )))}
                {medico &&
                    <Grid item xs={12}>
                        <Container sx={{textAlign: 'center', pt: 2}}>
                            <Button variant="contained" color="primary" component={Link} to="/dashboard/listaAssistiti"
                                    startIcon={<ArrowBack/>}>
                                Torna all'elenco
                            </Button>
                        </Container>
                    </Grid>
                }
            </Grid>
        </>
    )
}
