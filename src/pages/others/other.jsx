import React, { useEffect, useState } from 'react'
import Button from '@mui/material/Button';
import { addBrands, deleteBrands, EditBrandsApi, getBrands } from '../../features/api';
import Navbar from '../../components/navbar';
import { Link } from 'react-router-dom';

import { useDispatch, useSelector } from 'react-redux'

import logoImage from '../../assets/Group 1116606595 (3).png'

import { Button as ButtonAntd, Input } from 'antd';
const { Search } = Input;
import { message, Space } from 'antd';

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
    const [addNameBrand, setAddNameBrand] = useState();
    const [editModalBrand, setEditModalBrand] = useState(false);
    const [editNameBrands, setEditNameBrands] = useState();
    const [editIdBrands, setEditIdBrands] = useState(null);
    const [messageApi, contextHolder] = message.useMessage();

    const [age, setAge] = React.useState('');
    const [searchTerm, setSearchTerm] = React.useState("");
    const products = brands?.data || [];

    const SearchData = products?.filter((item) =>
        item?.brandName?.toLowerCase().includes(searchTerm?.toLowerCase())
    );

    useEffect(() => {
        dispatch(getBrands({ pageNumber: 1, pageSize: 120 }));
    }, []);

    const successEdit = () => {
        messageApi.open({
            type: 'warning',
            content: 'Данные обновлены',
        });
    };

    const successAdd = () => {
        messageApi.open({
            type: 'success',
            content: 'Бренд успешно создан',
        });
    };

    const key = 'updatable';
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
                content: 'Бренд удалён',
                duration: 2,
            });
        }, 1000);
    };



    const handleChange = (event) => {
        setAge(event.target.value);
    };

    function logout() {
        localStorage.removeItem("accessToken");
        window.location.href = "/";
    }


    function addBrandDispatch(BrandName) {
        dispatch(addBrands(BrandName));
        setAddNameBrand("");
        successAdd();
    }

    function deleteBrand(BrandId) {
        dispatch(deleteBrands(BrandId));
        successDelete();
    }

    function EditBrands(brand) {
        setEditModalBrand(true);
        setEditNameBrands(brand.brandName);
        setEditIdBrands(brand.id);
    }

    function editSaveBrands(e) {
        e.preventDefault();
        dispatch(EditBrandsApi({ brandId: editIdBrands, brandName: editNameBrands }));
        setEditModalBrand(false);
        successEdit();
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
                    <div className='saidbarHome'>
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
                    <div style={{ gap: "39px" }} className='saidbarHome'>
                        <TagOutlined className='barsOutlined' />
                        <Link className='otherLink' to="/products">
                            <h2 className='textDecorationProduct'>Products</h2>
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

            <div className='InputSearchBrands'>
                <Input onChange={(e) => setSearchTerm(e.target.value)}
                    placeholder='Search Product'></Input>
            </div>

            <div className='divBrands'>

                <div className='divCeteBraBann'>
                    <Link className='forColorBlack' to="/category">
                        <h2>categories</h2>
                    </Link>
                    <Link className='categoriyesLinkBrands' to="/other">
                        <h2>Brands</h2>
                    </Link>
                    <Link className='forColorBlack' to="/subCategory">
                        <h2>subCategories</h2>
                    </Link>
                </div>


                <div className='BrandsDivActions'>
                    <p>Brands</p>
                    <p>Actions</p>
                </div>
                <hr style={{ width: "45%", marginLeft: "20px", backgroundColor: "gray", marginBottom: "10px" }} />
                <div className='divBrandBrand'>
                    {SearchData?.map((brand) => {
                        return (
                            <div className='divDataBrands' key={brand.id}>

                                <div>
                                    <h2 className='
                                    '>{brand?.brandName}</h2>
                                </div>

                                <div>
                                    <button style={{ cursor: "pointer" }} onClick={() => EditBrands(brand)}>🖋️</button>
                                    <button style={{ cursor: "pointer" }} onClick={() => deleteBrand(brand.id)}>🗑️</button>
                                </div>
                            </div>
                        )

                    })}

                </div>

                {editModalBrand && (
                    <div className='divEditModalBrands'>
                        <p>Edit Brand</p>
                        <form onSubmit={editSaveBrands} action="">
                            <Input className='inputEditBrand' value={editNameBrands} onChange={(e) => setEditNameBrands(e.target.value)} placeholder="Brand Name" />
                            <button className='btnCancelBrand' onClick={() => setEditModalBrand(false)} style={{ cursor: "pointer" }} type='button' variant="contained">Cancel</button>
                            <button className='btnCancelBrandSave' style={{ cursor: "pointer" }} type='onsubmit' variant="contained">Save</button>
                        </form>
                    </div>
                )}

                <div className='divAddBrands'>
                    <p>Add new Brand </p>
                    <Input value={addNameBrand} onChange={(e) => setAddNameBrand(e.target.value)} placeholder="Brand Name" />
                    <Button onClick={() => addBrandDispatch(addNameBrand)} variant="contained">add brand</Button>
                </div>
            </div>


        </>
    )
}

export default Other