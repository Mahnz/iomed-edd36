// LoginFormMedico.js
import React, {useState, useEffect} from 'react'
import {useNavigate} from 'react-router-dom'
import {
    Container,
    TextField,
    Button,
    Typography,
    Grid,
    InputAdornment,
    IconButton,
    CssBaseline,
    Avatar,
    Box,
    Link, Paper, Toolbar, AppBar, ThemeProvider, createTheme,
} from '@mui/material'
import {Vaccines, Visibility, VisibilityOff} from '@mui/icons-material'
import Cookies from 'universal-cookie'
import axios from 'axios'

const theme = createTheme({
    palette: {
        background: {
            default: '#f5f5f5', // Imposta il colore dello sfondo come carta
        },
    },
});

export default function LoginFormMedico({handle}) {
    const [id, setId] = useState('')
    const [password, setPassword] = useState('')
    const [showPassword, setShowPassword] = useState(false)
    const [errors, setErrors] = useState({
        id: {
            error: false,
            message: ''
        },
        password: {
            error: false,
            message: ''
        },
    })

    const navigate = useNavigate()
    const cookies = new Cookies();

    useEffect(() => {
        if (cookies.get('id')) {
            console.log(cookies.get('id'))
            navigate('/dashboard/home')
        }
    }, [cookies, navigate])

    const handleTogglePasswordVisibility = () => {
        setShowPassword(!showPassword)
    }

    const handleChange = (e) => {
        const {name, value} = e.target

        if (name === 'inputIdLogin') {
            setId(value.toUpperCase())
            setErrors((prevErrors) => ({...prevErrors, id: false}))
        } else if (name === 'inputPassword') {
            const cleanValue = value.replace(/[^a-zA-Z0-9!@#$%^&*]/g, '')
            setPassword(cleanValue)
            setErrors((prevErrors) => ({...prevErrors, password: false}));
        }
    }

    const [isFirstRender, setIsFirstRender] = useState(true)
    const [isFirstClick, setIsFirstClick] = useState(true)
    const handleSubmit = (e) => {
        e.preventDefault()
        if (!id) {
            setErrors((prevErrors) => ({
                ...prevErrors,
                id: {
                    error: true,
                    message: 'Campo obbligatorio'
                }
            }))
        } else {
            if (id.length !== 16) {
                setErrors((prevErrors) => ({
                    ...prevErrors,
                    id: {
                        error: true,
                        message: "Lunghezza ID non valida"
                    }
                }))
            } else {
                setErrors((prevErrors) => ({
                    ...prevErrors,
                    id: {
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

        if (isFirstClick) {
            setIsFirstClick(false)
        } else {
            if (!errors.id.error && !errors.password.error) {
                // TODO - Verifica del login dalla blockchain
                const user = {
                    id: id,
                    password: password
                };
                console.log("Sono arrivato alla POST")
                axios.post('http://localhost:3001/api/bc/loginM', user)
                    .then(res => {
                        console.log("Login effettuato")
                        console.log(res.data)

                        cookies.set('id', id, {
                            path: '/',
                            expires: new Date(Date.now() + 3600000), // Valido per 1 ora
                            httpOnly: true,      // Non accessibile tramite JavaScript
                            sameSite: 'Strict',  // Cookie limitato al proprio dominio
                        });
                        navigate("/dashboard/home");
                    })
                    .catch(error => {
                        console.error(error);
                    });
            }
        }
    }


    // CHECK DINAMICO SULL'INSERIMENTO DELL'ID
    useEffect(() => {
        if (isFirstRender) {
            setIsFirstRender(false)
        } else {
            if (!id) {
                setErrors((prevErrors) => ({
                    ...prevErrors,
                    id: {
                        error: true,
                        message: 'Campo obbligatorio'
                    }
                }))
            } else {
                if (id.length !== 16) {
                    setErrors((prevErrors) => ({
                        ...prevErrors,
                        id: {
                            error: true,
                            message: ""
                        }
                    }))
                } else {
                    setErrors((prevErrors) => ({
                        ...prevErrors,
                        id: {
                            error: false,
                            message: ""
                        }
                    }))
                }
            }
        }
    }, [id])


    // CHECK DINAMICO SULL'INSERIMENTO DELLA PASSWORD
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

    return (
        <ThemeProvider theme={theme}>
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
            <Container component="main" maxWidth="xs">
                <CssBaseline/>
                <Box
                    sx={{
                        display: 'flex',
                        flexDirection: 'column',
                        alignItems: 'center',
                        justifyContent: 'center',
                        height: '100vh',
                    }}
                >
                    <Paper
                        variant="outlined"
                        sx={{
                            backgroundColor: (theme) =>
                                theme.palette.mode === 'light' ? theme.palette.common.white : theme.palette.grey[900],
                            borderRadius: 4,
                            my: {xs: 3, md: 6},
                            p: {xs: 4, md: 3},
                            display: 'flex',
                            flexDirection: 'column',
                            alignItems: 'center',
                        }}
                    >
                        <Avatar sx={{m: 1, bgcolor: 'primary.main', width: 55, height: 55}}>
                            <Vaccines fontSize="large"/>
                        </Avatar>
                        <Typography component="h1" variant="h5">
                            Login tesserato
                        </Typography>
                        <Grid container sx={{mt: 2}}>
                            <Grid item xs={12}>
                                <TextField type="text"
                                           margin="normal"
                                           fullWidth
                                           label="Identificativo"
                                           name="inputIdLogin"
                                           value={id}
                                           onChange={handleChange}
                                           autoFocus
                                           error={errors.id.error}
                                           helperText={errors.id.error && errors.id.message}
                                           InputProps={{
                                               maxLength: 16
                                           }}
                                           inputProps={{
                                               maxLength: 16
                                           }}
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
                                               ),
                                               minLength: 8,
                                               maxLength: 20
                                           }}
                                           inputProps={{
                                               minLength: 8,
                                               maxLength: 20
                                           }}
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
                        <Link href="#" variant="body2">
                            Non hai un account? Registrati
                        </Link>
                    </Paper>
                </Box>
            </Container>
        </ThemeProvider>
    )
}