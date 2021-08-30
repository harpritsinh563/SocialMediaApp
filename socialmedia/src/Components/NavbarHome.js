import React from 'react';
import './NavbarHome.css';
import { Link } from "react-router-dom";
import {useState} from 'react'

const Home = () => {

    const [searchTerm, setsearchTerm] = useState("")
    // console.log(searchTerm)

    /*const getSearchProfile = async () => {
        const profile =  await axios.post(`user/searchProfile`,{searchTerm})
        console.log(profile)   
    }
    getSearchProfile() */
    // const currId = "61275e11f0201774782ba0cd"
    const currId = "61275e38f0201774782ba0cf"
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
                        <a href="#"> Logout</a>
                    </div>
                </div>
            </div>
        </>
    );
};

export default Home;