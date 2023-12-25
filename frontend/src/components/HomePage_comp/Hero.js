import React from 'react'
import {Grid, Typography, Button, Box} from '@mui/material'
import MyTeamImg from '../../images/myteam.jpg'

export default function Hero() {
    return (
        <Box sx={{
            width: '100%',
            display: 'flex',
            minHeight: '600px',
            alignItems: 'center',
            justifyContent: 'center'
        }}>
            <Grid container spacing={6} sx={{
                display: 'flex',
                alignItems: 'center',
                maxWidth: '1300px',
                padding: '50px'
            }}>
                <Grid item xs={12} md={7}>
                    <Typography variant="h3" fontWeight={700} sx={{paddingBottom: '15px'}}>
                        Let's scale your business
                    </Typography>
                    <Typography variant="h6" sx={{
                        opacity: '0.4',
                        paddingBottom: '30px'
                    }}>
                        Hire professionals who will help your business make 10X your
                        previous income. With over 5years experience in Marketing & Business
                        strategy, we are your best client.
                    </Typography>
                    <Button
                        variant="contained"
                        color="primary"
                        sx={{width: '200px', fontSize: '16px'}}
                    >
                        HIRE US
                    </Button>
                </Grid>
                <Grid item xs={12} md={5}>
                    <img src={MyTeamImg} alt="My Team" sx={{width: '100%'}}/>
                </Grid>
            </Grid>
        </Box>
    )
}