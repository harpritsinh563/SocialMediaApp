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
    useEffect(() => {
        const fetchUser = async() =>{
            try{
                const currUser = await axios.get(`/user/${userId}`)

                setuser(currUser.data)
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
            <div className = 'Title'>
                Saved
            </div>
            <PrintPosts posts = {SavedPost}/>
        </div>
        </>
    )
}

export default SavedPosts;

