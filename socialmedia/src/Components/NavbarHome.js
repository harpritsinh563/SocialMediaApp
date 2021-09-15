import React, { useContext } from 'react';
import './NavbarHome.css';
import { Link } from "react-router-dom";
import {useState} from 'react'
import { Context } from '../context/Context';

const NavbarHome = () => {

    const [searchTerm, setsearchTerm] = useState("")
    const {user,dispatch} = useContext(Context)
    console.log(user)
    const currId = user._id;
    console.log(currId)
    const handleLogout = () => 
    {
        dispatch({type:"LOGOUT"})
        window.location.replace('/')
    }
    return (
        <>
            <div className="navbar">
                <div className="navleft">
                    <div className="logo"> <i className="fab fa-speakap fa-2x"></i> </div>
                    <div className="title">Snapbook</div>
                </div>

                <div className="navcenter">
                    <form id="form">
                        <input 
                            className="input_search" 
                            type="search" 
                            onChange={(e)=>setsearchTerm(e.target.value)} 
                            id="search" 
                            value={searchTerm} 
                            placeholder="Search..." 
                        />

                        <Link to={`/searchProfile/${searchTerm}`} ><button className="btn_search"  ><i className="fa fa-search"></i></button></Link>

                    </form>
                </div>
                <div className="dropdown navright">
                    <img className="nav_img" id="profile"
                        src="https://picsum.photos/200">
                    </img>
                    <div className="dropdown-content">
                        <Link className='link itemHover' to="/userProfile" > Profile  </Link>
                        <Link className='link itemHover' to={`/likedPosts/${currId}`} > Liked  </Link>
                        <Link className='link itemHover' to={`/savedPosts/${currId}`} > Saved  </Link>
                        <a href="#"> Settings </a>
                        <hr />
                        <a onClick={handleLogout}> LOGOUT </a>
                    </div>
                </div>
            </div>
        </>
    );
};

export default NavbarHome;