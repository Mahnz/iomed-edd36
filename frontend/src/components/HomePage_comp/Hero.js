import React from 'react'
import {Grid, Typography, Button, Box} from '@mui/material'
import MyTeamImg from '../../images/myteam.jpg'

export default function Hero() {
    return (
        <Box sx={{
            // width: '100%',
            display: 'flex',
            minHeight: '85vh',
            alignItems: 'center',
            justifyContent: 'center'
        }} id="home"
        >
            <Grid container spacing={5} sx={{
                display: 'flex',
                alignItems: 'center',
                maxWidth: '75%'
            }}>
                <Grid item xs={12} md={7}>
                    <Typography variant="h3" fontWeight={700}>
                        IOMed
                    </Typography>
                    <Typography variant="h3" fontWeight={500} sx={{pb: 3, opacity: '0.7'}}>
                        Verso la digitalizzazione
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
                <Grid item xs={12} md={5}>
                    <img src={MyTeamImg} sx={{width: '100%'}}/>
                </Grid>
            </Grid>
        </Box>
    )
}