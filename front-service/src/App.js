import "./styles/App.css"
import {BrowserRouter} from "react-router-dom"
import {useEffect, useState} from "react";
import {JwtUtil} from "./components/utils/JwtUtil";
import {AuthContext} from "./context/AuthContext";
import axios from "axios";
import MyNavbar from "./components/MyNavbar";
import AppRouter from "./components/AppRouter";

function App() {
    const [isAuth, setIsAuth] = useState(false)

    useEffect(() => {
        const token = localStorage.getItem("token")
        if (token != null && JwtUtil.isValid(token)) {
            axios.defaults.headers["Authorization"] = "Bearer " + token
            setIsAuth(true)
            localStorage.setItem("email", JwtUtil.getEmail(token))
        } else {
            localStorage.removeItem("token")
            setIsAuth(false)
        }}, [setIsAuth])

    return (
        <div className="App" >
            <AuthContext.Provider value={{
                isAuth,
                setIsAuth,
            }}>
                <BrowserRouter>
                    <MyNavbar/>
                    <AppRouter/>
                </BrowserRouter>
            </AuthContext.Provider>
        </div>
    );
}

export default App;
