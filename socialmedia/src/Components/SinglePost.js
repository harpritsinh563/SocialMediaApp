import React,{useEffect,useState} from 'react'
import './singlePost.css'
import axios from 'axios'

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
            <img className="Img"  src={currentpost.photo}></img>
        </>    
    )
}

export default SinglePost;