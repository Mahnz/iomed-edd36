// SignUpFormMedico.js
import React, {useState, useEffect} from "react"
import TestStep from "../components/TestStep.js"
import CodiceFiscale from 'codice-fiscale-js';
import {
    Box,
    Container,
    Stepper,
    Step,
    StepLabel,
    Paper,
    AppBar,
    Toolbar,
    Typography,
} from "@mui/material";
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
    // const [validationErrors, setValidationErrors] = useState(0)
    const [formData, setFormData] = useState(initialForm)

    // TODO - Settare tutti i name dei campi del form, fedelmente a quelli di formData
    const [btnDisabled, setBtnDisabled] = useState(true);
    const [validated, setValidated] = useState(false)
    const [errors, setErrors] = useState({
        firstName: false,
        lastName: false,
        sex: false,
        birthDate: false,
        birthProvincia: false,
        birthPlace: false,
        CF: false,
        email: false,
        password: false,
        confirmPassword: false,
        id: false,
        spec: false,
        hospital: false,
        province: false,
        city: false,
        address: false,
        cap: false,
        telefonoPersonale: false,
        frontID: false,
        backID: false,
        checkTerms: false
    })

    useEffect(() => {
        if (step === 1) {
            setErrors({
                firstName: !formData.firstName.trim(),
                lastName: !formData.lastName.trim(),
                sex: !formData.sex.trim(),
                birthDate: !formData.birthDate.trim(),
                birthProvincia: !formData.birthProvincia.trim(),
                birthPlace: !formData.birthPlace.trim(),
                CF: !formData.CF.trim(),
            })
        } else if (step === 2) {
            setErrors({
                email: !formData.email.trim(),
                password: !formData.password.trim(),
                confirmPassword: !formData.confirmPassword.trim(),
                id: !formData.id.trim(),
                spec: !formData.spec.trim(),
                hospital: !formData.hospital.trim(),
            })
        } else if (step === 3) {
            setErrors({
                province: !formData.province.trim(),
                city: !formData.city.trim(),
                address: !formData.address.trim(),
                cap: !formData.cap.trim(),
                telefonoPersonale: !formData.telefonoPersonale.trim(),
            })
        } else if (step === 4) {
            setErrors({
                frontID: !formData.frontID,
                backID: !formData.backID,
                checkTerms: !formData.checkTerms,
            })
        }
    }, [step, formData]);

    const nextStep = () => {
        const hasErrors = Object.values(errors).some((error) => error);
        console.log("ERRORI: " + hasErrors)
        // 0 errori  ->  prossimo step
        if (!hasErrors) {
            setStep((prevStep) => prevStep + 1);
        }
    };

    const prevStep = () => {
        setStep(step - 1)
    }

// TODO - Metodo da eliminare, usato solo per test
    const test = () => {
        setStep(step + 1)
    }

    const handleChange = (e) => {
        const {name, value, type} = e.target
        if (name === 'birthDate') {
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
        } else if (name === 'telefonoPersonale' || name === 'telefonoUfficio' || name === 'cap') {
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
        } else if (name === 'frontID') {
            // Memorizzazione del fronte del documento
            const selectedFile = e.target.files[0]
            console.log("Fronte documento:", e.target.files[0])
            setFormData({
                ...formData,
                frontID: selectedFile
            })
        } else if (name === 'backID') {
            // Memorizzazione del fronte del documento
            const selectedFile = e.target.files[0]
            console.log("Retro documento:", e.target.files[0])
            setFormData({
                ...formData,
                backID: selectedFile
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

        // TODO - Gestire l'invio dei dati in blockchain
        console.log('Dati inviati:', formData);
        console.log("Chiamata funzione axios");

        axios.post("http://localhost:3001/api/bc/insertUser", {formData: formData})
            .then(res => console.log(res)).catch(e => console.log(e));

        // ? Reset allo stato iniziale del form
        setFormData(initialForm)
    }


// ? Controllo interattivo per il calcolo del Codice Fiscale
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
        <>
            <AppBar
                position="absolute"
                color="primary"
                elevation={0}
            >
                <Toolbar>
                    <Typography
                        component="h1"
                        variant="h5"
                        color="inherit"
                        noWrap
                        sx={{flexGrow: 1}}
                    >
                        MedPlatform
                    </Typography>
                </Toolbar>
            </AppBar>
            <Container component="main" maxWidth="xs"
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
                            <Typography component="h1" variant="h4" sx={{mb: 3}}>Informazioni
                                personali</Typography>}
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
                        <Box component="form" onSubmit={handleSubmit}>
                            <TestStep
                                step={step}
                                formData={formData}
                                nextStep={nextStep}
                                prevStep={prevStep}
                                handleChange={handleChange}
                                handleSubmit={handleSubmit}
                                computeCF={computeCF}
                                btnDisabled={btnDisabled}
                                errors={errors}
                                test={test}
                            />
                        </Box>
                    </Paper>
                </Box>
            </Container>
        </>
    )
}