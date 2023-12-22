// HomePage.js
import React from 'react'
import {Container, Typography, Card, CardContent, Button, Grid, styled} from '@mui/material'

// Definisci uno stile con makeStyles
const useStyles = styled((theme) => ({
    root: {
        marginTop: theme.spacing(4),
    },
    title: {
        textAlign: 'center',
        marginBottom: theme.spacing(2),
    },
    card: {
        minWidth: 200,
        textAlign: 'center',
    },
}))

// Componente principale della homepage
export default function HomePage() {

    return (
        <Container className={classes.root}>
            {/* Immagine e Titolo */}
            <img src="url-dell-immagine" alt="Descrizione immagine"/>
            <Typography variant="h4" className={classes.title}>
                Titolo della Tua App Medica
            </Typography>

            {/* Card con pulsanti di redirect */}
            <Grid container spacing={3} justifyContent="center">
                <Grid item xs={12} sm={6} md={4}>
                    <Card className={classes.card}>
                        <CardContent>
                            <Typography variant="h6">Paziente</Typography>
                            <Button variant="contained" color="primary" href="/login-paziente">
                                Login
                            </Button>
                            <Button variant="contained" color="secondary" href="/signup-paziente">
                                Signup
                            </Button>
                        </CardContent>
                    </Card>
                </Grid>

                <Grid item xs={12} sm={6} md={4}>
                    <Card className={classes.card}>
                        <CardContent>
                            <Typography variant="h6">Medico</Typography>
                            <Button variant="contained" color="primary" href="/login-medico">
                                Login
                            </Button>
                            <Button variant="contained" color="secondary" href="/signup-medico">
                                Signup
                            </Button>
                        </CardContent>
                    </Card>
                </Grid>
            </Grid>
        </Container>
    )
}
