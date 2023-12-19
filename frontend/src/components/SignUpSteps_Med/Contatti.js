import * as React from 'react'
import {Grid, MenuItem, TextField, InputAdornment} from '@mui/material'
import {provinces} from "../../utils.js";
import {Fax, LocalPhone, Place} from "@mui/icons-material";


export default function Contatti({formData, handleChange, errors}) {
    return (
        <>
            <Grid container spacing={2}>
                <Grid item xs={12} md={6}>
                    <TextField select
                               name="province"
                               label="Provincia di residenza"
                               value={formData.province}
                               onChange={handleChange}
                               autoComplete="off"
                               fullWidth
                               required
                               error={errors.province}
                               helperText={errors.province && 'Campo obbligatorio'}
                    >
                        <MenuItem value="" disabled>Seleziona la provincia</MenuItem>
                        {provinces.map((province, index) => (
                            <MenuItem key={index} value={province}>
                                {province}
                            </MenuItem>
                        ))}
                    </TextField>
                </Grid>
                <Grid item xs={12} md={6}>
                    <TextField type="text"
                               name="city"
                               label="Comune di residenza"
                               value={formData.city}
                               onChange={handleChange}
                               autoComplete="off"
                               fullWidth
                               required
                               error={errors.city}
                               helperText={errors.city && 'Campo obbligatorio'}
                    />
                </Grid>
                <Grid item xs={3} md={3}>
                    <TextField type="text"
                               name="cap"
                               label="CAP"
                               value={formData.cap}
                               onChange={handleChange}
                               autoComplete="off"
                               fullWidth
                               InputProps={{
                                   minLength: 5,
                                   maxLength: 5
                               }}
                               inputProps={{
                                   minLength: 5,
                                   maxLength: 5
                               }}
                               required
                               error={errors.cap}
                               helperText={errors.cap && 'Campo obbligatorio'}
                    />
                </Grid>
                <Grid item xs={9} md={9}>
                    <TextField type="text"
                               name="address"
                               label="Indirizzo di residenza"
                               value={formData.address}
                               onChange={handleChange}
                               autoComplete="off"
                               fullWidth
                               InputProps={{
                                   startAdornment: (
                                       <InputAdornment position="start">
                                           <Place/>
                                       </InputAdornment>
                                   ),
                               }}
                               required
                               error={errors.address}
                               helperText={errors.address && 'Campo obbligatorio'}
                    />
                </Grid>

                <Grid item xs={12} md={12}>
                    <TextField type="text"
                               name="telefonoPersonale"
                               label="Telefono personale"
                               value={formData.telefonoPersonale}
                               onChange={handleChange}
                               autoComplete="off"
                               fullWidth
                               InputProps={{
                                   startAdornment: (
                                       <InputAdornment position="start">
                                           <LocalPhone/>
                                       </InputAdornment>
                                   ),
                                   minLength: 10,
                                   maxLength: 10
                               }}
                               inputProps={{
                                   minLength: 10,
                                   maxLength: 10
                               }}
                               required
                               error={errors.telefonoPersonale}
                               helperText={errors.telefonoPersonale && 'Campo obbligatorio'}
                    />
                </Grid>
                <Grid item xs={12} md={12}>
                    <TextField type="text"
                               name="telefonoUfficio"
                               label="Telefono ufficio"
                               value={formData.telefonoUfficio}
                               onChange={handleChange}
                               autoComplete="off"
                               fullWidth
                               InputProps={{
                                   startAdornment: (
                                       <InputAdornment position="start">
                                           <Fax/>
                                       </InputAdornment>
                                   ),
                                   minLength: 10,
                                   maxLength: 10
                               }}
                               inputProps={{
                                   minLength: 10,
                                   maxLength: 10
                               }}
                    />
                </Grid>
            </Grid>
        </>
    )
}