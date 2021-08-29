import react from 'react'
import './PostBottom.css'
import {Link} from 'react-router-dom'

const PostBottom = ({post}) => {
    return (
        <>
            <div className="caption">
                <h4>{post.caption}</h4>
            </div>
            <Link to={`/likedBy/${post._id}`}> LikedBy </Link> 
        </>
    )
}

export default PostBottom