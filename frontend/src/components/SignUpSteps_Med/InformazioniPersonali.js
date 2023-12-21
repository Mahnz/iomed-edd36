// InformazioniPersonali.js
import React, {useEffect, useState} from 'react'
import {TextField, Grid, Button, InputAdornment, Autocomplete} from '@mui/material'
import {provinces} from "../../utils.js";
import {FontAwesomeIcon} from "@fortawesome/react-fontawesome";
import {faIdBadge} from "@fortawesome/free-solid-svg-icons";
import CodiceFiscale from "codice-fiscale-js";

export default function InformazioniPersonali({
                                                  formData,
                                                  setFormData,
                                                  handleChange,
                                                  errors
                                              }) {
    const today = new Date()
    const maxDate = new Date(today.getFullYear() - 18, today.getMonth(), today.getDate())
    const [btnDisabled, setBtnDisabled] = useState(true)

    // ? Controllo interattivo per il calcolo del Codice Fiscale
    useEffect(() => {
        const isFormValid =
            formData.firstName &&
            formData.lastName &&
            formData.birthDate &&
            formData.sex &&
            formData.birthPlace

        setBtnDisabled(!isFormValid)
    }, [formData])

    const computeCF = () => {
        console.log('Calcolo del Codice Fiscale...')
        if (
            formData.firstName &&
            formData.lastName &&
            formData.birthDate &&
            formData.sex &&
            formData.birthPlace
        ) {
            try {
                const codFiscale = new CodiceFiscale({
                    name: formData.firstName,
                    surname: formData.lastName,
                    gender: formData.sex,
                    day: new Date(formData.birthDate).getDate(),
                    month: new Date(formData.birthDate).getMonth() + 1,
                    year: new Date(formData.birthDate).getFullYear(),
                    dateOfBirth: new Date(formData.birthDate),
                    birthplace: formData.birthPlace,
                })

                const calculatedCF = codFiscale.toString()

                setFormData({
                    ...formData,
                    CF: calculatedCF,
                })
                console.log('Codice Fiscale calcolato:', calculatedCF)
            } catch (error) {
                console.error('Errore nel calcolo del Codice Fiscale:', error)
            }
        }
    }

    const options = ['', 'M', 'F']
    const handleSexChange = (newValue) => {
        if (newValue) {
            handleChange({target: {name: 'sex', value: newValue}})
        } else {
            handleChange({target: {name: 'sex', value: ""}})
        }
    }

    const handleProvinceChange = (newValue) => {
        if (newValue) {
            handleChange({target: {name: 'birthProvincia', value: newValue}})
        } else {
            handleChange({target: {name: 'birthProvincia', value: ""}})
        }
    }

    return (
        <Grid container spacing={2}>
            <Grid item xs={12} md={6}>
                <TextField type="text"
                           name="firstName"
                           label="Nome"
                           value={formData.firstName}
                           onChange={handleChange}
                           autoComplete="name"
                           fullWidth
                           required
                           error={errors.firstName}
                           helperText={errors.firstName && 'Il campo Nome è obbligatorio'}
                />
            </Grid>
            <Grid item xs={12} md={6}>
                <TextField type="text"
                           name="lastName"
                           label="Cognome"
                           value={formData.lastName}
                           onChange={handleChange}
                           autoComplete="family-name"
                           fullWidth
                           required
                           error={errors.lastName}
                           helperText={errors.lastName && 'Il campo Cognome è obbligatorio.'}
                />
            </Grid>

            <Grid item xs={12} md={4}>
                <Autocomplete
                    name="sex"
                    options={options}
                    getOptionLabel={(option) => (option === "" ? "Seleziona..." : option === "M" ? "Maschio" : "Femmina")}
                    isOptionEqualToValue={(option, value) => option === value}
                    value={formData.sex}
                    onChange={(event, value) => handleSexChange(value)}
                    autoHighlight
                    renderInput={(params) => (
                        <TextField
                            {...params}
                            name="sex"
                            label="Sesso"
                            autoComplete="sex"
                            required
                            fullWidth
                            error={errors.sex}
                            helperText={errors.sex && 'Il campo Sesso è obbligatorio'}
                        />
                    )}
                />
            </Grid>
            <Grid item xs={12} md={8}>
                <TextField type="date"
                           name="birthDate"
                           placeholder="Inserire data nascita"
                           value={formData.birthDate}
                           onChange={handleChange}
                           inputProps={{min: "1890-01-01", max: maxDate.toISOString().split('T')[0]}}
                           autoComplete="off"
                           fullWidth
                           required
                           error={errors.birthDate}
                           helperText={errors.birthDate && 'Inserisci la tua data di nascita'}
                />
            </Grid>

            <Grid item xs={12} md={6}>
                <Autocomplete
                    name="birthProvincia"
                    options={provinces}
                    isOptionEqualToValue={(option, value) => option === value}
                    value={formData.birthProvincia}
                    onChange={(event, value) => handleProvinceChange(value)}
                    autoHighlight
                    renderInput={(params) => (
                        <TextField
                            {...params}
                            name="birthProvincia"
                            label="Provincia di nascita"
                            autoComplete="off"
                            required
                            fullWidth
                            error={errors.birthProvincia}
                            helperText={errors.birthProvincia && 'Seleziona la provincia di nascita'}
                        />
                    )}
                />
            </Grid>
            <Grid item xs={12} md={6}>
                <TextField type="text"
                           name="birthPlace"
                           label="Comune di nascita"
                           value={formData.birthPlace}
                           onChange={handleChange}
                           autoComplete="off"
                           fullWidth
                           required
                           error={errors.birthPlace}
                           helperText={errors.birthPlace && 'Inserisci il comune di nascita'}
                />
            </Grid>

            <Grid item xs={12} md={3}>
                <Button variant="contained"
                        onClick={computeCF}
                        sx={{
                            '&:disabled': {
                                backgroundColor: '#6f7174',
                                borderColor: '#6f7174',
                                color: '#fff',
                                boxShadow: 'none',
                            }
                        }}
                        color={btnDisabled ? "error" : "success"}
                        style={{height: "100%"}}
                        fullWidth
                        disabled={btnDisabled}
                >
                    Calcola
                </Button>
            </Grid>
            <Grid item xs={12} md={9}>
                <TextField type="text"
                           name="CF"
                           label='Codice fiscale'
                           value={formData.CF === '' ? 'Inserire i dati e calcolare il codice fiscale...' : formData.CF}
                           autoComplete="off"
                           fullWidth
                           required
                           InputProps={{
                               startAdornment: (
                                   <InputAdornment position="start">
                                       <FontAwesomeIcon icon={faIdBadge}/>
                                   </InputAdornment>
                               ),
                               readOnly: true,
                           }}
                           error={errors.CF}
                           helperText={errors.CF && 'Premere il pulsante per calcolare il codice fiscale'}
                />
            </Grid>
        </Grid>
    )
}