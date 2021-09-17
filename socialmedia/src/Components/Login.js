import React,{useContext, useState} from 'react';
import './login.css';
import {Link} from 'react-router-dom';
import Navbar from './Navbar';
import axios from 'axios';
import { Context } from '../context/Context';
import {toast,ToastContainer} from 'react-toastify'
import "react-toastify/dist/ReactToastify.css"


const Login = () => {

    const [username, setusername] = useState("");
    const [password,setpassword]=useState("");
    const [fetcheduser,setfetcheduser]=useState({})
    const [loginError,setLoginError] = useState(false)
    const [passError,setPassError] = useState(false)
    
    const {dispatch}=useContext(Context)

    const handleSubmit = (e) =>
    {
        e.preventDefault();
        let status,fetched;
        const fetchUser = async() =>
        {
            try
            {
                fetched =  await axios.post("auth/login",{userName:username,password:password});
                setfetcheduser(fetched.data)
                status =  fetched.status
                
                if(status == 200)
                {    
                    if(fetched.data == "Wrong password")
                    {
                        setPassError(true)
                        toast("Please enter correct password",{
                            position : toast.POSITION.TOP_CENTER
                        })
                    }
                    else if(!fetched.data.confirmed)
                    {
                        setLoginError(true)
                        toast("Please verify email to login",{
                            position : toast.POSITION.TOP_CENTER
                        })
                    }
                    else 
                    {
                        dispatch({type : "LOGIN",payload:fetched.data})  
                        window.location.replace('/home') 
                    }
                }

                // console.log(typeof(fetched.data))

            }
            catch(err)
            {
                console.log(err.message);
            }
         
        }
        fetchUser();
        
    }
    return (     
        <>
        <Navbar/>
        <div className="container">
            <div className="login_box">LOGIN!<br/><br/>
            <span><h3> {passError && ` Please enter correct password `}</h3> </span>
            <span><h3> {loginError && ` Please verify email to login `} </h3></span>

            <form onSubmit={(e) => handleSubmit(e)}>
                <input className="login_input" value={username} onChange={(e)=>setusername(e.target.value)} type="text" placeholder="Enter Username" /><br/>
                <input className="login_input" value={password} onChange={(e)=>setpassword(e.target.value)} type="password"  placeholder="Enter Password"/><br/>
                <input id="remember" type="checkbox"/> 
                <label for="remember">Remember me</label>
                <br/><br/>
                <button type="submit" className="loginbutton">LOGIN!</button><br />
                <p style={{marginTop:"15px"}}>New User ?? <Link to="Signup" >Click here</Link></p>
            </form>
            </div>
        </div>
        </>
    )
}

export default Login;
