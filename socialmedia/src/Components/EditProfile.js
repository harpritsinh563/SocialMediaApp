import React, { useContext } from 'react'
import Navbar from './Navbar'
import { useState, useEffect } from 'react'
import axios from "axios"
import { Context } from '../context/Context'
import { Tooltip } from '@material-ui/core'
import './EditProfile.css'
import {TextField} from '@material-ui/core'
import NavbarHome from './NavbarHome';

export const EditProfile = () => {

    const [userInfo, setuserInfo] = useState({})
    const publicfolder = "http://localhost:5000/Images/"
    const [name, setName] = useState("")
    const [uname, setUname] = useState("")
    const [age, setAge] = useState(0)
    const [phone, setPhone] = useState("")
    const [profilepicImage,setprofilepic]=useState(null)
    const { user, dispatch } = useContext(Context)
    const currId = user._id;

    useEffect(() => {
        const fetchInfo = async () => {
            try {
                const uInfo = await axios.get(`/user/${currId}`)
                setuserInfo(uInfo.data)
                setName(uInfo.data.name)
                setUname(uInfo.data.userName)
                setAge(uInfo.data.age)
                setPhone(uInfo.data.contact)
            } catch (err) {
                console.log("Error")
            }
        }
        fetchInfo()
    }, [])

    const handleUpdate = async (e) => {
        e.preventDefault()
        try {
            let fname;
            const updatedUser = {
                userName: uname,
                contact: phone,
                age: age,
                name: name
            }
            if(profilepicImage)
            {
                const data = new FormData();
                fname = user._id+Date.now();   
                data.append("fname",fname);
                data.append("file",profilepicImage);
                updatedUser.profilepic=fname;
                try {
                    await axios.post('/uploads',data);
                } catch (err) {
                    console.log(err.data);
                }
            }
            const res = await axios.put(`/user/${currId}`, updatedUser)
            dispatch({ type: "UPDATE",payload: res.data })
            setuserInfo(res.data);
            window.location.replace(`/userProfile/${user._id}`)
        } catch (err) {
            console.log(err.data);
        }
    }

    return (
            <>
            <NavbarHome/>
            <div className="editprofile_container">
                <form onSubmit={handleUpdate}>
                <div className="editprofile_card">
                    <div className="editprofile_top">     
                            {<img className="editprofile_top_img" src={profilepicImage?URL.createObjectURL(profilepicImage):publicfolder+userInfo.profilepic}/>}
                            <label htmlFor="profileinput">
                                <Tooltip title="Edit Profile">
                                <i className="editprofile_cameraicon fas fa-camera"></i>
                                </Tooltip>
                            </label>
                            <input type="file" onChange={(e)=>setprofilepic(e.target.files[0])} id="profileinput" style={{display:"none"}}/>
                    </div>
                    <div className="editprofile_bottom">
                    <TextField id="standard-basic" value={name} onChange={(e)=>setName(e.target.value)} label="Name" variant="standard" />
                    <TextField style={{marginTop:"1.5vh"}} id="standard-basic" value={uname} onChange={(e) => setUname(e.target.value)} label="Username" variant="standard" />
                    <TextField style={{marginTop:"1.5vh"}} id="standard-basic" value={phone} onChange={(e) => setPhone(e.target.value)} label="Phone" variant="standard" />
                    <TextField style={{marginTop:"1.5vh"}} id="standard-basic" value={age} onChange={(e) => setAge(e.target.value)} label="Age" variant="standard" />
                    <button className="editprofile_submit_button" type="submit" >Update!</button>
                    </div>
                </div>
                </form>
            </div>


        </>
    )
}

export default EditProfile