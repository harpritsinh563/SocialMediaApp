import React from 'react';
import './NavbarHome.css';
import {Link} from "react-router-dom";



const Home = () => {
    return (
        <>
            <div className="navbar">
                <div className="navleft">
                    <div className="logo"> <i className="fab fa-speakap fa-2x"></i> </div>
                    <div className="title">Snapbook</div>
                </div>

                <div className="navcenter">
                    <form id="form">
                        <input className="input_search" type="search" id="search" placeholder="Search..." />
                        <button className="btn_search"><i class="fa fa-search"></i></button>
                    </form>
                </div>
                
                    <div className="dropdown navright">
                        <img className="nav_img" id="profile"
                    src="https://images.unsplash.com/photo-1622698639855-fda2a55e0cbe?ixid=MnwxMjA3fDB8MHx0b3BpYy1mZWVkfDJ8Ym84alFLVGFFMFl8fGVufDB8fHx8&ixlib=rb-1.2.1&auto=format&fit=crop&w=500&q=60">
                </img>
                        <div className="dropdown-content">
                            <Link to="/userProfile" > Profile  </Link> 
                            <a href="#"> Saved </a>
                            <a href="#"> Settings </a>
                            <hr/>
                            <a href="#"> Log-outttt</a>
                        </div>
                    </div>
            </div>
        </>
    );
};

export default Home;