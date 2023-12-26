import React, {useState,useEffect} from 'react'
import {
    Typography,
    Paper,
    Grid,
    Avatar,
    List,
    ListItem,
    ListItemText,
} from '@mui/material'
import {AccountCircle} from '@mui/icons-material'
import Cookies from "universal-cookie";
import axios from "axios";

import Paziente from '../exPatient.json'

export default function MyProfile() {

    const [utente,setUtente]=useState({});
    const cookies=new Cookies();

    useEffect(async()=>{
        if(cookies.get("token"))
        {
            if(cookies.get("type")==="medico")
            {
                let id=cookies.get("token");
                await axios.get(`http://localhost:3001/api/bc/getDoctor/${id}`)
                    .then(res=>{console.log(res); setUtente(res.data)}).catch(e=>console.log(e));
            }
            else
            {
                let CF=cookies.get("token");
                await axios.get(`http://localhost:3001/api/bc/getPatient/${CF}`)
                    .then(res=>{console.log(res); setUtente(res.data)}).catch(e=>console.log(e));
            }
        }
    })

    //TODO CONDITIONAL RENDERING
    return (
        <>
            <Typography variant="h4" mb={4}>
                Il mio profilo
            </Typography>
            <Grid container spacing={3}>
                <Grid item xs={12} md={7}>
                    <Paper sx={{p: 2}}>
                        <List>
                            <ListItem>
                                <ListItemText
                                    primary="Nome"
                                    secondary={Paziente.firstName}
                                />
                            </ListItem>
                            <ListItem>
                                <ListItemText
                                    primary="Cognome"
                                    secondary={Paziente.lastName}
                                />
                            </ListItem>
                            <ListItem>
                                <ListItemText
                                    primary="Sesso"
                                    secondary={Paziente.sex}
                                />
                            </ListItem>
                            <ListItem>
                                <ListItemText
                                    primary="Data di nascita"
                                    secondary={Paziente.birthDate}
                                />
                            </ListItem>
                            <ListItem>
                                <ListItemText
                                    primary="Luogo di nascita"
                                    secondary={Paziente.birthPlace}
                                />
                            </ListItem>
                            <ListItem>
                                <ListItemText
                                    primary="Provincia"
                                    secondary={Paziente.province}
                                />
                            </ListItem>
                            <ListItem>
                                <ListItemText
                                    primary="Città"
                                    secondary={Paziente.city}
                                />
                            </ListItem>
                            <ListItem>
                                <ListItemText
                                    primary="CAP"
                                    secondary={Paziente.cap}
                                />
                            </ListItem>
                            <ListItem>
                                <ListItemText
                                    primary="Indirizzo"
                                    secondary={Paziente.address}
                                />
                            </ListItem>
                            <ListItem>
                                <ListItemText
                                    primary="Telefono"
                                    secondary={Paziente.phoneNumber}
                                />
                            </ListItem>
                            <ListItem>
                                <ListItemText
                                    primary="CF"
                                    secondary={Paziente.CF}
                                />
                            </ListItem>
                            <ListItem>
                                <ListItemText
                                    primary="Email"
                                    secondary={Paziente.email}
                                />
                            </ListItem>
                        </List>
                    </Paper>
                </Grid>
                <Grid item xs={12} md={5}>
                    <Paper sx={{p: 2, textAlign: 'center'}}>
                        <Avatar sx={{width: 150, height: 150, mb: 2, mx: 'auto'}}>
                            <AccountCircle fontSize="large"/>
                        </Avatar>
                        <Typography variant="h5" gutterBottom>
                            {`${Paziente.firstName} ${Paziente.lastName}`}
                        </Typography>
                    </Paper>
                </Grid>
            </Grid>
        </>
    )
}