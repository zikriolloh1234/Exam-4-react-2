import React, { useEffect } from 'react'
import Navbar from '../components/navbar'
import { useDispatch, useSelector } from 'react-redux'
import { deleteProductAsync, getProduct } from '../features/api';
import { baseApi } from '../app/token';
import logoImage from '../assets/Group 1116606595 (3).png'

import { Button as ButtonAntd, Input } from 'antd';
const { Search } = Input;

import NotificationsNoneSharpIcon from '@mui/icons-material/NotificationsNoneSharp';
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

    const [searchTerm, setSearchTerm] = React.useState("");

   
    const { data } = useSelector((state) => state.items);
    // console.log("data,Items:",useSelector((state) => state.items));

    const products = data?.products || [];

    // фильтруем по названию
    const SearchData = products?.filter((item) =>
        item?.productName?.toLowerCase().includes(searchTerm?.toLowerCase())
    );
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
                content: 'продуст удалён',
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
                <Table sx={{ '& thead th:nth-child(1)': { width: '40%' } }}>
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
                                    <Link to="/editProducts">
                                        <button className='btnDeleteProduct'>🖋️</button>
                                    </Link>
                                    <button className='btnDeleteProduct' onClick={() => deleteProduct(item.id)}>🗑️</button>
                                </td>

                            </tr>
                        ))}
                    </tbody>
                </Table>
            </div>
        </>
    )
}

export default Products