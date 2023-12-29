// SignUpFormMedico.js
import React, {useState, useEffect} from "react"
import Steps from "./SignUpSteps_Med/Steps.js"
import {
    Box,
    Container,
    Stepper,
    Step,
    StepLabel,
    Paper,
    AppBar,
    Toolbar,
    Typography, Tooltip, IconButton, Link, useTheme,
} from "@mui/material"
import axios from "axios"
import Cookies from "universal-cookie";
import {useNavigate} from "react-router-dom";
import {Home} from "@mui/icons-material";

export default function SignUpFormMedico() {
    const theme = useTheme()
    const cookies = new Cookies();
    const navigate = useNavigate();
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
    const [errInfoPersonali, setErrInfoPersonali] = useState({
        firstName: true,
        lastName: true,
        birthDate: true,
        birthProvincia: true,
        birthPlace: true,
        sex: true,
        CF: true,
    })
    const [errDatiProfessionali, setErrDatiProfessionali] = useState({
        email: true,
        password: true,
        confirmPassword: true,
        id: true,
        spec: true,
        hospital: true,
    })
    const [errContatti, setErrContatti] = useState({
        province: true,
        city: true,
        cap: true,
        address: true,
        telefonoPersonale: true,
    })
    const [errFine, setErrFine] = useState({
        frontID: true,
        backID: true,
        checkTerms: true
    })

    useEffect(() => {
        if (step === 1) {
            setErrInfoPersonali({
                firstName: !formData.firstName.trim(),
                lastName: !formData.lastName.trim(),
                sex: !formData.sex.trim(),
                birthDate: !formData.birthDate.trim(),
                birthProvincia: !formData.birthProvincia.trim(),
                birthPlace: !formData.birthPlace.trim(),
                CF: !formData.CF.trim()
            })
            console.log("ERRORI: ", errInfoPersonali)
        } else if (step === 2) {
            setErrDatiProfessionali({
                email: !formData.email.trim(),
                password: !formData.password.trim(),
                confirmPassword: !formData.confirmPassword.trim(),
                id: !formData.id.trim(),
                spec: !formData.spec.trim(),
                hospital: !formData.hospital.trim()
            })
            console.log("ERRORI: ", errDatiProfessionali)
        } else if (step === 3) {
            setErrContatti({
                province: !formData.province.trim(),
                city: !formData.city.trim(),
                address: !formData.address.trim(),
                cap: !formData.cap.trim(),
                telefonoPersonale: !formData.telefonoPersonale.trim()
            })
            console.log("ERRORI: ", errContatti)
        } else if (step === 4) {
            setErrFine({
                frontID: !formData.frontID,
                backID: !formData.backID,
                checkTerms: !formData.checkTerms
            })
            console.log("ERRORI: ", errFine)
        }
    }, [step, formData])

    const nextStep = () => {
        let hasErrors = false
        if (step === 1) {
            hasErrors = Object.values(errInfoPersonali).some((error) => error)
        } else if (step === 2) {
            hasErrors = Object.values(errDatiProfessionali).some((error) => error)
        } else if (step === 3) {
            hasErrors = Object.values(errContatti).some((error) => error)
        } else if (step === 4) {
            hasErrors = Object.values(errFine).some((error) => error)
        }
        console.log("ERRORI: " + hasErrors)
        // 0 errori  ->  prossimo step
        if (!hasErrors) {
            setStep((prevStep) => prevStep + 1)
        }
    }

    const prevStep = () => {
        setStep(step - 1)
    }

    // todo - Metodo da eliminare, usato solo per test
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
        } else if (name === 'birthProvincia') {
            // Check sulla Provincia di nascita
            setFormData({
                ...formData,
                birthProvincia: value,
                birthPlace: ''
            })
        } else if (name === 'password' || name === 'confirmPassword') {
            // Evita l'inserimento di spazi e caratteri speciali non consentiti nelle password
            const cleanValue = value.replace(/[^a-zA-Z0-9!@#$%^&*]/g, '')
            setFormData({
                ...formData,
                [name]: cleanValue,
            })
        } else if (name === 'telefonoPersonale' || name === 'telefonoUfficio' || name === 'cap') {
            // Controllo sull'inserimento di caratteri alfabetici e spazi nel numero di telefono
            const cleanValue = value.replace(/[^0-9]/g, '')
            setFormData({
                ...formData,
                [name]: cleanValue,
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
        } else if (type === 'checkbox') {
            // Memorizzazione del valore booleano della checkbox
            setFormData({
                ...formData,
                [name]: e.target.checked
            })
        } else if (name === 'id') {
            // Check sulla Provincia di nascita
            setFormData({
                ...formData,
                id: value.toUpperCase()
            })
        } else {
            // Memorizzazione di ogni altro campo testuale
            setFormData({
                ...formData,
                [name]: value
            })
        }
    }

    const handleSubmit = async (e) => {
        e.preventDefault()

        if (!Object.values(errInfoPersonali).some((error) => error) &&
            !Object.values(errDatiProfessionali).some((error) => error) &&
            !Object.values(errContatti).some((error) => error) &&
            !Object.values(errFine).some((error) => error)) {
            console.log('Dati inviati:', formData)
            console.log("Chiamata funzione axios")
            await axios.post("http://localhost:3001/api/bc/insertUser", {formData: formData})
                .then(res => {
                    console.log("Registrazione medico effettuata")
                    console.log(res.data)
                    cookies.set('token', res.data.id, {
                        path: '/',
                        expires: new Date(Date.now() + 3600000), // Valido per 1 ora
                        sameSite: 'Strict',  // Cookie limitato al proprio dominio
                    });
                    cookies.set('type', "medico", {
                        path: '/',
                        expires: new Date(Date.now() + 3600000), // Valido per 1 ora
                        sameSite: 'Strict',  // Cookie limitato al proprio dominio
                    });
                    cookies.set('firstName', res.data.firstName, {
                        path: '/',
                        expires: new Date(Date.now() + 3600000), // Valido per 1 ora
                        sameSite: 'Strict',  // Cookie limitato al proprio dominio
                    });
                    cookies.set('lastName', res.data.lastName, {
                        path: '/',
                        expires: new Date(Date.now() + 3600000), // Valido per 1 ora
                        sameSite: 'Strict',  // Cookie limitato al proprio dominio
                    });

                    // ? Reset allo stato iniziale del form
                    setFormData(initialForm)
                    navigate("/dashboard/home", {state: {successMessage: 'Registrazione effettuata con successo!'}})
                })
                .catch(e => console.log(e))
        } else {
            console.log('Dati non inviati');
            alert("Errore " + e.status + " " + e.response.data);
        }
    }

    const goHome = () => {
        navigate("/homepage")
    }

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
                        noWrap
                        sx={{flexGrow: 1, color: theme.palette.common.white}}
                    >
                        <b>IOMed</b> | Registrazione medico
                    </Typography>
                    <Tooltip placement="bottom-end" title="Torna alla homepage">
                        <IconButton
                            size="large"
                            onClick={goHome}
                            color="inherit"
                            edge="end"
                        >
                            <Home/>
                        </IconButton>
                    </Tooltip>
                </Toolbar>
            </AppBar>
            <Container component="main" maxWidth="xs">
                <Box
                    sx={{
                        display: 'flex',
                        flexDirection: 'column',
                        alignItems: 'center',
                        justifyContent: 'center',
                        height: '98vh',
                    }}
                >
                    <Paper variant="outlined"
                           sx={{
                               p: 4,
                               pb: 2,
                               borderRadius: 4,
                               display: 'flex',
                               flexDirection: 'column',
                               alignItems: 'center',
                               minWidth: step === 4 ? '600px' : '700px',
                               maxWidth: step === 4 ? '600px' : '700px',
                           }}>

                        <Stepper activeStep={step - 1} sx={{pb: 3}} alternativeLabel>
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
                            <Steps
                                step={step}
                                formData={formData}
                                setFormData={setFormData}
                                nextStep={nextStep}
                                prevStep={prevStep}
                                handleChange={handleChange}
                                handleSubmit={handleSubmit}
                                errors={
                                    step === 1 ? errInfoPersonali :
                                        step === 2 ? errDatiProfessionali :
                                            step === 3 ? errContatti :
                                                step === 4 ? errFine : errors
                                }
                                test={test}
                            />
                        </Box>
                        <Typography variant="body2" sx={{mt: 2}}>
                            Hai già un account? <Link href="/loginMedico">Login</Link>
                        </Typography>
                    </Paper>
                </Box>
            </Container>
        </>
    )
}