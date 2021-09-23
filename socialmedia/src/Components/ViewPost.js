import React from 'react'
import './ViewPost.css'
import NavbarHome from './NavbarHome'
import { useLocation } from 'react-router'
import axios from 'axios'
import { useState, useEffect, useContext } from 'react'
import PostTop from './PostTop'
import Comment from './Comment'
import { TextField,Button,Tooltip } from '@material-ui/core'
import { Context } from '../context/Context'


const ViewPost = () => {
    const { user } = useContext(Context)
    const location = useLocation()
    const postId = location.pathname.split('/')[2]
    const [post, setpost] = useState({})
    const [comment, setcomment] = useState([])
    const [Newcomment, setNewcomment] = useState("")
    useEffect(() => {
        const fetchPost = async () => {
            try {
                const currPost = await axios.get(`/post/${postId}`)
                setpost(currPost.data)
                const currId = currPost.data.userId
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
    const DeleteComment = async (com) => {
        try {
            const delete_comment = await axios.delete(`/comment/${com._id}`)

            const comments = await axios.get(`/comment/${postId}`)
            setcomment(comments.data)
        }
        catch (err) {

        }
    }
    const publicFolder = "http://localhost:5000/Images/"
    const pic = publicFolder + post.photo
    return (

        <>
            <NavbarHome />
            <div className="viewpost_container">
                <div className="viewpost_post">
                    <div className="viewpost_leftcomponent">
                        <img src={pic} alt="" className="viewpost_post_image" />
                    </div>
                    <div className="viewpost_rightcomponent">
                        <div className='viewpost_show_comment'>
                            <PostTop user={user} />
                            <div className="viewpost_caption">
                                <span ><h4>{post.caption}</h4></span>
                            </div>
                            <hr />
                            {
                                comment.map((com) => (
                                    <>
                                        <div className='viewpost_comments'>
                                            <Comment comment={com} />
                                            <button style={{ padding: "0",border:"none"}} onClick={() => DeleteComment(com)} >
                                                <Tooltip title="Delete comment"><i className="viewpost_delete_icon fas fa-window-close"  ></i></Tooltip>
                                            </button>
                                        </div>
                                        <hr />

                                    </>
                                ))
                            }
                        </div>
                        <div className='viewpost_comment_input' >
                            <TextField id="standard-basic" value={Newcomment} onChange={(e) => setNewcomment(e.target.value)} label="Comment" variant="standard" />       
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
