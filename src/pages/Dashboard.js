import React, {useState} from 'react'
import {Container, Row, Col, Navbar, Nav, Card} from 'react-bootstrap'
import {Link} from 'react-router-dom'
import Sidebar from "../components/Sidebar.js";

export default function Dashboard() {
    const [sidebarOpen, setSidebarOpen] = useState(false)

    const toggleSidebar = () => {
        setSidebarOpen(!sidebarOpen)
    }

    return (
        <Container fluid>
            <Row>
                {/* Sidebar */}
                <Col md={3} className="sidebar-container">
                    <Sidebar isOpen={sidebarOpen} toggleSidebar={toggleSidebar}/>
                </Col>

                {/* Main Content */}
                <Col md={9} className="main-content">
                    <Navbar bg="light" variant="light">
                        <Navbar.Brand>Dashboard</Navbar.Brand>
                    </Navbar>

                    {/* Cards */}
                    <Row className="mt-3">
                        <Col md={4}>
                            <Card>
                                <Card.Body>
                                    <Card.Title>Card 1</Card.Title>
                                    <Card.Text>
                                        Contenuto della card 1. Link a <Link to="/dashboard/card1">Dettagli</Link>.
                                    </Card.Text>
                                </Card.Body>
                            </Card>
                        </Col>
                        <Col md={4}>
                            <Card>
                                <Card.Body>
                                    <Card.Title>Card 2</Card.Title>
                                    <Card.Text>
                                        Contenuto della card 2. Link a <Link to="/dashboard/card2">Dettagli</Link>.
                                    </Card.Text>
                                </Card.Body>
                            </Card>
                        </Col>
                        {/* Aggiungi altre cards qui */}
                    </Row>
                </Col>
            </Row>
        </Container>
    )
}
