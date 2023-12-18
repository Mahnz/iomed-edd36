// Fine.js
import React, {useState} from 'react'
import {
    Grid,
    TextField,
    InputAdornment,
    Checkbox,
    Typography,
    Link, IconButton, FormControlLabel, Tooltip
} from '@mui/material'
import {AlternateEmail, Lock, Visibility, VisibilityOff} from "@mui/icons-material";


export default function Fine({formData, handleChange, errors}) {
    const [showPassword, setShowPassword] = useState(false)
    const [showConfirmPassword, setShowConfirmPassword] = useState(false)
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
                               helperText={errors.email && 'Campo obbligatorio'}
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
                               helperText={errors.password && 'Campo obbligatorio'}
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
                               helperText={errors.confirmPassword && 'Campo obbligatorio'}
                    />
                </Grid>

                <Grid item xs={12}>
                    <FormControlLabel
                        control={
                            <Checkbox
                                name="checkTerms"
                                checked={formData.checkTerms}
                                onChange={handleChange}
                                inputProps={{'aria-label': 'controlled'}}
                            />
                        }
                        label={
                            <Typography variant="body1">
                                Accetto i <Link href="/terms" variant="body1">Termini e Condizioni</Link>
                            </Typography>
                        }
                        // error={errors.checkTerms}
                        // helperText={errors.checkTerms && 'È necessario accettare i termini e le condizioni'}
                    />
                </Grid>
            </Grid>
        </>
    )
}