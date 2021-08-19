import React from 'react'
import './TopProfile.css'
import {Tooltip} from '@material-ui/core'

const TopProfile = () => {
    return (
        <>
            <div className="topProfile">
                <img className="profilepic" src="https://picsum.photos/200/300 " alt=" " />
                
                <div className="details">
                    <div className="uname">Jainil_92
                        <span className="editIcon">
                                <Tooltip title="Edit info">
                                    <i  className="far fa-user-edit icon"></i> 
                                </Tooltip>
                        </span> 
                    </div>
                    
                    
                    <div className="together">
                        <div className="tittle">7 Posts</div>
                        <div className="tittle">420 Frandz </div>
                    </div>
                </div>
            </div>
        </>
    )
}


export default TopProfile;
