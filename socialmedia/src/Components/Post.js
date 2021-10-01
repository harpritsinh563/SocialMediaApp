import axios from 'axios';
import React, { useEffect, useState , useContext } from 'react';
import { Avatar, Card, CardContent, CardHeader, CardMedia, Typography, Box, CardActions } from '@material-ui/core';
import './Post.css';
import { Context } from '../context/Context'


const Post = ({ post }) => {
    const publicFolder = "http://localhost:5000/Images/"
    const [curruser, setcurruser] = useState({})
    const [isLiked,setIsLiked] = useState(false)
    const [isSaved,setIsSaved] = useState(false)
    const { user, dispatch } = useContext(Context);

    useEffect(() => {

        const fetchUser = async () => {
            const currUser = await axios.get(`user/${post.userId}`)
            setcurruser(currUser.data)
            post.likedBy.includes(user._id) && setIsLiked(true)
            user.savedposts.includes(post._id) && setIsSaved(true)
        }
        fetchUser()
        
    }, [])


    const handleLike = async() => {
        
        try{
            const tmpUser = {
                userId : user._id,
            }
            const likedPost = await axios.put(`/post/${post._id}/likepost`,tmpUser)
            const fetchedUser = await axios.get('/user/'+user._id);
            dispatch({type:'UPDATE',payload:fetchedUser.data});
        }catch(err){
            
        }
    }
    const handleSave = async() => {
        try{
            const tmpUser = {
                userId : user._id,
            }
            const savedPost = await axios.put(`/user/${post._id}/savedPost`,tmpUser);
            const fetchedUser = await axios.get('/user/'+user._id);
            dispatch({type:'UPDATE',payload:fetchedUser.data});
            
        }catch(err){

        }
    }

    const handleDelete = async() => {
        try{
            const post = await axios.delete(`/post/${post._id}`)
            window.location.replace('/home')
            
        }catch(err){

        }
    }

    return (
        <>
            <div style={{ marginTop: "5%", width: "40vw" }}>
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
                {post.userid == user._id && <button className="Post_delete" onClick={handleDelete} ><i className="fas fa-trash Post_delete_icon"></i></button>} 
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
                        <div className="post_saved_rightside" >
                        { user.likedposts.includes(`${post._id}`) && <button className="Post_like" onClick={handleLike}><i className="fas fa-heart fa-2x"></i></button> }
                        { !user.likedposts.includes(`${post._id}`) && <button className="Post_like" onClick={handleLike}><i className="far fa-heart fa-2x"></i></button> }
                        { user.savedposts.includes(`${post._id}`) && <button className="Post_save" onClick={handleSave}><i className="fas fa-bookmark fa-2x"></i></button> }
                        { !user.savedposts.includes(`${post._id}`) && <button className="Post_save" onClick={handleSave}><i className="far fa-bookmark fa-2x"></i></button> }
                        </div> 
                    </CardActions>
                </Card>
            </div>
        </>
    );
}
export default Post;