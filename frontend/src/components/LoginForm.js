import React, {useState, useEffect} from "react";
import {Link, useNavigate} from "react-router-dom";

import 'bootstrap/dist/css/bootstrap.css';
import {Container, Form, Button, FloatingLabel, Col, Row, InputGroup} from "react-bootstrap";
import {FontAwesomeIcon} from '@fortawesome/react-fontawesome'
import {faUser, faKey} from '@fortawesome/free-solid-svg-icons';

import Cookies from 'universal-cookie'

export default function LoginForm() { // eslint-disable-next-line
    const [email, setEmail] = useState('')
    const [password, setPassword] = useState('')
    const [validated, setValidated] = useState(false);

    const navigate = useNavigate()
    const cookies = new Cookies();

    useEffect(() => {
        // Verifica se il cookie è impostato
        if (cookies.get("email")) {
            console.log(cookies.get("email"))
            navigate("/dashboard/home");
        }
    })

    const handleSubmit = (e) => {
        e.preventDefault();

        const form = e.currentTarget
        if (!form.checkValidity()) {
            e.stopPropagation()
        }
        setValidated(true)

        // TODO - Verifica del login dalla blockchain
        const user = {
            email: email,
            password: password
        };
        axios.post('http://localhost:3001/api/bc/login', user)
            .then(res => {
                console.log("Login effettuato")
                console.log(res.data)

                cookies.set('email', email, {
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

    const handleChange = (e) => {
        const {name, value, type} = e.target

        if (name === 'inputEmailLogin') {
            // Gestione del caricamento dei file
            setEmail(value)
        } else if (name === 'inputPassword') {
            // Evita l'inserimento di spazi e caratteri speciali non consentiti nelle password
            const cleanValue = value.replace(/[^a-zA-Z0-9!@#$%^&*]/g, '');
            setPassword(cleanValue)
        }
    }


    return (
        <>
            <div className="login-form d-flex align-items-center vh-100">
                <Container>
                    <Row className="justify-content-center">
                        <Col>
                            <Form className="bg-white p-4 rounded-4" noValidate validated={validated}
                                  onSubmit={handleSubmit}>
                                <h2 align="center">Login</h2>
                                <Col>
                                    <Row className="mb-2">
                                        <InputGroup className="mb-2" hasValidation>
                                            <InputGroup.Text><FontAwesomeIcon icon={faUser}/></InputGroup.Text>
                                            <FloatingLabel label="Email">
                                                <Form.Control type="email"
                                                              name="inputEmailLogin"
                                                              placeholder="Inserire email"
                                                              value={email}
                                                              onChange={handleChange}
                                                              autoComplete="off"
                                                              required
                                                />
                                            </FloatingLabel>
                                        </InputGroup>
                                    </Row>

                                    <Row className="mb-2">
                                        <InputGroup className="mb-2" hasValidation>
                                            <InputGroup.Text><FontAwesomeIcon icon={faKey}/></InputGroup.Text>
                                            <FloatingLabel label="Password">
                                                <Form.Control type="password"
                                                              name="inputPassword"
                                                              placeholder="Inserire password"
                                                              value={password}
                                                              onChange={handleChange}
                                                              required
                                                />
                                            </FloatingLabel>
                                        </InputGroup>
                                    </Row>

                                    <Row>
                                        <Button type="submit" className="mb-2">Entra!</Button>
                                    </Row>
                                </Col>
                                <div>
                                    <p align="center">Non hai ancora un account? <Link to="/signup">Registrati</Link>
                                    </p>
                                </div>
                            </Form>
                        </Col>
                    </Row>
                </Container>
            </div>
        </>
    )
}