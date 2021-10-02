import React from 'react'
import './Message.css'
import {format} from "timeago.js"

const Message = ({message,own}) => {
    return (
        <>
            <div className={own?"message own":"message"}>
                <div className="messageTop">
                    <img src="../Images/wallpaper.jpg" alt="" className="messageImg"></img>
                    <p className="messageText">{message.text}</p>
                </div>
                <div className="messageBottom">
                    {/* 111111111111 */}
                    {format(message.createdAt)}
                </div>
            </div>
        </>
    )
}

    export default Message
