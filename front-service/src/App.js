import {Container, Navbar} from "react-bootstrap";
import "./styles/App.css"
import Products from "./pages/Products";
import {BrowserRouter, Navigate, Route, Routes} from "react-router-dom"
import {useEffect, useState} from "react";
import {JwtUtil} from "./components/utils/JwtUtil";
import {privateRoutes, publicRoutes} from "./router/routes";

function App() {
    const [isAuth, setIsAuth] = useState(false)

    useEffect(() => {
        let token = localStorage.getItem("token")
        if (token && JwtUtil.isValid(token)) {
            setIsAuth(true)
        }}, [])

    return (
      <div className="App">
          <BrowserRouter>
              <Navbar expand="lg" className="bg-body-tertiary">
                  <Container>
                      <Navbar.Brand>Хозяинъ</Navbar.Brand>
                  </Container>
              </Navbar>
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
          </BrowserRouter>
      </div>
    );
}

export default App;
