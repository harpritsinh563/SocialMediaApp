import React from 'react';
import './login.css';
import {Link} from 'react-router-dom';
import Navbar from './Navbar';

const Submit = () => {
    window.location.href='/home';
    // window.location.replace('http://localhost:3000/')
}

const Login = () => {
    return (     
        <>
        <Navbar/>
        <div className="container">
            <div className="login_box">
                LOGIN!<br/><br/>
                <input className="login_input" type="text" placeholder="Enter Username" /><br/>
                <input className="login_input" type="password" placeholder="Enter Password"/><br/>
                <input id="remember" type="checkbox"/> 
                <label for="remember">  Remember me</label>
                <br/>    <br/>
                <button className="loginbutton" onClick={Submit}>LOGIN!</button><br />
                <p style={{marginTop:"15px"}}>New User ?? <Link to="Signup" >Click here</Link></p>
            </div>
        </div>
        </>
    )
}

export default Login;
