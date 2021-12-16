import React, { useContext,useState } from 'react'
import './TopProfile.css'
import { Tooltip } from '@material-ui/core'
import { Link } from 'react-router-dom'
import { Context } from '../context/Context'
import axios from 'axios'

const TopProfile = ({ topProfile }) => {
    const publicFolder = "http://localhost:5000/Images/"
    const pic = publicFolder + topProfile.photo;
    const { user, dispatch } = useContext(Context);
    const [userstate,setuserstate]=useState(user);
    const handleAddfriend = async() =>
    {
        try
        {
            const friendAdded = await axios.put('/user/'+user._id+'/addFriend/',{userId:topProfile.userId});
            dispatch({type:'UPDATE',payload:friendAdded.data});
            window.location.href="/userProfile/"+topProfile.userId;
        }
        catch(err)
        {
            console.log(err)
        }
    }

    return (
        <>
            <div className="topProfile">
                { <img className="topProfile_profilepic" src={pic} alt=" " />}
                <div className="topProfile_details">
                    <div className="topProfile_icons_uname">
                        <div className="topProfile_username">{topProfile.userName}</div>
                        <div className="topProfile_icons">
                       
                            {topProfile.userId==user._id &&
                                <Link to='/editProfile'>
                                    <Tooltip title="Edit info">
                                        <i className="far fa-user-edit topProfile_edit_icon"></i>
                                    </Tooltip>
                                </Link>
                            }
                            {
                                topProfile.userId !=user._id && !user.friends.includes(topProfile.userId) && 
                            <Tooltip title="Remove Friend">
                                <i onClick={handleAddfriend} className="far fa-user-minus topProfile_icon_add"> </i>
                            </Tooltip>
                            }
                            {
                                topProfile.userId !=user._id && user.friends.includes(topProfile.userId) && 
                            <Tooltip title="Add Friend">
                                <i onClick={handleAddfriend} className="far fa-user-plus topProfile_icon_add"> </i>
                            </Tooltip>
                            }
                            {
                                topProfile.userId==user._id &&
                                <Link className="link" to="/AddPost">
                                    <Tooltip title="Add Post">
                                        <i className="topProfile_icon_add_post far fa-plus-square"></i>
                                    </Tooltip>
                                </Link>
                            }
                        </div>
                    </div>
                    <div className="topProfile_info_parent">
                        <div className="topProfile_text">{topProfile.postCount} Posts</div>
                        <div className="topProfile_text topProfile_friends">
                            <Link className='link' to={`/userFriends/${topProfile.userId}`}>{topProfile.friendsCount} Friends</Link>
                        </div>
                    </div>
                </div>
            </div>
        </>
    )
}


export default TopProfile;
