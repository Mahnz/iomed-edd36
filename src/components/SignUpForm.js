import React, {useState} from "react"
import {Container, Form, Col, Row} from "react-bootstrap"
import '../style/form.css'
import Step from "./Step"

export default function SignUpForm() {
    const [step, setStep] = useState(1)
    const [formData, setFormData] = useState({
        // Oggetto contenente tutti i dati del form di registrazione
        firstName: '',
        lastName: '',
        birthDate: '',
        birthPlace: '',
        sex: '',
        CF: '',
        email: '',
        password: '',
        confirmPassword: '',
        address: '',
        country: '',
        city: '',
        cap: '',
        phoneNumber: '',
        frontID: null,
        backID: null
    })
    // TODO - Settare tutti i name dei campi del form, fedelmente a quelli di formData
    const [validated, setValidated] = useState(false)

    const nextStep = () => {
        setStep(step + 1)
    }

    const prevStep = () => {
        setStep(step - 1)
    }

    const handleChange = (e) => {
        const {name, value, type} = e.target

        if (type === 'file') {
            // Gestione del caricamento dei file
            setFormData((prevData) => ({
                ...prevData,
                [name]: e.target.files[0],
            }))
        } else if (type === 'date') {
            // Memorizzazione della data di nascita. Si memorizza SOLO la data effettiva
            const dateValue = new Date(value)

            setFormData((prevData) => ({
                ...prevData,
                [name]: dateValue.toISOString().split('T')[0],
            }))
        } else {
            // Memorizzazione di ogni altro campo testuale
            setFormData((prevData) => ({
                ...prevData,
                [name]: value,
            }))
        }
    }


    const handleSubmit = () => {
        // TODO - Gestire l'invio dei dati in blockchain
        console.log('Dati inviati:', formData)
        // TODO - Resettare lo stato di formData
    }


    return (
        <div className="signup-form d-flex align-items-center vh-100">
            <Container fluid="md">
                <Row className="justify-content-center">
                    <Col md={step === 1 ? 9 : step === 2 ? 8 : 5}>
                        <Form className="bg-white p-4 pb-2 rounded-4" noValidate validated={validated}
                              onSubmit={handleSubmit}>
                            <Step
                                step={step}
                                formData={formData}
                                nextStep={nextStep}
                                prevStep={prevStep}
                                handleChange={handleChange}
                                handleSubmit={handleSubmit}
                            />
                        </Form>
                    </Col>
                </Row>
            </Container>
        </div>
    )
}