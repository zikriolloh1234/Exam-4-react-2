import React from 'react'
import { BrowserRouter, Routes, Route } from "react-router-dom";
import Login from '../pages/login';
import App from '../App';
import Dashboard from '../pages/dashboard';
import Other from '../pages/other';

const Router = () => {
    return (
        <BrowserRouter>
            <Routes>
                <Route>
                    <Route path="/" element={<Login />}></Route>
                    <Route path="/dashboard" element={<Dashboard />}></Route>
                    <Route path="/other" element={<Other />}></Route>
                </Route>
            </Routes>
        </BrowserRouter>
    )
}

export default Router