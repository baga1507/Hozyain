import Auth from "../pages/Auth";
import Products from "../pages/Products";

export const publicRoutes = [
    {path: "/login", element: <Auth/>, exact: false}
]

export const privateRoutes = [
    {path: "/products", element: <Products/>, exact: false}
]
