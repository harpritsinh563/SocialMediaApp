import React,{useEffect,useState} from 'react'
import './singlePost.css'
import axios from 'axios'
import { Link } from 'react-router-dom'

    const SinglePost = ({post}) => {
    const [currentpost,setCurrentPost]=useState({});

    const publicFolder = "http://localhost:5000/Images/"
    
    useEffect(()=>
    {
        const fetchPost = async() => 
        {
            try
            {
                const fetchedpost = await axios.get(`/post/${post}`);
                setCurrentPost(fetchedpost.data);
                console.log("FETCHED POST : ")
                console.log(fetchedpost.data)
                // console.log("SET CURRENT POST : ")
                // console.log(currentpost)
            }
            catch(err)
            {

            }
        }
        fetchPost();
    },[])
    let pic;
    if(currentpost)
        pic = publicFolder+currentpost.photo
    
    return (
        <>
            <Link to ={`/viewPost/${currentpost._id}`}>
                <img className="Img"  src={pic} alt="Loading..." ></img>
            </Link>
        </>    
    )
}

export default SinglePost;