import axios from 'axios';
import React, { useEffect, useState , useContext } from 'react';
import { Avatar, Card, CardContent, CardHeader, CardMedia, Typography, Box, IconButton, CardActions, Button } from '@material-ui/core';
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
        // console.log("vrundan")
        try{
            const tmpUser = {
                userId : user._id,
            }
            const likedPost = await axios.put(`/post/${post._id}/likepost`,tmpUser)
            setIsLiked(!isLiked)
        }catch(err){

        }
    }
    const handleSave = async() => {
        try{
            const tmpUser = {
                userId : user._id,
            }
            const savedPost = await axios.put(`user/${post._id}/savedPost`,tmpUser)
            setIsSaved(!isSaved)
        }catch(err){

        }
    }
    return (
        <>
            <div style={{ marginTop: "5%", width: "40vw" }}>
                <Card >
                    <CardHeader
                        avatar={
                            <Box mr={2}>
                                <Avatar src={publicFolder + user.profilepic} />
                            </Box>
                        }
                        title={curruser.userName}
                        subheader={curruser.name}
                    />
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
                        { isLiked && <button className="Post_like" onClick={handleLike}><i class="fas fa-heart fa-2x"></i></button> }
                        { !isLiked && <button className="Post_like" onClick={handleLike}><i class="far fa-heart fa-2x"></i></button> }
                        { isSaved && <button className="Post_Save" onClick={handleSave}><i class="fas fa-bookmark fa-2x"></i></button> }
                        { !isSaved && <button className="Post_save" onClick={handleSave}><i class="far fa-bookmark fa-2x"></i></button> }
                        </div> 
                    </CardActions>
                </Card>
            </div>


        </>

    );
}

export default Post;