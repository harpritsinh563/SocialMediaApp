import React from 'react'
import './navbar.css'

const Navbar = () => {
    
    return (
        <>
        <div className="navbar">
            <div>
                <div className="left" style={{float:"left" , marginLeft: "2vw" }}><i className="fab fa-speakap fa-2x"></i></div>
                <div style={{float:"left",marginLeft:"15px",marginTop:"7px"}} className="title">Snapbook</div>
            </div>
    
            {/* <div>
                <i className="fab fa-speakap fa-2x logo"></i>
                <span className="title">SNAPBOOK</span> 
            </div> */}
    
           <ul>
                <li>About</li>
                <li>Contact</li>    
                <li>Logout</li>
            </ul>
        </div>
        </>
    )
}

export default Navbar
