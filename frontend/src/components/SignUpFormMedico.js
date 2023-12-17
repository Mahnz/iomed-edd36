// SignUpFormMedico.js
import React, {useState, useEffect} from "react"
import TestStep from "../components/TestStep.js"
import CodiceFiscale from 'codice-fiscale-js';
import {Box, Container, Stepper, StepLabel, Step, Paper, Typography} from "@mui/material";
import axios from "axios";

export default function SignUpFormMedico() {
    const initialForm = {
        firstName: '',
        lastName: '',
        birthDate: '',
        birthProvincia: '',
        birthPlace: '',
        sex: '',
        CF: '',
        email: '',
        password: '',
        confirmPassword: '',
        address: '',
        province: '',
        city: '',
        cap: '',
        telefonoPersonale: '',
        telefonoUfficio: '',
        frontID: null,
        backID: null,
        checkTerms: false,
        docType: "doctor",
        id: '',
        spec: '',
        hospital: ''
    }
    const [step, setStep] = useState(1)
    const [formData, setFormData] = useState(initialForm)

    // TODO - Settare tutti i name dei campi del form, fedelmente a quelli di formData
    const [btnDisabled, setBtnDisabled] = useState(true);
    const [validated, setValidated] = useState(false)
    const [errors, setErrors] = useState({
        firstName: false,
        lastName: false,
        birthDate: false,
        birthProvincia: false,
        birthPlace: false,
        sex: false,
        CF: false,
        email: false,
        password: false,
        confirmPassword: false,
        address: false,
        province: false,
        city: false,
        cap: false,
        telefonoPersonale: false,
        frontID: null,
        backID: null,
        checkTerms: false,
        id: false,
        spec: false,
        hospital: false
    })


    const nextStep = (e) => {
        e.preventDefault()

        // Validazione input del form client-side
        let form = e.currentTarget;
        if (form.checkValidity() === false) {
            e.stopPropagation()
        }
        setValidated(true)

        switch (step) {
            case 1:
                if (
                    formData.firstName &&
                    formData.lastName &&
                    formData.sex &&
                    formData.birthDate &&
                    formData.birthProvincia &&
                    formData.birthPlace &&
                    formData.CF) {
                    setStep(step + 1)
                    setValidated(false)
                } else {
                    alert("Compila tutti i campi obbligatori")
                }
                break;
            case 2:
                if (formData.email &&
                    formData.password &&
                    formData.confirmPassword &&
                    formData.id.length === 16 &&
                    formData.spec &&
                    formData.hospital
                ) {
                    if (formData.password === formData.confirmPassword) {
                        setStep(step + 1)
                        setValidated(false)
                    } else {
                        alert("Le password inserite sono diverse")
                    }
                }
                break;
            case 3:
                if (
                    formData.province &&
                    formData.city &&
                    formData.address &&
                    formData.telefonoPersonale && formData.telefonoPersonale.length === 10) {
                    setStep(step + 1)
                    setValidated(false)
                }
                break;
            default:
                break;
        }
    }

    const prevStep = () => {
        setStep(step - 1)
    }

// ? METODO DA ELIMINARE, USATO SOLO PER TEST
    const test = () => {
        setStep(step + 1)
    }

    const handleChange = (e) => {
        const {name, value, type} = e.target
        if (type === 'date') {
            // Memorizzazione della data di nascita. Si memorizza SOLO la data effettiva
            const dateValue = new Date(value)

            setFormData({
                ...formData,
                [name]: dateValue.toISOString().split('T')[0]
            })
        } else if (type === 'checkbox') {
            // Memorizzazione del valore booleano della checkbox
            setFormData({
                ...formData,
                [name]: e.target.checked
            })
        } else if (name === 'password' || name === 'confirmPassword') {
            // Evita l'inserimento di spazi e caratteri speciali non consentiti nelle password
            const cleanValue = value.replace(/[^a-zA-Z0-9!@#$%^&*]/g, '');
            setFormData({
                ...formData,
                [name]: cleanValue,
            })
        } else if (name === 'telefonoPersonale' || name === 'telefonoUfficio') {
            // Controllo sull'inserimento di caratteri alfabetici e spazi nel numero di telefono
            const cleanValue = value.replace(/[^0-9]/g, '');
            setFormData({
                ...formData,
                [name]: cleanValue,
            })
        } else if (name === 'birthProvincia') {
            // Check sulla Provincia di nascita
            setFormData({
                ...formData,
                birthProvincia: value,
                birthPlace: ''
            })
        } else if (name === 'province') {
            // Check sulla Provincia di residenza
            setFormData({
                ...formData,
                province: value,
                city: ''
            })
            // } else if (name === 'frontId') {
        } else if (name === 'frontId') {
            // Memorizzazione del fronte del documento
            const selectedFile = e.target.files[0]
            console.log("Fronte documento:", e.target.files[0])
            setFormData({
                ...formData,
                frontId: selectedFile
            })
            // } else if (name === 'backId') {
            //     // Memorizzazione del fronte del documento
            //     const selectedFile = e.target.files[0]
            //     console.log("Fronte documento:", e.target.files[0])
            //
            //     setFormData({
            //         ...formData,
            //         backId: selectedFile
            //     })
        } else if (name === 'backId') {
            // Memorizzazione del fronte del documento
            const selectedFile = e.target.files[0]
            console.log("Retro documento:", e.target.files[0])
            setFormData({
                ...formData,
                backId: selectedFile
            })
        } else {
            // Memorizzazione di ogni altro campo testuale
            setFormData({
                ...formData,
                [name]: value
            })
        }
    }

    const handleSubmit = (e) => {
        e.preventDefault()

        // Validazione input del form client-side
        let form = e.currentTarget;
        if (form.checkValidity() === false) {
            e.stopPropagation()
        }
        setValidated(true)

        // TODO - Gestire l'invio dei dati in blockchain
        console.log('Dati inviati:', formData);
        console.log("Chiamata funzione axios");

        axios.post("http://localhost:3001/api/bc/insertUser", {
            formData: formData
        }).then(res => console.log(res)).catch(e => console.log(e));

        // ? Reset allo stato iniziale del form
        setFormData(initialForm)
    }

    useEffect(() => {
        const isFormValid =
            formData.firstName &&
            formData.lastName &&
            formData.birthDate &&
            formData.sex &&
            formData.birthPlace;
        setBtnDisabled(!isFormValid);
    }, [formData]);

    const computeCF = () => {
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
                });

                const calculatedCF = codFiscale.toString();

                setFormData({
                    ...formData,
                    CF: calculatedCF,
                });
            } catch (error) {
                console.error('Errore nel calcolo del Codice Fiscale:', error);
            }
        }
    };


    return (
        <Container component="main" maxWidth="xs"
            // sx={{
            //     backgroundColor: (theme) =>
            //         theme.palette.mode === 'light'
            //             ? theme.palette.grey[100]
            //             : theme.palette.grey[900],
            // }}
        >
            <Box
                sx={{
                    display: 'flex',
                    flexDirection: 'column',
                    alignItems: 'center',
                    justifyContent: 'center',
                    height: '100vh',
                }}
            >
                <Paper variant="outlined"
                       sx={{
                           p: 4,
                           borderRadius: 4,
                           display: 'flex',
                           flexDirection: 'column',
                           alignItems: 'center',
                           minWidth: step === 4 ? '600px' : '700px',
                           maxWidth: step === 4 ? '600px' : '700px',
                       }}>
                    {step === 1 &&
                        <Typography component="h1" variant="h4" sx={{mb: 3}}>Informazioni personali</Typography>}
                    {step === 2 &&
                        <Typography component="h1" variant="h4" sx={{mb: 3}}>Dati professionali</Typography>}
                    {step === 3 && <Typography component="h1" variant="h4" sx={{mb: 3}}>Contatti</Typography>}
                    {step === 4 && <Typography component="h1" variant="h4" sx={{mb: 3}}>Fine</Typography>}

                    <Stepper activeStep={step - 1} sx={{pt: 3, pb: 5}} alternativeLabel>
                        <Step>
                            <StepLabel>Informazioni personali</StepLabel>
                        </Step>
                        <Step>
                            <StepLabel>Dati professionali</StepLabel>
                        </Step>
                        <Step>
                            <StepLabel>Contatti</StepLabel>
                        </Step>
                        <Step>
                            <StepLabel>Fine</StepLabel>
                        </Step>
                    </Stepper>
                    <Box component="form" noValidate validated={validated.toString()} onSubmit={handleSubmit}>
                        <TestStep
                            step={step}
                            formData={formData}
                            nextStep={nextStep}
                            prevStep={prevStep}
                            handleChange={handleChange}
                            handleSubmit={handleSubmit}
                            computeCF={computeCF}
                            btnDisabled={btnDisabled}
                            test={test}
                        />
                    </Box>
                </Paper>
            </Box>
        </Container>
    )
}