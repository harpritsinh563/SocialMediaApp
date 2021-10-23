import React from 'react'
import PostTop from './PostTop'
import axios from 'axios'
import { useState, useEffect } from 'react'
import './Comment.css'
import {format} from "timeago.js"


const Comment = ({ comment }) => {
    const [user, setuser] = useState({})

    useEffect(() => {
        const fetchPost = async () => {
            try {
                const currUser = await axios.get(`/user/${comment.userId}`)
                setuser(currUser.data)
            }
            catch (err) {

            }
        }
        fetchPost()

    }, [])

    return (
        <>
            <div className="comment">
                <PostTop user = {user}/>
                
                <div className="caption">
                    <h4>{comment.comment}</h4>
                </div>
                {format(comment.createdAt)}

            </div>
        </>
    )
}

export default Comment
