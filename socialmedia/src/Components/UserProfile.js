import React, { useContext } from 'react'
import NavbarHome from './NavbarHome'
import TopProfile from './TopProfile'
import BottomProfile from './BottomProfile'
import './UserProfile.css'
import {useState,useEffect} from 'react'
import axios from 'axios'
import { Context } from '../context/Context'
import {useLocation} from 'react-router-dom'


export const UserProfile = () => {
  const [profileInfo,setprofileInfo]=useState({});
  const [bottomposts,setBottomPosts]=useState([]);
  const {user,dispatch} = useContext(Context);
  const location = useLocation();
  const currentid = location.pathname.split('/')[2];
  console.log(currentid)
  
  useEffect(()=>{
    const fetchProfile = async() =>
    {
      try
      {
        const res = await axios.get('/user/'+currentid)
        setprofileInfo(res.data);
        setBottomPosts(res.data.posts);
      }
      catch(err)
      {
        console.log(err.message);
      }
    }
    fetchProfile();
  },[])

  const topProfile = {
    userName : profileInfo.userName,
    friends :  profileInfo.friends,
    postCount : profileInfo.postCount,
    photo : profileInfo.profilepic,
    userId : profileInfo._id,
    friendsCount : profileInfo.friendCount
  }

  return (
    <>
      <NavbarHome />
       <div className="userProfileInfo">
        <TopProfile topProfile={topProfile} />
        {
          <BottomProfile bottomProfile={bottomposts} />
        }
      </div>
    </>
  )
}
