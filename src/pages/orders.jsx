import React, { useEffect } from 'react'
// import { useEffect } from 'react'

import logoImage from '../assets/Group 1116606595 (3).png'

import { Button as ButtonAntd, Input } from 'antd';
const { Search } = Input;

import NotificationsNoneSharpIcon from '@mui/icons-material/NotificationsNoneSharp';
import HomeOutlinedIcon from '@mui/icons-material/HomeOutlined';
import { BarsOutlined } from "@ant-design/icons";
import { FolderOutlined, TagOutlined } from "@ant-design/icons";
import { Link, NavLink, useNavigate } from 'react-router-dom';
import InputLabel from '@mui/material/InputLabel';
import MenuItem from '@mui/material/MenuItem';
import FormControl from '@mui/material/FormControl';
import Select from '@mui/material/Select';
const onSearch = (value, _e, info) => console.log(info?.source, value);
import Table from '@mui/joy/Table';
import { useDispatch, useSelector } from 'react-redux';
import { getProduct, getUsers } from '../features/api';
import { baseApi } from '../app/token';

const Orders = () => {
    const dispatch = useDispatch();
    const [age, setAge] = React.useState('');
    const token = localStorage.getItem("accessToken");
    const navigate = useNavigate();

    const handleChange = (event) => {
        setAge(event.target.value);
    };

    const { users } = useSelector((state) => state.users);
    console.log("Users:", users);


    useEffect(() => {
        dispatch(getUsers({ pageNumber: 1, pageSize: 10 }));
    }, []);

    function logout() {
        localStorage.removeItem("accessToken");
        window.location.href="/";
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
                    <div className='saidbarHome'>
                        <HomeOutlinedIcon />
                        <Link to="/dashboard" className='otherLink'>
                            <h2 >Dashboard</h2>
                        </Link>
                    </div>
                    <div className='saidbarHome SaidbarDashboard'>
                        <BarsOutlined className='barsOutlined' />
                        <Link to="/orders" style={{ textDecoration: "none" }}>
                            <h2 style={{ color: "rgb(62, 62, 99)" }}>Users</h2>
                        </Link>
                    </div>
                    <div className='saidbarHome'>
                        <TagOutlined className='barsOutlined' />
                        <Link className='otherLink' to="/products">
                            <h2>Products</h2>
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

            <div className='tableUsers'>
                <Table hoverRow>
                    <thead>
                        <tr>
                            <th>Image</th>
                            <th>Name</th>
                            <th>Rol Users</th>
                        </tr>
                    </thead>
                    <tbody>
                        {users?.users?.map((row) => (
                            <tr key={row.userId}>
                                {/* Image */}
                                <td>
                                    {row?.image ? (
                                        <img src={`${baseApi}/images/${row?.image}`} alt={row.userName} width={40} />
                                    ) : (
                                        "—"
                                    )}
                                </td>

                                {/* Name */}
                                <td>{row?.userName || "—"}</td>

                                {/* Roles */}
                                <td>
                                    {row?.userRoles?.map((rol) => (
                                        <p key={rol.id}>{rol?.name}</p>
                                    ))}
                                </td>
                            </tr>
                        ))}
                    </tbody>

                </Table>
            </div>



        </>
    )
}

export default Orders