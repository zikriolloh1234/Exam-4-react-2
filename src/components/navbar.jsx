import React from 'react'
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

const onSearch = (value, _e, info) => console.log(info?.source, value);

const Navbar = () => {
    const [age, setAge] = React.useState('');

    const handleChange = (event) => {
        setAge(event.target.value);
    };

    function logout() {
        localStorage.removeItem("accessToken");
        window.location.reload();
    }
    return (
        <>
            <div className='navbar'>
                <div className='navbarLogo'>
                    <img src={logoImage} alt="" />
                    <Search enterButton className='searchInputAntd' placeholder="input search text" onSearch={onSearch} style={{ width: 200 }} />
                </div>
                <div className='navbarNotification scale-in-center'>
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

            <div className='saidbarfixed scale-in-center'>
                <div className='saidbar '>
                    <div className='saidbarHome '>
                        <HomeOutlinedIcon />
                        <Link to="/dashboard" className='otherLink'>
                            <h2>Dashboard</h2>
                        </Link>
                    </div>
                    <div className='saidbarHome'>
                        <BarsOutlined className='barsOutlined' />
                        <h2>Orders</h2>
                    </div>
                    <div className='saidbarHome'>
                        <TagOutlined className='barsOutlined' />
                        <Link className='otherLink' to="/products">
                            <h2>Products</h2>
                        </Link>
                    </div>
                    <div className='saidbarOther'>
                        <FolderOutlined className='barsOutlined' />
                        <Link className='otherLink' to="/other">
                            <h2>Other</h2>
                        </Link>
                    </div>
                </div>
            </div>


        </>
    )
}

export default Navbar