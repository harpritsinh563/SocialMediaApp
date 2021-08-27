import react from 'react'
import './PostBottom.css'


const PostBottom = ({post}) => {
    return (
        <>
            <div className="caption">
                <h4>{post.caption}</h4>
            </div>
        </>
    )
}

export default PostBottom
