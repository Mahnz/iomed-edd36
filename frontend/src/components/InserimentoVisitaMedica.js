// InserimentoVisitaMedica.js
import React, {useEffect, useState} from 'react'
import {
    Typography,
    TextField,
    Button,
    Grid,
    Paper,
    styled,
    IconButton,
    Tooltip,
    Autocomplete,
    CircularProgress,
    DialogTitle,
    DialogContent,
    DialogActions,
    Dialog,
    Snackbar,
    Alert as MuiAlert, useTheme
} from '@mui/material'
import {useNavigate} from "react-router-dom"
import {Add, CloudUpload, RemoveCircleOutlined, Send} from "@mui/icons-material"
import {departments} from "../utils.js"
import axios from "axios"
import CodiceFiscale from "codice-fiscale-js"
import Cookies from "universal-cookie"

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
    const theme = useTheme()
    const cookies = new Cookies()
    const navigate = useNavigate()
    const today = new Date()
    const maxDate = new Date(today.getFullYear(), today.getMonth(), today.getDate() + 1)

    const initialFormData = {
        codiceFiscale: '',
        dataVisita: '',
        nomeVisita: '',
        reparto: null,
        descrizione: '',
        allegati: [],
        medico: cookies.get("token")
    }
    const initialErrors = {
        codiceFiscale: {
            error: false,
            message: ''
        },
        dataVisita: {
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
        }
    }
    const [formData, setFormData] = useState(initialFormData)
    const [errors, setErrors] = useState(initialErrors)
    const [btnDisabled, setBtnDisabled] = useState(true)
    const [isFirstRender, setIsFirstRender] = useState(true)
    const [isCFVerified, setIsCFVerified] = useState(false)

    const handleCancel = () => {
        setFormData(initialFormData)
        navigate(-1)
    }

    const handleChange = (e) => {
        const {name, value} = e.target
        if (name === "codiceFiscale") {
            setFormData((prevData) => ({
                ...prevData,
                codiceFiscale: value.toUpperCase(),
            }))
        } else if (name === "dataVisita") {
            if (value <= maxDate.toISOString().split('T')[0]) {
                setFormData((prevData) => ({
                    ...prevData,
                    dataVisita: value,
                }))
            } else {
                setFormData((prevData) => ({
                    ...prevData,
                    dataVisita: "",
                }))
                setErrors((prevErrors) => ({
                    ...prevErrors,
                    dataVisita: {
                        error: true,
                        message: "La data non può essere successiva a quella odierna"
                    }
                }))
            }
        } else {
            setFormData((prevData) => ({...prevData, [name]: value}))
        }
    }

    // ! Gestione dinamica degli allegati, con aggiunta e rimozione
    const handleAddAllegato = () => {
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
    const handleAllegatoChange = (index, file) => {
        setFormData((prevData) => {
            const newAllegati = [...prevData.allegati]
            newAllegati[index] = {file}
            return {...prevData, allegati: newAllegati}
        })
    }

    // ! Gestione del bottone di verifica del codice fiscale
    const checkCF = async () => {
        const cf = formData.codiceFiscale

        try {
            const test = new CodiceFiscale(cf)
            if (test.isValid()) {
                console.log("Il codice fiscale è valido")
                setErrors((prevErrors) => ({
                    ...prevErrors,
                    codiceFiscale: {
                        error: false,
                        message: ""
                    }
                }))

                setIsCFVerified(true)
                setFormData((prevData) => ({
                    ...prevData,
                    nomeVisita: '',
                    reparto: '',
                    descrizione: '',
                    dataVisita: '',
                    allegati: []
                }))

                // todo - ABILITARE LA VERIFICA IN BLOCKCHAIN SULL'ESISTENZA DEL CF
                // const response = await axios.post("http://localhost:3001/api/bc/verify", cf)
                // if (response.status === 200) {
                //     console.log("Il codice fiscale è presente sulla blockchain")
                //     setIsCFVerified(true)
                //     setErrors((prevErrors) => ({
                //         ...prevErrors,
                //         codiceFiscale: {
                //             error: false,
                //             message: ""
                //         }
                //     }))
                // } else {
                //     console.log("Il codice fiscale non è presente sulla blockchain")
                //     setIsCFVerified(false)
                //     setErrors((prevErrors) => ({
                //         ...prevErrors,
                //         codiceFiscale: {
                //             error: true,
                //             message: "Il paziente non è registrato alla piattaforma"
                //         }
                //     }))
                // }
            } else {
                setErrors((prevErrors) => ({
                    ...prevErrors,
                    codiceFiscale: {
                        error: true,
                        message: "Il codice fiscale non è valido"
                    }
                }))
            }

        } catch (e) {
            console.log("Il codice fiscale non è valido")
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
            }))
        } else {
            setFormData((prevData) => ({
                ...prevData,
                reparto: "",
            }))
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
                dataVisita: {
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
            // setFormData(initialFormData)
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

    useEffect(() => {
        if (isFirstRender) {
            setIsFirstRender(false)
        } else {
            if (!formData.dataVisita) {
                setErrors((prevErrors) => ({
                    ...prevErrors,
                    dataVisita: {
                        error: true,
                        message: 'Campo obbligatorio'
                    }
                }))
            } else {
                setErrors((prevErrors) => ({
                    ...prevErrors,
                    dataVisita: {
                        error: false,
                        message: ""
                    }
                }))
            }
        }
    }, [formData.dataVisita])


    const [showOverlay, setShowOverlay] = useState(false)
    const [openSnackbar, setOpenSnackbar] = useState(false);
    const handleCloseSnackbar = (event, reason) => {
        if (reason === 'clickaway') {
            return;
        }
        setOpenSnackbar(false);
    };

    const [openDialog, setOpenDialog] = useState(false)
    const handleOpenDialog = () => {
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
        }

        if (!errors.codiceFiscale.error && !errors.nomeVisita.error && !errors.reparto.error) {
            setOpenDialog(true)
        }
    }

    const handleCloseDialog = () => {
        setOpenDialog(false)
    }

    const handleInsertVisita = async () => {
        handleCloseDialog()
        // BLOCKCHAIN fatto
        console.log(formData)
        const formValues = new FormData()

        // Aggiungi i dati del form
        formValues.append('codiceFiscale', formData.codiceFiscale)
        formValues.append('dataVisita', formData.dataVisita)
        formValues.append('nomeVisita', formData.nomeVisita)
        formValues.append('reparto', formData.reparto)
        formValues.append('descrizione', formData.descrizione)
        formValues.append("medico", formData.medico);

        // Aggiungi i file
        formData.allegati.forEach((file, index) => {
            formValues.append('allegati', file.file)
        })
        console.log(formValues)
        setShowOverlay(true)

        // BLOCKCHAIN fatto - Validazione la transazione in blockchain
        try {
            const res = await axios.post('http://localhost:3001/api/ipfs/addVisita', formValues, {
                'Content-Type': 'multipart/form-data',
            })

            if (res.status === 200) {
                console.log(res.data);
            }
        } catch (error) {
            console.error("Errore nella chiamata", error);
        } finally {
            setShowOverlay(false);
            setOpenSnackbar(true)
            setIsCFVerified(false)
            setFormData(initialFormData)
            setErrors(initialErrors)
        }
    }

    return (
        <>
            {showOverlay && (
                <div
                    style={{
                        position: 'fixed',
                        top: 0,
                        left: 0,
                        width: '100%',
                        height: '100%',
                        background: 'rgba(0, 0, 0, 0.5)',
                        display: 'flex',
                        justifyContent: 'center',
                        alignItems: 'center',
                        zIndex: 999,
                    }}
                >
                    <CircularProgress color="success"/>
                </div>
            )}
            <Typography variant="h4" mb={4}>
                Inserimento visita medica
            </Typography>
            <Paper elevation={1} sx={{padding: 3, borderRadius: 4}}>
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
                                   sx={{backgroundColor: theme.palette.background.paper}}
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
                                   label="Nome della visita"
                                   name="nomeVisita"
                                   value={formData.nomeVisita}
                                   onChange={handleChange}
                                   fullWidth
                                   variant="outlined"
                                   required
                                   error={errors.nomeVisita.error}
                                   helperText={errors.nomeVisita.error && errors.nomeVisita.message}
                                   disabled={!isCFVerified}
                                   sx={{backgroundColor: theme.palette.background.paper}}
                        />
                    </Grid>
                    <Grid item xs={12} sm={6}>
                        <Autocomplete
                            name="reparto"
                            options={departments}
                            isOptionEqualToValue={(option, value) => option.value === value.value}
                            // isOptionEqualToValue={(option, value) => {
                            //     if (value === "") {
                            //         return false
                            //     } else if (value === option) {
                            //         return true
                            //     }
                            // }}
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
                                    sx={{backgroundColor: theme.palette.background.paper}}
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
                                   sx={{backgroundColor: theme.palette.background.paper}}
                        />
                    </Grid>
                    <Grid item xs={12} sm={4}>
                        <TextField type="date"
                                   name="dataVisita"
                                   variant="outlined"
                                   autoComplete="off"
                                   value={formData.dataVisita}
                                   onChange={handleChange}
                                   inputProps={{min: "1890-01-01", max: maxDate.toISOString().split('T')[0]}}
                                   fullWidth
                                   required
                                   error={errors.dataVisita.error}
                                   helperText={errors.dataVisita.error && errors.dataVisita.message}
                                   disabled={!isCFVerified}
                                   sx={{backgroundColor: theme.palette.background.paper}}
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
                            disabled={!isCFVerified}
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
                                           sx={{backgroundColor: theme.palette.background.paper}}
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
                            <Button type="submit" variant="contained" color="primary" onClick={handleOpenDialog}
                                    endIcon={<Send/>}>
                                Aggiungi visita
                            </Button>
                        </Grid>
                    </Grid>
                </Grid>
            </Paper>

            <Dialog open={openDialog} onClose={handleCloseDialog}>
                <DialogTitle>Conferma cancellazione</DialogTitle>
                <DialogContent>
                    Vuoi confermare l'inserimento della visita per l'utente ?
                </DialogContent>
                <DialogActions>
                    <Button onClick={handleCloseDialog} color="primary">
                        Annulla
                    </Button>
                    <Button onClick={handleInsertVisita} color="primary" variant="contained" autoFocus>
                        Conferma
                    </Button>
                </DialogActions>
            </Dialog>

            <Snackbar open={openSnackbar} autoHideDuration={6000} onClose={handleCloseSnackbar}>
                <Alert onClose={handleCloseSnackbar} severity="success" sx={{width: '100%'}}>
                    Visita medica inserita correttamente!
                </Alert>
            </Snackbar>
        </>
    )
}

const Alert = React.forwardRef(function Alert(props, ref) {
    return <MuiAlert elevation={6} ref={ref} variant="filled" {...props} />;
});