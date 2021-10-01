import React from 'react'
import './ViewPost.css'
import NavbarHome from './NavbarHome'
import { useLocation } from 'react-router'
import axios from 'axios'
import { useState, useEffect, useContext } from 'react'
import Comment from './Comment'
import { TextField, Button, Tooltip } from '@material-ui/core'
import { Context } from '../context/Context'
import { Avatar, Card, CardContent, CardHeader, CardMedia, Typography, Box, IconButton, CardActions, Paper, MenuList, ListItemText } from '@material-ui/core';

const ViewPost = () => {
    const location = useLocation()
    const postId = location.pathname.split('/')[2]
    const [post, setpost] = useState({})
    const [comment, setcomment] = useState([])
    const [Newcomment, setNewcomment] = useState("")
    const [isLiked, setIsLiked] = useState(false)
    const [isSaved, setIsSaved] = useState(false)
    const publicFolder = "http://localhost:5000/Images/"
    const { user, dispatch } = useContext(Context);
    const [curruser, setcurruser] = useState({})



    useEffect(() => {
        const fetchPost = async () => {
            try {
                const currPost = await axios.get(`/post/${postId}`)
                setpost(currPost.data)
                const currId = currPost.data.userId
                const usertmp = await axios.get(`/user/${currPost.data.userId}`)
                setcurruser(usertmp.data)
                const comments = await axios.get(`/comment/${postId}`)
                setcomment(comments.data)

                currPost.data.likedBy.includes(user._id) && setIsLiked(true)
                user.savedposts.includes(currPost.data._id) && setIsSaved(true)

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

    const handleLike = async () => {
        console.log("vrundan")
        try {
            const tmpUser = {
                userId: user._id,
            }
            const likedPost = await axios.put(`/post/${post._id}/likepost`, tmpUser)
            const fetchedUser = await axios.get('/user/'+user._id);
            dispatch({type:'UPDATE',payload:fetchedUser.data});
            setIsLiked(!isLiked)
        } catch (err) {

        }
    }
    const handleSave = async () => {
        try {
            const tmpUser = {
                userId: user._id,
            }
            const savedPost = await axios.put(`/user/${post._id}/savedPost`, tmpUser);
            setIsSaved(!isSaved);
            const fetchedUser = await axios.get('/user/'+user._id);
            dispatch({type:'UPDATE',payload:fetchedUser.data});
            
        } catch (err) {

        }
    }

    
    const handleDelete = async() => {
        console.log(postId)
        try{
            console.log("above")
            // console.log(user._id)
            // const tmpUser = {
            //     userId:user._id,
            // }
            // console.log(tmpUser)
            // console.log(postId)
            const comments = await axios.delete(`/comment/${postId}/deleteAll`)
            // console.log("deleted comments")
            const post123 = await axios.delete(`/post/${postId}/${user._id}`)
            const fetchedUser = await axios.get('/user/'+user._id);
            dispatch({type:'UPDATE',payload:fetchedUser.data});
            window.location.replace('/home')
        }catch(err){

        }
    }


    const pic = publicFolder + post.photo
    return (

        <>
            <NavbarHome />

            <div className="viewpost_container">
                <Card >
                <div className="post_header">
                    <CardHeader
                        avatar={
                            <Box mr={2}>
                                <Avatar src={publicFolder + curruser.profilepic} />
                            </Box>
                        }
                        title={curruser.userName}
                        subheader={curruser.name}
                    />
                    {(post.userId == user._id) && <button className="Post_delete" onClick={handleDelete} ><i className="fas fa-trash Post_delete_icon"></i></button>} 
                </div>
                    <CardMedia
                        component="img"
                        image={publicFolder + post.photo}
                        height="250"
                        width="400"
                    />
                    <CardContent>
                        <Box ml={4}>
                            <Typography  >
                                {post.caption}
                            </Typography>
                        </Box>
                    </CardContent>
                    <CardActions>
                        <div>
                        { user.likedposts.includes(`${post._id}`) && <button className="Post_like" onClick={handleLike}><i className="fas fa-heart fa-2x"></i></button> }
                        { !user.likedposts.includes(`${post._id}`) && <button className="Post_like" onClick={handleLike}><i className="far fa-heart fa-2x"></i></button> }
                        { user.savedposts.includes(`${post._id}`) && <button className="Post_save" onClick={handleSave}><i className="fas fa-bookmark fa-2x"></i></button> }
                        { !user.savedposts.includes(`${post._id}`) && <button className="Post_save" onClick={handleSave}><i className="far fa-bookmark fa-2x"></i></button> }
                        </div>
                    </CardActions>
                </Card>
                <div className="viewpost_rightcomponent">
                    <h3 className="viewpost_heading"> Comments </h3>
                    <div className='viewpost_show_comment'>
                        {
                            comment.map((com) => (
                                <>
                                    <div className='viewpost_comments'>
                                        <Comment comment={com} />
                                        <button style={{ padding: "0", border: "none" }} onClick={() => DeleteComment(com)} >
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



        </>


    )
}

export default ViewPost
