import React, { useEffect, useState } from 'react'
import Navbar from '../components/navbar'
import { useDispatch, useSelector } from 'react-redux'
import { addProduct, getBrands, getCategory, getColor, getProduct, getSubCategory } from '../features/api';
import { baseApi } from '../app/token';
import logoImage from '../assets/Group 1116606595 (3).png'

import { Button as ButtonAntd, Input as InputAntd } from 'antd';
const { Search } = InputAntd;
import Autocomplete from '@mui/joy/Autocomplete';
// import { FormControl as joyFormCantrol } from '@mui/joy/FormControl';
import FormLabel from '@mui/joy/FormLabel';
import FormHelperText from '@mui/joy/FormHelperText';

import NotificationsNoneSharpIcon from '@mui/icons-material/NotificationsNoneSharp';
import HomeOutlinedIcon from '@mui/icons-material/HomeOutlined';
import { BarsOutlined } from "@ant-design/icons";
import { FolderOutlined, TagOutlined } from "@ant-design/icons";
import { Link, Navigate, NavLink, useNavigate } from 'react-router-dom';
import InputLabel from '@mui/material/InputLabel';
import MenuItem from '@mui/material/MenuItem';
import FormControl from '@mui/material/FormControl';
import Select from '@mui/material/Select';
import Table from '@mui/joy/Table';


import MuiBox from '../assets/div.MuiBox-root (1).png'
import MuiBox2 from '../assets/div.MuiBox-root (4).png'
import MuiBoxIcon from '../assets/iconly-glass-discount.svg fill.png'
import { LineChart, Line, XAxis, YAxis, Tooltip, CartesianGrid, ResponsiveContainer } from 'recharts';

import { message, Space } from 'antd';


