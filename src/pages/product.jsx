import React, { useEffect, useState } from 'react'
import Navbar from '../components/navbar'
import { useDispatch, useSelector } from 'react-redux'
import { deleteImageProductAsync, deleteProductAsync, getByIdProductAsync, getProduct } from '../features/api';
import { baseApi } from '../app/token';
import logoImage from '../assets/Group 1116606595 (3).png'

import DeleteIcon from '@mui/icons-material/Delete';
import NotificationsNoneSharpIcon from '@mui/icons-material/NotificationsNoneSharp';
import InfoIcon from '@mui/icons-material/Info';

import { Button as ButtonAntd, Input } from 'antd';
const { Search } = Input;

import BorderColorIcon from '@mui/icons-material/BorderColor';

import HomeOutlinedIcon from '@mui/icons-material/HomeOutlined';
import { BarsOutlined } from "@ant-design/icons";
import { FolderOutlined, TagOutlined } from "@ant-design/icons";
import { Link, NavLink } from 'react-router-dom';
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
const Products = () => {
    const dispatch = useDispatch();
    const [age, setAge] = React.useState('');
    const [byIdModal, setByIdModal] = useState(false);

    const [searchTerm, setSearchTerm] = React.useState("");

    const [productId, setProductId] = useState();
    const [brandId, setbrandId] = useState();
    const [colorId, setColorId] = useState();
    const [productName, setProductName] = useState();
    const [description, setDescription] = useState();
    const [quantity, setQuantity] = useState();
    const [codeColor, setCodeColor] = useState();
    const [price, setPrice] = useState();
    const [hasDisCount, setHasDisCount] = useState();
    const [subCategoryId, setSubCategoryId] = useState();


    function editProducts(item) {
        setProductId(item.id);
        setProductName(item.productName);
        setPrice(item.price);
        setQuantity(item.quantity);
        setHasDisCount(item.HasDiscount);
    }


    const { data } = useSelector((state) => state.items);

    const { byId } = useSelector((state) => state.byIdProduct);

    function getById(id) {
        dispatch(getByIdProductAsync(id));
        setByIdModal(true)
    }

    const products = data?.products || [];

    // фильтруем по названию
    const SearchData = products?.filter((item) =>
        item?.productName?.toLowerCase().includes(searchTerm?.toLowerCase())
    );
    useEffect(() => {
        dispatch(getProduct({ pageNumber: 1, pageSize: 10 }));
    }, []);

    function deleteProductIMage(id) {
        dispatch(deleteImageProductAsync(id));
        setByIdModal(false)
    }

    function addImageProduct(){
        dispatch(addImageProduct());
    }


    const handleChange = (event) => {
        setAge(event.target.value);
    };

    function logout() {
        localStorage.removeItem("accessToken");
        window.location.href = "/";
    }
    const [messageApi, contextHolder] = message.useMessage();


    const successDelete = () => {
        messageApi.open({
            key,
            type: 'loading',
            content: 'Загрузка',
        });
        setTimeout(() => {
            messageApi.open({
                key,
                type: 'error',
                content: 'продукт удалён',
                duration: 2,
            });
        }, 1000);
    };

    function deleteProduct(id) {
        dispatch(deleteProductAsync(id));
        successDelete();
    }



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
                <h2 className=''>Products</h2>
                <Link to="/AddProducts">
                    <ButtonAntd>+ Add New</ButtonAntd>
                </Link>
            </div>

            <div className='InputSearchProduct'>
                <Input onChange={(e) => setSearchTerm(e.target.value)}
                    placeholder='Search Product'></Input>
            </div>

            <div className='TableProducts'>
                <Table hoverRow sx={{ '& thead th:nth-child(1)': { width: '40%' } }}>
                    <thead>
                        <tr>
                            <th>Products</th>
                            <th>Inventory</th>
                            <th>Category</th>
                            <th>Price</th>
                            <th>Action</th>
                        </tr>
                    </thead>
                    <tbody>
                        {SearchData?.map((item) => (
                            <tr key={item.id}>
                                <td>
                                    <div style={{ display: "flex", gap: "10px", placeItems: "center" }}>
                                        <img
                                            src={`${baseApi}/images/${item.image}`}
                                            width={"50px"}
                                            height={"50px"}
                                            style={{
                                                borderRadius: "5px"
                                            }}
                                            alt="" />
                                        <p>{item?.productName}</p>
                                    </div>
                                </td>
                                <td></td>
                                <td>
                                    <p>{item.categoryName}</p>
                                </td>
                                <td>
                                    <p>{item.price}</p>
                                </td>
                                <td>
                                    <Link
                                        state={{
                                            id: item.id,
                                            ProductName: item.productName,
                                            Description: item.description,
                                            BrandId: item.brandId,
                                            CategoryId: item.categoryId,
                                            SubCategoryId: item.subCategoryId,
                                            Price: item.price,
                                            DiscountPrice: item.discountPrice,
                                            Quantity: item.quantity,
                                            ColorId: item.colorId,
                                            Code: item.code,
                                        }}
                                        to="/editProducts">
                                        <button onClick={() => editProducts(item)} className='btnDeleteProduct'> <BorderColorIcon sx={{ color: "blue" }} /> </button>
                                    </Link>
                                    <button className='btnDeleteProduct' onClick={() => deleteProduct(item.id)}><DeleteIcon sx={{ color: "red" }} /></button>
                                    <button className='btnDeleteProduct' onClick={() => getById(item.id)}><InfoIcon sx={{ color: "black" }} /></button>
                                </td>

                            </tr>
                        ))}
                    </tbody>
                </Table>
            </div>
            {byIdModal && (
                <div className='byIdModal'>
                    <p>Brand: {byId?.data?.brand}</p><br />
                    <p>Color: {byId?.data?.color}</p><br />
                    <p>Product Name: {byId?.data?.productName}</p><br />
                    <p>Description: {byId?.data?.description}</p><br />
                    <p>Price: {byId?.data?.price}</p><br />
                    <p>Discount: {byId?.data?.discountPrice}</p><br />
                    <p>Quantity: {byId?.data?.quantity}</p>
                    <div style={{ display: "flex", gap: "10px", flexWrap: "wrap" }}>
                        {byId?.data?.images?.length > 0 ? (
                            byId.data.images.map((img) => (
                                <div key={img.id} style={{ position: "relative" }}>
                                    <img
                                        src={`${baseApi}/images/${img.images}`}
                                        alt=""
                                        style={{ width: "50px", height: "50px", borderRadius: "5px" }}
                                    />
                                    <button
                                        onClick={() => deleteProductIMage(img.id)}
                                        className='btnDeleteProduct'
                                        style={{
                                            position: "absolute",
                                            top: "-5px",
                                            right: "-5px",
                                            background: "red",
                                            border: "none",
                                            borderRadius: "50%",
                                            color: "white",
                                            cursor: "pointer",
                                            width: "20px",
                                            height: "20px",
                                            fontSize: "12px",
                                            padding: 0,
                                        }}
                                    >
                                        x
                                    </button>
                                </div>
                            ))
                        ) : (
                            <p>No images available</p>
                        )}
                    </div>
                    <input onClick={()=> addImageProduct()} type="file"/>

                    <button onClick={() => setByIdModal(false)}>Close</button>
                </div>
            )}
        </>
    )
}

export default Products