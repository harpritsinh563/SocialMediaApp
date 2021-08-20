import React from 'react'
import SinglePost from './SinglePost'
import './PrintPosts.css'
const PrintPosts = () => {
    return (
        <div className = "Posts">
            <SinglePost/>
            <SinglePost/>
            <SinglePost/>
            <SinglePost/>
        </div>
    )
}

export default PrintPosts
