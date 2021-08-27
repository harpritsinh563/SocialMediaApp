import React from 'react'
import './PostTop.css'


const PostTop = ({user}) => {
    console.log(user)
    return (
        <>
            <div className="top">
                <div style={{display:"flex",alignItems:"center"}}>
                    <img src={user.profilepic} alt="" className="postTopPropic" />
                    <h5>{user.userName}</h5>
                </div>
            </div>
        </>
    )
}

export default PostTop
