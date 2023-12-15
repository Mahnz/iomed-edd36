import React, {useState, useEffect} from 'react';
import {Link, useNavigate} from 'react-router-dom';
import {Container, TextField, Button, Typography, Grid, InputAdornment, IconButton} from '@mui/material';
import {LockOutlined, PersonOutline, Visibility, VisibilityOff} from '@mui/icons-material';
import Cookies from 'universal-cookie';
import axios from 'axios';

export default function TestFrontend() {


    const [id, setId] = useState('');
    const [password, setPassword] = useState('');
    const [showPassword, setShowPassword] = useState(false);
    const [validated, setValidated] = useState(false);
    const navigate = useNavigate();
    const cookies = new Cookies();

    useEffect(() => {
        // Verifica se il cookie è impostato
        if (cookies.get('id')) {
            console.log(cookies.get('id'));
            navigate('/dashboard');
        }
    }, [cookies, navigate]);

    const handleSubmit = (e) => {
        e.preventDefault();
        const form = e.currentTarget;
        if (!form.checkValidity()) {
            e.stopPropagation();
        }
        setValidated(true);

        // TODO - Verifica del login dalla blockchain
        const user = {
            id: id,
            password: password,
        };
        axios
            .post('http://localhost:3001/api/bc/login', user)
            .then((res) => {
                console.log('Login effettuato');
                console.log(res.data);

                cookies.set('id', id, {
                    path: '/',
                    expires: new Date(Date.now() + 3600000), // Valido per 1 ora
                    httpOnly: true, // Non accessibile tramite JavaScript
                    sameSite: 'Strict', // Cookie limitato al proprio dominio
                });
                navigate('/dashboard/home');
            })
            .catch((error) => {
                console.error(error);
            });
    };

    const handleChange = (e) => {
        const {name, value} = e.target;

        if (name === 'inputIdLogin') {
            setId(value);
        } else if (name === 'inputPassword') {
            const cleanValue = value.replace(/[^a-zA-Z0-9!@#$%^&*]/g, '');
            setPassword(cleanValue);
        }
    };

    const handleTogglePasswordVisibility = () => {
        setShowPassword(!showPassword);
    };

    return (
        <div className="login-form d-flex align-items-center vh-100">
            <Container>
                <Grid container justifyContent="center">
                    <Grid item xs={12} sm={8} md={6} lg={4}>
                        <form className="bg-white p-4 rounded-4" noValidate validated={validated}
                              onSubmit={handleSubmit}>
                            <Typography variant="h5" align="center" gutterBottom>
                                Login
                            </Typography>
                            <TextField
                                fullWidth
                                label="Identificativo"
                                type="text"
                                name="inputIdLogin"
                                placeholder="Inserire email"
                                value={id}
                                onChange={handleChange}
                                autoComplete="off"
                                maxLength="16"
                                required
                                margin="normal"
                                InputProps={{
                                    startAdornment: (
                                        <InputAdornment position="start">
                                            <PersonOutline/>
                                        </InputAdornment>
                                    ),
                                }}
                            />
                            <TextField
                                fullWidth
                                label="Password"
                                type={showPassword ? 'text' : 'password'}
                                name="inputPassword"
                                placeholder="Inserire password"
                                value={password}
                                onChange={handleChange}
                                required
                                margin="normal"
                                InputProps={{
                                    startAdornment: (
                                        <InputAdornment position="start">
                                            <LockOutlined/>
                                        </InputAdornment>
                                    ),
                                    endAdornment: (
                                        <InputAdornment position="end">
                                            <IconButton onClick={handleTogglePasswordVisibility}>
                                                {showPassword ? <VisibilityOff/> : <Visibility/>}
                                            </IconButton>
                                        </InputAdornment>
                                    ),
                                }}
                            />
                            <Button type="submit" variant="contained" color="primary" fullWidth>
                                Entra!
                            </Button>
                            <Typography align="center" mt={2}>
                                Non hai ancora un account? <Link to="/signup">Registrati</Link>
                            </Typography>
                        </form>
                    </Grid>
                </Grid>
            </Container>
        </div>
    );
}