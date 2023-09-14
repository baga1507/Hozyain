import React, {useContext, useState} from 'react';
import {Alert, Button, Form, FormControl, FormGroup, FormLabel} from "react-bootstrap";
import {AuthorizationService} from "../../components/API/AuthorizationService";
import {AuthContext} from "../../context/AuthContext";
import {useFetching} from "../../hooks/useFetching";
import "./Auth.css"
import axios from "axios";

const Auth = () => {
    let email;
    let password;
    const {setIsAuth} = useContext(AuthContext)
    const [isFailed, setIsFailed] = useState(false)
    const [authenticate, isAuthLoading, authError] = useFetching(async(e) => {
        e.preventDefault()
        try {
            const token = (await AuthorizationService.authenticate(email, password))["token"]
            localStorage.setItem("token", token)
            axios.defaults.headers["Authorization"] = "Bearer " + token
            setIsAuth(true)
        } catch (e) {
            console.log(e)
            setIsFailed(true)
        }
    })

    return (
        <div className="Auth">
            {isFailed &&
                <Alert variant="danger">Неправильный логин или пароль</Alert>
            }
            <Form className="authForm" onSubmit={authenticate}>
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
                <Button style={{marginTop: "5px"}} type="submit" variant="outline-primary">Войти</Button>
            </Form>
        </div>
    );
};

export default Auth;