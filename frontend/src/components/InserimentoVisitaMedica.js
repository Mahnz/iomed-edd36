// InserimentoVisitaMedica.js
import React, {useEffect, useState} from 'react'
import {
    Container,
    Typography,
    TextField,
    Button,
    Grid,
    Paper, styled, IconButton, Tooltip, Autocomplete
} from '@mui/material'
import {useNavigate} from "react-router-dom";
import {Add, CloudUpload, RemoveCircleOutlined} from "@mui/icons-material";
import {departments} from "../utils.js";
import axios from "axios";
import CodiceFiscale from "codice-fiscale-js";

const VisuallyHiddenInput = styled('input')({
    clip: 'rect(0 0 0 0)',
    clipPath: 'inset(50%)',
    height: 1,
    overflow: 'hidden',
    position: 'absolute',
    bottom: 0,
    left: 0,
    whiteSpace: 'nowrap',
    width: 1
})

export default function InserimentoVisitaMedica() {
    const initialFormData = {
        codiceFiscale: '',
        nomeVisita: '',
        reparto: null,
        descrizione: '',
        allegati: [],
    }
    const [formData, setFormData] = useState(initialFormData)
    const [errors, setErrors] = useState({
        codiceFiscale: {
            error: false,
            message: ''
        },
        nomeVisita: {
            error: false,
            message: ''
        },
        reparto: {
            error: false,
            message: ''
        },
    })
    const [btnDisabled, setBtnDisabled] = useState(true)
    const [isFirstRender, setIsFirstRender] = useState(true)
    const [isFirstClick, setIsFirstClick] = useState(true)
    const [isCFVerified, setIsCFVerified] = useState(false)
    const [uploadProgress, setUploadProgress] = useState(0)
    const navigate = useNavigate()

    const handleCancel = () => {
        setFormData(initialFormData)
        navigate(-1);
    }

    const handleChange = (e) => {
        const {name, value} = e.target
        if (name === "codiceFiscale") {
            setFormData((prevData) => ({
                ...prevData,
                codiceFiscale: value.toUpperCase(),
            }));
        } else {
            setFormData((prevData) => ({...prevData, [name]: value}))
        }
    }

    // ! Gestione dinamica degli allegati, con aggiunta e rimozione
    const handleAddAllegato = () => {
        setFormData((prevData) => ({
            ...prevData,
            allegati: [...prevData.allegati, {file: null}],
        }));
    };
    const handleRemoveAllegato = (index) => {
        setFormData((prevData) => {
            const newAllegati = [...prevData.allegati];
            newAllegati.splice(index, 1);
            return {...prevData, allegati: newAllegati};
        });
    };
    const handleAllegatoChange = (index, file) => {
        setFormData((prevData) => {
            const newAllegati = [...prevData.allegati];
            newAllegati[index] = {file};
            return {...prevData, allegati: newAllegati};
        });
    };

    // ! Gestione del bottone di verifica del codice fiscale
    const checkCF = () => {
        // TODO - Realizza una funzione che verifica la correttezza del codice fiscale inserito, al click del pulsante

        const cf = formData.codiceFiscale

        try {
            const test = new CodiceFiscale(cf)
            if (test.isValid()) {
                console.log("Il codice fiscale è valido");
                setErrors((prevErrors) => ({
                    ...prevErrors,
                    codiceFiscale: {
                        error: false,
                        message: ""
                    }
                }))
            }
            setIsCFVerified(true)
        } catch (e) {
            console.log("Il codice fiscale non è valido");
            setErrors((prevErrors) => ({
                ...prevErrors,
                codiceFiscale: {
                    error: true,
                    message: "Codice fiscale non valido"
                }
            }))
            setIsCFVerified(false)
        }
    }

    // ! Gestione dell'autocomplete per il reparto
    const handleChangeReparto = (newValue) => {
        if (newValue) {
            setFormData((prevData) => ({
                ...prevData,
                reparto: newValue,
            }));
        } else {
            setFormData((prevData) => ({
                ...prevData,
                reparto: "",
            }));
        }
    }

    // ! Controllo dinamico sull'inserimento dei campi
    useEffect(() => {
        if (isFirstRender) {
            setIsFirstRender(false)
        } else {
            if (!formData.codiceFiscale) {
                setErrors((prevErrors) => ({
                    ...prevErrors,
                    codiceFiscale: {
                        error: true,
                        message: 'Campo obbligatorio'
                    }
                }))
            } else {
                if (formData.codiceFiscale.length !== 16) {
                    setErrors((prevErrors) => ({
                        ...prevErrors,
                        codiceFiscale: {
                            error: true,
                            message: ""
                        }
                    }))
                } else {
                    setErrors((prevErrors) => ({
                        ...prevErrors,
                        codiceFiscale: {
                            error: false,
                            message: ""
                        }
                    }))
                }
            }
        }

        if (formData.codiceFiscale.length === 16) {
            setBtnDisabled(false)
        } else {
            setBtnDisabled(true)
            setIsCFVerified(false)
            setErrors((prevErrors) => ({
                ...prevErrors,
                codiceFiscale: {
                    error: false,
                    message: ""
                },
                nomeVisita: {
                    error: false,
                    message: ""
                },
                reparto: {
                    error: false,
                    message: ""
                }
            }))
        }
    }, [formData.codiceFiscale])

    useEffect(() => {
        if (isFirstRender) {
            setIsFirstRender(false)
        } else {
            if (!formData.nomeVisita) {
                setErrors((prevErrors) => ({
                    ...prevErrors,
                    nomeVisita: {
                        error: true,
                        message: 'Campo obbligatorio'
                    }
                }))
            } else {
                setErrors((prevErrors) => ({
                    ...prevErrors,
                    nomeVisita: {
                        error: false,
                        message: ""
                    }
                }))
            }
        }
    }, [formData.nomeVisita])

    useEffect(() => {
        if (isFirstRender) {
            setIsFirstRender(false)
        } else {
            if (!formData.reparto) {
                setErrors((prevErrors) => ({
                    ...prevErrors,
                    reparto: {
                        error: true,
                        message: 'Campo obbligatorio'
                    }
                }))
            } else {
                setErrors((prevErrors) => ({
                    ...prevErrors,
                    reparto: {
                        error: false,
                        message: ""
                    }
                }))
            }
        }
    }, [formData.reparto])

    const handleSubmit = async (e) => {
        e.preventDefault()
        if (isCFVerified) {
            if (!formData.codiceFiscale) {
                setErrors((prevErrors) => ({
                    ...prevErrors,
                    codiceFiscale: {
                        error: true,
                        message: 'Campo obbligatorio'
                    }
                }))
            } else {
                if (formData.codiceFiscale.length !== 16) {
                    setErrors((prevErrors) => ({
                        ...prevErrors,
                        codiceFiscale: {
                            error: true,
                            message: "Codice fiscale non valido"
                        }
                    }))
                } else {
                    setErrors((prevErrors) => ({
                        ...prevErrors,
                        codiceFiscale: {
                            error: false,
                            message: ""
                        }
                    }))
                }
            }

            if (!formData.nomeVisita) {
                setErrors((prevErrors) => ({
                    ...prevErrors,
                    nomeVisita: {
                        error: true,
                        message: 'Campo obbligatorio'
                    }
                }))
            } else {
                setErrors((prevErrors) => ({
                    ...prevErrors,
                    nomeVisita: {
                        error: false,
                        message: ""
                    }
                }))
            }

            if (!formData.reparto) {
                setErrors((prevErrors) => ({
                    ...prevErrors,
                    reparto: {
                        error: true,
                        message: 'Campo obbligatorio'
                    }
                }))
            } else {
                setErrors((prevErrors) => ({
                    ...prevErrors,
                    reparto: {
                        error: false,
                        message: ""
                    }
                }))
            }

            if (isFirstClick) {
                setIsFirstClick(false)
            } else {
                if (!errors.codiceFiscale.error && !errors.nomeVisita.error && !errors.reparto.error && isCFVerified) {
                    // TODO - Scrittura della visita su IPFS
                    console.log(formData)
                    console.log("Sono arrivato alla POST")
                    // await axios.post('http://localhost:3001/api/ipfs/addVisita', formData,
                    //     {
                    //         onUploadProgress: (progressEvent) => {
                    //             const progress = Math.round((progressEvent.loaded / progressEvent.total) * 100)
                    //             setUploadProgress(progress)
                    //         },
                    //     },
                    //     {
                    //         'Content-Type': 'multipart/form-data'
                    //     })
                    //     .then(res => {
                    //         setUploadProgress(0)
                    //     })
                    //     .catch(error => {
                    //         console.error(error)
                    //         setUploadProgress(0)
                    //     })
                }
            }
        }
    }

    return (
        <Container sx={{mt: 4}}>
            <Typography variant="h4" color="primary" gutterBottom>
                <b>Inserimento Visita Medica</b>
            </Typography>
            <Paper elevation={3} sx={{padding: 3, borderRadius: 4}}>
                <Grid container spacing={2}>
                    <Grid item xs={12} sm={9}>
                        <TextField type="text"
                                   name="codiceFiscale"
                                   label="Codice Fiscale del Paziente"
                                   value={formData.codiceFiscale}
                                   onChange={handleChange}
                                   fullWidth
                                   variant="outlined"
                                   required
                                   InputProps={{
                                       minLength: 16,
                                       maxLength: 16
                                   }}
                                   inputProps={{
                                       minLength: 16,
                                       maxLength: 16
                                   }}
                                   error={errors.codiceFiscale.error}
                                   helperText={errors.codiceFiscale.error && errors.codiceFiscale.message}
                        />
                    </Grid>
                    <Grid item xs={12} sm={3}>
                        <Button
                            variant="contained"
                            color={btnDisabled ? 'error' : "success"}
                            disabled={btnDisabled}
                            onClick={checkCF}
                            sx={{
                                '&:disabled': {
                                    backgroundColor: '#6f7174',
                                    borderColor: '#6f7174',
                                    color: '#fff',
                                    boxShadow: 'none',
                                }
                            }}
                            style={{height: "100%"}}
                            fullWidth
                        >
                            Verifica
                        </Button>
                    </Grid>
                </Grid>
                <Grid container spacing={2} sx={{mt: 5}}>
                    <Grid item xs={12}>
                        <Typography variant="h6"><b>Dettagli</b></Typography>
                    </Grid>
                    <Grid item xs={12} sm={6}>
                        <TextField type="text"
                                   label="Nome della Visita"
                                   name="nomeVisita"
                                   value={formData.nomeVisita}
                                   onChange={handleChange}
                                   fullWidth
                                   variant="outlined"
                                   required
                                   error={errors.nomeVisita.error}
                                   helperText={errors.nomeVisita.error && errors.nomeVisita.message}
                                   disabled={!isCFVerified}
                        />
                    </Grid>
                    <Grid item xs={12} sm={6}>
                        <Autocomplete
                            name="reparto"
                            options={departments}
                            isOptionEqualToValue={(option, value) => {
                                if (value === "") {
                                    return false;
                                } else if (value === option) {
                                    return true
                                }
                            }}
                            onChange={(event, value) => handleChangeReparto(value)}
                            value={formData.reparto}
                            autoHighlight
                            disabled={!isCFVerified}
                            renderInput={(params) => (
                                <TextField
                                    {...params}
                                    name="reparto"
                                    label="Reparto di Competenza"
                                    autoComplete="off"
                                    required
                                    fullWidth
                                    error={errors.reparto.error}
                                    helperText={errors.reparto.error && errors.reparto.message}
                                    disabled={!isCFVerified}
                                />
                            )}
                        />
                    </Grid>
                    <Grid item xs={12}>
                        <TextField type="text"
                                   name="descrizione"
                                   label="Descrizione/Note aggiuntive"
                                   variant="outlined"
                                   multiline
                                   rows={4}
                                   fullWidth
                                   value={formData.descrizione}
                                   onChange={handleChange}
                                   disabled={!isCFVerified}
                        />
                    </Grid>
                </Grid>

                <Grid container spacing={2} sx={{mt: 5}}>
                    <Grid item xs={8} sm={8}>
                        <Typography variant="h6"><b>Allegati</b></Typography>
                    </Grid>
                    <Grid item xs={4} sm={4}>
                        <Button
                            variant="contained"
                            color="success"
                            onClick={handleAddAllegato}
                            endIcon={<Add/>}
                        >
                            Aggiungi Allegato
                        </Button>
                    </Grid>
                    {formData.allegati.map((allegato, index) => (
                        <React.Fragment key={index}>
                            <Grid item xs={2}>
                                <Tooltip title="Carica file da allegare" placement="left">
                                    <Button component="label" variant="contained" startIcon={<CloudUpload/>}
                                            style={{height: '100%'}}>
                                        Carica file
                                        <VisuallyHiddenInput
                                            name="allegato"
                                            type="file"
                                            onChange={(e) => handleAllegatoChange(index, e.target.files[0])}
                                            accept="image/png, image/jpeg, image/jpg, application/pdf"
                                        />
                                    </Button>
                                </Tooltip>
                            </Grid>
                            <Grid item xs={6}>
                                <TextField type="text"
                                           label={`Allegato ${index + 1}`}
                                           fullWidth
                                           size="medium"
                                           value={allegato.file ? allegato.file.name : ""}
                                           onChange={(e) => handleAllegatoChange(index, e.target.value)}
                                           InputProps={{
                                               readOnly: true
                                           }}
                                />
                            </Grid>
                            <Grid item xs={4}>
                                <Tooltip title="Rimuovi file" placement="right">
                                    <IconButton
                                        variant="contained"
                                        color="error"
                                        onClick={() => handleRemoveAllegato(index)}
                                        style={{height: '100%'}}
                                        aria-label="Rimuovi file"
                                    >
                                        <RemoveCircleOutlined/>
                                    </IconButton>
                                </Tooltip>
                            </Grid>
                        </React.Fragment>
                    ))}


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
            </Paper>
        </Container>
    )
}