import React, { useEffect, useState } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { addSubCategoryAync, deleteSubCategoryAync, editSubCategoryAync, getCategory } from '../features/api';
import logoImage from '../assets/Group 1116606595 (3).png'

import { Button, Button as ButtonAntd, Input } from 'antd';
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
import Table from '@mui/joy/Table';

import { FunnelChart } from 'recharts';
const onSearch = (value, _e, info) => console.log(info?.source, value);

const SubCategory = () => {

    const dispatch = useDispatch();
    const { category } = useSelector((state) => state.category);
    const [age, setAge] = React.useState('');
    const [addModalCategory, setAddModalCategory] = useState(false);
    const [addSubCategory, setAddSubCategory] = useState();
    const [idSubCategory, setIdSubCategory] = useState(null);
    const [modalEditSubCategory, setModalEditSubCategory] = useState(false);
    const [editNameSubCategory, setEditNameSubCategory] = useState();
    const [editSubId, setEditSubId] = useState(null);

    function editSbuCategSync(sub) {
        setEditNameSubCategory(sub.subCategoryName);
        setEditSubId(sub.id);
        setModalEditSubCategory(true);
    }


    function addSubCategorySyncModal() {
        setAddModalCategory(true);
    }

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

    function logout() {
        localStorage.removeItem("accessToken");
        window.location.href = "/";
    }

    useEffect(() => {
        if (category?.data?.length > 0 && !idSubCategory) {
            setIdSubCategory(category.data[0].id);
        }
    }, [category]);



    function addSubCategorySync(addSubCategory) {
        dispatch(addSubCategoryAync({ CategoryId: idSubCategory, SubCategoryName: addSubCategory }));
        setAddModalCategory(false);
        setAddSubCategory("");
    }

    function deleteSubCateg(id) {
        dispatch(deleteSubCategoryAync(id))
    }
    
    function editSubCategoryVizov(){
        // dispatch(editSubCategoryAync({Id:idSubCategory, CategoryId:}))
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
                    <div style={{gap:"75px"}} className='saidbarHome'>
                        <BarsOutlined className='barsOutlined' />
                        <Link style={{ textDecoration: "none", color: "white" }} to="/orders">
                            <h2 className='textDecarotion'>Users</h2>
                        </Link>
                    </div>
                    <div style={{gap:"40px"}} className='saidbarHome'>
                        <TagOutlined className='barsOutlined' />
                        <Link className='otherLink' to="/products">
                            <h2 className='textDecorationProduct'>Products</h2>
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
                    <Link className='forColorBlack' to="/category">
                        <h2>categories</h2>
                    </Link>
                    <Link className='forColorBlack' to="/other">
                        <h2>Brands</h2>
                    </Link>
                    <Link className=' categoriyesLinkBrands'>
                        <h2>subCategories</h2>
                    </Link>

                    <Button onClick={() => addSubCategorySyncModal()}>+ add New</Button>
                </div>
                <div className='divSubCategory'>

                    <Table sx={{ '& thead th:nth-child(1)': { width: '40%' } }}>
                        <thead>
                            <tr>
                                <th>Name</th>
                                <th>Actions</th>
                            </tr>
                        </thead>
                        <tbody>
                            {category?.data?.map((row) =>
                                row?.subCategories?.map(sub => (
                                    <tr key={sub.id}>
                                        <td>
                                            <p>{sub?.subCategoryName}</p>
                                        </td>
                                        <td>
                                            <button onClick={() => editSbuCategSync(sub)} className='btnDeleteProduct'>🖋️</button>
                                            <button onClick={() => deleteSubCateg(sub.id)} className='btnDeleteProduct'>🗑️</button>
                                        </td>
                                    </tr>
                                ))
                            )}
                        </tbody>
                    </Table>

                </div>
            </div>

            {addModalCategory && (
                <div className='divEditModalBrands'>
                    <p>Add subCaetgory</p>
                    <Input className='inputEditBrand' value={addSubCategory} onChange={(e) => setAddSubCategory(e.target.value)} placeholder="Brand Name" />
                    <Button onClick={() => addSubCategorySync(addSubCategory)} className='btndeletesubcategorySave' style={{ cursor: "pointer" }} variant="contained">Save</Button>
                    <Button onClick={() => setAddModalCategory(false)} className='btndeletesubcategory' style={{ cursor: "pointer" }} variant="contained">Cancel</Button>
                </div>
            )}
            {modalEditSubCategory && (
                <div className='divEditModalBrands'>
                    <p>Edit subCaetgory</p>
                    <Input className='inputEditBrand' value={editNameSubCategory} onChange={(e) => setEditNameSubCategory(e.target.value)} placeholder="Brand Name" />
                    <Button onClick={() => editSubCategoryVizov()} className='btndeletesubcategorySave' style={{ cursor: "pointer" }} variant="contained">Save</Button>
                    <Button onClick={() => setModalEditSubCategory(false)} className='btndeletesubcategory' style={{ cursor: "pointer" }} variant="contained">Cancel</Button>
                </div>
            )}




        </>
    )
}

export default SubCategory