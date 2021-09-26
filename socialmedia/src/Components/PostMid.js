import React from 'react'
import './PostMid.css'

const PostMid = ({post}) => {
    const publicFolder = "http://localhost:5000/Images/"
    return (
        <>
            <div className="postPhoto">
                <img src={publicFolder+post.photo} alt="" className="postPhoto"/>
            </div>
        </>
    )
}

export default PostMid
