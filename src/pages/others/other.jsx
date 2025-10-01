import React, { useEffect } from 'react'
import Button from '@mui/material/Button';
import { getBrands } from '../../features/api';
import Navbar from '../../components/navbar';
import { Link } from 'react-router-dom';

import { useDispatch, useSelector } from 'react-redux'

import logoImage from '../../assets/Group 1116606595 (3).png'

import { Button as ButtonAntd, Input } from 'antd';
const { Search } = Input;

import NotificationsNoneSharpIcon from '@mui/icons-material/NotificationsNoneSharp';
import HomeOutlinedIcon from '@mui/icons-material/HomeOutlined';
import { BarsOutlined } from "@ant-design/icons";
import { FolderOutlined, TagOutlined } from "@ant-design/icons";
import InputLabel from '@mui/material/InputLabel';
import MenuItem from '@mui/material/MenuItem';
import FormControl from '@mui/material/FormControl';
import Select from '@mui/material/Select';
const onSearch = (value, _e, info) => console.log(info?.source, value);


const Other = () => {
    const dispatch = useDispatch();
    const { brands } = useSelector((state) => state.brands);

    const [age, setAge] = React.useState('');

    useEffect(() => {
        dispatch(getBrands({ pageNumber: 1, pageSize: 10 }));
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
                    <div className='saidbarHome'>
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
                            <h2 >Products</h2>
                        </Link>
                    </div>
                    <div className='saidbarOther SaidbarDashboard'>
                        <FolderOutlined className='barsOutlined' />
                        <Link className='otherLink' to="/category">
                            <h2 style={{ color: "rgb(62, 62, 99)" }}>Other</h2>
                        </Link>
                    </div>
                </div>
            </div>

            <div className='divBrands'>

                <div className='divCeteBraBann'>
                    <Link className='forColorBlack' to="/category">
                        <h2>categories</h2>
                    </Link>
                    <Link className='categoriyesLink' to="/other">
                        <h2>Brands</h2>
                    </Link>
                    <Link className='forColorBlack'>
                        <h2>subCategories</h2>
                    </Link>
                </div>

                <div className='BrandsDivActions'>
                    <p>Brands</p>
                    <p>Actions</p>
                </div>
                <hr style={{ width: "45%", marginLeft: "20px", backgroundColor: "gray", marginBottom: "10px" }} />
                <div className='divBrandBrand'>
                    {brands?.data?.map((brand) => {
                        return (
                            <div className='divDataBrands' key={brand.id}>
                                <div>
                                    <h2>{brand?.brandName}</h2>
                                </div>

                                <div>
                                    <button>🖋️</button>
                                    <button>🗑️</button>
                                </div>
                            </div>

                        )
                    })}

                </div>

                <div className='divAddBrands'>
                    <p>Add new Brand</p>
                    <Input placeholder="Brand Name" />
                    <Button variant="contained">Contained</Button>
                </div>

            </div>


        </>
    )
}

export default Other