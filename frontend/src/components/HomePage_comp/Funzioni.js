// Funzioni.js
import React from 'react'
import {Grid, Typography, Box, useTheme} from '@mui/material'
import {
    AllInclusive,
    PaidOutlined,
    EngineeringOutlined, PersonOutlineOutlined
} from '@mui/icons-material'
import {FontAwesomeIcon} from "@fortawesome/react-fontawesome";
import {
    faEarthEurope,
    faLock,
    faUser,
    faUserNurse,
    faUsers
} from "@fortawesome/free-solid-svg-icons";

export default function Funzioni() {
    const theme = useTheme();
    return (
        <>
            <Typography variant="h4" sx={{textAlign: 'center', backgroundColor: '#ffff', pt: 4}}>
                La nostra piattaforma
            </Typography>
            <Box sx={{flexGrow: 1, backgroundColor: '#ffff', pt: 2, pb: 4}}>
                <Grid container spacing={3}
                      sx={{
                          display: 'flex',
                          alignItems: 'center',
                          justifyContent: 'center',
                      }}>
                    <Grid item xs={12} md={3.5} minHeight={275} sm={10}
                          sx={{
                              backgroundColor: '#f2f0f1',
                              textAlign: 'center',
                              borderRadius: 3,
                              mt: 3,
                              mr: 3,
                              p: 4
                          }}
                    >
                        <FontAwesomeIcon icon={faEarthEurope} style={{fontSize: 85}}
                                         color={theme.palette.primary.main}/>
                        {/*<EngineeringOutlined sx={{fontSize: 100}} color="primary"/>*/}
                        <Typography variant="h6" fontWeight={700} sx={{mt: 2, mb: 1}}>
                            Disponibilità
                        </Typography>
                        <Typography>
                            Consulta i tuoi dati comodamente <br/>dove e quando vuoi
                        </Typography>
                    </Grid>
                    <Grid item xs={12} md={3.5} minHeight={275} sm={10}
                          sx={{
                              backgroundColor: '#f2f0f1',
                              textAlign: 'center',
                              borderRadius: 3,
                              mt: 3,
                              mr: 3,
                              p: 4
                          }}
                    >
                        {/*<SupervisorAccount sx={{fontSize: 100}} color="primary"/>*/}
                        <FontAwesomeIcon icon={faUsers} flip="horizontal" style={{fontSize: 82}}
                                         color={theme.palette.primary.main} type="regular"/>
                        <Typography variant="h6" fontWeight={700} sx={{mt: 2, mb: 1}}>
                            Confidenzialità
                        </Typography>
                        <Typography>
                            Scegli i medici che potranno visualizzare i tuoi dati
                        </Typography>
                    </Grid>
                    <Grid item xs={12} md={3.5} minHeight={275} sm={10}
                          sx={{
                              backgroundColor: '#f2f0f1',
                              textAlign: 'center',
                              borderRadius: 3,
                              mt: 3,
                              p: 4
                          }}
                    >
                        <FontAwesomeIcon icon={faLock} flip="horizontal" style={{fontSize: 85}}
                                         color={theme.palette.primary.main}/>
                        <Typography variant="h6" fontWeight={700} sx={{mt: 2, mb: 1}}>
                            Sicurezza
                        </Typography>
                        <Typography>
                            I tuoi dati sempre al sicuro mediante crittografia
                        </Typography>
                    </Grid>

                    {/* LINEA INFERIORE */}
                    <Grid item xs={12} md={5} minHeight={320}
                          sx={{
                              backgroundColor: '#f2f0f1',
                              textAlign: 'center',
                              borderRadius: 3,
                              mt: 3,
                              p: 4
                          }}
                    >
                        <FontAwesomeIcon icon={faUser} style={{fontSize: 80}}
                                         color={theme.palette.primary.main}/>
                        <Typography variant="h6" fontWeight={700} sx={{mt: 2, mb: 1}}>
                            La scelta è tua
                        </Typography>
                        <Typography>
                            Se sei un paziente, potrai scegliere liberamente dove intraprendere le cure mediche senza
                            dover ripetere esami e procedure già svolte.
                        </Typography>
                    </Grid>
                    <Grid item xs={12} md={5} minHeight={320}
                          sx={{
                              backgroundColor: '#f2f0f1',
                              textAlign: 'center',
                              borderRadius: 3,
                              mt: 3,
                              ml: 3,
                              p: 4
                          }}
                    >
                        <FontAwesomeIcon icon={faUserNurse} flip="horizontal" style={{fontSize: 85}}
                                         color={theme.palette.primary.main}/>
                        <Typography variant="h6" fontWeight={700} sx={{mt: 2, mb: 1}}>
                            Semplicità in un click
                        </Typography>
                        <Typography>
                            Se sei un medico, potrai avere accesso in qualsiasi momento ai dati del tuo nuovo paziente,
                            anche se non è ancora stato registrato nella struttura ospedaliera in cui operi.
                        </Typography>
                    </Grid>
                </Grid>
            </Box>
        </>
    )
}