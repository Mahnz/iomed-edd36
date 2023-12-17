import * as React from 'react'
import {
    Grid,
    FormControl,
    InputLabel,
    Select,
    MenuItem,
    TextField, InputAdornment
} from '@mui/material'
import province from "../../province.js";
import {Fax, LocalPhone, Place} from "@mui/icons-material";


export default function Contatti({formData, handleChange}) {
    return (
        <>
            <Grid container spacing={2}>
                <Grid item xs={12} md={6}>
                    <FormControl fullWidth>
                        <InputLabel id="provincia-residenza-label">Provincia di residenza</InputLabel>
                        <Select name="province"
                                label="Provincia di residenza"
                                labelId="provincia-residenza-label"
                                value={formData.province}
                                onChange={handleChange}
                                autoComplete="off"
                                fullWidth
                                required
                        >
                            <MenuItem value="" disabled>Seleziona la provincia</MenuItem>
                            {province.map((province, index) => (
                                <MenuItem key={index} value={province}>
                                    {province}
                                </MenuItem>
                            ))}
                        </Select>
                    </FormControl>
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
                    />
                </Grid>
                <Grid item xs={12} md={12}>
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
                               maxLength="10"
                               pattern="[0-9]{10}"
                               InputProps={{
                                   startAdornment: (
                                       <InputAdornment position="start">
                                           <LocalPhone/>
                                       </InputAdornment>
                                   ),
                               }}
                               required
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
                               maxLength="10"
                               pattern="[0-9]{10}"
                               InputProps={{
                                   startAdornment: (
                                       <InputAdornment position="start">
                                           <Fax/>
                                       </InputAdornment>
                                   ),
                               }}
                    />
                </Grid>


            </Grid>
        </>
    )
}