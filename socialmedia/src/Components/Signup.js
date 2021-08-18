import React from 'react';
import './signup.css';
import Login from './Login';
import { Link } from "react-router-dom";
import { browserHistory } from 'react-router';

const Submit = () => {
    window.location.href='/'
    // window.location.replace('http://localhost:3000/')
}


const Signup = () => {
    return(
        <div className="container">
            <div className="box">
                Signup!<br/><br/><br/>
                <input type="text" placeholder="Enter Name" /><br/>
                <input type="text" placeholder="Enter Number"/><br/>
                <input type="text" placeholder="Enter Age"/><br/>
                <input type="radio" id ="Male" name="Gender"/>
                <label for="Male">Male</label>
                <input type="radio" id ="Female" name="Gender"/>
                <label for="Female">Female</label><br/>
                <input type="text" placeholder="Enter Username"/><br/>
                <input type="password" placeholder="Enter Password"/>
                <br/>    <br/>
                <button className="signupbutton" onClick={Submit} >Signup!</button><br /><br />
                Already a User ? <Link to="/">Click here</Link>
            </div>
        </div>
    );
}

export default Signup;