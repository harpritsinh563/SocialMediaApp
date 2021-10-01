
import { Link } from "react-router-dom";
import {useState,useContext} from 'react'
import { Context } from '../context/Context';
import React from 'react'

const Navbar = () => {
    const [searchTerm, setsearchTerm] = useState("")
    const {user,dispatch} = useContext(Context)
    const currId = user._id;
    const handleLogout = () => 
    {
        dispatch({type:"LOGOUT"})
        window.location.replace('/')
    }
    
    return (
        <>
            <nav className="navbar stiky-top navbar-dark bg-dark">
                <a className="navbar-brand" href="#">Navbar</a>
                <form className="form-inline my-2 my-lg-0">
                    <input className="form-control mr-sm-1" type="search" placeholder="Search" 
                            onChange={(e)=>setsearchTerm(e.target.value)} 
                            id="search" 
                            value={searchTerm} 
                            aria-label="Search" />
                    <button className="btn btn-outline-success my-2 my-sm-0"  type="submit"><Link to={`/searchProfile/${searchTerm}`} className="link" >Search</Link>
</button>
                </form>

            </nav>
        </>
    )
}

export default Navbar;