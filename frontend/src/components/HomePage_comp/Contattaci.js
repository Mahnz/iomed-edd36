// Contattaci.js
import React, {useState} from 'react';
import {
    Box,
    Typography,
    TextField,
    Button, Grid
} from '@mui/material';

export default function Contattaci() {
    const [email, setEmail] = useState('');
    const [nome, setNome] = useState('');
    const [oggetto, setOggetto] = useState('');
    const [message, setMessage] = useState('');
    const [errors, setErrors] = useState({
        nome: false,
        email: false,
        oggetto: false,
        message: false,
    });

    const handleSubmit = (e) => {
        e.preventDefault();

        if (!nome) {
            setErrors((prev) => ({...prev, nome: true}));
        } else {
            setErrors((prev) => ({...prev, nome: false}));
        }

        if (!email) {
            setErrors((prev) => ({...prev, email: true}));
        } else {
            setErrors((prev) => ({...prev, email: false}));
        }

        if (!oggetto) {
            setErrors((prev) => ({...prev, oggetto: true}));
        } else {
            setErrors((prev) => ({...prev, oggetto: false}));
        }

        if (!message) {
            setErrors((prev) => ({...prev, message: true}));
        } else {
            setErrors((prev) => ({...prev, message: false}));
        }

        if (nome && email && oggetto && message) {
            alert('Il team di sviluppo ti ringrazia per il tuo messaggio!');
            setNome('');
            setEmail('');
            setOggetto('');
            setMessage('');
        }
    };

    return (
        <>
            <Typography variant="h4" sx={{textAlign: 'center', backgroundColor: '#ffff', pt: 4}}>
                Contattaci
            </Typography>
            <Box display="flex" justifyContent="center" sx={{backgroundColor: '#ffff', pt: 2, pb: 2}}>
                <Grid container sx={{
                    display: 'flex',
                    alignItems: 'center',
                    maxWidth: '80%',
                    justifyContent: 'center',
                }}>
                    <Grid item xs={10} lg={8}>
                        <TextField type="text"
                                   name="nome"
                                   label="Nome"
                                   value={nome}
                                   onChange={(e) => setNome(e.target.value)}
                                   variant="outlined"
                                   fullWidth
                                   autoComplete="off"
                                   required
                                   error={errors.nome}
                                   helperText={errors.nome && 'Campo obbligatorio'}
                        />
                    </Grid>

                    <Grid item xs={10} lg={8} sx={{mt: 2}}>
                        <TextField type="email"
                                   name="email"
                                   label="Email"
                                   value={email}
                                   onChange={(e) => setEmail(e.target.value)}
                                   variant="outlined"
                                   fullWidth
                                   required
                                   error={errors.email}
                                   helperText={errors.email && 'Campo obbligatorio'}
                        />
                    </Grid>

                    <Grid item xs={10} lg={8} sx={{mt: 2}}>
                        <TextField type="text"
                                   name="oggetto"
                                   label="Oggetto"
                                   value={oggetto}
                                   onChange={(e) => setOggetto(e.target.value)}
                                   variant="outlined"
                                   fullWidth
                                   required
                                   error={errors.oggetto}
                                   helperText={errors.oggetto && 'Campo obbligatorio'}
                        />
                    </Grid>
                    <Grid item xs={10} lg={8} sx={{mt: 2}}>
                        <TextField type="text"
                                   name="descrizione"
                                   label="Inserisci un messaggio"
                                   value={message}
                                   onChange={(e) => setMessage(e.target.value)}
                                   variant="outlined"
                                   multiline
                                   rows={5}
                                   fullWidth
                                   required
                                   error={errors.message}
                                   helperText={errors.message && 'Campo obbligatorio'}
                        />
                    </Grid>

                    <Grid item xs={10} lg={8} mt={2} sx={{justifyContent: 'center', textAlign: "center"}}>
                        <Button
                            variant="contained"
                            type="submit"
                            color="primary"
                            sx={{width: '250px', fontSize: '17px'}}
                            onClick={handleSubmit}
                        >
                            Invia
                        </Button>
                    </Grid>
                </Grid>
            </Box>
        </>
    )
}