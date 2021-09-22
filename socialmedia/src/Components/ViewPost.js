import React from 'react'
import './ViewPost.css'
import NavbarHome from './NavbarHome'
import { useLocation } from 'react-router'
import axios from 'axios'
import { useState, useEffect, useContext } from 'react'
import PostTop from './PostTop'
import Comment from './Comment'
import { Input, Button } from '@material-ui/core'
import { Context } from '../context/Context'


const ViewPost = () => {
    const { user } = useContext(Context)
    const location = useLocation()
    const postId = location.pathname.split('/')[2]
    const [post, setpost] = useState({})
    // const [user, setuser] = useState({})
    const [comment, setcomment] = useState([])
    const [Newcomment, setNewcomment] = useState("")
    const [pushedcomment, setpushedcomment] = useState(false)
    const [deletePressed, setdeletePressed] = useState("")

    useEffect(() => {
        const fetchPost = async () => {
            try {
                const currPost = await axios.get(`/post/${postId}`)
                setpost(currPost.data)
                const currId = currPost.data.userId
                // const currUser = await axios.get(`/user/${currId}`)
                // setuser(currUser.data)
                
                     const comments = await axios.get(`/comment/${postId}`)
                     setcomment(comments.data)
                    
            }
            catch (err) {

            }
        }
        fetchPost()

    }, [])





    const handleComment = async () => {
        try {
            const PushComment = {
                comment: Newcomment,
                postId: postId,
                userId: user._id,
            }
            const response = await axios.post('/comment/', PushComment)

            setNewcomment("")
            
                const comments = await axios.get(`/comment/${postId}`)
                     setcomment(comments.data)
            
        }
        catch (err) {

        }

    }







    const DeleteComment = async(com) =>
    {
        try{
            const delete_comment = await axios.delete(`/comment/${com._id}`)
            
            const comments = await axios.get(`/comment/${postId}`)
                     setcomment(comments.data)
            
            
        }
        catch(err)
        {

        }
    }











    const publicFolder = "http://localhost:5000/Images/"
    const pic = publicFolder + post.photo

    return (

        <>
            <NavbarHome />
            <div className="Container">

                <div className="Post">
                    <div className="LeftComponent">
                        <img src={pic} alt="" className="postImg" />

                    </div>
                    <div className="RightComponent">
                        <div className='showComment'>
                            <PostTop user={user} />
                            <div className="caption_viewpost">
                                <span ><h4>{post.caption}</h4></span>
                            </div>
                            <hr />
                            {
                                comment.map((com) => (
                                    <>
                                        <div className='comments'>
                                            <Comment comment={com} />
                                            {/* {() => setdeletePressed(com._id)}
                                              */}
                                            <button style = {{padding : "0"}} onClick = {()=> DeleteComment(com)} > 
                                            <i className = "fas fa-window-close"  ></i>
                                             </button>
                                             
                                        </div>
                                        <hr />

                                    </>
                                ))
                            }
                        </div>
                        <div className='Comment_Input' >
                            <Input type='text' value={Newcomment} onChange={(e) => setNewcomment(e.target.value)} placeholder='Enter a comment' />
                            <Button type='submit' onClick={handleComment}>
                                Comment
                            </Button>
                        </div>
                    </div>
                </div>
            </div>
        </>
    )
}

export default ViewPost
