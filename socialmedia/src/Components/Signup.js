import React, { useState, useEffect } from 'react';
import './signup.css';
import { Link } from "react-router-dom";
import Navbar from './Navbar';
import axios from 'axios';
import { ToastContainer, toast } from 'react-toastify';
import { Button, TextField,Radio , RadioGroup, FormControlLabel } from '@material-ui/core';

const Signup = () => {
    const [name, setName] = useState("")
    const [uname, setUname] = useState("")
    const [age, setAge] = useState(0)
    const [phone, setPhone] = useState("")
    const [email, setEmail] = useState("")
    const [pass, setPass] = useState("")
    const [Repass, setRepass] = useState("")
    const [gender, setGender] = useState("")
    const publicfolder = "http://localhost:5000/Images/"
    const handleSubmit = async (e) => {
        e.preventDefault()
        try {
            if (pass != Repass) {
                toast.error('Passwords do not match', {
                    position: "top-center",
                    autoClose: 5000,
                    hideProgressBar: false,
                    closeOnClick: true,
                    pauseOnHover: true,
                    draggable: true,
                    progress: undefined,
                });
            } else {
                const newUser = {
                    userName: uname,
                    contact: phone,
                    age: age,
                    name: name,
                    password: pass,
                    email: email,
                    gender: gender,
                    profilepic: "AVATAR.png",
                }
                const user = await axios.post(`auth/register`, newUser)
                if (user.status == 200) {
                    if (user.data == "signUp failed") {
                        toast.error('Username or email already exists', {
                            position: "top-center",
                            autoClose: 5000,
                            hideProgressBar: false,
                            closeOnClick: true,
                            pauseOnHover: true,
                            draggable: true,
                            progress: undefined,
                        });
                    } else {
                        window.location.replace('/')
                    }
                }
            }
        } catch (err) {
            console.log(err.message)
        }
    }

    return (
        <>
            {/* <Navbar /> */}
            <div className="container2">
                <div className="box"><h2>SignUp!! </h2>
            
                    <form onSubmit={(e) => handleSubmit(e)} >
                        <div>
                            <ToastContainer></ToastContainer>
                        </div>
                        <TextField
                            type="text"  label="Enter Name" required onChange={(e) => setName(e.target.value)}>
                        </TextField> <br />
                        <TextField
                            type="text"  label="Enter Number" required onChange={(e) => setPhone(e.target.value)} >
                        </TextField> <br />
                        <TextField
                            type="text"  label="Enter Age" required onChange={(e) => setAge(e.target.value)} >
                        </TextField> <br />
                        <div className="radiobuttons">
                            <RadioGroup row> 
                                <FormControlLabel  value="male" control={<Radio />} label="Male" />
                                <FormControlLabel  value="female" control={<Radio />} label="Female" />
                            </RadioGroup>
                        </div>
                        {/* <TextField
                            type="radio" id="male" value="male" name="gender" required onChange={(e) => setGender(e.target.value)} > Male
                        </TextField>
                        <TextField
                            type="radio" id="female" name="gender" required onChange={(e) => setGender(e.target.value)} >Female
                        </TextField> <br /> */}
						{/*
							<input type="radio" id="male" value="Male" name="gender" required onChange={(e)=>setGender(e.target.value)} />Male
							<input type="radio" id="female" value="Female" name="gender" required  onChange={(e)=>setGender(e.target.value)} />Female
						*/}
                        <TextField
                            type="text"  label="Enter Username" required onChange={(e) => setUname(e.target.value)}>
                        </TextField> <br />
                        <TextField
                            type="email"  label="Enter email" required onChange={(e) => setEmail(e.target.value)}>
                        </TextField> <br />
                        <TextField
                            type="password"  label="Enter Password" required onChange={(e) => setPass(e.target.value)}>
                        </TextField> <br />
                        <TextField
                            type="password"  label="Confirm Password" required onChange={(e) => setRepass(e.target.value)}>
                        </TextField> <br />
                        <br />

                        <Button variant="contained" color="primary" type="submit" className="signupbutton" >Signup!</Button><br /><br />
                        <Button variant="contained" color="success" className="signupbutton" ><Link to="/" className="link">Log in </Link></Button><br /><br />
                        
                    </form>

                </div>
            </div>
        </>
    );
}
export default Signup;