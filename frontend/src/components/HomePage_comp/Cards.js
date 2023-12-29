// Cards.js
import React from 'react'
import {Grid, Typography, Button, Card, CardContent, CardActions, Box, Tooltip, Link} from '@mui/material'

export default function Cards() {
    return (
        <>
            <Typography variant="h4" sx={{textAlign: 'center', backgroundColor: '#f2f0f1', pt: 4}}>
                Medico o Paziente? Inizia subito!
            </Typography>
            <Box
                display="flex"
                justifyContent="center"
                alignItems="center"
                minHeight="45vh"
                sx={{backgroundColor: '#f2f0f1', pb: 3}}
            >
                <Grid container spacing={6} sx={{justifyContent: 'center'}}>
                    {/* Card Paziente */}
                    <Grid item xs={10} md={5}>
                        <Card sx={{
                            height: "35vh",
                            borderRadius: 3,
                            display: 'flex',
                            flexDirection: 'column',
                            justifyContent: 'space-between'
                        }}>
                            <CardContent>
                                <Typography variant="h5" gutterBottom textAlign="center" fontWeight={600}>
                                    Paziente
                                </Typography>
                                <Typography variant="body1" sx={{mx: 2}}>
                                    Accedi o registrati come Paziente per usufruire delle funzionalità a te
                                    dedicate.<br/>
                                    Visualizza le tue visite mediche, consulta comodamente i documenti e gestisci in
                                    sicurezza le autorizzazioni di accesso ai dati.
                                </Typography>
                            </CardContent>
                            <CardActions sx={{justifyContent: 'center', mb: 2}}>
                                <Tooltip title="Accedi come paziente" placement="left-end">
                                    <Button component={Link} href="/loginPaziente" variant="outlined" color="primary">
                                        Accedi
                                    </Button>
                                </Tooltip>
                                <Tooltip title="Registrati come paziente" placement="right-end">
                                    <Button component={Link} href="/signupPaziente" variant="contained" color="primary">
                                        Registrati
                                    </Button>
                                </Tooltip>
                            </CardActions>
                        </Card>
                    </Grid>

                    {/* Card Medico */}
                    <Grid item xs={10} md={5}>
                        <Card sx={{
                            height: "35vh",
                            borderRadius: 3,
                            display: 'flex',
                            flexDirection: 'column',
                            justifyContent: 'space-between'
                        }}>
                            <CardContent>
                                <Typography variant="h5" gutterBottom textAlign="center" fontWeight={600}>
                                    Medico
                                </Typography>
                                <Typography variant="body1" sx={{mx: 1}}>
                                    Sei un professionista? Entra per registrare visite mediche, richiedere l'accesso ai
                                    dati dei tuoi assistiti e consultare liberamente tutta la documentazione.
                                </Typography>
                            </CardContent>
                            <CardActions sx={{justifyContent: 'center', marginTop: 'auto', mb: 2}}>
                                <Tooltip title="Accedi come medico" placement="left-end">
                                    <Button component={Link} href="/loginMedico" variant="outlined" color="primary">
                                        Accedi
                                    </Button>
                                </Tooltip>
                                <Tooltip title="Registrati come medico" placement="right-end">
                                    <Button component={Link} href="/signupMedico" variant="contained" color="primary">
                                        Registrati
                                    </Button>
                                </Tooltip>
                            </CardActions>
                        </Card>
                    </Grid>
                </Grid>
            </Box>
        </>
    )
}