import React from 'react'
import NavbarHome from './NavbarHome'
import TopProfile from './TopProfile'
import BottomProfile from './BottomProfile'
import './UserProfile.css'
import {useState,useEffect} from 'react'
import axios from 'axios'
export const UserProfile = () => {
  const [profileInfo,setprofileInfo]=useState({});
  const [bottomposts,setBottomPosts]=useState([]);
  const currentid="61275e11f0201774782ba0cd"
  
  useEffect(()=>{
    const fetchProfile = async() =>
    {
      try
      {
        const res = await axios.get('user/'+currentid)
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
    friendsCount : profileInfo.friendCount
  }
  return (
    <>
      <NavbarHome />
       <div className="userProfileInfo">
        <TopProfile topProfile={topProfile} />
        <BottomProfile bottomProfile={bottomposts} />

      </div>
    </>
  )
}
