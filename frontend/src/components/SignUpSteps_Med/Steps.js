// Steps.js - Medico
import React, {useState} from 'react'
import {Button, Grid, Link, Typography} from "@mui/material"

import InformazioniPersonali from "./InformazioniPersonali.js";
import DatiProfessionali from "./DatiProfessionali.js";
import Contatti from "./Contatti.js";
import Fine from "./Fine.js";

export default function Steps({
                                  step,
                                  formData,
                                  setFormData,
                                  nextStep,
                                  prevStep,
                                  handleChange,
                                  handleSubmit,
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
                                           nextStep={nextStep}
                                           setFormData={setFormData}
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