import React, {useState, useEffect} from 'react';
import Post from './Post';
import NavbarHome from './NavbarHome';
import './home.css';
import axios from 'axios'

const Home = () =>  {

    const [posts, setposts] = useState([])
    let currId = "61275e11f0201774782ba0cd";
    useEffect(() => {

		const fetchPost = async() => {
			const currPosts = await axios.get(`post/${currId}/feedPosts`)
            setposts(currPosts.data)
        }
		fetchPost()
        
    }, [])

    console.log(posts)

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