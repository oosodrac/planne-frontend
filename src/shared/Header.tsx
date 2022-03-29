import React from "react";
import { Container, Nav, Navbar } from "react-bootstrap";
import { NavLink } from "react-router-dom";

const Header = () => {

    const navLinkStyle = (props: {isActive: Boolean} ) => {
        return {
            fontWeight: props.isActive ? "bold" : "normal",
            textDecoration: props.isActive ? "underline" : "none"
        }
    }

    return (
        <>
            <Navbar collapseOnSelect expand="lg" bg="dark" variant="dark">
                <Container>
                    <Navbar.Brand>
                        
                    <NavLink to="/"  style={navLinkStyle} > Balde de fruta </NavLink>
                    </Navbar.Brand>
                    <Navbar.Toggle aria-controls="responsive-navbar-nav" />
                    <Navbar.Collapse id="responsive-navbar-nav">
                        <Nav className="me-auto">
                            <Nav.Link>
                                <NavLink to="/balde" style={navLinkStyle} > Balde </NavLink>
                                </Nav.Link>
                            <Nav.Link>
                                <NavLink to="/fruta" style={navLinkStyle} > Fruta </NavLink>
                            </Nav.Link>
                            <Nav.Link>
                                <NavLink to="/deposito" style={navLinkStyle} > Deposito </NavLink>
                            </Nav.Link>
                        </Nav>
                        <Nav>
                            <Nav.Link>Ramiro Cardoso</Nav.Link>
                        </Nav>
                    </Navbar.Collapse>
                </Container>
            </Navbar>
        </>
    )
}

export default Header;