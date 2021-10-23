import React,{useEffect,useState} from 'react'
import './Message.css'
import {format} from "timeago.js"
import axios from 'axios'
const Message = ({message,own,sender}) => {
    const [fetcheduser, setfetcheduser] = useState({})

    useEffect(() => {
        const fetchUser = async() =>{
            const fetched = await axios.get(`/user/${sender}`)
            setfetcheduser(fetched.data)
        } 
        fetchUser();
    }, [])
    const publicFolder = "http://localhost:5000/Images/"

    return (
        <>
            <div className={own?"message own":"message"}>
                <div className="messageTop">
                    {/* <img src={publicFolder+fetcheduser?.profilepic} alt="" className="messageImg"></img> */}
                    <p className="messageText">{message.text}</p>
                </div>
                <div className="messageBottom">
                    {format(message.createdAt)}
                </div>
            </div>
        </>
    )
}

    export default Message
