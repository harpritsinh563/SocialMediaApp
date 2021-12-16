import axios from 'axios'
import React , { useState, useEffect} from 'react'
import './Friend.css'
import {Link} from 'react-router-dom'
import Circular from './LoadingComponents/Circular'
const Friend = ({friend}) => {
    const [currFriend, setcurrFriend] = useState({})
    const [isLoading, setisLoading] = useState(true)
    useEffect(() => {
        const fetchFriend=async()=>{
            try{
                const fetchFriend = await axios.get(`/user/${friend}`)
                setcurrFriend(fetchFriend.data)
                setisLoading(false)
            }catch(err){}
        }
        fetchFriend()
    }, [])

    const publicfolder = "http://localhost:5000/Images/"
    return (
        
        <div className = "Friend">
           {isLoading?<Circular/>:<Link className="link" to={`/userProfile/${currFriend._id}`}> <img src={publicfolder+currFriend.profilepic} alt="" className="profilepic_friend" /></Link>}
            <Link className="link" to={`/userProfile/${currFriend._id}`}>    <div className="title_friend">{currFriend.userName}</div>  </Link>
                      
        </div>
    )
}

export default Friend   