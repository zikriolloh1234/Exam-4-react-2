import React from 'react'
import { BrowserRouter, Routes, Route } from "react-router-dom";
import Login from '../pages/login';
import App from '../App';
import Dashboard from '../pages/dashboard';
import Other from '../pages/others/other';
import Categories from '../pages/others/categories';
import Orders from '../pages/orders';
import Products from '../pages/product';
import SubCategory from '../pages/subCategory';
import AddProducts from '../pages/addProducts';
import EditProducts from '../pages/editProduct';

const Router = () => {
    return (
        <BrowserRouter>
            <Routes>
                <Route>
                    <Route path="/" element={<Login />}></Route>
                    <Route path="/dashboard" element={<Dashboard />}></Route>
                    <Route path="/other" element={<Other />}></Route>
                    <Route path="/category" element={<Categories />}></Route>
                    <Route path="/orders" element={<Orders />}></Route>
                    <Route path="/products" element={<Products />}></Route>
                    <Route path="/subCategory" element={<SubCategory/>}></Route>
                    <Route path="/AddProducts" element={<AddProducts/>}></Route>
                    <Route path="/editProducts" element={<EditProducts/>}></Route>
                </Route>
            </Routes>
        </BrowserRouter>
    )
}

export default Router