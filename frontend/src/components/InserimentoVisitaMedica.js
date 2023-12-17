// InserimentoVisitaMedica.js
import React, {useState} from 'react'
import {
    Container,
    Typography,
    TextField,
    Button,
    Grid,
    MenuItem,
    Paper, Input
} from '@mui/material'
import axios from "axios";
import {useNavigate} from "react-router-dom";
import {AttachFile, Close} from "@mui/icons-material";
import CustomFileInput from "../pages/TestFrontend.js";

const departments = ['Cardiologia', 'Ortopedia', 'Neurologia', 'Oculistica', 'Altro']

export default function InserimentoVisitaMedica() {
    const initialFormData = {
        codiceFiscale: '',
        nomeVisita: '',
        reparto: '',
        descrizione: '',
        allegati: [],
    }
    const [formData, setFormData] = useState(initialFormData)
    const navigate = useNavigate()
    const handleCancel = () => {
        setFormData(initialFormData)
        navigate(-1);
    }

    const handleChange = (e) => {
        const {name, value} = e.target
        setFormData((prevData) => ({...prevData, [name]: value}))
    }

    const handleAllegatoChange = (index, newName, newFile) => {
        setFormData((prevData) => {
            const newAllegati = [...prevData.allegati];
            newAllegati[index] = {...newAllegati[index], file: newFile};
            return {...prevData, allegati: newAllegati};
        });

        // setFormData((prevData) => {
        //     const newAllegati = [...prevData.allegati];
        //     newAllegati[index] = {...newAllegati[index], nome: newName, file: newFile};
        //     return {...prevData, allegati: newAllegati};
        // });

        // TODO - Test con la ridenominazione del file con la TextField
        // setFormData((prevData) => {
        //     const newAllegati = [...prevData.allegati];
        //     const allegatoToUpdate = {...newAllegati[index], nome: newName};
        //
        //     // Verifica se l'utente ha specificato un'estensione nel nome del file
        //     const userProvidedExtension = newName.split('.').pop();
        //     const fileExtension = newFile ? newFile.name.split('.').pop() : '';
        //
        //     // Aggiungi l'estensione solo se l'utente non l'ha fornita
        //     const finalFileName = userProvidedExtension ? newName : `${newName}.${fileExtension}`;
        //
        //     allegatoToUpdate.nome = finalFileName;
        //     allegatoToUpdate.file = newFile;
        //
        //     newAllegati[index] = allegatoToUpdate;
        //     console.log(newAllegati[index]);
        //     return {...prevData, allegati: newAllegati};
        // });
    };


    const handleAddAllegato = () => {
        // setFormData((prevData) => ({
        //     ...prevData,
        //     allegati: [...prevData.allegati, {name: '', file: null}],
        // }))
        setFormData((prevData) => ({
            ...prevData,
            allegati: [...prevData.allegati, {file: null}],
        }))
    }

    const handleRemoveAllegato = (index) => {
        setFormData((prevData) => {
            const newAllegati = [...prevData.allegati]
            newAllegati.splice(index, 1)
            return {...prevData, allegati: newAllegati}
        })
    }

    const handleSubmit = async (e) => {
        e.preventDefault()
        console.log(formData)
        // await axios.post('http://localhost:3001/api/ipfs/addVisita', formData,
        //     // {
        //     //     onUploadProgress: (progressEvent) => {
        //     //         const progress = Math.round((progressEvent.loaded / progressEvent.total) * 100)
        //     //         setUploadProgress(progress)
        //     //     },
        //     // },
        //     {
        //         'Content-Type': 'multipart/form-data'
        //     })
        //     .then(res => {
        //         // setUploadProgress(0)
        //     })
        //     .catch(error => {
        //         console.error(error)
        //         // setUploadProgress(0)
        //     })
    }


    return (
        <Container sx={{mt: 4}}>
            <Typography variant="h4" color="primary" gutterBottom>
                <b>Inserimento Visita Medica</b>
            </Typography>
            <Paper elevation={3} sx={{padding: 3, borderRadius: 4}}>

                <form onSubmit={handleSubmit}>
                    <Grid container spacing={2}>
                        <Grid item xs={12} sm={6}>
                            <TextField
                                required
                                fullWidth
                                label="Codice Fiscale del Paziente"
                                name="codiceFiscale"
                                value={formData.codiceFiscale}
                                onChange={handleChange}
                            />
                        </Grid>
                        <Grid item xs={12} sm={6}>
                            <TextField
                                required
                                fullWidth
                                label="Nome della Visita"
                                name="nomeVisita"
                                value={formData.nomeVisita}
                                onChange={handleChange}
                            />
                        </Grid>
                        <Grid item xs={12} sm={6}>
                            <TextField
                                select
                                required
                                fullWidth
                                label="Reparto di Competenza"
                                name="reparto"
                                value={formData.reparto}
                                onChange={handleChange}
                            >
                                {departments.map((department) => (
                                    <MenuItem key={department} value={department}>
                                        {department}
                                    </MenuItem>
                                ))}
                            </TextField>
                        </Grid>
                        <Grid item xs={12}>
                            <TextField
                                multiline
                                fullWidth
                                label="Descrizione o Note Aggiuntive"
                                name="descrizione"
                                value={formData.descrizione}
                                onChange={handleChange}
                            />
                        </Grid>

                        <Grid item xs={12} sx={{mt: 4}}>
                            <Typography variant="h6">Allegati:</Typography>
                        </Grid>
                        {formData.allegati.map((allegato, index) => (
                            <React.Fragment key={index}>
                                <Grid item xs={4} sm={4}>
                                    <Input
                                        placeholder="Inserisci un file"
                                        type="file"
                                        name="file"
                                        accept=".png, .jpeg, .jpg, .pdf"
                                        fullWidth
                                        onChange={(e) => handleAllegatoChange(index, allegato.nome, e.target.files[0])}
                                    />
                                </Grid>
                                <Grid item xs={8} sm={8}>
                                    <TextField
                                        fullWidth
                                        label={`Nome Allegato ${index + 1}`}
                                        value={allegato.nome}
                                        onChange={(e) => handleAllegatoChange(index, e.target.value)}
                                    />
                                </Grid>
                                <Grid item xs={12}>
                                    <Button
                                        color="secondary"
                                        onClick={() => handleRemoveAllegato(index)}
                                    >
                                        Rimuovi
                                    </Button>
                                </Grid>
                            </React.Fragment>
                        ))}
                        <Grid item xs={12}>
                            <Button
                                variant="outlined"
                                color="primary"
                                onClick={handleAddAllegato}
                            >
                                Aggiungi Allegato
                            </Button>
                        </Grid>
                        <Grid container spacing={2} justifyContent="center" sx={{mt: 3}}>
                            <Grid item>
                                <Button variant="outlined" color="primary" onClick={handleCancel}>
                                    Annulla
                                </Button>
                            </Grid>
                            <Grid item>
                                <Button type="submit" variant="contained" color="primary" onClick={handleSubmit}>
                                    Fine
                                </Button>
                            </Grid>
                        </Grid>
                    </Grid>
                </form>
            </Paper>
        </Container>
    )
}