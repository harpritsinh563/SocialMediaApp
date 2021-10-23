import React,{useState,useEffect} from 'react'
import NavbarHome from './NavbarHome';
import PrintPosts from './PrintPosts';
import './SavedPosts.css'
import { useLocation } from 'react-router';
import axios from 'axios';



const SavedPosts = () => {
    
    const location = useLocation()
    const userId = location.pathname.split('/')[2]
    const [user, setuser] = useState({})
    const [SavedPost, setSavedPost] = useState([])


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
                currUser.data.savedposts.sort(compare)
                setSavedPost(currUser.data.savedposts)
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
            <div className = 'SavedPost_title'>
                Saved
            </div>
            <PrintPosts posts = {SavedPost}/>
            {SavedPost.length==0 && <span>No Saved Posts</span>}
        </div>
        </>
    )
}

export default SavedPosts;

