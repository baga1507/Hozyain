import React, {useContext} from 'react';
import {Navigate, Route, Routes} from "react-router-dom";
import {privateRoutes, publicRoutes} from "../router/routes";
import {AuthContext} from "../context/AuthContext";

const AppRouter = () => {
    const {isAuth} = useContext(AuthContext)

    return (
        <div className="content">
            {isAuth
                ?
                <Routes>
                    {privateRoutes.map(r =>
                        <Route key={r.path} path={r.path} exact={r.exact} element={r.element}/>
                    )}
                    <Route path="/*" element={<Navigate to="/products" replace/>}/>
                </Routes>
                :
                <Routes>
                    {publicRoutes.map(r =>
                        <Route key={r.path} path={r.path} exact={r.exact} element={r.element}/>
                    )}
                    <Route path="/*" element={<Navigate to="/login" replace/>}/>
                </Routes>
            }
        </div>
    );
};

export default AppRouter;