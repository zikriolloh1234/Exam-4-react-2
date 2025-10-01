import React, { useEffect } from 'react'
import Navbar from '../components/navbar'
import { useDispatch, useSelector } from 'react-redux'
import { getProduct } from '../features/api';
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

import MuiBox from '../assets/div.MuiBox-root (1).png'
import MuiBox2 from '../assets/div.MuiBox-root (4).png'
import MuiBoxIcon from '../assets/iconly-glass-discount.svg fill.png'
import { LineChart, Line, XAxis, YAxis, Tooltip, CartesianGrid, ResponsiveContainer } from 'recharts';



const onSearch = (value, _e, info) => console.log(info?.source, value);
const Products = () => {
    const dispatch = useDispatch();
    const [age, setAge] = React.useState('');


    const { data } = useSelector((state) => state.items);

    useEffect(() => {
        dispatch(getProduct({ pageNumber: 1, pageSize: 10 }));
    }, []);

    const handleChange = (event) => {
        setAge(event.target.value);
    };




    return (
        <>
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
                                <em>None</em>
                            </MenuItem>
                            <MenuItem style={{ color: "white" }} value={10}>Ten</MenuItem>
                            <MenuItem style={{ color: "white" }} value={20}>Twenty</MenuItem>
                            <MenuItem style={{ color: "white" }} value={30}>Thirty</MenuItem>
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
                    <div className='saidbarHome'>
                        <BarsOutlined className='barsOutlined' />
                        <Link style={{ textDecoration: "none", color: "white" }} to="/orders">
                            <h2>Users</h2>
                        </Link>
                    </div>
                    <div className='saidbarHome SaidbarDashboard'>
                        <TagOutlined className='barsOutlined ' />
                        <h2>Products</h2>
                    </div>
                    <div className='saidbarOther'>
                        <FolderOutlined className='barsOutlined' />
                        <Link className='otherLink' to="/category">
                            <h2>Other</h2>
                        </Link>
                    </div>
                </div>
            </div>


            <div className='divBrands tilt-in-top-1'>
                <h2 className='textDashboard'>Products</h2>
                <div className='getProducts'>
                    <div className='seeAllProduct'>
                        <p>Top selling products</p>
                        <p style={{ cursor: "pointer" }}>See All {" >"}</p>
                    </div>

                    {data?.products?.map((item) => (
                        <div className='getProductsDiv ' key={item.id}>
                            <div style={{ display: "flex" }}>
                                <img
                                    src={`${baseApi}/images/${item.image}`}
                                    width={"50px"}
                                    height={"50px"}
                                    style={{
                                        borderRadius: "5px"
                                    }}
                                    alt="" />
                                <div className='inaccessories'>
                                    <p>{item?.productName}</p><br />
                                    <span>in Accessories</span>
                                </div>
                            </div>
                            <div>
                                <p style={{ color: "green" }}>{item?.price}</p>
                                <p>in sales</p>
                            </div>
                        </div>
                    ))}
                </div>
            </div>

        </>
    )
}

export default Products