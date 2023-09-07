import {Button, Container, Navbar} from "react-bootstrap";
import "./styles/App.css"
import {BrowserRouter, Navigate, Route, Routes} from "react-router-dom"
import {useEffect, useState} from "react";
import {JwtUtil} from "./components/utils/JwtUtil";
import {privateRoutes, publicRoutes} from "./router/routes";
import {AuthContext} from "./context/AuthContext";
import axios from "axios";

function App() {
    const [isAuth, setIsAuth] = useState(false)

    useEffect(() => {
        const token = localStorage.getItem("token")
        if (token != null && JwtUtil.isValid(token)) {
            axios.defaults.headers["Authorization"] = "Bearer " + token
            setIsAuth(true)
        } else {
            localStorage.removeItem("token")
            setIsAuth(false)
        }}, [setIsAuth])

    function exit(e) {
        localStorage.removeItem("token")
        setIsAuth(false)
    }

    return (
        <div className="App" >
            <AuthContext.Provider value={{
                isAuth,
                setIsAuth,
            }}>
                <BrowserRouter>
                    <Navbar expand="lg" className="bg-body-tertiary">
                        <Container>
                            <Navbar.Brand>Хозяинъ</Navbar.Brand>
                            {isAuth &&
                                <Button variant="outline-danger" onClick={exit}>Выйти</Button>
                            }
                        </Container>
                    </Navbar>
                    <div className="content">
                        {isAuth
                            ?
                            <Routes>
                                {privateRoutes.map(r =>
                                    <Route key={r.path} path={r.path} element={r.element}/>
                                )}
                                <Route path="/*" element={<Navigate to={"/products"} replace/>}/>
                            </Routes>
                            :
                            <Routes>
                                {publicRoutes.map(r =>
                                    <Route key={r.path} path={r.path} element={r.element}/>
                                )}
                                <Route path="/*" element={<Navigate to={"/login"} replace/>}/>
                            </Routes>
                        }
                    </div>
                </BrowserRouter>
            </AuthContext.Provider>
        </div>
    );
}

export default App;
