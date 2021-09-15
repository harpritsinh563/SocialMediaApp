import axios from 'axios'
import React , { useState, useEffect} from 'react'
import './Friend.css'

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

    console.log(currFriend)

    return (
        <div className = "Friend">
            <img src={currFriend.profilepic} alt="" className="profilepic_friend" />
             <div className="title_friend">{currFriend.userName}</div>           
        </div>
    )
}

export default Friend   