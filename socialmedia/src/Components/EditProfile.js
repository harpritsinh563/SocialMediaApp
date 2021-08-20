import React from 'react'
import Navbar from './Navbar'
import {Link} from 'react-router-dom'

export const EditProfile = () => {
    return (
        <div>
            <Navbar/>
        <div className="container">
            <div className="box">
                Update!<br/><br/><br/>
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
                <button className="signupbutton"  >Update!</button><br /><br />
            </div>
        </div>
        </div>
    )
}

export default EditProfile
