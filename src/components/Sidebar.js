// Componente Sidebar che contiene la navbar e la sidebar laterale a sinistra,
// con una serie di voci di menù.
import React from 'react';
import {Navbar, Nav} from 'react-bootstrap';
import {Link} from 'react-router-dom';

export default function Sidebar({isOpen, toggleSidebar}) {

    return (
        <Navbar bg="dark" variant="dark" className={`sidebar ${isOpen ? 'open' : 'closed'}`}>
            <Navbar.Brand>
                <Link to="/">Nome Utente</Link>
            </Navbar.Brand>
            <Navbar.Toggle onClick={toggleSidebar}/>

            <Nav className="flex-column">
                <Nav.Link as={Link} to="/dashboard/page1">Pagina 1</Nav.Link>
                <Nav.Link as={Link} to="/dashboard/page2">Pagina 2</Nav.Link>
                {/* Aggiungi altre voci della sidebar qui */}
            </Nav>
        </Navbar>
    );
};