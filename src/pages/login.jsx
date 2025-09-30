import React, { useState } from 'react'
import FormControl from '@mui/joy/FormControl';
import FormLabel from '@mui/joy/FormLabel';
import Input from '@mui/joy/Input';
import axios from 'axios';
import { baseApi, saveToken } from '../app/token';
import { Link, useNavigate } from 'react-router-dom';
import Button from '@mui/joy/Button';



const Login = () => {
    const navigate = useNavigate();
    const [variant, setVariant] = useState();

    async function loginUser(e) {
        e.preventDefault()
        const userName = e.target[0].value;
        const password = e.target[1].value;

        try {
            const { data } = await axios.post(`${baseApi}/Account/login`, {
                userName,
                password
            });
            navigate("/Home")
            saveToken(data.data)
        } catch (error) {
            console.log("error:", error);
        }
    }




    return (
        <>

            <div className='divLogIn'>
                <h2>Log in to Exclusive</h2>
                <p>Enter your details below</p>
                <form onSubmit={loginUser}>
                    <FormControl>
                        <FormLabel>Email or phone number</FormLabel>
                        <Input name='userName' type='text' placeholder="Email or Phone Number" />
                    </FormControl>
                    <FormControl><br />
                        <FormLabel>Password</FormLabel>
                        <Input name='password' type='password' placeholder="Password" />
                    </FormControl><br />
                    <Link style={{ textDecoration: "none", marginBottom: "30px", marginLeft: "100px" }} className='signUpP' to="/Signup">Create Account</Link>
                    <Button type='submit' size="md" variant={variant} color="danger">
                        Log in
                    </Button>
                </form>

            </div>

        </>
    )
}

export default Login;

