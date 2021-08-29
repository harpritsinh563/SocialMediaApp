import React from 'react'
import { useEffect, useState } from 'react'
import { useLocation } from 'react-router'
import axios from 'axios'
import Friend from './Friend'
import NavbarHome from './NavbarHome'
const Search = () => {

    const [searchResult, setsearchResult] = useState([])
    const location = useLocation()
    const searchTerm = location.pathname.split('/')[2];

    // console.log(searchTerm)

    useEffect(() => {
        const getSearchProfile = async () => {
            const profile = await axios.post(`/user/searchProfile`, { searchTerm })
            // console.log(profile)   
            setsearchResult(profile.data)
        }
        getSearchProfile()
    }, [])

    return (
        <>
            <NavbarHome />
            <div className="Container">
            <div className="title_Friend">Search Results for {searchTerm}</div> 
                <div className='Friends'>
                    {searchResult.map((e) => (
                        <Friend
                            friend={e._id}
                        />
                    ))}
                </div>
            </div>
        </>
    )
}

export default Search
