import React,{useState,useEffect,useContext} from 'react'
import './conversation.css'
import { Context } from '../context/Context'
import axios from 'axios'



const Conversation = ({conversation,currUser}) => {
    const [friend, setfriend] = useState(null);

    useEffect(() => {
        const friendId = conversation.members.find((m)=>m !== currUser._id)
        const getFriend = async() =>{
            try{
                const fetchfriend = await axios(`/user/${friendId}`)
                // console.log(fetchfriend.data)
                setfriend(fetchfriend.data)
            }
            catch(err){
                console.log(err.message)
            }
        };
        getFriend()
    }, [currUser,conversation])

    const publicFolder = "http://localhost:5000/Images/"
    return (
        <>
            <div className="conversation"> 
                <img src={publicFolder+friend?.profilepic}  alt="" className="conversationImg"></img>
                <span className="conversationName">{friend?.userName}</span>
                
            </div>
        </>
    )
}

export default Conversation
