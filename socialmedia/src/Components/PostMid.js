import React from 'react'
import './PostMid.css'

const PostMid = ({post}) => {
    return (
        <>
            <div className="postPhoto">
                <img src={post.photo} alt="" className="postPhoto"/>
            </div>
        </>
    )
}

export default PostMid
