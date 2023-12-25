import React from 'react'
import {Grid, Typography, Box} from '@mui/material'
import {AllInclusive, PaidOutlined, EngineeringOutlined} from '@mui/icons-material'

export default function Section() {
    return (
        <>
            <Typography variant="h4" sx={{textAlign: 'center'}}>
                Cosa offriamo
            </Typography>
            <Box sx={{flexGrow: 1, minHeight: '400px'}}>
                <Grid container sx={{
                    display: 'flex',
                    alignItems: 'center',
                    justifyContent: 'center',
                    width: '100%',
                    minHeight: '500px'
                }}>
                    <Grid
                        item
                        xs={12}
                        md={3.5}
                        minHeight={300}
                        sx={{
                            backgroundColor: '#f2f0f1',
                            textAlign: 'center',
                            padding: '30px',
                            width: '200px',
                            borderRadius: '10px',
                            margin: '10px !important',
                        }}
                    >
                        <EngineeringOutlined sx={{fontSize: 100}} color="primary"/>
                        <Typography>Solving world problems through various web applications using efficient programs and
                            tools</Typography>
                    </Grid>
                    <Grid
                        item
                        xs={12}
                        md={3.5}
                        minHeight={300}
                        sx={{
                            backgroundColor: '#f2f0f1',
                            textAlign: 'center',
                            padding: '30px',
                            width: '200px',
                            borderRadius: '10px',
                            margin: '10px !important',
                        }}
                    >
                        <AllInclusive sx={{fontSize: 100}} color="primary"/>
                        <Typography>Through team work, we collaborate and deliver quality projects of high
                            standards</Typography>
                    </Grid>
                    <Grid
                        item
                        xs={12}
                        md={3.5}
                        minHeight={300}
                        sx={{
                            backgroundColor: '#f2f0f1',
                            textAlign: 'center',
                            padding: '30px',
                            width: '200px',
                            borderRadius: '10px',
                            margin: '10px !important',
                        }}
                    >
                        <PaidOutlined sx={{fontSize: 100}} color="primary"/>
                        <Typography>Flexible payment plan is applicable to all our services</Typography>
                    </Grid>

                    {/* LINEA INFERIORE */}
                    <Grid
                        item
                        xs={12}
                        md={3.5}
                        minHeight={300}
                        sx={{
                            backgroundColor: '#f2f0f1',
                            textAlign: 'center',
                            padding: '30px',
                            width: '200px',
                            borderRadius: '10px',
                            margin: '10px !important',
                        }}
                    >
                        <EngineeringOutlined sx={{fontSize: 100}} color="primary"/>
                        <Typography>Solving world problems through various web applications using efficient programs and
                            tools</Typography>
                    </Grid>
                    <Grid
                        item
                        xs={12}
                        md={3.5}
                        minHeight={300}
                        sx={{
                            backgroundColor: '#f2f0f1',
                            textAlign: 'center',
                            padding: '30px',
                            width: '200px',
                            borderRadius: '10px',
                            margin: '10px !important',
                        }}
                    >
                        <AllInclusive sx={{fontSize: 100}} color="primary"/>
                        <Typography>Through team work, we collaborate and deliver quality projects of high
                            standards</Typography>
                    </Grid>
                    <Grid
                        item
                        xs={12}
                        md={3.5}
                        minHeight={300}
                        sx={{
                            backgroundColor: '#f2f0f1',
                            textAlign: 'center',
                            padding: '30px',
                            width: '200px',
                            borderRadius: '10px',
                            margin: '10px !important',
                        }}
                    >
                        <PaidOutlined sx={{fontSize: 100}} color="primary"/>
                        <Typography>Flexible payment plan is applicable to all our services</Typography>
                    </Grid>
                </Grid>
            </Box>
        </>
    )
}