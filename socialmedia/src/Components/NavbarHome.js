import React, { useContext } from 'react';
import './NavbarHome.css';
import { Link } from "react-router-dom";
import {useState} from 'react'
import { Context } from '../context/Context';
import AddPost from './AddPost';
import Messenger from './Messenger';


const NavbarHome = () => {

    const [searchTerm, setsearchTerm] = useState("")
    const {user,dispatch} = useContext(Context)
    const currId = user._id;
    const handleLogout = () => 
    {
        dispatch({type:"LOGOUT"})
        window.location.replace('/')
    }
    const handleSubmit=()=>{
        window.location.replace("/searchProfile/"+searchTerm)
    }

    return (
        <>
            <div className="navbar">
                <div className="navleft">
                    <div className="logo"> <i className="fab fa-speakap fa-2x"></i> </div>
                    <div className="title">Snapbook</div>
                </div>

                <div className="navcenter">
                    {/* <form id="form"> */}
                        <input 
                            className="input_search" 
                            type="search" 
                            onChange={(e)=>setsearchTerm(e.target.value)} 
                            id="search" 
                            value={searchTerm} 
                            placeholder="Search..." 
                        />

                        <button onClick={handleSubmit} className="btn_search"><i className="fa fa-search"></i></button>

                    {/* </form> */}
                </div>
                <div className="addPost">
                   <Link className="link" to="/AddPost"> <i className="fas fa-plus-square"></i> </Link>
                    <Link to="/Messenger" className="link"> <i className="fas fa-comments"></i> </Link>
                </div>

                <div className="dropdown navright">
                    <img className="nav_img" id="profile"
                        src="https://picsum.photos/200">
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