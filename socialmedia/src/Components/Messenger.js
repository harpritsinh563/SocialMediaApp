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
import {useLocation} from 'react-router-dom'


const Messenger = () => {

    const location = useLocation();
    let urlarray=location.pathname.split('/');
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
    const [currConvo,setcurrConvo] = useState({})

    useEffect(() => {
        socket.current = io("ws://localhost:8900");
        socket.current.on("getMessage",(data)=>{
            setArrivalmessages({
                sender:data.senderId,
                text:data.text,
                createdAt:Date.now(),
            })
        })
        
        if(urlarray.length==3)
        {
            let convoid = urlarray[2];
            const fetchConvo = async() => {
                const convo = await axios.get(`/conversation/convo/${convoid}`);
                setCurrChat(convo.data);
            }
            fetchConvo();
        }
    },[])


    useEffect(()=>{
        arrivalmessages 
        && currChat.members.includes(arrivalmessages.sender) 
        && setMessages([...messages,arrivalmessages])
    },[arrivalmessages,currChat])


    let onlinefriends_t=[]

    useEffect(() => {
        socket.current.emit("addUser",user._id);
        socket.current.on("getUser",(users)=>{
            setOnlineUsers(users)
            users.forEach((e)=>{
                user.friends.forEach((e1)=>
                {
                    console.log("e1 : "+e1);
                    if(e.userId==e1)
                    {
                        console.log("INSIDE e==e1")
                        onlinefriends_t.push(e1)
                        setOnlinefriend(onlinefriends_t)
                    }
                })
            })
        })
    }, [])

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
                const friendId = currChat.members.find((m)=>m !== user._id)
                const friend = await axios.get(`/user/${friendId}`)
                setcurrConvo(friend.data)
            }catch(err){
                console.log(err.Message)
            }
        }
        getMessages()
    }, [currChat])

    useEffect(() => {
        scrollRef.current?.scrollIntoView({behavior:"smooth"})
    }, [messages])


    const publicFolder = "http://localhost:5000/Images/"
    
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
                        <div className="conversation"> 
                        <img src={publicFolder+currConvo?.profilepic}  alt="" className="conversationImg"></img>
                        <span className="conversationName">{currConvo?.userName}</span> 
                    </div>
              
                        <div className="chatBoxTop">
                        {messages.map((m)=>(
                            <div ref = {scrollRef}>
                            <Message message={m} own={m.sender === user._id} sender = {m.sender}/>
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
