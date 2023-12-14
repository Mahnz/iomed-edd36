// VisitaMedica.js
import React from 'react';
import {Paper, Typography, Button, Container, Grid, Divider, IconButton} from '@mui/material';
import {ArrowBack, CloudDownload} from '@mui/icons-material';
import {Link} from 'react-router-dom';

export default function VisitaMedica({visita}) {
    if (!visita) {
        return <Typography variant="body1">Seleziona una visita per visualizzare i dettagli.</Typography>;
    }

    return (
        <Container sx={{mt: 4}}>
            <Grid container spacing={2}>
                <Grid item xs={12}>
                    <Typography variant="h6" color="primary">
                        <b>{visita.name}</b>
                    </Typography>
                </Grid>
                <Grid item xs={6}>
                    <Typography color="text.secondary">
                        <b>Data:</b> {visita.date}
                    </Typography>
                </Grid>
                <Grid item xs={6}>
                    <Typography color="text.secondary">
                        <b>Medico:</b> {visita.doctor}
                    </Typography>
                </Grid>
                <Grid item xs={12}>
                    <Divider/>
                </Grid>
                <Grid item xs={12}>
                    <Typography color="text.secondary">
                        <b>Descrizione:</b> {visita.description}
                    </Typography>
                </Grid>
                <Grid item xs={12}>
                    <Paper elevation={3} sx={{padding: 2, mt: 2}}>
                        <IconButton
                            color="primary"
                            aria-label="scarica file"
                            component="span"
                            onClick={() => window.alert('Scarica il file qui')}
                        >
                            <CloudDownload/>
                        </IconButton>
                        <Typography variant="body2">
                            <b>File:</b> Test.pdf
                        </Typography>
                    </Paper>
                    {visita.file && (
                        <Paper elevation={3} sx={{padding: 2, mt: 2}}>
                            <IconButton
                                color="primary"
                                aria-label="scarica file"
                                component="span"
                                onClick={() => window.alert('Scarica il file qui')}
                            >
                                <CloudDownload/>
                            </IconButton>
                            <Typography variant="body2">
                                <b>File:</b> Test.pdf
                            </Typography>
                        </Paper>
                    )}
                </Grid>
                <Grid item xs={12}>
                    <Typography color="text.secondary">
                        <b>Ultimo aggiornamento:</b> 13:50, 11/12/2021
                    </Typography>
                </Grid>
                <Grid item xs={12}>
                    <Container sx={{textAlign: 'center', pt: 2}}>
                        <Button variant="outlined" color="primary" component={Link} to="/dashboard/visite">
                            <ArrowBack/>
                            Torna all'elenco
                        </Button>
                    </Container>
                </Grid>
            </Grid>
        </Container>
        // <Paper sx={{
        //     p: 2,
        //     borderRadius: 2,
        //     display: 'flex',
        //     flexDirection: 'column',
        //     height: '100%',
        //     transition: 'box-shadow 0.2s',
        //     '&:hover': {boxShadow: '0 4px 8px rgba(0, 0, 0, 0.4)'},
        // }}>
        //     <Typography component="h2" variant="h6" color="primary" gutterBottom>
        //         <b>{visita.name}</b>
        //     </Typography>
        //     <Typography color="text.secondary" gutterBottom>
        //         <b>Data:</b> {visita.date}
        //     </Typography>
        //     <Typography color="text.secondary" gutterBottom>
        //         <b>Medico:</b> {visita.doctor}
        //     </Typography>
        //     <Typography color="text.secondary" sx={{flex: 1}}>
        //         <b>Ultimo aggiornamento:</b> 13:50, 11/12/2021
        //     </Typography>
        //     <Container sx={{textAlign: 'center', pt: 2}}>
        //         <Button variant="outlined" color="primary" component={Link} to="/dashboard/visite">
        //             <ArrowBack/>
        //             Torna all'elenco
        //         </Button>
        //     </Container>
        // </Paper>
    );
}