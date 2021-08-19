import React from 'react'
import NavbarHome from './NavbarHome'
import TopProfile from './TopProfile'
import BottomProfile from './BottomProfile'
import './UserProfile.css'


export const UserProfile = () => {
  return (
    <>
      <NavbarHome />
      <div className="userProfileInfo">
        <TopProfile />
        <BottomProfile />
      </div>
    </>
  )
}
