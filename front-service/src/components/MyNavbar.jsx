import React, {useContext, useState} from 'react';
import {Container, Nav, Navbar, NavDropdown, NavItem} from "react-bootstrap";
import {AuthContext} from "../context/AuthContext";
import {useNavigate} from "react-router-dom";

const MyNavbar = () => {
    const {isAuth, setIsAuth} = useContext(AuthContext)
    const router = useNavigate()
    const [key, setKey] = useState("1")

    function exit(e) {
        localStorage.removeItem("token")
        setIsAuth(false)
    }

    return (
        <Navbar expand="lg" className="bg-body-tertiary" variant="primary">
            <Container>
                <Navbar.Brand><strong>Хозяинъ</strong></Navbar.Brand>
                <Navbar.Toggle/>
                {isAuth &&
                    <Navbar.Collapse className="justify-content-end">
                        <Nav variant="underline" activeKey={key}>
                            <NavItem>
                                <Nav.Link eventKey="1" onClick={() => {setKey("1"); router("/products")}}>Продукты</Nav.Link>
                            </NavItem>
                            <NavItem>
                                <Nav.Link eventKey="2" onClick={() => {setKey("2"); router("/about")}}>О нас</Nav.Link>
                            </NavItem>
                            <NavDropdown title={localStorage.getItem("email")}>
                                <NavDropdown.Item onClick={() => {setKey("0"); router("/cart")}}>Корзина</NavDropdown.Item>
                                <NavDropdown.Divider/>
                                <NavDropdown.Item onClick={exit}>Выход</NavDropdown.Item>
                            </NavDropdown>
                        </Nav>
                    </Navbar.Collapse>
                }
            </Container>
        </Navbar>
    );
};

export default MyNavbar;