import React from 'react'
import {Form, Button, Row, Col, FloatingLabel, InputGroup} from 'react-bootstrap'
import {FontAwesomeIcon} from "@fortawesome/react-fontawesome";
import {
    faAt,
    faCalendarDays,
    faIdBadge,
    faLocationDot,
    faLock, faMap, faPhone,
    faVenusMars
} from "@fortawesome/free-solid-svg-icons";
import {Link} from "react-router-dom";

import "react-datepicker/dist/react-datepicker.css";
import province from '../province';

export default function Step({step, formData, nextStep, prevStep, handleChange, handleSubmit, computeCF}) {
    const today = new Date();
    const maxDate = new Date(today.getFullYear() - 18, today.getMonth(), today.getDate());

    return (
        <>
            {step === 1 && (
                <>
                    <h2 align="center">Step 1</h2>
                    <Row className="mb-2">
                        <Col className="my-1">
                            <FloatingLabel label="Nome">
                                <Form.Control type="text"
                                              id="inputNome"
                                              name="firstName"
                                              placeholder="Inserire nome"
                                              value={formData.firstName}
                                              onChange={handleChange}
                                              autoComplete="off"
                                              required
                                />
                            </FloatingLabel>
                        </Col>

                        <Col className="my-1">
                            <FloatingLabel label="Cognome">
                                <Form.Control type="text"
                                              id="inputCognome"
                                              name="lastName"
                                              placeholder="Inserire cognome"
                                              value={formData.lastName}
                                              onChange={handleChange}
                                              autoComplete="off"
                                              required
                                />
                            </FloatingLabel>
                        </Col>
                    </Row>
                    <Row>
                        <Col xs={12} md={3} className="my-1 col-auto">
                            <InputGroup className="mb-2">
                                <InputGroup.Text><FontAwesomeIcon icon={faVenusMars}/></InputGroup.Text>
                                <FloatingLabel label="Sesso">
                                    <Form.Select
                                        id="inputSesso"
                                        name="sex"
                                        value={formData.sex}
                                        onChange={handleChange}
                                        autoComplete="off"
                                        required
                                    >
                                        <option value="">Seleziona...</option>
                                        <option value="M">Maschio</option>
                                        <option value="F">Femmina</option>
                                    </Form.Select>
                                </FloatingLabel>
                            </InputGroup>
                        </Col>
                        <Col className="my-1">
                            <InputGroup className="mb-2">
                                <InputGroup.Text><FontAwesomeIcon icon={faCalendarDays}/></InputGroup.Text>
                                <FloatingLabel label="Data di nascita">
                                    <Form.Control
                                        type="date"
                                        name="birthDate"
                                        placeholder="Inserire data nascita"
                                        value={formData.birthDate}
                                        onChange={handleChange}
                                        min="1850-01-01"
                                        max={maxDate.toISOString().split('T')[0]}
                                        autoComplete="off"
                                        required
                                    />
                                </FloatingLabel>
                            </InputGroup>
                        </Col>
                        <Col className="my-1">
                            <InputGroup className="mb-2">
                                <InputGroup.Text><FontAwesomeIcon icon={faLocationDot}/></InputGroup.Text>
                                <FloatingLabel label="Luogo di nascita">
                                    <Form.Select
                                        id="inputLuogoNascita"
                                        name="birthPlace"
                                        value={formData.birthPlace}
                                        onChange={handleChange}
                                        autoComplete="off"
                                        required
                                    >
                                        <option value="" disabled>Seleziona la provincia</option>
                                        {province.map((provincia) => (
                                            <option key={provincia} value={provincia}>{provincia}</option>
                                        ))}
                                    </Form.Select>
                                </FloatingLabel>
                            </InputGroup>
                        </Col>
                    </Row>
                    <Row>
                        <Col xs={12} md={3} className="my-1 mb-2">
                            {/* TODO - pulsante per calcolare il codice fiscale*/}
                            <Button variant="primary" className="w-100 h-100" onClick={computeCF}>
                                Calcola
                            </Button>
                        </Col>
                        <Col className="my-1">
                            <InputGroup className="mb-2">
                                <InputGroup.Text><FontAwesomeIcon icon={faIdBadge}/></InputGroup.Text>
                                <FloatingLabel label="Codice fiscale">
                                    <Form.Control type="text"
                                                  id="inputCF"
                                                  name="CF"
                                                  placeholder="Inserire codice fiscale"
                                                  value={formData.CF}
                                                  autoComplete="off"
                                                  required
                                                  readOnly
                                    />
                                </FloatingLabel>
                            </InputGroup>
                        </Col>
                    </Row>
                    <Row>
                        <Col className="my-1">
                            <InputGroup className="mb-2">
                                <InputGroup.Text><FontAwesomeIcon icon={faAt}/></InputGroup.Text>
                                <FloatingLabel label="Email">
                                    <Form.Control type="email"
                                                  id="inputEmail"
                                                  name="email"
                                                  placeholder="Inserire codice fiscale"
                                                  value={formData.email}
                                                  onChange={handleChange}
                                                  autoComplete="off"
                                                  required
                                    />
                                </FloatingLabel>
                            </InputGroup>
                        </Col>
                    </Row>
                    <Row>
                        <Col className="my-1">
                            <InputGroup className="mb-2">
                                <InputGroup.Text><FontAwesomeIcon icon={faLock}/></InputGroup.Text>
                                <FloatingLabel label="Password">
                                    <Form.Control type="password"
                                                  id="inputPassword"
                                                  name="password"
                                                  placeholder="Inserire password"
                                                  value={formData.password}
                                                  onChange={handleChange}
                                                  aria-describedby="passwordHelpBlock"
                                                  required
                                    />
                                </FloatingLabel>
                            </InputGroup>
                        </Col>
                        <Col className="my-1">
                            <InputGroup className="mb-2">
                                <InputGroup.Text><FontAwesomeIcon icon={faLock}/></InputGroup.Text>
                                <FloatingLabel label="Ripeti password">
                                    <Form.Control type="password"
                                                  id="inputConfirmPassword"
                                                  name="confirmPassword"
                                                  placeholder="Ripeti password"
                                                  value={formData.confirmPassword}
                                                  onChange={handleChange}
                                                  aria-describedby="passwordHelpBlock"
                                                  required
                                    />
                                </FloatingLabel>
                            </InputGroup>
                        </Col>
                    </Row>
                    <Row className="justify-content-center mb-2">
                        <Button type="submit" variant="primary" onClick={nextStep} className="mb-2">
                            Avanti
                        </Button>
                    </Row>
                    <div>
                        <p align="center">Hai già un account? <Link to="/login">Login</Link></p>
                    </div>
                </>
            )}
            {step === 2 && (
                <>
                    <h2 align="center">Step 2</h2>
                    <Row className="mb-2">
                        <Col className="my-1">
                            <InputGroup className="mb-2">
                                <InputGroup.Text><FontAwesomeIcon icon={faLocationDot}/></InputGroup.Text>
                                <FloatingLabel label="Provincia di residenza">
                                    <Form.Select
                                        id="inputSesso"
                                        name="city"
                                        value={formData.city}
                                        onChange={handleChange}
                                        autoComplete="off"
                                        required
                                    >
                                        <option value="" disabled>Seleziona la provincia</option>
                                        {province.map((provincia) => (
                                            <option key={provincia} value={provincia}>{provincia}</option>
                                        ))}
                                    </Form.Select>
                                </FloatingLabel>
                            </InputGroup>
                        </Col>
                        <Col className="my-1">
                            <InputGroup className="mb-2">
                                <InputGroup.Text><FontAwesomeIcon icon={faLock}/></InputGroup.Text>
                                <FloatingLabel label="Città di residenza">
                                    <Form.Control type="text"
                                                  id="inputIndirizzo"
                                                  name="address"
                                                  placeholder="Inserire indirizzo"
                                                  value={formData.address}
                                                  onChange={handleChange}
                                                  autoComplete="off"
                                                  required
                                    />
                                </FloatingLabel>
                            </InputGroup>
                        </Col>
                    </Row>
                    <Row>
                        <Col className="my-1">
                            <InputGroup className="mb-2">
                                <InputGroup.Text><FontAwesomeIcon icon={faMap}/></InputGroup.Text>
                                <FloatingLabel label="Indirizzo di residenza">
                                    <Form.Control type="text"
                                                  id="inputAddress"
                                                  name="address"
                                                  placeholder="Inserire indirizzo di residenza"
                                                  value={formData.address}
                                                  onChange={handleChange}
                                                  autoComplete="off"
                                                  required
                                    />
                                </FloatingLabel>
                            </InputGroup>
                        </Col>
                    </Row>
                    <Row>
                        <Col className="my-1">
                            <InputGroup className="mb-2">
                                <InputGroup.Text><FontAwesomeIcon icon={faPhone}/></InputGroup.Text>
                                <FloatingLabel label="Numero di telefono">
                                    <Form.Control type="text"
                                                  id="inputTelefono"
                                                  name="phoneNumber"
                                                  placeholder="Inserire numero di telefono"
                                                  value={formData.phoneNumber}
                                                  onChange={handleChange}
                                                  autoComplete="off"
                                                  required
                                    />
                                </FloatingLabel>
                            </InputGroup>
                        </Col>
                    </Row>

                    <Row className="justify-content-center mb-2">
                        <Col xs="auto" className="my-1">
                            <Button variant="secondary" className="mb-2" onClick={prevStep}>
                                Indietro
                            </Button>
                        </Col>
                        <Col xs="auto" className="my-1">
                            <Button variant="primary" className="mb-2" onClick={nextStep}>
                                Avanti
                            </Button>
                        </Col>
                    </Row>
                </>
            )}
            {step === 3 && (
                <>
                    <h2 align="center">Step 3</h2>
                    <Row>
                        <Col className="my-1">
                            <Form.Group>
                                <Form.Label>Fronte ID</Form.Label>
                                <Form.Control
                                    type="file"
                                    name="frontIdImage"
                                    onChange={handleChange}
                                />
                            </Form.Group>
                        </Col>
                    </Row>
                    <Row>
                        <Col className="my-1">
                            <Form.Group>
                                <Form.Label>Retro ID</Form.Label>
                                <Form.Control
                                    type="file"
                                    name="backIdImage"
                                    onChange={handleChange}
                                />
                            </Form.Group>
                        </Col>
                    </Row>

                    <Row className="justify-content-center mb-2">
                        <Col xs="auto" className="my-1">
                            <Button variant="secondary" className="mb-2" onClick={prevStep}>
                                Indietro
                            </Button>
                        </Col>
                        <Col xs="auto" className="my-1">
                            <Button variant="primary" className="mb-2" onClick={handleSubmit}>
                                Termina
                            </Button>
                        </Col>
                    </Row>
                </>
            )}
        </>
    )
}