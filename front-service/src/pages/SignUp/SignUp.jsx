import React, {useContext, useState} from 'react';
import {AuthContext} from "../../context/AuthContext";
import {Button, Form, FormControl, FormGroup, FormLabel} from "react-bootstrap";
import "./SignUp.css"
import {AuthorizationService} from "../../components/API/AuthorizationService";
import axios from "axios";
import {JwtUtil} from "../../components/utils/JwtUtil";

const SignUp = () => {
    const [email, setEmail] = useState("")
    const [password, setPassword] = useState("")
    const [passwordRepeat, setPasswordRepeat] = useState("")
    const [isEmailValid, setIsEmailValid] = useState(true)
    const [isPasswordValid, setIsPasswordValid] = useState(true)
    const [isPasswordsMatch, setIsPasswordsMatch] = useState(true)
    const {setIsAuth, setIsAdmin} = useContext(AuthContext)

    async function signUp(e) {
        e.preventDefault()
        if (email.length > 0 && password.length > 0 && password === passwordRepeat) {
            try {
                const token = (await AuthorizationService.register(email, password))["token"]
                localStorage.setItem("token", token)
                localStorage.setItem("email", JwtUtil.getEmail(token))
                setIsAdmin(false)
                for (const role of JwtUtil.getRoles(token)) {
                    if (role === "ROLE_ADMIN") {
                        setIsAdmin(true)
                    }
                }
                axios.defaults.headers["Authorization"] = "Bearer " + token
                setIsAuth(true)
            } catch (e) {
                console.log(e.message)
            }
        } else {
            setIsEmailValid(email.length > 0)
            setIsPasswordValid(password.length > 0)
            setIsPasswordsMatch(password === passwordRepeat)
        }
    }

    return (
        <div className="SignUp" onSubmit={signUp}>
            <div className="bg"/>
            <div className="SignUp__content">
                <h3>Регистрация</h3>
                <Form className="auth-form">
                    <FormGroup>
                        <FormLabel>Email</FormLabel>
                        <FormControl
                            className={isEmailValid ? "" : "is-invalid"}
                            type="email"
                            placeholder="Введите свою электронную почту"
                            value={email}
                            onChange={e => setEmail(e.target.value)}
                        />
                    </FormGroup>
                    <FormGroup>
                        <FormLabel>Пароль</FormLabel>
                        <FormControl
                            className={isPasswordValid ? "" : "is-invalid"}
                            type="password"
                            placeholder="Введите свой пароль"
                            value={password}
                            onChange={e => setPassword(e.target.value)}
                        />
                    </FormGroup>
                    <FormGroup>
                        <FormControl
                            className={isPasswordsMatch ? "" : "is-invalid"}
                            type="password"
                            placeholder="Подтвердите свой пароль"
                            value={passwordRepeat}
                            onChange={e => setPasswordRepeat(e.target.value)}
                        />
                    </FormGroup>
                    <div className="login-submit">
                        <text className="login-submit__text">Уже есть аккаунт? <a href="/login">Войдите!</a></text>
                        <Button
                            className="login-submit__button"
                            type="submit"
                            variant="outline-primary"
                        >
                            Принять
                        </Button>
                    </div>
                </Form>
            </div>
        </div>
    );
};

export default SignUp;