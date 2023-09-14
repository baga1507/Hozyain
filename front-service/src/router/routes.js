import Auth from "../pages/Auth/Auth";
import Products from "../pages/Products";
import Cart from "../pages/Cart/Cart";
import About from "../pages/About";

export const publicRoutes = [
    {path: "/login", element: <Auth/>, exact: false}
]

export const privateRoutes = [
    {path: "/products", element: <Products/>, exact: true},
    {path: "/cart", element: <Cart/>, exact: true},
    {path: "/about", element: <About/>, exact: false}
]
