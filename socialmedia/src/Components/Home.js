import React from 'react';
import Post from './Post';
import NavbarHome from './NavbarHome';
import './home.css';

const Home = () =>  {
    return (
        <>
            <NavbarHome/>
            <Post />
        </>
    );
}

export default Home;