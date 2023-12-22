// VisitaMedica.js
import React, {useState, useEffect} from 'react'
import {Paper, Typography, Button, Container, Grid, Divider, IconButton, Menu, MenuItem} from '@mui/material'
import {ArrowBack, CloudDownload, MoreVert} from '@mui/icons-material'
import {Link, useNavigate} from 'react-router-dom'
import axios from "axios"
import dayjs from 'dayjs'
import {BufferList} from 'bl'

export default function VisitaMedica({visita}) {

    // TODO - Da rimuovere quando la visita viene passata come parametro
    const navigate = useNavigate();
    const [details, setDetails] = useState({});
    const [files, setFiles] = useState([]);

    useEffect(() => {
        if (visita === "") {
            navigate(-1);
        }
    }, [visita]);

    useEffect(() => {
        const readVisitaMedica = async () => {
            try {
                // TODO - Da rimuovere quando il codice fiscale viene letto dal cookie
                // const codiceFiscale = cookies.get('codiceFiscale')
                const codiceFiscale = 'MZZDNC02B23A662Z'
                const response = await axios.get(`http://localhost:3001/api/ipfs/getSingleVisitaByCF/${codiceFiscale}/${visita.fullName}`);

                if (response.status === 200) {
                    setDetails(response.data.details)
                    setFiles(response.data.files)
                    console.log('Dettagli visita:', details)
                    console.log('File della visita:', files)
                } else {
                    console.error('Errore nella richiesta:', response.status);
                }

            } catch (error) {
                console.error("Errore durante la lettura della visita:", error)
            }
        };

        readVisitaMedica()
    }, [])

    // ? Gestione del menù di opzioni per i file
    const [anchorEl, setAnchorEl] = useState(null)
    const handleMenuClick = (event) => {
        setAnchorEl(event.currentTarget)
    };
    const handleMenuClose = () => {
        setAnchorEl(null)
    };
    const handleDownload = async (file) => {
        try {
            const content = file.content;
            console.log(content)
            const blob = new Blob([content], {type: 'application/pdf'})
            console.log(blob)
            // const blob = new Blob([file.content], {type: 'application/pdf'})
            const link = document.createElement('a')
            const url = URL.createObjectURL(blob)
            link.href = url
            link.download = file.name
            document.body.appendChild(link)
            link.click()
            document.body.removeChild(link)
            URL.revokeObjectURL(url)
        } catch (error) {
            console.error('Errore durante la conversione del contenuto in Blob:', error)
        }
    }

    const handleOpenInNewTab = () => {
        window.alert('Apri il file in una nuova pagina')
        handleMenuClose()
    }

    return (
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
                        <Typography color="text.secondary">
                            <b>Descrizione: </b>
                            {details.descrizione ? (
                                // <Typography color="text.secondary">{details.descrizione}</Typography>
                                details.descrizione.split('\n').map((line, index) => (
                                    <Typography key={index}>
                                        {line}
                                        <br/>
                                    </Typography>
                                ))
                            ) : (
                                <em>Nessuna descrizione presente</em>
                            )}
                        </Typography>
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
                                <Menu
                                    id="file-options-menu"
                                    anchorEl={anchorEl}
                                    open={Boolean(anchorEl)}
                                    onClose={handleMenuClose}
                                >
                                    <MenuItem onClick={handleDownload}>Scarica</MenuItem>
                                    <MenuItem onClick={handleOpenInNewTab}>Apri in nuova pagina</MenuItem>
                                </Menu>
                                <Typography variant="body2" sx={{flex: 1, fontSize: 15}}>
                                    <b>{file.name}</b>
                                </Typography>
                                <Button
                                    size="small"
                                    color="primary"
                                    startIcon={<CloudDownload/>}
                                    onClick={() => handleDownload(file)}>
                                    Scarica
                                </Button>
                                <IconButton
                                    color="primary"
                                    aria-label="opzioni file"
                                    component="span"
                                    onClick={handleMenuClick}
                                >
                                    <MoreVert/>
                                </IconButton>
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
    );
}