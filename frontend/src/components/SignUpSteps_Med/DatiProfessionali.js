// DatiProfessionali.js
import React from 'react'
import {Grid, TextField, InputAdornment, IconButton} from '@mui/material'
import {AlternateEmail, LocalHospital, Lock, Tag, Visibility, VisibilityOff} from "@mui/icons-material";

export default function DatiProfessionali({
                                              formData,
                                              handleChange,
                                              showPassword,
                                              setShowPassword,
                                              showConfirmPassword,
                                              setShowConfirmPassword,
                                              errors
                                          }) {
    return (
        <>
            <Grid container spacing={2}>
                <Grid item xs={12}>
                    <TextField type="email"
                               name="email"
                               label="Email"
                               value={formData.email}
                               onChange={handleChange}
                               fullWidth
                               InputProps={{
                                   startAdornment: (
                                       <InputAdornment position="start">
                                           <AlternateEmail/>
                                       </InputAdornment>
                                   ),
                               }}
                               required
                               error={errors.email}
                               helperText={errors.email && 'Devi inserire un indirizzo email'}
                    />
                </Grid>

                <Grid item xs={12} md={6}>
                    <TextField type={showPassword ? "text" : "password"}
                               name="password"
                               label="Password"
                               value={formData.password}
                               onChange={handleChange}
                               aria-describedby="passwordHelpBlock"
                               minLength="8"
                               maxLength="20"
                               fullWidth
                               InputProps={{
                                   startAdornment: (
                                       <InputAdornment position="start">
                                           <Lock/>
                                       </InputAdornment>
                                   ),
                                   endAdornment: (
                                       <InputAdornment position="end">
                                           <IconButton onClick={() => setShowPassword(!showPassword)}>
                                               {showPassword ? <Visibility/> : <VisibilityOff/>}
                                           </IconButton>
                                       </InputAdornment>
                                   ),
                                   minLength: 8,
                                   maxLength: 20
                               }}
                               inputProps={{
                                   minLength: 8,
                                   maxLength: 20
                               }}
                               required
                               error={errors.password}
                               helperText={errors.password && 'Inserisci una password'}
                    />
                </Grid>
                <Grid item xs={12} md={6}>
                    <TextField type={showConfirmPassword ? "text" : "password"}
                               name="confirmPassword"
                               label="Conferma password"
                               value={formData.confirmPassword}
                               onChange={handleChange}
                               aria-describedby="passwordHelpBlock"
                               fullWidth
                               InputProps={{
                                   startAdornment: (
                                       <InputAdornment position="start">
                                           <Lock/>
                                       </InputAdornment>
                                   ),
                                   endAdornment: (
                                       <InputAdornment position="end">
                                           <IconButton
                                               onClick={() => setShowConfirmPassword(!showConfirmPassword)}>
                                               {showConfirmPassword ? <Visibility/> : <VisibilityOff/>}
                                           </IconButton>
                                       </InputAdornment>
                                   ),
                                   minLength: 8,
                                   maxLength: 20
                               }}
                               inputProps={{
                                   minLength: 8,
                                   maxLength: 20
                               }}
                               required
                               error={errors.confirmPassword}
                               helperText={errors.confirmPassword && 'Devi confermare la password'}
                    />
                </Grid>
            </Grid>

            <Grid container spacing={2} sx={{mt: 2}}>
                <Grid item xs={12} md={6}>
                    <TextField type="text"
                               name="id"
                               label="Identificativo (16 caratteri)"
                               value={formData.id}
                               onChange={handleChange}
                               autoComplete="off"
                               fullWidth
                               InputProps={{
                                   startAdornment: (
                                       <InputAdornment position="start">
                                           <Tag/>
                                       </InputAdornment>
                                   ),
                                   minLength: 16,
                                   maxLength: 16
                               }}
                               inputProps={{
                                   minLength: 16,
                                   maxLength: 16
                               }}
                               required
                               error={errors.id}
                               helperText={errors.id && 'Inserisci un ID univoco'}
                    />
                </Grid>
                <Grid item xs={12} md={6}>
                    <TextField type="text"
                               name="spec"
                               label="Specializzazione"
                               value={formData.spec}
                               onChange={handleChange}
                               autoComplete="off"
                               fullWidth
                               required
                               error={errors.spec}
                               helperText={errors.spec && 'Seleziona il reparto di specializzazione'}
                    />
                </Grid>
                <Grid item xs={12}>
                    <TextField type="text"
                               name="hospital"
                               label="Ospedale/Clinica di riferimento"
                               value={formData.hospital}
                               onChange={handleChange}
                               autoComplete="off"
                               fullWidth
                               InputProps={{
                                   startAdornment: (
                                       <InputAdornment position="start">
                                           <LocalHospital/>
                                       </InputAdornment>
                                   ),
                               }}
                               required
                               error={errors.hospital}
                               helperText={errors.hospital && 'Inserisci ospedale/clinica di riferimento'}
                    />
                </Grid>
            </Grid>
        </>
    )
}