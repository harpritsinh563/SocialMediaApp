import React from 'react'
import './PostTop.css'


const PostTop = ({user}) => {

    const publicFolder = "http://localhost:5000/Images/"
    // console.log(publicFolder+user.profilepic)
    return (
        <>
            <div className="top">
                <div style={{display:"flex",alignItems:"center"}}>
                    <img src={publicFolder+user.profilepic} alt="profilepic" className="postTopPropic" />
                    <h5>{user.userName}</h5>
                </div>
            </div>
        </>
    )
}

export default PostTop
