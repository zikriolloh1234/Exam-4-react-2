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



const onSearch = (value, _e, info) => console.log(info?.source, value);
const AddProducts = () => {
    const dispatch = useDispatch();
    const [age, setAge] = React.useState('');
    const navigate = useNavigate();


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
            <div className='textProducts'>
                <h2 className=''>Products</h2>
                <div style={{display:"flex", gap:"15px"}}>
                <ButtonAntd onClick={() => navigate(-1)}>Cancel</ButtonAntd>
                <ButtonAntd>Save</ButtonAntd>
                </div>
            </div>

        </>
    )
}

export default AddProducts