import React from 'react'
import { BrowserRouter, Routes, Route } from "react-router-dom";
import Login from '../pages/login';
import App from '../App';

const Router = () => {
    return (
        <BrowserRouter>
            <Routes>
                <Route>
                    <Route path="/" element={<Login />}></Route>
                </Route>
            </Routes>
        </BrowserRouter>
    )
}

export default Router