import React,{useState,useEffect,useContext,useRef} from 'react'
import NavbarHome from './NavbarHome'
import Conversation from './Conversation'
import Message from './Message'
import ChatOnline from './ChatOnline'
import './messenger.css'
import { Button } from '@material-ui/core'
import { Context } from '../context/Context'
import axios from 'axios'
import {io} from 'socket.io-client'


const Messenger = () => {

    const [conversations, setconversations] = useState([])
    const [currChat, setCurrChat] = useState(null)
    const [messages, setMessages] = useState([])
    const [newmessages,setNewMessages] = useState("")
    const [arrivalmessages, setArrivalmessages] = useState(null)
    const [onlineUsers, setOnlineUsers] = useState(null)
    const { user, dispatch } = useContext(Context);
    const scrollRef = useRef()
    const socket = useRef()
    const [onlinefriend, setOnlinefriend] = useState([])


    useEffect(() => {
        socket.current = io("ws://localhost:8900");
        socket.current.on("getMessage",(data)=>{
            setArrivalmessages({
                sender:data.senderId,
                text:data.text,
                createdAt:Date.now(),
            })
        })
    },[])


    useEffect(()=>{
        arrivalmessages 
        && currChat.members.includes(arrivalmessages.sender) 
        && setMessages([...messages,arrivalmessages])
    },[arrivalmessages,currChat])


    useEffect(() => {
        socket.current.emit("addUser",user._id);
        socket.current.on("getUser",(users)=>{
            console.log(users)
            setOnlineUsers(users)
            users.forEach((e)=>{
                if(user.friends.includes(e))
                    setOnlinefriend([...onlinefriend,e])
            })
            // users && setOnlinefriend(user.friends.filter((f)=>users.includes(f._id)))    
        })
    }, [user])




    useEffect(() => {
        const getconversation = async() => {
            try {
                const conver = await axios.get(`/conversation/${user._id}`)
                setconversations(conver.data)
            } catch (err) {
                console.log(err.Message)
            }
        }
        getconversation()
    }, [user._id])



    useEffect(() => {
        const getMessages = async() =>{
            try{
                const fetchmessages = await axios.get(`/message/${currChat?._id}`)
                setMessages(fetchmessages.data)
            }catch(err){
                console.log(err.Message)
            }
        }
        getMessages()
    }, [currChat])



    useEffect(() => {
        scrollRef.current?.scrollIntoView({behavior:"smooth"})
    }, [messages])


    
    const handleSubmit = async(e) =>{
        e.preventDefault()
        const currmessage={
            sender : user._id,
            text:newmessages,
            conversationId:currChat._id
        }
        const receiverId = currChat.members.find(member=>member !== user._id)
        socket.current.emit("sendMessage",{
            senderId:user._id,
            receiverId,
            text:newmessages,
        })

        try {
            const res = await axios.post("/message",currmessage)
            setMessages([...messages,res.data])
            setNewMessages("")
        } catch (err) {
            console.log(err.Message)
        }

    }

    return (
        <>
            <NavbarHome />
            <div className="messenger">
                <div className="chatMenu">
                    <div className="chatMenuWrapper">
                        <input placeholder="Search User..." className="chatMenuInput" ></input>
                        {conversations.map((e)=>(
                            <div onClick={()=>setCurrChat(e)}>
                                <Conversation conversation={e} currUser={user} />
                            </div>
                        ))}
                    </div>
                </div>
                <div className="chatBox">
                    <div className="chatBoxWrapper">
                    { currChat ? 
                        <>
                        <div className="chatBoxTop">
                        {messages.map((m)=>(
                            <div ref = {scrollRef}>
                            <Message message={m} own={m.sender === user._id}/>
                            </div>
                        ))}
                            
                        </div>
                        <div className="chatBoxBottom">
                            <textarea placeholder="Write Something ...." onChange={(e)=>setNewMessages(e.target.value)} value={newmessages} className="chatMessageInput"></textarea>
                            <Button variant="contained" color="primary" onClick={handleSubmit} > Send </Button>
                        </div> 
                        </>: <span className="noConversation">Start the conversation</span>
                    }
                    </div>

                </div>
                <div className="chatOnline">
                    <div className="chatOnlineWrapper">
                        {onlinefriend.map((e)=>
                            <ChatOnline onlineuser={e} setcurrChat={setCurrChat}/>
                        )}
                    </div>

                </div>
            </div>
        </>
    )
}

export default Messenger
