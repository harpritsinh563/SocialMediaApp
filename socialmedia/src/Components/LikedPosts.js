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


    function compare( a, b ) 
    {
        if ( a > b ){
          return -1;
        }
        if ( a < b ){
          return 1;
        }
        return 0;
    }

    useEffect(() => {
        const fetchUser = async() =>{
            try{
                const currUser = await axios.get(`/user/${userId}`)
                setuser(currUser.data)
                currUser.data.likedposts.sort(compare)
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
            <div className = 'LikedPost_Title'>
                Liked
            </div>
            <PrintPosts posts = {likedPost} />
            {likedPost.length==0 && <span>No Liked Posts</span>}
        </div>
        </>
    )
}

export default LikedPosts;

