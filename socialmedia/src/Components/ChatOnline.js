import React,{useState,useEffect} from 'react'
import './ChatOnline.css'
import axios from 'axios'


const ChatOnline = (onlineuser,currChat) => {

    const [curruser, setCurruser] = useState({})
    const publicFolder = "http://localhost:5000/Images/"
    console.log("vrunddan")
    useEffect(() => {
        const fetchUser = async() =>{
            const tmpuser = await axios.post(`/user/${onlineuser}`)
            setCurruser(tmpuser.data)
        }
        fetchUser()
    }, [])

    return (
        <>
            <div className="chatOnline">
                <div className="chatOnlineFriend">
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
