import React, { useContext,useEffect } from 'react';
import './NavbarHome.css';
import { Link } from "react-router-dom";
import {useState} from 'react'
import { Context } from '../context/Context';
import AddPost from './AddPost';
import Messenger from './Messenger';
import axios from 'axios'

const NavbarHome = () => {

    const [searchTerm, setsearchTerm] = useState("")
    const [result, setresult] = useState([])
    const [suggestion, setsuggestion] = useState([])
    const {user,dispatch} = useContext(Context)
    const currId = user._id;
    const publicfolder = "http://localhost:5000/Images/"
    
    useEffect(() => {
        const loadUsers = async() => {
            const res = await axios.get('/user/')
            setresult(res.data)
        }
        loadUsers();
    }, [])

    const handleLogout = () => 
    {
        dispatch({type:"LOGOUT"})
        window.location.replace('/')
    }
    const handleSubmit=()=>{
        window.location.replace("/searchProfile/"+searchTerm)
    }
    
    const handleChange = (e) =>{
        let matches=[]
        if(e.target.value.length > 0)
        {
            matches = result.filter(u=>{
                const regex = new RegExp(`${e.target.value}`,"i");
                return u.userName.match(regex)
            })
        }
        setsuggestion(matches);
        setsearchTerm(e.target.value)
    }

    const handleClick = (text) => {
        setsearchTerm(text)
        setsuggestion([])
    }

    return (
        <>
            <div className="navbar">
                <div className="navleft">
                    <div className="logo"> <i className="fab fa-speakap fa-2x"></i> </div>
                    <div className="title"><Link to="/home" className="nav_title"> Snapbook </Link></div>
                </div>
                <div className="navcenter">

                <div className="dropdown search_suggestions">
                            <input 
                                className="input_search" 
                                type="search" 
                                onChange={(e)=>handleChange(e)} 
                                id="search" 
                                value={searchTerm} 
                                placeholder="Search..." 
                            />
                            <button onClick={handleSubmit} className="btn_search"><i className="fa fa-search"></i></button>
                    <div className="dropdown-content1">
                        {suggestion.length > 0 && suggestion.map((s,i)=>(
                            <div className="suggestion" key={i} onClick={()=>handleClick(s.userName)}> {s.userName} </div>
                        ))}
                    </div>
                    </div>
                
                </div>
                <div className="addPost">
                   <Link className="link" to="/AddPost"> <i className="fas icon fa-plus-square"></i> </Link>
                    <Link to="/Messenger" className="link"> <i className="fas icon fa-comments"></i> </Link>
                </div>

                <div className="dropdown navright">
                    <img className="nav_img" id="profile"
                        src={publicfolder+user.profilepic}>
                    </img>
                    <div className="dropdown-content">
                        <Link className='link itemHover' to={`/userProfile/${currId}`} > Profile  </Link>
                        <Link className='link itemHover' to={`/likedPosts/${currId}`} > Liked  </Link>
                        <Link className='link itemHover' to={`/savedPosts/${currId}`} > Saved  </Link>
                        <hr />
                        <a className="itemHover" style={{cursor:"pointer"}} onClick={handleLogout}> LOGOUT </a>
                    </div>
                </div>
            </div>
        </>
    );
};

export default NavbarHome;