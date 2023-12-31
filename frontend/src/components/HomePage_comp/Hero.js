// Hero.js
import React from 'react'
import {Grid, Typography, Button, Box, useTheme, Link} from '@mui/material'
import Medico_PC from '../../images/medico_pc.jpg'

export default function Hero() {
    const theme = useTheme()
    return (
        <Box sx={{
            display: 'flex',
            minHeight: '95vh',
            alignItems: 'center',
            justifyContent: 'center',
            backgroundImage: `url(${Medico_PC})`,
            backgroundSize: 'cover',
            backgroundPosition: 'center',
        }}>
            <Grid container spacing={5} sx={{
                display: 'flex',
                alignItems: 'center',
                maxWidth: '80%'
            }}>
                <Grid item xs={6} md={12} sm={12}>
                    <Typography variant="h1" fontWeight={700}
                                color={theme.palette.common.white}
                                sx={{textShadow: '2px 2px 4px rgba(0, 0, 0, 0.5)'}}
                    >
                        IOMed
                    </Typography>
                    <Typography variant="h3" fontWeight={500} color={theme.palette.common.white}
                                sx={{pb: 4, opacity: '0.9', textShadow: '2px 2px 4px rgba(0, 0, 0, 0.5)'}}
                    >
                        Un passo <br/>verso la digitalizzazione
                    </Typography>
                    <Button variant="contained" color="primary" component={Link} href="#inizia"
                            sx={{
                                width: 300,
                                fontSize: 20,
                                borderRadius: 3,
                                backgroundColor: '#BE401E',
                                textShadow: '1px 1px 2px rgba(0, 0, 0, 0.5)',
                                boxShadow: '2px 2px 4px rgba(0, 0, 0, 0.5)',
                                '&:hover': {
                                    backgroundColor: '#fff',
                                    color: theme.palette.primary.main,
                                    textShadow: '2px 2px 4px rgba(0, 0, 0, 0)',
                                }
                            }}>
                        Inizia
                    </Button>
                </Grid>
            </Grid>
        </Box>
    )
}