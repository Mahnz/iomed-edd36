// Step.js
import React, {useEffect, useState} from 'react'
import {Form, Button, Row, Col, FloatingLabel, InputGroup} from 'react-bootstrap'
import {FontAwesomeIcon} from "@fortawesome/react-fontawesome"
import {
    faAt,
    faCalendarDays,
    faIdBadge,
    faLocationDot,
    faLock,
    faMap,
    faPhone,
    faVenusMars,
    faEye,
    faEyeSlash, faCheck, faTimes
} from "@fortawesome/free-solid-svg-icons"
import {Link} from "react-router-dom"
import '../style/form.css'
import axios from "axios"

export default function Step({
                                 step,
                                 formData,
                                 nextStep,
                                 prevStep,
                                 handleChange,
                                 handleSubmit,
                                 computeCF,
                                 btnDisabled,
                                 test
                             }) {
    const today = new Date()
    const maxDate = new Date(today.getFullYear() - 18, today.getMonth(), today.getDate())
    const [showPassword, setShowPassword] = useState(false)
    const [showConfirmPassword, setShowConfirmPassword] = useState(false)

    const [provinceList, setProvinceList] = useState([])
    const [comuniList, setComuniList] = useState([])

    useEffect(() => {
        const fetchProvinces = async () => {
            try {
                const response = await axios.get('https://axqvoqvbfjpaamphztgd.functions.supabase.co/province')
                const provinceNames = response.data.map((province) => province.nome)
                setProvinceList(provinceNames)
            } catch (error) {
                console.error('Errore durante il recupero delle province', error)
            }
        }
        fetchProvinces()
    }, [])

    useEffect(() => {
        const fetchCities = async () => {
            try {
                if (formData.birthProvincia) {
                    const response = await axios.get(`https://axqvoqvbfjpaamphztgd.functions.supabase.co/comuni/provincia/${formData.birthProvincia}`);
                    const comuniNames = response.data.map((comune) => comune.nome);
                    setComuniList(comuniNames);
                }
            } catch (error) {
                console.error('Errore durante il recupero delle città', error);
            }
        };
        fetchCities();
    }, [formData.birthProvincia]);


    return (
        <>
            {step === 1 && (
                <>
                    <h2 align="center">Step 1</h2>
                    <Row className="mb-2">
                        <Col className="my-1">
                            <InputGroup hasValidation>
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
                            </InputGroup>
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
                            <InputGroup className="mb-2" hasValidation>
                                <InputGroup.Text><FontAwesomeIcon icon={faVenusMars}/></InputGroup.Text>
                                <FloatingLabel label="Sesso">
                                    <Form.Select id="inputSesso"
                                                 name="sex"
                                                 value={formData.sex}
                                                 onChange={handleChange}
                                                 autoComplete="off"
                                                 required
                                    >
                                        <option value="" disabled>Seleziona...</option>
                                        <option value="M">Maschio</option>
                                        <option value="F">Femmina</option>
                                    </Form.Select>
                                </FloatingLabel>
                            </InputGroup>
                        </Col>
                        <Col className="my-1">
                            <InputGroup className="mb-2" hasValidation>
                                <InputGroup.Text><FontAwesomeIcon icon={faCalendarDays}/></InputGroup.Text>
                                <FloatingLabel label="Data di nascita">
                                    <Form.Control type="date"
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
                    </Row>

                    <Row>
                        <Col className="my-1">
                            <InputGroup className="mb-2" hasValidation>
                                <InputGroup.Text><FontAwesomeIcon icon={faLocationDot}/></InputGroup.Text>
                                <FloatingLabel label="Provincia di nascita">
                                    <Form.Select id="inputProvinciaNascita"
                                                 name="birthProvincia"
                                                 value={formData.birthProvincia}
                                                 onChange={handleChange}
                                                 autoComplete="off"
                                                 required
                                    >
                                        <option value="" disabled>Seleziona la provincia</option>
                                        {provinceList.map((province, index) => (
                                            <option key={index} value={province}>
                                                {province}
                                            </option>
                                        ))}
                                    </Form.Select>
                                </FloatingLabel>
                            </InputGroup>
                        </Col>
                        <Col className="my-1">
                            <InputGroup className="mb-2" hasValidation>
                                <InputGroup.Text><FontAwesomeIcon icon={faLocationDot}/></InputGroup.Text>
                                <FloatingLabel label="Comune di nascita">
                                    <Form.Select id="inputLuogoNascita"
                                                 name="birthPlace"
                                                 value={formData.birthPlace}
                                                 onChange={handleChange}
                                                 autoComplete="off"
                                                 required
                                    >
                                        <option value="" disabled>Seleziona il comune</option>
                                        {comuniList.map((comune, index) => (
                                            <option key={index} value={comune}>
                                                {comune}
                                            </option>
                                        ))}
                                    </Form.Select>
                                    {/*<Form.Control type="text"*/}
                                    {/*              id="inputComuneNascita"*/}
                                    {/*              name="birthPlace"*/}
                                    {/*              placeholder="Inserire comune di nascita"*/}
                                    {/*              value={formData.birthPlace}*/}
                                    {/*              onChange={handleChange}*/}
                                    {/*              autoComplete="off"*/}
                                    {/*              required*/}
                                    {/*/>*/}
                                </FloatingLabel>
                            </InputGroup>
                        </Col>
                    </Row>

                    <Row>
                        <Col xs={12} md={3} className="my-1 mb-2">
                            {/* TODO - pulsante per calcolare il codice fiscale*/}
                            <Button
                                variant={btnDisabled ? "dark" : "success"}
                                className="mb-2 h-100 w-100"
                                onClick={computeCF}
                                disabled={btnDisabled}
                            >Calcola</Button>
                        </Col>
                        <Col className="my-1">
                            <InputGroup className="mb-2" hasValidation>
                                <InputGroup.Text><FontAwesomeIcon icon={faIdBadge}/></InputGroup.Text>
                                <FloatingLabel label="Codice fiscale">
                                    <Form.Control type="text"
                                                  id="inputCF"
                                                  name="CF"
                                                  placeholder="Inserire codice fiscale"
                                                  value={formData.CF === ''
                                                      ? "Inserire i dati per il calcolo del codice fiscale..."
                                                      : formData.CF}
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
                            <InputGroup className="mb-2" hasValidation>
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
                            <InputGroup hasValidation>
                                <InputGroup.Text><FontAwesomeIcon icon={faLock}/></InputGroup.Text>
                                <FloatingLabel label="Password">
                                    <Form.Control type={showPassword ? "text" : "password"}
                                                  name="password"
                                                  placeholder="Inserire password"
                                                  value={formData.password}
                                                  onChange={handleChange}
                                                  aria-describedby="passwordHelpBlock"
                                                  minLength="8"
                                                  maxLength="20"
                                                  required

                                    />
                                </FloatingLabel>
                                <Button
                                    variant="light" className="eye"
                                    onClick={() => setShowPassword(!showPassword)}
                                >
                                    <FontAwesomeIcon icon={showPassword ? faEyeSlash : faEye}/>
                                </Button>
                            </InputGroup>
                        </Col>
                        <Col className="my-1">
                            <InputGroup hasValidation>
                                <InputGroup.Text><FontAwesomeIcon icon={faLock}/></InputGroup.Text>
                                <FloatingLabel label="Ripeti password">
                                    <Form.Control type={showConfirmPassword ? "text" : "password"}
                                                  name="confirmPassword"
                                                  placeholder="Ripeti password"
                                                  value={formData.confirmPassword}
                                                  onChange={handleChange}
                                                  aria-describedby="passwordHelpBlock"
                                                  minLength="8"
                                                  maxLength="20"
                                                  required
                                    />
                                </FloatingLabel>
                                <Button
                                    variant="light" className="eye"
                                    onClick={() => setShowConfirmPassword(!showConfirmPassword)}
                                >
                                    <FontAwesomeIcon icon={showConfirmPassword ? faEyeSlash : faEye}/>
                                </Button>
                                {/* TODO - Inserimento della label "le password non coincidono" */}
                                {/*{(formData.confirmPassword && formData.password !== formData.confirmPassword) && (*/}
                                {/*    <Form.Control.Feedback type="invalid">*/}
                                {/*        Le password non coincidono*/}
                                {/*    </Form.Control.Feedback>*/}
                                {/*)}*/}
                            </InputGroup>
                        </Col>
                    </Row>
                    <Row className="justify-content-center mb-2">
                        {formData.password && (
                            <div className="password-validation">
                                <ul>
                                    <li className={/(?=.{8,20})/.test(formData.password) ? 'valid' : 'invalid'}>
                                        <FontAwesomeIcon
                                            icon={/(?=.{8,20})/.test(formData.password) ? faCheck : faTimes}/> Da 8 a 20
                                        caratteri
                                    </li>
                                    <li className={/(?=.*[a-z])/.test(formData.password) ? 'valid' : 'invalid'}>
                                        <FontAwesomeIcon
                                            icon={/(?=.*[a-z])/.test(formData.password) ? faCheck : faTimes}/> Lettera
                                        minuscola
                                    </li>
                                    <li className={/(?=.*[A-Z])/.test(formData.password) ? 'valid' : 'invalid'}>
                                        <FontAwesomeIcon
                                            icon={/(?=.*[A-Z])/.test(formData.password) ? faCheck : faTimes}/> Lettera
                                        maiuscola
                                    </li>
                                    <li className={/(?=.*[0-9])/.test(formData.password) ? 'valid' : 'invalid'}>
                                        <FontAwesomeIcon
                                            icon={/(?=.*[0-9])/.test(formData.password) ? faCheck : faTimes}/> Carattere
                                        numerico
                                    </li>
                                    <li className={/(?=.*[!@#$%^&*()_+{}\[\]:<>,.?~\\-])/.test(formData.password) ? 'valid' : 'invalid'}>
                                        <FontAwesomeIcon
                                            icon={/(?=.*[!@#$%^&*])/.test(formData.password) ? faCheck : faTimes}/> Carattere
                                        speciale !@#$%^&*
                                    </li>
                                </ul>
                            </div>
                        )}
                    </Row>
                    <Row className="justify-content-center mb-2">
                        <Button type="submit" variant="primary" className="mb-2 h-100 w-100" onClick={nextStep}>
                            Avanti
                        </Button>
                    </Row>
                    <Row className="justify-content-center mb-2">
                        <Button variant="danger" className="mb-2 h-100 w-100" onClick={test}>
                            TEST
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
                            <InputGroup className="mb-2" hasValidation>
                                <InputGroup.Text><FontAwesomeIcon icon={faLocationDot}/></InputGroup.Text>
                                <FloatingLabel label="Provincia di residenza">
                                    <Form.Select id="inputProvince"
                                                 name="province"
                                                 placeholder="Inserire provincia di residenza"
                                                 value={formData.province}
                                                 onChange={handleChange}
                                                 autoComplete="off"
                                                 required
                                    >
                                        <option value="" disabled>Seleziona la provincia</option>
                                        {provinceList.map((province, index) => (
                                            <option key={index} value={province}>
                                                {province}
                                            </option>
                                        ))}
                                    </Form.Select>
                                </FloatingLabel>
                            </InputGroup>
                        </Col>
                        <Col className="my-1">
                            <InputGroup className="mb-2" hasValidation>
                                <InputGroup.Text><FontAwesomeIcon icon={faLock}/></InputGroup.Text>
                                <FloatingLabel label="Città di residenza">
                                    <Form.Control type="text"
                                                  id="inputCity"
                                                  name="city"
                                                  placeholder="Inserire città di residenza"
                                                  value={formData.city}
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
                            <InputGroup className="mb-2" hasValidation>
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
                            <InputGroup className="mb-2" hasValidation>
                                <InputGroup.Text><FontAwesomeIcon icon={faPhone}/></InputGroup.Text>
                                <FloatingLabel label="Numero di telefono">
                                    <Form.Control type="text"
                                                  id="inputTelefono"
                                                  name="phoneNumber"
                                                  placeholder="Inserire numero di telefono"
                                                  value={formData.phoneNumber}
                                                  onChange={handleChange}
                                                  autoComplete="off"
                                                  maxLength="10"
                                                  pattern="[0-9]{10}"
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
                        <Col xs="auto" className="my-1">
                            <Button variant="danger" className="mb-2" onClick={test}>
                                TEST
                            </Button>
                        </Col>
                    </Row>
                </>
            )}


            {step === 3 && (
                <>
                    <h2 align="center">Step 3</h2>
                    <Row className="mb-4">
                        <Col className="my-1">
                            <Form.Group controlId="frontIdImage">
                                <Form.Label>Fronte del documento (jpg, jpeg, png, pdf)</Form.Label>
                                <Form.Control type="file"
                                              name="frontIdImage"
                                              onChange={handleChange}
                                              accept="image/png, image/jpeg, image/jpg, application/pdf"
                                              required
                                />
                            </Form.Group>
                        </Col>
                    </Row>
                    <Row>
                        <Col className="my-1">
                            <Form.Group controlId="backIdImage">
                                <Form.Label>Retro del documento (jpg, jpeg, png, pdf)</Form.Label>
                                <Form.Control type="file"
                                              name="backIdImage"
                                              onChange={handleChange}
                                              accept="image/png, image/jpeg, image/jpg, application/pdf"
                                              required
                                />
                                {/*<Form.Control.Feedback type="invalid">*/}
                                {/*    File non valido*/}
                                {/*</Form.Control.Feedback>*/}
                            </Form.Group>
                        </Col>
                    </Row>

                    <Row className="m-2">
                        <Col className="d-flex justify-content-center">
                            <Form.Check>
                                <Form.Check.Input type="checkbox"
                                                  id="inputCheckTerms"
                                                  name="checkTerms"
                                                  checked={formData.checkTerms}
                                                  onChange={handleChange}
                                                  required
                                />
                                <Form.Check.Label>
                                    Accetto i <Link to="/terms">termini e condizioni</Link>
                                </Form.Check.Label>
                            </Form.Check>
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