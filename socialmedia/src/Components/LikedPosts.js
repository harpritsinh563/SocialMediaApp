import React,{useState,useEffect} from 'react'
import NavbarHome from './NavbarHome';
import PrintPosts from './PrintPosts';
import './LikedPosts.css'
import { useLocation } from 'react-router';
import axios from 'axios';

const LikedPosts = () => {
    
    const location = useLocation()
    const userId = location.pathname.split('/')[2]
    const [user, setuser] = useState({})
    const [likedPost, setlikedPost] = useState([])
    useEffect(() => {
        const fetchUser = async() =>{
            try{
                const currUser = await axios.get(`/user/${userId}`)
                setuser(currUser.data)
                setlikedPost(currUser.data.likedposts)
            }
            catch(err){

            }
        } 

        fetchUser()
    }, [])
    return (
        <>
        <NavbarHome/>
        <div className = 'ViewPosts'>
            <div className = 'Title'>
                Liked
            </div>
            <PrintPosts posts = {likedPost} />
        </div>
        </>
    )
}

export default LikedPosts;

