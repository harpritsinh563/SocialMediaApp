import React from 'react'
import SinglePost from './SinglePost'
import "./BottomProfile.css";

const BottomProfile = ({bottomProfile}) => {

    return (
        <>
        <div className="bottomProfile">
        {bottomProfile && bottomProfile.map((p)=>(
                <>
                    {p && <SinglePost post = {p} />}
                </>
            ))}
        
        
        </div>
        </>
    )
}

export default BottomProfile;
