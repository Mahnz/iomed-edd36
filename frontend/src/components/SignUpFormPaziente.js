// SignUpFormPaziente.js
import React, {useState, useEffect} from "react"
import Steps from "./SignUpSteps_Paz/Steps.js"
import {
    Box,
    Container,
    Stepper,
    Step,
    StepLabel,
    Paper,
    AppBar,
    Toolbar,
    Typography, createTheme, useTheme, Tooltip, IconButton, Link,
} from "@mui/material"
import axios from "axios";
import Cookies from "universal-cookie";
import {useNavigate} from "react-router-dom";
import {Home} from "@mui/icons-material";

export default function SignUpFormPaziente() {
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
        telefono: '',
        frontID: null,
        backID: null,
        checkTerms: false,
        docType: "patient"
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
        frontID: true,
        backID: true
    })
    const [errContatti, setErrContatti] = useState({
        address: true,
        province: true,
        city: true,
        cap: true,
        telefono: true
    })
    const [errFine, setErrFine] = useState({
        email: true,
        password: true,
        confirmPassword: true,
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
            setErrContatti({
                province: !formData.province.trim(),
                city: !formData.city.trim(),
                cap: !formData.cap.trim(),
                address: !formData.address.trim(),
                telefono: !formData.telefono.trim(),
                frontID: !formData.frontID,
                backID: !formData.backID
            })
            console.log("ERRORI: ", errContatti)
        } else if (step === 3) {
            setErrFine({
                email: !formData.province,
                password: !formData.password,
                confirmPassword: !formData.confirmPassword.trim(),
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
            hasErrors = Object.values(errContatti).some((error) => error)
        } else if (step === 3) {
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

    // ? METODO DA ELIMINARE, USATO SOLO PER TEST
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
            const cleanValue = value.replace(/[^a-zA-Z0-9!@#$%^&*]/g, '')
            setFormData({
                ...formData,
                [name]: cleanValue,
            })
        } else if (name === 'telefonoPersonale' || name === 'cap') {
            // Controllo sull'inserimento di caratteri alfabetici e spazi nel numero di telefono
            const cleanValue = value.replace(/[^0-9]/g, '')
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

    const handleSubmit = async (e) => {
        e.preventDefault()

        if (!Object.values(errInfoPersonali).some((error) => error) &&
            !Object.values(errContatti).some((error) => error) &&
            !Object.values(errFine).some((error) => error)) {
            // todo - Gestire l'invio dei dati in blockchain
            console.log('Dati inviati:', formData)
            console.log("Chiamata funzione axios")
            await axios.post("http://localhost:3001/api/bc/insertUser", {formData: formData})
                .then(res => {
                    console.log("Registrazione paziente effettuata")
                    console.log(res.data)
                    cookies.set('token', res.data.CF, {
                        path: '/',
                        expires: new Date(Date.now() + 3600000), // Valido per 1 ora
                        sameSite: 'Strict',  // Cookie limitato al proprio dominio
                    });
                    cookies.set('type', "paziente", {
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

                    // todo - SNACKBAR DI SUCCESSO
                    alert("Registrazione paziente effettuata");

                    // ? Reset allo stato iniziale del form
                    setFormData(initialForm)
                    navigate("/dashboard/home");
                })
                .catch(e => {
                    console.log(e)
                    alert("Errore: " + e.status + " " + e.response.data);
                })
        } else {
            console.log('Dati non inviati');
            alert("Errore: " + e.status + " " + e.response.data);
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
                        color="inherit"
                        noWrap
                        sx={{flexGrow: 1, color: theme.palette.common.white}}
                    >
                        <b>IOMed</b> | Registrazione paziente
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
                                nextStep={nextStep}
                                prevStep={prevStep}
                                handleChange={handleChange}
                                handleSubmit={handleSubmit}
                                setFormData={setFormData}
                                errors={
                                    step === 1 ? errInfoPersonali :
                                        step === 2 ? errContatti :
                                            step === 3 && errFine
                                }
                                test={test}
                            />
                        </Box>
                        <Typography variant="body2" sx={{mt: 2}}>
                            Hai già un account? <Link href="/loginPaziente">Login</Link>
                        </Typography>
                    </Paper>
                </Box>
            </Container>
        </>
    )
}