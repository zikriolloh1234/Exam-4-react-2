import React, { useEffect } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { getCategory } from '../../features/api';
import logoImage from '../../assets/Group 1116606595 (3).png'

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

const Categories = () => {

    const dispatch = useDispatch();
    const { category } = useSelector((state) => state.category);
    const [age, setAge] = React.useState('');

    console.log("data:", category);
    const handleChange = (event) => {
        setAge(event.target.value);
    };

    useEffect(() => {
        dispatch(getCategory());
    }, []);

    useEffect(() => {
        console.log("data:", category);
    }, [category]);

    const navigate = useNavigate();

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
                    <div className='saidbarHome'>
                        <TagOutlined className='barsOutlined' />
                        <Link className='otherLink' to="/products">
                            <h2>Products</h2>
                        </Link>
                    </div>
                    <div className='saidbarOther SaidbarDashboard'>
                        <FolderOutlined className='barsOutlined' />
                        <Link style={{ color: "rgb(62, 62, 99)" }} className='otherLink' to="/category">
                            <h2>Other</h2>
                        </Link>
                    </div>
                </div>
            </div>

            <div className='categoryDiv'>
                <div className='divCeteBraBann'>
                    <Link className='categoriyesLink' to="/category">
                        <h2>categories</h2>
                    </Link>
                    <Link className='forColorBlack' to="/other">
                        <h2>Brands</h2>
                    </Link>
                    <Link className='forColorBlack'>
                        <h2>subCategories</h2>
                    </Link>
                </div>
                {category?.data?.map((category) => (
                    <div key={category.id}>
                        <h3>{category.categoryName}</h3>

                        {category.subCategories?.map((sub) => (
                            <div key={sub.id}>
                                <p>{sub.subCategoryName}</p>
                            </div>
                        ))}
                    </div>
                ))}
            </div>





        </>
    )
}

export default Categories