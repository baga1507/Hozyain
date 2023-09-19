import Login from "../pages/Login/Login";
import Products from "../pages/Products/Products";
import Cart from "../pages/Cart/Cart";
import About from "../pages/About/About";
import Orders from "../pages/Orders/Orders";
import Order from "../pages/Order/Order";
import SignUp from "../pages/SignUp/SignUp";

export const publicRoutes = [
    {path: "/login", element: <Login/>, exact: false},
    {path: "/sign-up", element: <SignUp/>, exact: false}
]

export const privateRoutes = [
    {path: "/products", element: <Products/>, exact: true},
    {path: "/cart", element: <Cart/>, exact: false},
    {path: "/about", element: <About/>, exact: false},
    {path: "/orders", element: <Orders/>, exact: true},
    {path: "/orders/:id", element: <Order/>, exact: true}
]
