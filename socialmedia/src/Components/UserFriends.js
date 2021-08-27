import React from 'react'
import NavbarHome from './NavbarHome'
import './UserFriends.css'
import Friend from './Friend'
import { useState, useEffect } from 'react'
import axios from 'axios'

const UserFriends = () => {
    
    const currId="61275e11f0201774782ba0cd"

    const [friends, setfriends] = useState([])
    useEffect(() => {
        const fetchFriends = async()=>{
            try{
                const user = await axios.get(`user/${currId}`)
                setfriends(user.data.friends)
            }
            catch(err){} 
        }
        fetchFriends()
    }, [])
    console.log(friends)
    return (
        <>
        <NavbarHome/>
        <div className='Container'>
            <div className="title_Friend">Friends</div>
            <div className='Friends'>
                {friends.map((f)=>(
                    <Friend friend={f}/>
                ))}
            </div>
        </div>
        </>
    )
}

export default UserFriends