const onSearch = (value, _e, info) => console.log(info?.source, value);
const AddProducts = () => {
    const dispatch = useDispatch();
    const [age, setAge] = React.useState('');
    const navigate = useNavigate();
    const [subCategories, setSubCategories] = useState([]);
    const [selectedSubCategory, setSelectedSubCategory] = useState("");
    const [messageApi, contextHolder] = message.useMessage();

    const successAdd = () => {
        messageApi.open({
            type: 'success',
            content: 'Продуст успешно создан',
        });
    };

    const [productData, setProductData] = React.useState({
        ProductName: "",
        Description: "",
        BrandId: "",
        CategoryId: "",
        Price: "",
        DiscountPrice: "",
        Quantity: "",
        ColorId: "",
        Code: "",
    });
    const [images, setImages] = React.useState(null);

    const { data } = useSelector((state) => state.items);
    const { colors } = useSelector((state) => state.colors)
    const { category } = useSelector((state) => state.category);
    const { brands } = useSelector((state) => state.brands);
    const { subCategoryy } = useSelector((state) => state.subCategory);

    useEffect(() => {
        dispatch(getSubCategory());
    }, []);

    useEffect(() => {
        dispatch(getBrands({ pageNumber: 1, pageSize: 120 }));
    }, []);

    useEffect(() => {
        dispatch(getCategory());
    }, []);

    useEffect(() => {
        dispatch(getColor({ colorName: "", pageNumber: 1, pageSize: 10 }));
    }, []);

    useEffect(() => {
        dispatch(getProduct({ pageNumber: 1, pageSize: 10 }));
    }, []);

    const handleChange = (event) => {
        setAge(event.target.value);
    };

    function logout() {
        localStorage.removeItem("accessToken");
        window.location.href = "/";
    }

    const handleSubmit = (e) => {
        e.preventDefault();

        if (
            !productData.ProductName.trim() ||
            !productData.Description.trim() ||
            !productData.BrandId ||
            !productData.CategoryId ||
            !productData.Price ||
            !productData.ColorId ||
            !productData.Quantity ||
            !images
        ) {
            alert("⚠️ Заполните все поля и добавьте изображение продукта!");
            return;
        }

        const formData = new FormData();
        formData.append("ProductName", productData.ProductName);
        formData.append("Description", productData.Description);
        formData.append("BrandId", productData.BrandId ? Number(productData.BrandId) : null);
        formData.append("CategoryId", Number(productData.CategoryId));
        formData.append("ColorId", Number(productData.ColorId));
        formData.append("Quantity", Number(productData.Quantity));
        formData.append("Price", Number(productData.Price));
        formData.append("DiscountPrice", Number(productData.DiscountPrice || 0));
        formData.append("HasDiscount", productData.DiscountPrice ? "true" : "false");
        formData.append("Images", images);
        formData.append("Code", productData.Code); // <-- отправляем Code
        formData.append("SubCategoryId", Number(selectedSubCategory));


        for (let pair of formData.entries()) {
            console.log(pair[0], pair[1]);
        }


        dispatch(addProduct(formData))
        navigate("/products")
        successAdd();

    };
    const [idSubCategory, setIdSubCategory] = useState(null);

    useEffect(() => {
        if (category?.data?.length > 0 && !idSubCategory) {
            setIdSubCategory(category.data[0].id);
        }
    }, [category]);


    return (
        <>
            {contextHolder}
            <div className='navbar'>
                <div className='navbarLogo'>
                    <img src={logoImage} alt="" />
                    <Search enterButton className='searchInputAntd' placeholder="input search text" onSearch={onSearch} style={{ width: 200 }} />
                </div>
                <div className='navbarNotification'>
                    <NotificationsNoneSharpIcon style={{ color: "white" }} />
                    <FormControl sx={{ m: 1, minWidth: 120 }} style={{ color: "white" }} size="small">
                        <InputLabel id="demo-select-small-label">Age</InputLabel>
                        <Select
                            labelId="demo-select-small-label"
                            id="demo-select-small"
                            value={age}
                            label="Age"
                            onChange={handleChange}
                        >
                            <MenuItem value="">
                                <em onClick={logout}>Log Out</em>
                            </MenuItem>
                        </Select>
                    </FormControl>

                </div>
            </div>

            <div className='saidbarfixed'>
                <div className='saidbar'>
                    <div className='saidbarHome '>
                        <HomeOutlinedIcon />
                        <Link to="/dashboard" className='otherLink'>
                            <h2>Dashboard</h2>
                        </Link>
                    </div>
                    <div style={{ gap: "75px" }} className='saidbarHome'>
                        <BarsOutlined className='barsOutlined' />
                        <Link style={{ textDecoration: "none", color: "white" }} to="/orders">
                            <h2 className='textDecarotion'>Users</h2>
                        </Link>
                    </div>
                    <div style={{ gap: "39px" }} className='saidbarHome SaidbarDashboard'>
                        <TagOutlined className='barsOutlined ' />
                        <h2 className='textDecorationProduct'>Products</h2>
                    </div>
                    <div className='saidbarOther'>
                        <FolderOutlined className='barsOutlined' />
                        <Link className='otherLink' to="/category">
                            <h2>Other</h2>
                        </Link>
                    </div>
                </div>
            </div>
            <div className='textProducts'>
                <div className='h2TextProductsAddNew'>
                    <h2 className=''>Products</h2>

                </div>
                <div style={{ display: "flex", gap: "15px" }}>
                    <ButtonAntd onClick={() => navigate(-1)}>Cancel</ButtonAntd>
                    <ButtonAntd onClick={handleSubmit}>Save</ButtonAntd>
                </div>
            </div>

            <div className='InputNameProducts'>
                <InputAntd
                    className='sumInputnameProduct'
                    placeholder='Name Product'
                    value={productData.ProductName}
                    onChange={(e) => setProductData({ ...productData, ProductName: e.target.value })}
                /> <br /><br />
                <input
                    type="text"
                    style={{ height: "33px", fontSize: "16px", width: "100px", padding: "3px" }}
                    placeholder="Code"
                    value={productData.Code}
                    onChange={(e) => setProductData({ ...productData, Code: e.target.value })}
                />
                <br /><br />
                <InputAntd
                    className='sumInputnameProduct inputDescription'
                    placeholder='Description'
                    value={productData.Description}
                    onChange={(e) => setProductData({ ...productData, Description: e.target.value })}
                /><br /><br />

                <br /><br />
                <div style={{ display: "flex", gap: "20px" }}>
                    {/* Выбор бренда */}
                    <select
                        className='selectforCategory'
                        value={productData.BrandId}
                        onChange={(e) => setProductData({ ...productData, BrandId: e.target.value })}
                    >
                        <option value=""> Brand</option>
                        {brands?.data?.map((brand) => (
                            <option key={brand.id} value={brand.id}>{brand.brandName}</option>
                        ))}
                    </select>

                    {/* Выбор категории */}
                    <select
                        className='selectforCategory'
                        value={productData.CategoryId}
                        onChange={(e) => setProductData({ ...productData, CategoryId: e.target.value })}
                    >
                        <option value=""> Category</option>
                        {category?.data?.map((cat) => (
                            <option key={cat.id} value={cat.id}>{cat.categoryName}</option>
                        ))}
                    </select>

                    {/* Выбор подкатегории */}
                    <select
                        className='selectforCategory'
                        value={selectedSubCategory}
                        onChange={(e) => setSelectedSubCategory(e.target.value)}
                    >
                        <option value="">SubCategory</option>
                        {subCategoryy?.data?.map((sub) => (
                            <option key={sub.id} value={sub.id}>{sub?.subCategoryName}</option>
                        ))}
                    </select>
                </div>

                <br /> <br />
                <div style={{ display: "flex", gap: "20px" }}>
                    <input
                        className='heigthPrice'
                        placeholder='Products Price'
                        type="number"
                        value={productData.Price}
                        onChange={(e) => setProductData({ ...productData, Price: e.target.value })}
                    />
                    <input
                        className='heigthPrice'
                        placeholder='Discount'
                        type="number"
                        value={productData.DiscountPrice}
                        onChange={(e) => setProductData({ ...productData, DiscountPrice: e.target.value })}
                    />
                    <input
                        className='heigthPrice'
                        placeholder='Count'
                        type="number"
                        value={productData.Quantity}
                        onChange={(e) => setProductData({ ...productData, Quantity: e.target.value })}
                    />

                </div>
            </div>

            <div className='divColorsForAddProducts'>
                <div className='divColorForProdcuts'>
                    <span>colour</span>
                    <span style={{ marginLeft: "30px", color: "#2563EB", cursor: "pointer" }}>Create new</span>
                    <div style={{ display: "flex", gap: "7px", marginTop: "30px" }}>
                        {colors?.data?.map((color) => (
                            <div key={color.id}>
                                <p
                                    onClick={() => setProductData({ ...productData, ColorId: color.id })}
                                    style={{
                                        backgroundColor: color.colorName,
                                        width: "35px",
                                        height: "35px",
                                        borderRadius: '50%',
                                        border: productData.ColorId === color.id ? "3px solid #2563EB" : "1px solid gray",
                                        cursor: "pointer"
                                    }}
                                ></p>
                            </div>
                        ))}

                    </div>
                </div>

                <div className='addImageToProduct'>
                    <input className='inputChoosFile' type="file" id="fileInput" onChange={(e) => setImages(e.target.files[0])} />
                    <p>Click to upload or drag and drop</p>
                    <p style={{ color: 'gray' }}>(SVG, JPG, PNG, or gif maximum 900x400)</p>
                </div>
            </div>


        </>
    )
}

export default AddProducts