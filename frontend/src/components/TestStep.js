// TestStep.js
import React, {useState} from 'react'
import {Button, Grid, Link, Typography} from "@mui/material"
import axios from "axios"

import InformazioniPersonali from "./SignUpSteps/InformazioniPersonali.js";
import DatiProfessionali from "./SignUpSteps/DatiProfessionali.js";
import Contatti from "./SignUpSteps/Contatti.js";
import Fine from "./SignUpSteps/Fine.js";

export default function TestStep({
                                     step,
                                     formData,
                                     nextStep,
                                     prevStep,
                                     handleChange,
                                     handleSubmit,
                                     computeCF,
                                     btnDisabled,
                                     errors,
                                     test
                                 }) {
    const [showPassword, setShowPassword] = useState(false)
    const [showConfirmPassword, setShowConfirmPassword] = useState(false)

    return (
        <>
            {step === 1 && (
                <>
                    <InformazioniPersonali formData={formData}
                                           handleChange={handleChange}
                                           computeCF={computeCF}
                                           btnDisabled={btnDisabled}
                                           nextStep={nextStep}
                                           errors={errors}
                                           test={test}
                    />

                    {/*  PULSANTI "AVANTI" E "TEST"  */}
                    <Grid container spacing={1} sx={{mt: 2}}>
                        <Grid item xs={12}>
                            <Button variant="contained" color="primary" fullWidth onClick={nextStep}>
                                Avanti
                            </Button>
                        </Grid>
                        <Grid item xs={12}>
                            <Button variant="contained" color="error" fullWidth onClick={test}>
                                TEST
                            </Button>
                        </Grid>
                        <Grid item xs={12}>
                            <Typography variant="body2">
                                Hai già un account? <Link href="/login" variant="body2">Login</Link>
                            </Typography>
                        </Grid>
                    </Grid>
                </>
            )}

            {step === 2 && (
                <>
                    <DatiProfessionali formData={formData}
                                       handleChange={handleChange}
                                       errors={errors}
                                       showPassword={showPassword}
                                       setShowPassword={setShowPassword}
                                       showConfirmPassword={showConfirmPassword}
                                       setShowConfirmPassword={setShowConfirmPassword}
                    />

                    <Grid container spacing={2} sx={{mt: 2}}>
                        <Grid item xs={6}>
                            <Button variant="outlined"
                                    sx={{
                                        backgroundColor: '#808489',
                                        borderColor: '#808489',
                                        color: '#fff',
                                        '&:hover': {
                                            backgroundColor: '#6e7279',
                                            borderColor: '#808489',
                                            boxShadow: 'none',
                                        },
                                    }}
                                    fullWidth
                                    onClick={prevStep}>
                                Indietro
                            </Button>
                        </Grid>
                        <Grid item xs={6}>
                            <Button variant="contained" color="primary" fullWidth onClick={nextStep}>
                                Avanti
                            </Button>
                        </Grid>
                        <Grid item xs={12}>
                            <Button variant="contained" color="error" fullWidth onClick={test}>
                                Test
                            </Button>
                        </Grid>
                    </Grid>
                </>
            )}

            {step === 3 && (
                <>
                    <Contatti formData={formData} handleChange={handleChange} errors={errors}/>

                    <Grid container spacing={2} sx={{mt: 2}}>
                        <Grid item xs={6}>
                            <Button variant="outlined"
                                    sx={{
                                        backgroundColor: '#808489',
                                        borderColor: '#808489',
                                        color: '#fff',
                                        '&:hover': {
                                            backgroundColor: '#6e7279',
                                            borderColor: '#808489',
                                            boxShadow: 'none',
                                        },
                                    }}
                                    fullWidth
                                    onClick={prevStep}>
                                Indietro
                            </Button>
                        </Grid>
                        <Grid item xs={6}>
                            <Button variant="contained" color="primary" fullWidth onClick={nextStep}>
                                Avanti
                            </Button>
                        </Grid>
                        <Grid item xs={12}>
                            <Button variant="contained" color="error" fullWidth onClick={test}>
                                TEST
                            </Button>
                        </Grid>
                        <Grid item xs={12}>
                            <Typography variant="body2">
                                Hai già un account? <Link href="/login" variant="body2">Login</Link>
                            </Typography>
                        </Grid>
                    </Grid>
                </>
            )}


            {step === 4 && (
                <>
                    <Fine formData={formData} handleChange={handleChange} errors={errors}/>

                    <Grid container spacing={2} sx={{mt: 2}}>
                        <Grid item xs={6}>
                            <Button variant="outlined"
                                    sx={{
                                        backgroundColor: '#808489',
                                        borderColor: '#808489',
                                        color: '#fff',
                                        '&:hover': {
                                            backgroundColor: '#6e7279',
                                            borderColor: '#808489',
                                            boxShadow: 'none',
                                        },
                                    }}
                                    fullWidth
                                    onClick={prevStep}>
                                Indietro
                            </Button>
                        </Grid>
                        <Grid item xs={6}>
                            <Button variant="contained" color="primary" fullWidth onClick={handleSubmit}>
                                Termina
                            </Button>
                        </Grid>
                    </Grid>
                </>
            )}
        </>
    )
}