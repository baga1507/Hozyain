import React, {useContext, useState} from 'react';
import {Alert, Button, Form, FormControl, FormGroup, FormLabel} from "react-bootstrap";
import {AuthorizationService} from "../../components/API/AuthorizationService";
import {AuthContext} from "../../context/AuthContext";
import {useFetching} from "../../hooks/useFetching";
import "./Login.css"
import axios from "axios";

const Login = () => {
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
        <div className="Login">
            <div className="bg"></div>
            <div className="Login__content">
                <h3>Вход</h3>
                {isFailed &&
                    <Alert variant="danger">Неправильный логин или пароль</Alert>
                }
                <Form className="auth-form" onSubmit={authenticate}>
                    <FormGroup>
                        <FormLabel>Email</FormLabel>
                        <FormControl
                            type="email"
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
                    <div className="login-submit">
                        <text className="login-submit__text">Нет аккаунта? <a href="/sign-up">Зарегистрируйтесь!</a></text>
                        <Button className="login-submit__button" type="submit" variant="outline-primary">Войти</Button>
                    </div>
                </Form>
            </div>
        </div>
    );
};

export default Login;