import React from 'react'
import NavbarHome from './NavbarHome';
import PrintPosts from './PrintPosts';
import './ViewPosts.css'
const ViewPosts = () => {
    return (
        <>
        <NavbarHome/>
        <div className = 'ViewPosts'>
            <div className = 'Title'>
                Liked
            </div>
            <PrintPosts/>
            

          
        </div>
        </>
    )
}

export default ViewPosts;

