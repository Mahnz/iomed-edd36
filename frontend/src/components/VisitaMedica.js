// VisitaMedica.js
import React from 'react';
import {Paper, Typography, Button, Container} from '@mui/material';
import {ArrowBack} from '@mui/icons-material';
import {Link} from 'react-router-dom';

export default function VisitaMedica({visita}) {
    // Verifica se la visita è stata passata come prop
    if (!visita) {
        return <Typography variant="body1">Seleziona una visita per visualizzare i dettagli.</Typography>;
    }

    return (
        <Paper sx={{
            p: 2,
            borderRadius: 2,
            display: 'flex',
            flexDirection: 'column',
            height: '100%',
            transition: 'box-shadow 0.2s',
            '&:hover': {boxShadow: '0 4px 8px rgba(0, 0, 0, 0.4)'},
        }}>
            <Typography component="h2" variant="h6" color="primary" gutterBottom>
                <b>{visita.name}</b>
            </Typography>
            <Typography color="text.secondary" gutterBottom>
                <b>Data:</b> {visita.date}
            </Typography>
            <Typography color="text.secondary" gutterBottom>
                <b>Medico:</b> {visita.doctor}
            </Typography>
            <Typography color="text.secondary" sx={{flex: 1}}>
                <b>Ultimo aggiornamento:</b> 13:50, 11/12/2021
            </Typography>
            <Container sx={{textAlign: 'center', pt: 2}}>
                <Button variant="outlined" color="primary" component={Link} to="/dashboard/visite">
                    <ArrowBack/>
                    Torna all'elenco
                </Button>
            </Container>
        </Paper>
    );
}
