import React from 'react'
import './ViewPost.css'
import NavbarHome from './NavbarHome'
import { useLocation } from 'react-router'
import axios from 'axios'
import { useState,useEffect } from 'react'
import PostTop from './PostTop'
import Comment from './Comment'

const ViewPost = () => {  
    const location = useLocation()
    const postId = location.pathname.split('/')[2]
    const [post, setpost] = useState({})
    const [user, setuser] = useState({})
    const [comment, setcomment] = useState([])
    useEffect(() => {
        const fetchPost = async() =>{
            try{
                const currPost = await axios.get(`/post/${postId}`)
                setpost(currPost.data)
                const currId = currPost.data.userId
                const currUser = await axios.get(`/user/${currId}`)
                setuser(currUser.data)
                const comments = await axios.get(`/comment/${postId}`)
                setcomment(comments.data)
            }
            catch(err){

            }
        }
        fetchPost()
    
    }, [])
    console.log(post)
    return (

        <>
        <NavbarHome/> 
        <div className="Container">
            
        <div className = "Post">
            <div className= "LeftComponent">
                <img src= {post.photo} alt="" className="postImg" />

            </div>
            <div className= "RightComponent">
                <PostTop user = {user}/>
                <div className="caption">
                <span ><h4>{ post.caption }</h4></span>
                </div>
                <hr/>
                {
                    comment.map((e)=>(
                        <Comment comment = {e} />
                    ))
                }
            </div>
            
        </div>
        </div>

        </>
    )
}

export default ViewPost
