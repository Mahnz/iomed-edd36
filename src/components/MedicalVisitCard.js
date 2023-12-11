import React from 'react'
import {Typography, Button, Container} from '@mui/material'

export default function MedicalVisitCard({name, date, doctor}) {
    const handleOpen = (e) => {
        e.preventDefault();
    }

    return (
        <>
            <div style={{display: 'flex', flexDirection: 'column', height: '100%'}}>
                <div style={{flexGrow: 1}}>
                    <Typography component="h2" variant="h6" color="primary" gutterBottom>
                        <b>{name}</b>
                    </Typography>
                    <Typography color="text.secondary" gutterBottom>
                        <b>Data:</b> {date}
                    </Typography>
                    <Typography color="text.secondary" gutterBottom>
                        <b>Medico:</b> {doctor}
                    </Typography>
                    <Typography color="text.secondary" sx={{flex: 1}}>
                        <b>Ultimo aggiornamento:</b> 13:50, 11/12/2021
                    </Typography>
                </div>
                <Container sx={{textAlign: 'center', pb: 1}}>
                    <Button variant="contained" color="primary" onClick={handleOpen}>
                        VISUALIZZA DETTAGLI
                    </Button>
                </Container>
            </div>
            {/*<Typography component="h2" variant="h6" color="primary" gutterBottom>*/}
            {/*    <b>{name}</b>*/}
            {/*</Typography>*/}
            {/*<Typography color="text.secondary" gutterBottom>*/}
            {/*    <b>Data:</b> {date}*/}
            {/*</Typography>*/}
            {/*<Typography color="text.secondary" gutterBottom sx={{flex: 1}}>*/}
            {/*    <b>Medico di riferimento:</b> {doctor}*/}
            {/*</Typography>*/}
            {/*<Button variant="contained" color="primary" sx={{flex: 1}} onClick={handleOpen}>*/}
            {/*    Espandi*/}
            {/*</Button>*/}
        </>
    )
}