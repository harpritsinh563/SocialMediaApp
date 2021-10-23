import React,{useState,useEffect,useContext} from 'react'
import './ChatOnline.css'
import axios from 'axios'
import { Context } from '../context/Context'

const ChatOnline = ({onlineuser,setcurrChat}) => {
    console.log(onlineuser);
    const [curruser, setCurruser] = useState({})
    const publicFolder = "http://localhost:5000/Images/"
    const {user,dispatch}=useContext(Context)
    useEffect(() => {
        const fetchUser = async() =>{
            const tmpuser = await axios.get(`/user/${onlineuser}`)
            console.log(tmpuser.data)
            setCurruser(tmpuser.data)
        }
        fetchUser()
    }, [onlineuser])

    const handleStartConvo=async()=>
    {
        let exists = await axios.get(`/conversation/${onlineuser}/${user._id}`);
        console.log("PRINT")
        console.log(exists)
        if(exists.data.length==0)
        {
            exists = await axios.post("/conversation/",{
            senderId:user._id,
            receiverId:onlineuser,
        })
        window.location.href="/Messenger/"+exists.data._id;
        }
        else
            window.location.href="/Messenger/"+exists.data[0]._id;
    }


    return (
        <>
            <div className="chatOnline">
                <div className="chatOnlineFriend" onClick={handleStartConvo}>
                    <div className="chatOnlineImgContainer">
                        <img src={publicFolder + curruser.profilepic} alt="" className="chatOnlineImg"></img>
                        <div className="chatOnlineBadge"></div>
                    </div>
                    <div className="chatOnlineName">
                        {curruser.userName}
                    </div>
                </div>
            </div>
        </>
    )
}

export default ChatOnline
