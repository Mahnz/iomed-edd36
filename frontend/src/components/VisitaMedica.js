// VisitaMedica.js
import React, {useState, useEffect} from 'react'
import {
    Paper,
    Typography,
    Button,
    Container,
    Grid,
    Divider,
    CircularProgress
} from '@mui/material'
import {ArrowBack, CloudDownload} from '@mui/icons-material'
import {Link, useNavigate} from 'react-router-dom'
import axios from "axios"
import dayjs from 'dayjs'

export default function VisitaMedica({visita}) {
    // todo - Da rimuovere quando la visita viene passata come parametro
    const navigate = useNavigate();
    const [details, setDetails] = useState({});
    const [files, setFiles] = useState([]);
    const [loading, setLoading] = useState(false);

    useEffect(() => {
        if (visita === "") {
            navigate(-1);
        }
    }, [visita]);

    useEffect(() => {
        const readVisitaMedica = async () => {
            try {
                const response = await axios.get(`http://localhost:3001/api/ipfs/getSingleVisitaByCF/${visita.codiceFiscale}/${visita.fullName}`);
                if (response.status === 200) {
                    setDetails(response.data.details)
                    setFiles(response.data.files)
                } else {
                    console.error('Errore nella richiesta:', response.status);
                }
            } catch (error) {
                console.error("Errore durante la lettura della visita:", error)
            }
        }

        readVisitaMedica()
    }, [])


    // ! GESTIONDE DEL DOWNLOAD DEI FILE
    const handleDownload = async (file) => {
        const filename = file.name
        console.log("Stiamo leggendo: " + filename)
        try {
            setLoading(true)
            const response = await axios.get(`http://localhost:3001/api/ipfs/download/${visita.codiceFiscale}/${visita.fullName}/${filename}`, {responseType: 'arraybuffer'})
            const arrayBuffer = response.data;
            const uint8Array = new Uint8Array(arrayBuffer);
            const blob = new Blob([uint8Array], {type: response.headers['content-type']});

            const url = URL.createObjectURL(blob);
            const a = document.createElement('a');
            a.href = url
            a.download = filename
            document.body.appendChild(a)
            a.click()
            document.body.removeChild(a)
            window.URL.revokeObjectURL(url);
            setLoading(false);
        } catch (error) {
            console.error(error);
            setLoading(false);
        } finally {
            setLoading(false);
        }
    }

    return (
        <>
            {loading && (
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
                        zIndex: 999, // Assicura che l'overlay sia sopra tutto il resto
                    }}
                >
                    <CircularProgress color="primary"/>
                    <p
                        style={{
                            color: '#fff'
                        }}
                    >Download file in corso...</p>
                </div>
            )}
            <Container sx={{mt: 4}}>
                {visita !== "" && (
                    <Grid container spacing={2}>
                        <Grid item xs={12}>
                            <Typography variant="h4" color="primary">
                                <b>{details.nomeVisita}</b>
                            </Typography>
                        </Grid>
                        <Grid item xs={6}>
                            <Typography color="text.secondary">
                                <b>Data:</b> {details.dataVisita}
                            </Typography>
                        </Grid>
                        <Grid item xs={6}>
                            <Typography color="text.secondary">
                                <b>Medico:</b> {details.medico}
                            </Typography>
                        </Grid>
                        <Grid item xs={12}>
                            <Divider/>
                        </Grid>
                        <Grid item xs={12}>
                            <Typography color="text.primary">
                                <b>Descrizione: </b>
                            </Typography>
                            {details.descrizione ? (
                                // <Typography color="text.secondary">{details.descrizione}</Typography>
                                details.descrizione.split('\n').map((line, index) => (
                                    <Typography key={index} color="text.secondary">
                                        {line}
                                        <br/>
                                    </Typography>
                                ))
                            ) : (
                                <Typography color="text.secondary"><em>Nessuna descrizione presente</em></Typography>
                            )}
                        </Grid>

                        <Grid item xs={6}>
                            {files.map((file, index) => (
                                <Paper key={index} elevation={1}
                                       sx={{
                                           padding: 2,
                                           mt: 2,
                                           cursor: 'pointer',
                                           display: 'flex',
                                           alignItems: 'center',
                                           height: 60,
                                           transition: 'box-shadow 0.2s',
                                           '&:hover': {
                                               boxShadow: '0 2px 3px rgba(0, 0, 0, 0.4)',
                                           },
                                       }}>
                                    <Typography variant="body2" sx={{flex: 1, fontSize: 15}}>
                                        <b>{file.name}</b>
                                    </Typography>
                                    <Button
                                        size="medium"
                                        variant={loading ? "text" : "contained"}
                                        color={loading ? "error" : "success"}
                                        startIcon={loading ? null : <CloudDownload/>}
                                        onClick={() => handleDownload(file, "0")}>
                                        {loading ? 'In Download...' : 'Scarica'}
                                    </Button>
                                </Paper>
                            ))}
                        </Grid>
                        <Grid item xs={12}>
                            <Typography color="text.secondary">
                                <b>Ultimo aggiornamento: </b> {dayjs(details.lastUpdate).format('HH:mm, DD/MM/YYYY')}
                            </Typography>
                        </Grid>
                        <Grid item xs={12}>
                            <Container sx={{textAlign: 'center', pt: 2}}>
                                <Button variant="contained" color="primary" component={Link} to="/dashboard/visite"
                                        startIcon={<ArrowBack/>}>
                                    Torna all'elenco
                                </Button>
                            </Container>
                        </Grid>
                    </Grid>
                )}
            </Container>
        </>
    );
}