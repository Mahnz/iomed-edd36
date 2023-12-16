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
    Link,
} from '@mui/material'
import {LockOutlined, Visibility, VisibilityOff, PersonOutline} from '@mui/icons-material'
import Cookies from 'universal-cookie'
import axios from 'axios'

export default function TestFrontendLogin() {
    const [id, setId] = useState('')
    const [password, setPassword] = useState('')
    const [showPassword, setShowPassword] = useState(false)
    const [validated, setValidated] = useState(false)
    const [errors, setErrors] = useState({
        id: '',
        password: '',
    })

    const navigate = useNavigate()
    const cookies = new Cookies()

    useEffect(() => {
        if (cookies.get('id')) {
            console.log(cookies.get('id'))
            navigate('/dashboard')
        }
    }, [cookies, navigate])

    const handleSubmit = (e) => {
        e.preventDefault()
        const form = e.currentTarget
        if (!form.checkValidity()) {
            e.stopPropagation()
        }
        setValidated(true)

        // TODO - Verifica del login dalla blockchain
        const user = {
            id: id,
            password: password,
        }
        axios
            .post('http://localhost:3001/api/bc/login', user)
            .then((res) => {
                console.log('Login effettuato')
                console.log(res.data)

                cookies.set('id', id, {
                    path: '/',
                    expires: new Date(Date.now() + 3600000), // Valido per 1 ora
                    httpOnly: true, // Non accessibile tramite JavaScript
                    sameSite: 'Strict', // Cookie limitato al proprio dominio
                })
                navigate('/dashboard/home')
            })
            .catch((error) => {
                console.error(error)
            })
    }

    const handleChange = (e) => {
        const {name, value} = e.target

        if (name === 'inputIdLogin') {
            setId(value)
            setErrors((prevErrors) => ({...prevErrors, id: ''}))
        } else if (name === 'inputPassword') {
            const cleanValue = value.replace(/[^a-zA-Z0-9!@#$%^&*]/g, '')
            setPassword(cleanValue)
            setErrors((prevErrors) => ({...prevErrors, password: ''}));
        }
    }

    const handleTogglePasswordVisibility = () => {
        setShowPassword(!showPassword)
    }

    return (
        <Container component="main" maxWidth="xs">
            <CssBaseline/>
            <Box
                sx={{
                    marginTop: 8,
                    display: 'flex',
                    flexDirection: 'column',
                    alignItems: 'center',
                }}
            >
                <Avatar sx={{m: 1, bgcolor: 'secondary.main'}}>
                    <LockOutlined/>
                </Avatar>
                <Typography component="h1" variant="h5">
                    Login tesserato
                </Typography>
                <Box component="form" onSubmit={handleSubmit} noValidate sx={{mt: 1}}>
                    <TextField type="text"
                               margin="normal"
                               fullWidth
                               label="Identificativo"
                               name="inputIdLogin"
                               value={id}
                               onChange={handleChange}
                               autoFocus
                               required
                               error={validated && !id}
                               helperText={validated && !id && 'Il campo è obbligatorio'}
                    />
                    <TextField type={showPassword ? 'text' : 'password'}
                               name="inputPassword"
                               margin="normal"
                               label="Password"
                               value={password}
                               onChange={handleChange}
                               fullWidth
                               required
                               error={validated && !password}
                               helperText={validated && !password && 'Il campo è obbligatorio'}
                               InputProps={{
                                   endAdornment: (
                                       <InputAdornment position="end">
                                           <IconButton onClick={handleTogglePasswordVisibility}>
                                               {showPassword ? <Visibility/> : <VisibilityOff/>}
                                           </IconButton>
                                       </InputAdornment>
                                   ),
                               }}
                    />
                    <Button
                        type="submit"
                        fullWidth
                        variant="contained"
                        sx={{mt: 3, mb: 2}}
                    >
                        Login
                    </Button>
                    <Grid container>
                        <Grid item xs>
                            <Link href="#" variant="body2">
                                Password dimenticata?
                            </Link>
                        </Grid>
                        <Grid item>
                            <Link href="#" variant="body2">
                                Non hai un account? Registrati
                            </Link>
                        </Grid>
                    </Grid>
                </Box>
            </Box>
        </Container>
    )
}