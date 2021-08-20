import React from 'react'
import NavbarHome from './NavbarHome'
import './UserFriends.css'
import Friend from './Friend'

const UserFriends = () => {
    return (
        <>
        <NavbarHome/>
        <div className='Container'>
        <div className="title_Friend">Friends</div>
        <div className='Friends'>
            
        <Friend/>
        <Friend/>
        <Friend/>
        <Friend/>
        <Friend/>
        <Friend/>
        <Friend/>
        <Friend/>


        </div>
        </div>
        </>
    )
}

export default UserFriends
