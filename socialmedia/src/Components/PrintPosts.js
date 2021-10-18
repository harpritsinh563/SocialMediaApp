import React from 'react'
import SinglePost from './SinglePost'
import './PrintPosts.css'
const PrintPosts = ({posts}) => {
    return (
        <div className = "Posts">
            {posts.map((p)=>(
                p && <SinglePost post = {p}/>
            ))}
        </div>
    )
}

export default PrintPosts
