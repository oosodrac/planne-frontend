import React from "react";
import { Container, Nav, Navbar } from "react-bootstrap";
import { Link } from "react-router-dom";

const Header = () => {
    return (
        <>
            <Navbar collapseOnSelect expand="lg" bg="dark" variant="dark">
                <Container>
                    <Navbar.Brand> <Link to="/" >Balde de frutas</Link> </Navbar.Brand>
                    <Navbar.Toggle aria-controls="responsive-navbar-nav" />
                    <Navbar.Collapse id="responsive-navbar-nav">
                        <Nav className="me-auto">
                            <Nav.Link href=""> <Link to="/balde" >Balde</Link> </Nav.Link>
                            <Nav.Link>
                                <Link to="/fruta" >Fruta</Link>
                            </Nav.Link>
                        </Nav>
                        <Nav>
                            <Nav.Link href="https:www.ravunana.com">Ramiro Cardoso</Nav.Link>
                        </Nav>
                    </Navbar.Collapse>
                </Container>
            </Navbar>
        </>
    )
}

export default Header;