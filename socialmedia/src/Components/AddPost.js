import React, { useState, useContext } from 'react'
import { Button } from '@material-ui/core'
import { Context } from '../context/Context';
import axios from 'axios'
import './AddPost.css'

const AddPost = () => {

    const [Des, setDes] = useState("")
    const [photo, setphoto] = useState(null)

    const { user } = useContext(Context)

    const handlePostUpload = async (e) => {
        e.preventDefault()
        const data = new FormData()
        const fname = user._id + Date.now()

        const newPost = {
            photo: fname,
            caption: Des,
            userName: user.userName,
            userId: user._id
        }

        data.append('fname', fname)
        data.append("file", photo)

        try {
            const res = await axios.post('/uploads', data)
            console.log("In upload post")
            console.log(res)
        } catch (err) {
            console.log(err)
        }

        try {
            const finalPost = await axios.post('/post/addPost', newPost)
        } catch (err) {
            console.log(err)
        }

    }

    return (
        <>
            <div className="AddPost">
                {photo && <img src={URL.createObjectURL(photo)} className="previewphoto" alt="" />}
                <form className="createPost" enctype="multipart/form-data" onSubmit={(e) => handlePostUpload(e)}>
                    <div className="innerCreatePost">
                        <label htmlFor="fileinput">
                        <i className="cameraicon fas fa-camera"></i>
                        </label>
                        <input style={{ display: "none" }} accept="image/*" id="fileinput" type="file" onChange={(e) => setphoto(e.target.files[0])} ></input>
                    </div>
                    <div className="innerCreatePost">
                        <textarea className="captionField" onChange={(e) => setDes(e.target.value)} placeholder="What's on your mind..." ></textarea>
                    </div>
                    <button className="submitbutton" type="submit">Post</button>
                </form>
            </div>
        </>
    )
}

export default AddPost
