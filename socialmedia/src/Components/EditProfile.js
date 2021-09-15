import React, { useContext } from 'react'
import Navbar from './Navbar'
import { useState , useEffect } from 'react'
import axios from "axios"
import { Context } from '../context/Context'

export const EditProfile = () => {

    const [userInfo, setuserInfo] = useState({})

    const [name,setName] = useState("")
    const [uname,setUname] = useState("")
    const [age,setAge] = useState(0)
    const [phone,setPhone] = useState("")

    const {user,dispatch} = useContext(Context)
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
        try{
            const updatedUser = {
                userName: uname,
                contact:  phone,
                age: age,
                name: name
            }
            console.log(updatedUser)
            await axios.put(`/user/${currId}`,updatedUser)
        }catch(err){

        }
    }


    return (
        <div>
            <Navbar/>
        <div className="container">
            <div className="box">
                Update!<br/><br/><br/>
                <form onSubmit = { handleUpdate}>
                    Name <input type="text" value={name} onChange = {(e)=>setName(e.target.value)} /><br/>
                    Uname <input type="text" value={uname}  onChange = {(e)=>setUname(e.target.value)}  /><br/>
                    Phone <input type="text" value={phone} onChange = {(e)=>setPhone(e.target.value)} /><br/>
                    Age <input type="number" value={age} onChange = {(e)=>setAge(e.target.value)} /><br/>
                    <br/><br/>
                    <button className="signupbutton" type="submit" > Update! </button> <br/><br/>
                </form>
            </div>
        </div>
        </div>
    )
}
export default EditProfile