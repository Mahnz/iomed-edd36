// LoginFormPaziente.js
import React, {useState, useEffect} from "react";
import {useNavigate} from "react-router-dom";
import {
    AppBar,
    Avatar,
    Box,
    Button,
    Container,
    CssBaseline,
    TextField,
    Toolbar,
    Typography,
    Link,
    Paper, InputAdornment, IconButton, Grid, useTheme, Tooltip
} from "@mui/material";
import {Home, Person, Visibility, VisibilityOff} from "@mui/icons-material";
import Cookies from 'universal-cookie'
import axios from 'axios'

export default function LoginFormPaziente() {
    const theme = useTheme()
    const [email, setEmail] = useState('')
    const [password, setPassword] = useState('')
    const [errors, setErrors] = useState({
        email: {
            error: false,
            message: ''
        },
        password: {
            error: false,
            message: ''
        },
    })
    const emailRegex = /^[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,}$/i;

    const navigate = useNavigate()
    const cookies = new Cookies();

    useEffect(() => {
        // Verifica se il cookie è impostato
        if (cookies.get("token")) {
            console.log(cookies.get("token"))
            navigate("/dashboard/home");
        }
    })

    const [showPassword, setShowPassword] = useState(false)
    const handleTogglePasswordVisibility = () => {
        setShowPassword(!showPassword)
    }

    const handleChange = (e) => {
        const {name, value} = e.target

        if (name === 'inputEmailLogin') {
            setEmail(value)
            setErrors((prevErrors) => ({
                ...prevErrors,
                email: {
                    error: false,
                    message: ''
                }
            }));
        } else if (name === 'inputPassword') {
            // Evita l'inserimento di spazi e caratteri speciali non consentiti nelle password
            const cleanValue = value.replace(/[^a-zA-Z0-9!@#$%^&*]/g, '');
            setPassword(cleanValue)
            setErrors((prevErrors) => ({
                ...prevErrors,
                password: {
                    error: false,
                    message: ''
                }
            }));
        }
    }

    const [isFirstRender, setIsFirstRender] = useState(true)
    const handleSubmit = async (e) => {
        e.preventDefault()
        if (!email) {
            setErrors((prevErrors) => ({
                ...prevErrors,
                email: {
                    error: true,
                    message: 'Campo obbligatorio'
                }
            }))
        } else {
            if (!emailRegex.test(email)) {
                setErrors((prevErrors) => ({
                    ...prevErrors,
                    email: {
                        error: true,
                        message: "Inserire un'email valida"
                    }
                }))
            } else {
                setErrors((prevErrors) => ({
                    ...prevErrors,
                    email: {
                        error: false,
                        message: ""
                    }
                }))
            }
        }

        if (!password) {
            setErrors((prevErrors) => ({
                ...prevErrors,
                password: {
                    error: true,
                    message: 'Campo obbligatorio'
                }
            }))
        } else {
            setErrors((prevErrors) => ({
                ...prevErrors,
                password: {
                    error: false,
                    message: ""
                }
            }))
        }
        if (!errors.email.error && !errors.password.error) {
            const user = {
                email: email,
                password: password
            };
            console.log("Sono arrivato alla POST")
            await axios.post('http://localhost:3001/api/bc/login', user)
                .then(res => {
                    console.log("Login paziente effettuato")
                    console.log(res.data)
                    cookies.set('token', res.data.CF, {
                        path: '/',
                        expires: new Date(Date.now() + 3600000), // Valido per 1 ora
                        sameSite: 'Strict',  // Cookie limitato al proprio dominio
                    })
                    cookies.set('type', "paziente", {
                        path: '/',
                        expires: new Date(Date.now() + 3600000), // Valido per 1 ora
                        sameSite: 'Strict',  // Cookie limitato al proprio dominio
                    })
                    cookies.set('firstName', res.data.firstName, {
                        path: '/',
                        expires: new Date(Date.now() + 3600000), // Valido per 1 ora
                        sameSite: 'Strict',  // Cookie limitato al proprio dominio
                    })
                    cookies.set('lastName', res.data.lastName, {
                        path: '/',
                        expires: new Date(Date.now() + 3600000), // Valido per 1 ora
                        sameSite: 'Strict',  // Cookie limitato al proprio dominio
                    })
                    navigate("/dashboard/home", {state: {successMessage: 'Login effettuato con successo!'}})
                })
                .catch(error => {
                    console.error(error);
                    alert("Errore " + e.status + " " + e.response.data);
                })
        }
    }

    useEffect(() => {
        if (isFirstRender) {
            setIsFirstRender(false)
        } else {
            if (!email) {
                setErrors((prevErrors) => ({
                    ...prevErrors,
                    email: {
                        error: true,
                        message: 'Campo obbligatorio'
                    }
                }))
            } else {
                if (!emailRegex.test(email)) {
                    setErrors((prevErrors) => ({
                        ...prevErrors,
                        email: {
                            error: true,
                            message: ""
                        }
                    }))
                } else {
                    setErrors((prevErrors) => ({
                        ...prevErrors,
                        email: {
                            error: false,
                            message: ""
                        }
                    }))
                }
            }
        }

    }, [email])

    useEffect(() => {
        if (isFirstRender) {
            setIsFirstRender(false)
        } else {
            if (!password) {
                setErrors((prevErrors) => ({
                    ...prevErrors,
                    password: {
                        error: true,
                        message: 'Campo obbligatorio'
                    }
                }))
            } else {
                setErrors((prevErrors) => ({
                    ...prevErrors,
                    password: {
                        error: false,
                        message: ""
                    }
                }))
            }
        }
    }, [password])

    const goHome = () => {
        navigate("/homepage")
    }

    return (
        <div style={{backgroundColor: theme.palette.background.default}}>
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
                        <b>IOMed</b> | Login paziente
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
                <CssBaseline/>
                <Box
                    sx={{
                        display: 'flex',
                        flexDirection: 'column',
                        alignItems: 'center',
                        justifyContent: 'center',
                        height: '100vh'
                    }}
                >
                    <Paper
                        variant="outlined"
                        sx={{
                            borderRadius: 4,
                            my: {xs: 3, md: 6},
                            p: {xs: 4, md: 3},
                            display: 'flex',
                            flexDirection: 'column',
                            alignItems: 'center',
                        }}
                    >
                        <Avatar sx={{m: 1, bgcolor: 'primary.main', width: 55, height: 55}}>
                            <Person fontSize="large"/>
                        </Avatar>
                        <Typography component="h1" variant="h5">
                            Login paziente
                        </Typography>
                        <Grid container sx={{mt: 2}}>
                            <Grid item xs={12}>
                                <TextField type="text"
                                           name="inputEmailLogin"
                                           margin="normal"
                                           label="Email"
                                           value={email}
                                           onChange={handleChange}
                                           autoFocus
                                           fullWidth
                                           error={errors.email.error}
                                           helperText={errors.email.error && errors.email.message}
                                           sx={{backgroundColor: theme.palette.background.paper}}
                                />
                            </Grid>
                            <Grid item xs={12}>
                                <TextField type={showPassword ? 'text' : 'password'}
                                           name="inputPassword"
                                           margin="normal"
                                           label="Password"
                                           value={password}
                                           onChange={handleChange}
                                           fullWidth
                                           error={errors.password.error}
                                           helperText={errors.password.error && errors.password.message}
                                           InputProps={{
                                               endAdornment: (
                                                   <InputAdornment position="end">
                                                       <IconButton onClick={handleTogglePasswordVisibility}>
                                                           {showPassword ? <Visibility/> : <VisibilityOff/>}
                                                       </IconButton>
                                                   </InputAdornment>
                                               )
                                           }}
                                           sx={{backgroundColor: theme.palette.background.paper}}
                                />
                            </Grid>
                        </Grid>
                        <Button
                            type="submit"
                            fullWidth
                            variant="contained"
                            sx={{mt: 3, mb: 2}}
                            onClick={handleSubmit}
                        >
                            Login
                        </Button>
                        <Typography variant="body2">
                            Non hai un account? <Link href="/signupPaziente">Registrati</Link>
                        </Typography>
                    </Paper>
                </Box>
            </Container>
        </div>
    )
}