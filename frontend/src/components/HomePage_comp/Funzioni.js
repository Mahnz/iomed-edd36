// Funzioni.js
import React from 'react'
import {Grid, Typography, Box} from '@mui/material'
import {AllInclusive, PaidOutlined, EngineeringOutlined} from '@mui/icons-material'

export default function Funzioni() {
    return (
        <>
            <Typography variant="h4" sx={{textAlign: 'center', backgroundColor: '#ffff', pt: 4}} id="funzioni">
                La nostra piattaforma
            </Typography>
            <Box sx={{flexGrow: 1, backgroundColor: '#ffff', pt: 2, pb: 4}}>
                <Grid container sx={{
                    display: 'flex',
                    alignItems: 'center',
                    justifyContent: 'center',
                    // width: '100%',
                }}>
                    <Grid item xs={12} md={3.5} minHeight={270}
                          sx={{
                              backgroundColor: '#f2f0f1',
                              textAlign: 'center',
                              borderRadius: 3,
                              mr: 3,
                              p: 4
                          }}
                    >
                        <EngineeringOutlined sx={{fontSize: 100}} color="primary"/>
                        <Typography>Solving world problems through various web applications using efficient programs and
                            tools</Typography>
                    </Grid>
                    <Grid item xs={12} md={3.5} minHeight={270}
                          sx={{
                              backgroundColor: '#f2f0f1',
                              textAlign: 'center',
                              borderRadius: 3,
                              mr: 3,
                              p: 4
                          }}
                    >
                        <AllInclusive sx={{fontSize: 100}} color="primary"/>
                        <Typography>Through team work, we collaborate and deliver quality projects of high
                            standards</Typography>
                    </Grid>
                    <Grid item xs={12} md={3.5} minHeight={270}
                          sx={{
                              backgroundColor: '#f2f0f1',
                              textAlign: 'center',
                              borderRadius: 3,
                              p: 4
                          }}
                    >
                        <PaidOutlined sx={{fontSize: 100}} color="primary"/>
                        <Typography>Flexible payment plan is applicable to all our services</Typography>
                    </Grid>

                    {/* LINEA INFERIORE */}
                    <Grid item xs={12} md={3.5} minHeight={270}
                          sx={{
                              backgroundColor: '#f2f0f1',
                              textAlign: 'center',
                              borderRadius: 3,
                              mr: 3,
                              mt: 3,
                              p: 4
                          }}
                    >
                        <EngineeringOutlined sx={{fontSize: 100}} color="primary"/>
                        <Typography>Solving world problems through various web applications using efficient programs and
                            tools</Typography>
                    </Grid>
                    <Grid item xs={12} md={3.5} minHeight={270}
                          sx={{
                              backgroundColor: '#f2f0f1',
                              textAlign: 'center',
                              borderRadius: 3,
                              mr: 3,
                              mt: 3,
                              p: 4
                          }}
                    >
                        <AllInclusive sx={{fontSize: 100}} color="primary"/>
                        <Typography>Through team work, we collaborate and deliver quality projects of high
                            standards</Typography>
                    </Grid>
                    <Grid item xs={12} md={3.5} minHeight={270}
                          sx={{
                              backgroundColor: '#f2f0f1',
                              textAlign: 'center',
                              borderRadius: 3,
                              p: 4,
                              mt: 3
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