import * as React from 'react'
import {
    TextField,
    Grid,
    FormControl,
    InputLabel,
    Select,
    MenuItem, Button, InputAdornment, Typography, Link
} from '@mui/material'
import province from "../../province.js";
import {FontAwesomeIcon} from "@fortawesome/react-fontawesome";
import {faIdBadge} from "@fortawesome/free-solid-svg-icons";

export default function InformazioniPersonali({
                                                  formData,
                                                  handleChange,
                                                  computeCF,
                                                  btnDisabled,
                                                  maxDate,
                                              }) {
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
                />
            </Grid>

            <Grid item xs={12} md={4}>
                <FormControl fullWidth>
                    <InputLabel id="sesso-label">Sesso</InputLabel>
                    <Select
                        name="sex"
                        label="Sesso"
                        labelId="sesso-label"
                        value={formData.sex}
                        onChange={handleChange}
                        autoComplete="sex"
                        required
                        fullWidth
                    >
                        <MenuItem value="">Seleziona...</MenuItem>
                        <MenuItem value="M">Maschio</MenuItem>
                        <MenuItem value="F">Femmina</MenuItem>
                    </Select>
                </FormControl>
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
                />
            </Grid>

            <Grid item xs={12} md={6}>
                <FormControl fullWidth>
                    <InputLabel id="provincia-nascita-label">Provincia di nascita</InputLabel>
                    <Select name="birthProvincia"
                            label="Provincia di nascita"
                            labelId="provincia-nascita-label"
                            value={formData.birthProvincia}
                            onChange={handleChange}
                            autoComplete="off"
                            fullWidth
                            required
                    >
                        <MenuItem value="" disabled>Seleziona la provincia</MenuItem>
                        {province.map((provincia, index) => (
                            <MenuItem key={index} value={provincia}>
                                {provincia}
                            </MenuItem>
                        ))}
                    </Select>
                </FormControl>
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
                />
            </Grid>

            <Grid item xs={12} md={3}>
                <Button variant="contained"
                        style={{height: "100%"}}
                        sx={{
                            '&:disabled': {
                                backgroundColor: '#6f7174',
                                borderColor: '#6f7174',
                                color: '#fff',
                                boxShadow: 'none',
                            }
                        }}
                        color={btnDisabled ? "error" : "success"}
                        fullWidth
                        onClick={computeCF}
                        disabled={btnDisabled}
                >
                    Calcola
                </Button>
            </Grid>
            <Grid item xs={12} md={9}>
                <TextField type="text"
                           name="CF"
                           label={formData.CF === '' ? "Inserire i dati per il calcolo del codice fiscale..." : 'Codice fiscale'}
                           // defaultValue="Inserire i dati per il calcolo del codice fiscale..."
                           value={formData.CF === '' ? 'Inserire i dati per il calcolo del codice fiscale...' : formData.CF}
                           disabled={formData.CF === ''}
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
                />
            </Grid>
        </Grid>
    )
}