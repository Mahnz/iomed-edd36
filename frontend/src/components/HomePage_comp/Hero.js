import React from 'react'
import {Grid, Typography, Button, Box} from '@mui/material'
import Medico_PC from '../../images/medico_pc.jpg'

export default function Hero() {
    return (
        <Box sx={{
            display: 'flex',
            minHeight: '85vh',
            alignItems: 'center',
            justifyContent: 'center',
            backgroundImage: `url(${Medico_PC})`,
            backgroundSize: 'cover',
            backgroundPosition: 'center',
            // filter: 'blur(8px)'
        }}>
            <Grid container spacing={5} sx={{
                display: 'flex',
                alignItems: 'center',
                maxWidth: '90%'
            }}>
                <Grid item xs={6} md={12} sm={12}>
                    <Typography variant="h2" fontWeight={700}>
                        IOMed
                    </Typography>
                    <Typography variant="h3" fontWeight={500} sx={{pb: 3, opacity: '0.7'}}>
                        Un passo verso <br/>la digitalizzazione
                    </Typography>
                    <Typography variant="h5" sx={{
                        opacity: '0.5',
                        pb: 3
                    }}>
                        Hire professionals who will help your business make 10X your
                        previous income. With over 5years experience in Marketing & Business
                        strategy, we are your best client.
                    </Typography>
                    <Button
                        variant="contained"
                        color="primary"
                        sx={{width: 200, fontSize: 17}}>
                        Inizia
                    </Button>
                </Grid>
                {/*<Grid item xs={12} md={5}>*/}
                {/*    <img src={MyTeamImg} sx={{width: '100%'}}/>*/}
                {/*</Grid>*/}
            </Grid>
        </Box>
    )
}