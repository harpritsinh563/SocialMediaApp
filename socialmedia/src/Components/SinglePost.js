import React,{useEffect,useState} from 'react'
import './singlePost.css'
import axios from 'axios'
import { Link } from 'react-router-dom'
import LazyLoad from 'react-lazy-load';
import Rectangle from './LoadingComponents/Rectangle'

    const SinglePost = ({post}) => {
    const [currentpost,setCurrentPost]=useState({});
        const [isLoading, setisLoading] = useState(true)
    const publicFolder = "http://localhost:5000/Images/"
    
    useEffect(()=>
    {
        const fetchPost = async() => 
        {
            try
            {
                const fetchedpost = await axios.get(`/post/${post}`);
                setCurrentPost(fetchedpost.data);
                setisLoading(false)
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
        {
            isLoading?<Rectangle/>:
            <Link to ={`/viewPost/${currentpost._id}`}>
               
                <img className="Img"  src={pic} alt="Loading..." ></img>
              
            </Link>
        }
        </>    
    )
}

export default SinglePost;