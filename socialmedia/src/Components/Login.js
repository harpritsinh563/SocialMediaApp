import React from 'react'
import './login.css'
const Login = () => {
    return (
        <div className="container">
            <div className="box">
                LOGIN!<br/><br/><br/>
                <input type="text" placeholder="Enter Username"/><br/>
                <input type="password" placeholder="Enter Password"/><br/>
                <input id="remember" type="checkbox"/> 
                <label for="remember">  &nbsp;&nbsp;Remember me</label>
                <br/>    <br/>
                <button className="loginbutton">LOGIN!</button>
            </div>
        </div>
    )
}

export default Login;
