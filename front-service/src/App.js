import {Container, Navbar, Row} from "react-bootstrap";
import "./styles/App.css"
import Products from "./pages/Products";
import {BrowserRouter, Navigate, Route, Routes} from "react-router-dom"

function App() {
    return (
      <div className="App">
          <Navbar expand="lg" className="bg-body-tertiary">
              <Container>
                  <Navbar.Brand>Хозяинъ</Navbar.Brand>
              </Container>
          </Navbar>
          <BrowserRouter>
              <Routes>
                  <Route path="/products" element={<Products/>} exact/>
                  <Route path="/*" element={<Navigate to="/products" replace/>}/>
              </Routes>
          </BrowserRouter>
      </div>
    );
}

export default App;
