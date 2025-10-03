import React, { useState } from 'react'
import FormControl from '@mui/joy/FormControl';
import FormLabel from '@mui/joy/FormLabel';
import Input from '@mui/joy/Input';
import axios from 'axios';
import { baseApi, saveToken } from '../app/token';
import { Link, useNavigate } from 'react-router-dom';
import Button from '@mui/joy/Button';
import { message, Space } from 'antd';
import { EyeInvisibleOutlined, EyeTwoTone } from '@ant-design/icons';
import { Button as ButtonAntd, Input as inputAntd } from 'antd';
import logoimage from '../assets/Group 1116606595 (3).png'
import '../animista.css'

const Login = () => {
    const navigate = useNavigate();
    const [variant, setVariant] = useState();
    const [messageApi, contextHolder] = message.useMessage();
    const [passwordVisible, setPasswordVisible] = React.useState(false);

    const errorLog = () => {
        messageApi.open({
            type: 'error',
            content: 'ваш парол неверно !',
        });
    };

    const successLogin = () => {
        messageApi.open({
            type: 'success',
            content: 'доброе пожаловать',
        });
    };

    
    async function loginUser(e) {
        e.preventDefault()
        const userName = e.target[0].value;
        const password = e.target[1].value;

        try {
            const { data } = await axios.post(`${baseApi}/Account/login`, {
                userName,
                password
            });
            successLogin();
            navigate("/dashboard")
            saveToken(data.data)
        } catch (error) {
            errorLog();
            console.log("error:", error);
        }
    }


    return (
        <>

            {contextHolder}

            <div className='fullDivLogin '>
                <div className='divImageLogo '>
                    <h2 className='blink-1'>Welcome to admin panel</h2>
                    <img className='bounce-top' src={logoimage} alt="" />
                </div>
                <div className='widthlogin'>
                    <div className='divLogIn'>
                        <h2>Log in </h2><br />
                        {/* <p>Enter your details below</p> */}
                        <form onSubmit={loginUser}>
                            <FormControl>
                                {/* <FormLabel>Email or phone number</FormLabel> */}
                                <Input name='userName' type='text' placeholder="Email" />
                            </FormControl>
                            <FormControl><br />
                                {/* <FormLabel>Password</FormLabel> */}
                                <inputAntd.Password iconRender={visible => (visible ? <EyeTwoTone /> : <EyeInvisibleOutlined />)} name='password' type='password' placeholder="Password" />
                            </FormControl><br />
                            <Link style={{ textDecoration: "none", marginBottom: "30px", marginLeft: "100px", color: "blue" }} className='signUpP' to="/Signup">Create Account</Link>
                            <Button className='' type='submit' size="md" variant={variant} color="primary">
                                Log in
                            </Button>
                        </form>

                    </div>
                </div>


            </div>

        </>
    )
}

export default Login;

