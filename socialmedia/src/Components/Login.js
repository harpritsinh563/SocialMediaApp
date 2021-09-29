import React, { useContext, useState } from 'react';
import './login.css';
import { Link } from 'react-router-dom';
import Navbar from './Navbar';
import axios from 'axios';
import { Context } from '../context/Context';
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import {Button,TextField} from '@material-ui/core';

const Login = () => {

    const [username, setusername] = useState("");
    const [password, setpassword] = useState("");
    const [fetcheduser, setfetcheduser] = useState({})

    const { dispatch } = useContext(Context)

    const handleSubmit = (e) => {
        e.preventDefault();
        let status, fetched;
        const fetchUser = async () => {
            try {
                fetched = await axios.post("auth/login", { userName: username, password: password });
                setfetcheduser(fetched.data)
                status = fetched.status

                console.log(fetched+"\n"+status);

                if (status == 200){
                    if (fetched.data == "User not found"){
                        toast.error('Incorrect Username', {
                            position: "top-center",
                            autoClose: 5000,
                            hideProgressBar: false,
                            closeOnClick: true,
                            pauseOnHover: true,
                            draggable: true,
                            progress: undefined,
                        });
                    }
                    else if (fetched.data == "Wrong password") {
                        toast.error('Please enter correct password', {
                            position: "top-center",
                            autoClose: 5000,
                            hideProgressBar: false,
                            closeOnClick: true,
                            pauseOnHover: true,
                            draggable: true,
                            progress: undefined,
                        });
                        
                    }
                    else if (!fetched.data.confirmed) {
                        
                        toast.error('Please verify email to login', {
                            position: "top-center",
                            autoClose: 5000,
                            hideProgressBar: false,
                            closeOnClick: true,
                            pauseOnHover: true,
                            draggable: true,
                            progress: undefined,
                        });
                    }
                    else {
                        dispatch({ type: "LOGIN", payload: fetched.data })
                        window.location.replace('/home')
                    }
                } 

            }
            catch (err) {
                console.log(err.message);
            }

        }
        fetchUser();

    }
    return (
        <>
            <Navbar />
            <div className="container">
                <div className="login_box"><br /><br />
                    <form onSubmit={(e) => handleSubmit(e)}>
                        <div>
                            <ToastContainer></ToastContainer>
                        </div>
                        
                        <TextField  
                            variant="outlined"    
                            required value={username} 
                            onChange={(e) => setusername(e.target.value)} 
                            label="Enter Username"> 
                        </TextField> <br /> <br/>
                        <TextField 
                            variant="outlined"    
                            required value={password} 
                            onChange={(e) => setpassword(e.target.value)} 
                            type="password" 
                            label="Enter Password" > 
                        </TextField>
                        
                        <br /><br />
                        <Button variant='contained' color="primary"  type="submit" className="loginbutton">LOGIN!</Button>
                        <br />
                        <br />
                        {/* <p style={{ marginTop: "15px" }}>New User ?? <Link to="Signup" >Click here</Link></p> */}
                        <Link to="Signup" >Sign Up</Link>
                    </form>
                </div>
            </div>
        </>
    )
}

export default Login;
