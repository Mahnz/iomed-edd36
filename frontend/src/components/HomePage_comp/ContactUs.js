import React, {useState} from 'react';
import {
    Box,
    Typography,
    TextField,
    Button, Grid
} from '@mui/material';

export default function ContactUs() {
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
        <Box sx={{
            flexGrow: 1,
            padding: '10px',
            maxWidth: '700px',
            margin: '30px auto',
            width: '100%'
        }}>
            <Typography variant="h4" sx={{textAlign: 'center'}}>
                Contattaci
            </Typography>
            <Grid container
                  sx={{marginTop: '30px'}}
                  autoComplete="off"
            >
                <Grid item xs={12}>
                    <TextField
                        label="Nome"
                        variant="outlined"
                        fullWidth
                        sx={{
                            marginBottom: '20px !important'
                        }}
                        value={nome}
                        onChange={(e) => setNome(e.target.value)}
                        required
                        error={errors.nome}
                        helperText={errors.nome && 'Campo obbligatorio'}
                    />
                </Grid>

                <Grid item xs={12}>
                    <TextField
                        label="Email"
                        variant="outlined"
                        fullWidth
                        sx={{
                            marginBottom: '20px !important'
                        }}
                        value={email}
                        onChange={(e) => setEmail(e.target.value)}
                        required
                        error={errors.email}
                        helperText={errors.email && 'Campo obbligatorio'}
                    />
                </Grid>

                <Grid item xs={12}>
                    <TextField
                        label="Oggetto"
                        variant="outlined"
                        fullWidth
                        sx={{
                            marginBottom: '20px !important'
                        }}
                        value={oggetto}
                        onChange={(e) => setOggetto(e.target.value)}
                        required
                        error={errors.oggetto}
                        helperText={errors.oggetto && 'Campo obbligatorio'}
                    />
                </Grid>
                <Grid item xs={12}>
                    <TextField type="text"
                               name="descrizione"
                               label="Inserisci un messaggio"
                               variant="outlined"
                               multiline
                               rows={4}
                               fullWidth
                               value={message}
                               onChange={(e) => setMessage(e.target.value)}
                               required
                               error={errors.message}
                               helperText={errors.message && 'Campo obbligatorio'}
                    />
                </Grid>
                {/*<TextareaAutosize*/}
                {/*    sx={{*/}
                {/*        marginBottom: '20px',*/}
                {/*        fontSize: '16px',*/}
                {/*        padding: '10px'*/}
                {/*    }}*/}
                {/*    spellCheck*/}
                {/*/>*/}

                <Grid item xs={12} mt={2} sx={{justifyContent: 'center'}}>
                    <Button
                        variant="contained"
                        type="submit"
                        color="primary"
                        sx={{width: '200px', fontSize: '16px'}}
                        onClick={handleSubmit}
                    >
                        Submit
                    </Button>
                </Grid>
            </Grid>
        </Box>
    );
};