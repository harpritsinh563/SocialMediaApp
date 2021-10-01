import React, {useState, useEffect, useContext} from 'react';
import Post from './Post';
import './home.css';
import axios from 'axios'
import { Context } from '../context/Context';
import NavbarHome from './NavbarHome';

const Home = () =>  {

    const [posts, setposts] = useState([])
    const {user,dispatch} = useContext(Context)
    const currId = user._id
    useEffect(() => {

		const fetchPost = async() => {
			const currPosts = await axios.get(`post/${currId}/feedPosts`)
            setposts(currPosts.data)
        }
		fetchPost()
        
    }, [])
    return (
        <>
            <NavbarHome/>
            <div className="container">
            {
                posts.map((p)=>(
                    <Post post={p} />
                ))
            }
            </div>
        </>
    );
}

export default Home;