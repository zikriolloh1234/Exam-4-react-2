import React, { useEffect, useState } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { addCategoryAsync, deleteCategoryAsync, editCategoryAsync, getCategory } from '../../features/api';
import logoImage from '../../assets/Group 1116606595 (3).png'

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
import { baseApi } from '../../app/token';
const onSearch = (value, _e, info) => console.log(info?.source, value);

const Categories = () => {

    const dispatch = useDispatch();
    const { category } = useSelector((state) => state.category);
    const [login, setLogin] = React.useState('');
    const [addCategoryModal, setAddCategoryModal] = useState();
    const [categoryName, setCategoryName] = useState();
    const [addImageCateg, setAddImageCateg] = useState();

    const [editNameCtg, setEditNameCtg] = useState();
    const [editId, setEditId] = useState(null);
    const [editImageCtg, setEditImageCtg] = useState(null);
    const [editModal, setEditModal] = useState(false);
    const [editImageFile, setEditImageFile] = useState(null);

    const [searchTerm, setSearchTerm] = React.useState("");


    const products = category?.data || [];
    const SearchData = products?.filter((item) =>
        item?.categoryName?.toLowerCase().includes(searchTerm?.toLowerCase())
    );


    console.log("data:", category);
    const handleChange = (event) => {
        setLogin(event.target.value);
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

    function addCategorySync() {
        const formDataAdd = new FormData();
        formDataAdd.append("categoryName", categoryName);
        formDataAdd.append("categoryImage", addImageCateg[0]);

        dispatch(addCategoryAsync(formDataAdd))
        setAddCategoryModal(false);
    }

    function deleteCategory(id) {
        dispatch(deleteCategoryAsync(id));
    }

    function editCategory(category) {
        setEditId(category.id);
        setEditImageCtg(category.categoryImage);
        setEditNameCtg(category.categoryName);
        setEditImageFile(null)
        setEditModal(true);
    }


    function editSaveSync(e) {
        e.preventDefault();

        dispatch(editCategoryAsync({
            id: editId,
            categoryImage: editImageFile,
            categoryName: editNameCtg,
        }));

        setEditModal(false);
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
                            value={login}
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
                    <div style={{ gap: "40px" }} className='saidbarHome'>
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
                    <Link className='categoriyesLinkBrands' to="/category">
                        <h2>categories</h2>
                    </Link>
                    <Link className='forColorBlack' to="/other">
                        <h2>Brands</h2>
                    </Link>
                    <Link className='forColorBlack' to="/subCategory">
                        <h2>subCategories</h2>
                    </Link>
                    <div className='inputSearchCategory'>
                        <Input onChange={(e) => setSearchTerm(e.target.value)}
                            placeholder='Search Product'></Input>
                    </div>
                    <Button onClick={() => setAddCategoryModal(true)}>add Category</Button>
                </div>


                <div className='CategoryDivForUiFlex'>
                    {SearchData?.map((category) => (
                        <div className='categoryDivForUi' key={category.id}>
                            <h3>{category.categoryName}</h3>
                            <img
                                src={`${baseApi}/images/${category.categoryImage}`}
                                width={"50px"}
                                height={"50px"}
                                style={{
                                    borderRadius: "5px"
                                }}
                                alt="" />
                            <Button className='btnEditSaveCategory' onClick={() => deleteCategory(category.id)}>❌</Button>
                            <Button className='btnEditSaveCategory' onClick={() => editCategory(category)}>🖋️</Button>
                        </div>
                    ))}
                </div>
            </div>

            {addCategoryModal && (
                <div style={{ height: "220px" }} className='divEditModalBrands'>
                    <p>Add Category</p>
                    <Input className='inputEditBrand' value={categoryName} onChange={(e) => setCategoryName(e.target.value)} placeholder="Category Name" /> <br /><br />
                    <Input className='inputEditBrand' type='file' onChange={(e) => setAddImageCateg(e.target.files)} />
                    <button variant="contained" className='btnCancelBrand' onClick={() => setAddCategoryModal(false)}>Cancel</button>
                    <button onClick={() => addCategorySync()} className='btnCancelBrandSave ' style={{ cursor: "pointer" }} variant="contained">Save</button>
                </div>
            )}


            {editModal && (
                <div style={{ height: "260px" }} className='divEditModalBrands'>
                    <p>Edit Category</p>
                    <form onSubmit={editSaveSync} action="">
                        {/* Имя категории */}
                        <Input
                            className='inputEditBrand'
                            value={editNameCtg}
                            onChange={(e) => setEditNameCtg(e.target.value)}
                            placeholder="Category Name"
                        />
                        <br /><br />

                        {/* Покажем текущую картинку */}
                        {editImageCtg && (
                            <img
                                src={`${baseApi}/images/${editImageCtg}`}
                                alt="Preview"
                                width="60"
                                height="60"
                                style={{ borderRadius: "5px", marginTop: "30px" }}
                            />
                        )}

                        {/* Выбор новой картинки */}
                        <input
                            className='inputEditBrand'
                            type='file'
                            onChange={(e) => setEditImageFile(e.target.files)}
                        />
                        <div style={{ display: "flex", gap: "20px", placeItems: "" }}>
                            <button
                                style={{ marginTop: "30px" }}
                                className='btnCancelBrand'
                                variant="contained"
                                type='button'
                                onClick={() => setEditModal(false)}
                            >
                                Cancel
                            </button>
                            <button
                                type='submit'
                                variant="contained"
                                className='btnCancelBrandSave'
                                style={{ cursor: "pointer", marginTop: "30px" }}
                            >
                                Save
                            </button>
                        </div>
                    </form>
                </div>
            )}






        </>
    )
}

export default Categories