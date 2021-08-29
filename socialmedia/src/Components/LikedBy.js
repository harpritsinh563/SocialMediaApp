import React from 'react'
import "./LikedBy.css"
import Friend from "./Friend"
import { useState, useEffect } from 'react'
import axios from 'axios'
import { useLocation } from 'react-router'

//612772bcd7941bae1cd87855

const LikedBy = () => {

    const location = useLocation()
    const path = location.pathname.split('/')[2]
    const [likedBy, setlikedBy] = useState([])

    // console.log(path)

    useEffect(() => {
        const fetchLikedBy = async () => {
            try {
                console.log(path)
                const likes = await axios.get(`/post/${path}`)
                // console.log(likes)
                console.log("aaaaa")
                setlikedBy(likes.data.likedBy)
            } catch (err) {
                console.log(err)
            }
        }
        fetchLikedBy()
    }, [])

    // console.log(likedBy)

    return (
        <>
            <div className='Container'>
                <div className="title_user">Liked By</div>
                <div className='Users'>
                    {likedBy.map((f) => (
                        <Friend friend={f} />
                    ))}
                </div>
            </div>
        </>
    )
}

export default LikedBy
