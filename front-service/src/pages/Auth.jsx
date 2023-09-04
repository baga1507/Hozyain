import React from 'react';
import {Button, Form, FormControl, FormGroup, FormLabel} from "react-bootstrap";
import axios from "axios";
import {AuthorizationService} from "../components/API/AuthorizationService";

const Auth = () => {
    let email;
    let password;

    async function authenticate(e) {
        e.preventDefault()
        let token = await AuthorizationService.authenticate(email, password)
        localStorage.setItem("token", token)
        axios.defaults.headers.common["Authorization"] = "Bearer " + token
    }

    return (
        <div>
            <Form onSubmit={authenticate}>
                <FormGroup>
                    <FormLabel>Email</FormLabel>
                    <FormControl
                        type="text"
                        placeholder="Введите свою электронную почту"
                        value={email}
                        onChange={e => email = e.target.value}
                    />
                </FormGroup>
                <FormGroup>
                    <FormLabel>Пароль</FormLabel>
                    <FormControl
                        type="password"
                        placeholder="Введите свой пароль"
                        value={password}
                        onChange={e => password = e.target.value}
                    />
                </FormGroup>
                <Button style={{marginTop: "5px"}} type="submit">Войти</Button>
            </Form>
        </div>
    );
};

export default Auth;