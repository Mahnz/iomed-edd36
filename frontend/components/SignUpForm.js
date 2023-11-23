import React, {useState, useEffect} from "react"
import {Container, Form, Col, Row} from "react-bootstrap"
import '../style/form.css'
import Step from "./Step"

export default function SignUpForm() {
    const CodiceFiscale = require('codice-fiscale-js');
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
        province: '',
        city: '',
        cap: '',
        phoneNumber: '',
        frontID: null,
        backID: null,
        checkTerms: false
    })
    // TODO - Settare tutti i name dei campi del form, fedelmente a quelli di formData
    const [btnDisabled, setBtnDisabled] = useState(true);
    const [validated, setValidated] = useState(false)

    const nextStep = (e) => {
        e.preventDefault()

        // Validazione input del form client-side
        let form = e.currentTarget;
        if (form.checkValidity() === false) {
            e.stopPropagation()
        }
        setValidated(true)

        switch (step) {
            case 1:
                if (
                    formData.firstName &&
                    formData.lastName &&
                    formData.sex &&
                    formData.birthDate &&
                    formData.birthPlace &&
                    formData.CF &&
                    formData.email &&
                    formData.password &&
                    formData.confirmPassword) {
                    if (formData.password === formData.confirmPassword) {
                        setStep(step + 1)
                        setValidated(false)
                    } else {
                        alert("Le password inserite sono diverse")
                    }
                }
                break;
            case 2:
                if (
                    formData.province &&
                    formData.city &&
                    formData.address &&
                    formData.phoneNumber && formData.phoneNumber.length === 10) {
                    setStep(step + 1)
                    setValidated(false)
                }
                break;
            default:
                break;
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

        if (type === 'file') {
            // Gestione del caricamento dei file
            setFormData((prevData) => ({
                ...prevData,
                [name]: e.target.files[0],
            }))
        } else if (type === 'date') {
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

            const cleanValue = value.replace(/[^a-zA-Z0-9!@#$%^&*]/g, '');
            setFormData({
                ...formData,
                [name]: cleanValue,
            })
        } else if (name === 'phoneNumber') {
            // Si effettua il controllo sull'inserimento di caratteri alfabetici e spazi

            const cleanValue = value.replace(/[^0-9]/g, '');
            setFormData({
                ...formData,
                [name]: cleanValue,
            })

        } else {
            // Memorizzazione di ogni altro campo testuale
            setFormData({
                ...formData,
                [name]: value
            })
        }
    }

    const handleSubmit = (e) => {
        e.preventDefault()

        // Validazione input del form client-side
        let form = e.currentTarget;
        if (form.checkValidity() === false) {
            e.stopPropagation()
        }
        setValidated(true)


        // TODO - Gestire l'invio dei dati in blockchain
        console.log('Dati inviati:', formData)

        // TODO - Resettare lo stato di formData
        setFormData({
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
            province: '',
            city: '',
            cap: '',
            phoneNumber: '',
            frontID: null,
            backID: null,
            checkTerms: false
        })
    }

    useEffect(() => {
        const isFormValid =
            formData.firstName &&
            formData.lastName &&
            formData.birthDate &&
            formData.sex &&
            formData.birthPlace;

        setBtnDisabled(!isFormValid);
    }, [formData]);

    const computeCF = () => {
        if (
            formData.firstName &&
            formData.lastName &&
            formData.birthDate &&
            formData.sex &&
            formData.birthPlace
        ) {
            try {
                const codFiscale = new CodiceFiscale({
                    name: formData.firstName,
                    surname: formData.lastName,
                    gender: formData.sex,
                    day: new Date(formData.birthDate).getDate(),
                    month: new Date(formData.birthDate).getMonth() + 1,
                    year: new Date(formData.birthDate).getFullYear(),
                    dateOfBirth: new Date(formData.birthDate),
                    birthplace: formData.birthPlace,
                });

                const calculatedCF = codFiscale.toString();

                setFormData({
                    ...formData,
                    CF: calculatedCF,
                });
            } catch (error) {
                console.error('Errore nel calcolo del Codice Fiscale:', error);
            }
        }
    };


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
                                computeCF={computeCF}
                                btnDisabled={btnDisabled}
                                test={test}
                            />
                        </Form>
                    </Col>
                </Row>
            </Container>
        </div>
    )
}