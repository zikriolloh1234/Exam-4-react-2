import React, { useEffect } from 'react'
import Navbar from '../components/navbar'
import { useDispatch, useSelector } from 'react-redux'
import { getProduct } from '../features/api';
import { baseApi } from '../app/token';
import logoImage from '../assets/Group 1116606595 (3).png'

import { Button as ButtonAntd, Input } from 'antd';
const { Search } = Input;
import dayjs from "dayjs";

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
const Dashboard = () => {
    const dispatch = useDispatch();
    const [age, setAge] = React.useState('');


    const { data } = useSelector((state) => state.items);

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
    const monthlyStats = React.useMemo(() => {
        const months = {
            Jan: 0, Feb: 0, Mar: 0, Apr: 0, May: 0, Jun: 0,
            Jul: 0, Aug: 0, Sep: 0, Oct: 0, Nov: 0, Dec: 0
        };

        data?.products?.forEach(item => {
            const month = dayjs(item.createdDate).format("MMM");
            months[month] += item.quantity ?? 0;
        });

        return Object.keys(months).map(m => ({
            name: m,
            quantity: months[m]
        }));
    }, [data]);
    const totalQuantity = data?.products?.reduce((sum, item) => sum + (item.quantity || 0), 0);



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
                        <InputLabel id="demo-select-small-label">Log Out</InputLabel>
                        <Select
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
                    <div className='saidbarHome SaidbarDashboard'>
                        <HomeOutlinedIcon />
                        <Link to="/dashboard" className='otherLink'>
                            <h2 style={{ color: "rgb(62, 62, 99)" }}>Dashboard</h2>
                        </Link>
                    </div>
                    <div style={{gap:"75px"}} className='saidbarHome'>
                        <BarsOutlined className='barsOutlined' />
                        <Link style={{ textDecoration: "none" }} to="/orders">
                            <h2 className='textDecarotion'>Users</h2>
                        </Link>
                    </div>
                    <div style={{gap:"40px"}} className='saidbarHome'>
                        <TagOutlined className='barsOutlined' />
                        <Link className='otherLink' to="/products">
                            <h2 className='textDecorationProduct'>Products</h2>
                        </Link>
                    </div>
                    <div className='saidbarOther'>
                        <FolderOutlined className='barsOutlined' />
                        <Link className='otherLink' to="/category">
                            <h2>Other</h2>
                        </Link>
                    </div>
                </div>
            </div>

            <div className='lineCharts'>
                <div style={{
                    width: "100%",
                    display: "flex",
                    justifyContent: "space-around"
                }}>
                    <div className='SalesMuiBox'>
                        <img src={MuiBox2} alt="" />
                        <div>
                            <p>Sales</p>
                            <span>{totalQuantity}</span>
                        </div>
                    </div>
                    <div className='SalesMuiBox'>
                        <img src={MuiBoxIcon} alt="" />
                        <div>
                            <p>Sales</p>
                            <span>{totalQuantity}</span>
                        </div>
                    </div>
                    <div className='SalesMuiBox'>
                        <img src={MuiBox} alt="" />
                        <div>
                            <p>Sales</p>
                            <span>{totalQuantity}</span>
                        </div>
                    </div>

                </div>
                <ResponsiveContainer width="100%" height={300}>
                    <LineChart data={monthlyStats}>
                        <CartesianGrid stroke="#eee" strokeDasharray="5 5" />
                        <XAxis dataKey="name" />
                        <YAxis />
                        <Tooltip />
                        <Line type="monotone" dataKey="quantity" stroke="#8884d8" />
                    </LineChart>
                </ResponsiveContainer>
            </div>


            <div className='divBrands tilt-in-top-1'>
                <h2 className='textDashboard'>Dashaboard</h2>
                <div className='getProducts'>
                    <div className='seeAllProduct'>
                        <p style={{width:"270px"}}>Top selling products</p>
                        <Link style={{textDecoration:"none"}} to="/products">
                            <p style={{ cursor: "pointer",textDecoration:"none", width:"80px" }}>See All {" >"}</p>
                        </Link>
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

export default Dashboard