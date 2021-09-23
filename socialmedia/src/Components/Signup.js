import React , {useState,useEffect} from 'react';
import './signup.css';
import { Link } from "react-router-dom";
import Navbar from './Navbar';
import axios from 'axios';


const Signup = () => {

    const [name,setName] = useState("")
    const [uname,setUname] = useState("")
    const [age,setAge] = useState(0)
    const [phone,setPhone] = useState("")
    const [email, setEmail] = useState("")
    const [pass, setPass] = useState("")
    const [Repass, setRepass] = useState("")
    const [gender,setGender] = useState("")
    const publicfolder="http://localhost:5000/Images/"
    const handleSubmit = async (e) => {
        e.preventDefault()
        try{
            const newUser = {
                userName: uname,
                contact:  phone,
                age: age,
                name: name,
                password : pass,
                email : email,
                gender : gender,
                profilepic :"AVATAR.png",
            }
            const user = await axios.post(`auth/register`,newUser)
            window.location.replace('/')
        }catch(err){
            console.log(err.message)
        }
    }

    return(
        <>
        <Navbar/>
        <div className="container">
            <div className="box">
                Signup!<br/><br/><br/>
                <input type="text" placeholder="Enter Name" onChange={(e)=>setName(e.target.value)} /><br/>
                <input type="text" placeholder="Enter Number" onChange={(e)=>setPhone(e.target.value)}/><br/>
                <input type="text" placeholder="Enter Age" onChange={(e)=>setAge(e.target.value)}/><br/>
                <input type="radio" id="male" value="Male" name="gender" onChange={(e)=>setGender(e.target.value)}/>Male
                <input type="radio" id="female" value="Female" name="gender" onChange={(e)=>setGender(e.target.value)}/>Female
                {/* <input type="radio" id ="Male" name="Gender" value="Male"/>MALE */}
                {/* <label for="Male">Male</label> */}
                {/* <input type="radio" id ="Female" name="Gender" value="Female"/>FEMALE */}
                {/* <label for="Female">Female</label><br/> */}<br />
                <input type="text" placeholder="Enter Username" onChange={(e)=>setUname(e.target.value)}/><br/>
                <input type="email" placeholder="Enter email" onChange={(e)=>setEmail(e.target.value)}/><br/>
                <input type="password" placeholder="Enter Password" onChange={(e)=>setPass(e.target.value)}/>
                <input type="password" placeholder="Confirm Password" onChange={(e)=>setRepass(e.target.value)}/>
                <br/>    <br/>
                <button type="submit" className="signupbutton" onClick={(e)=>handleSubmit(e)} >Signup!</button><br /><br />
                Already a User ? <Link to="/">Click here</Link>
                
            </div>
        </div>
        </>
    );
}

export default Signup;