import React from 'react'
import logoImage from '../assets/Group 1116606595 (3).png'
import { Button as ButtonAntd, Input as inputAntd } from 'antd';
const { Search } = inputAntd;
import NotificationsNoneSharpIcon from '@mui/icons-material/NotificationsNoneSharp';
import HomeOutlinedIcon from '@mui/icons-material/HomeOutlined';
import { BarsOutlined } from "@ant-design/icons";
import { FolderOutlined } from "@ant-design/icons";
import { Link, NavLink } from 'react-router-dom';

const onSearch = (value, _e, info) => console.log(info?.source, value);


const Navbar = () => {
    return (
        <>
            <div className='navbar'>
                <div className='navbarLogo'>
                    <img src={logoImage} alt="" />
                    <Search enterButton className='searchInputAntd' placeholder="input search text" onSearch={onSearch} style={{ width: 200 }} />
                </div>
                <div className='navbarNotification'>
                    <NotificationsNoneSharpIcon style={{ color: "white" }} />
                    <p>text</p>
                </div>
            </div>

            <div className='saidbarfixed'>
                <div className='saidbar'>
                    <div className='saidbarHome'>
                        <HomeOutlinedIcon />
                        <NavLink to="/dashboard" className='otherLink'>
                            <h2>Dashboard</h2>
                        </NavLink>
                    </div>
                    <div className='saidbarHome'>
                        <BarsOutlined className='barsOutlined' />
                        <h2>Dashboard</h2>
                    </div>
                    <div className='saidbarHome'>
                        <BarsOutlined className='barsOutlined' />
                        <h2>Dashboard</h2>
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