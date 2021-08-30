import React,{useEffect,useState} from 'react'
import './singlePost.css'
import axios from 'axios'
import { Link } from 'react-router-dom'

const SinglePost = ({post}) => {
    const [currentpost,setCurrentPost]=useState({});
    useEffect(()=>
    {
        const fetchPost = async() => 
        {
            try
            {
                const fetchedpost = await axios.get(`/post/${post}`);
                console.log(fetchedpost);
                setCurrentPost(fetchedpost.data);
            }
            catch(err)
            {

            }
        }
        fetchPost();
    },[])

    return (
        <>
            <Link to ={`/viewPost/${currentpost._id}`}>
            <img className="Img"  src={currentpost.photo}></img>
            </Link>
        </>    
    )
}

export default SinglePost;