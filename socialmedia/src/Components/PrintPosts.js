import React from 'react'
import SinglePost from './SinglePost'
import './PrintPosts.css'
const PrintPosts = ({posts}) => {
    console.log(posts)
    return (
        <div className = "Posts">
            {posts.map((p)=>(
                <SinglePost post = {p}/>
            ))}
        </div>
    )
}

export default PrintPosts
