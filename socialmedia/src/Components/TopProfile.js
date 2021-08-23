import React from 'react'
import './TopProfile.css'
import {Tooltip} from '@material-ui/core'
import {Link} from 'react-router-dom'

const TopProfile = () => {
    return (
        <>
            <div className="topProfile">
                <img className="profilepic" src="https://picsum.photos/200/300 " alt=" " />
                
                <div className="details">
                    <div className="uname">Jainil_92
                        <Link to='/editProfile'>
                        <span className="editIcon">
                                <Tooltip title="Edit info">
                                    <i  className="far fa-user-edit icon"></i> 
                                </Tooltip>
                                <Tooltip title="Add Friend">
                                    <i className="far fa-user-plus icon_add"> </i> 
                                </Tooltip>
                        </span> 
                        </Link>
                    </div>
                    
                    
                    <div className="together">
                        <div className="tittle">7 Posts</div>
                        <div className="tittle friends">
                            <Link className = 'link' to = '/userFriends'>420 Frandz</Link> 
                        </div>
                    </div>
                </div>
            </div>
        </>
    )
}


export default TopProfile;
