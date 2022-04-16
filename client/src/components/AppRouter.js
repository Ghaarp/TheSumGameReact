import React, {useContext} from 'react';
import {Routes, Route, Navigate} from 'react-router-dom';
import {authRoutes, publicRoutes} from '../routes';
import {MAINPAGE_ROUTE} from "../utils/consts";
import {Context} from "../index";
import {observer} from "mobx-react-lite";

const AppRouter = observer(() => {
    const {user} = useContext(Context);
    const {isAuth} = user;
    return (
        <div>
            <Routes>
                {publicRoutes.map((route, i) => <Route key={i} path={route.path} element={route.component} exact={true}/>)}
                {isAuth ? authRoutes.map((route, i) => <Route key={i} path={route.path} element={route.component} exact={true}/>)
                    : ''}
                <Route key={"any"} path={"*"} element={<Navigate to={MAINPAGE_ROUTE}/>} exact={false}/>
            </Routes>
        </div>
    );
});

export default AppRouter;