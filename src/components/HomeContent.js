import React from 'react'
import {Grid, Card, CardContent, Typography, CardActions, Button} from "@mui/material";

export default function HomeContent({handleSelectTab}) {
    return (
        <Grid container spacing={3}>
            <Grid item xs={12} sm={6} md={4}>
                <Card>
                    <CardContent>
                        <Typography variant="h6">Il mio profilo</Typography>
                        <Typography color="text.secondary">
                            Visualizza e modifica le informazioni del tuo profilo.
                        </Typography>
                    </CardContent>
                    <CardActions>
                        <Button size="small" color="primary" onClick={() => handleSelectTab("P")}>
                            Vai al profilo
                        </Button>
                    </CardActions>
                </Card>
            </Grid>

            <Grid item xs={12} sm={6} md={4}>
                <Card>
                    <CardContent>
                        <Typography variant="h6">Ultime visite</Typography>
                        <Typography color="text.secondary">
                            Consulta l'elenco delle tue ultime visite mediche.
                        </Typography>
                    </CardContent>
                    <CardActions>
                        <Button size="small" color="primary" onClick={() => handleSelectTab("V")}>
                            Vai alle visite
                        </Button>
                    </CardActions>
                </Card>
            </Grid>

            <Grid item xs={12} sm={6} md={4}>
                <Card>
                    <CardContent>
                        <Typography variant="h6">Medici autorizzati</Typography>
                        <Typography color="text.secondary">
                            Visualizza, aggiungi o rimuovi i medici autorizzati ad accedere alle tue informazioni.
                        </Typography>
                    </CardContent>
                    <CardActions>
                        <Button size="small" color="primary" onClick={() => handleSelectTab("P")}>
                            Visualizza dettagli
                        </Button>
                    </CardActions>
                </Card>
            </Grid>
        </Grid>
    )
}