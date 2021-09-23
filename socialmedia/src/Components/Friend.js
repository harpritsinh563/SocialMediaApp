import axios from 'axios'
import React , { useState, useEffect} from 'react'
import './Friend.css'
import {Link} from 'react-router-dom'
const Friend = ({friend}) => {
    const [currFriend, setcurrFriend] = useState({})
    
    console.log(friend)
    useEffect(() => {
        const fetchFriend=async()=>{
            try{
                const fetchFriend = await axios.get(`/user/${friend}`)
                setcurrFriend(fetchFriend.data)
            }catch(err){}
        }
        fetchFriend()
    }, [])

    const publicfolder = "http://localhost:5000/Images/"
    return (
        
        <div className = "Friend">
           <Link className="link" to={`/userProfile/${currFriend._id}`}> <img src={publicfolder+currFriend.profilepic} alt="" className="profilepic_friend" /></Link>
         <Link className="link" to={`/userProfile/${currFriend._id}`}>    <div className="title_friend">{currFriend.userName}</div>  </Link>
                      
        </div>
    )
}

export default Friend   