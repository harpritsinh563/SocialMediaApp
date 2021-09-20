import React,{useState,useContext} from 'react'
import { Button } from '@material-ui/core'
import { Context } from '../context/Context';
import axios from  'axios'

const AddPost = () => {

    const [Des, setDes] = useState("")
    const [photo, setphoto] = useState({})

    const {user} = useContext(Context)

    const handlePostUpload = async (e) =>{
        e.preventDefault() 
        const data = new FormData()
        const fname = user._id + Date.now() 
        
        const newPost = {
            photo: fname,
            caption: Des,
            userName: user.userName,
            userId: user._id
        }

        data.append('fname',fname)
        data.append("file",photo)

        try{
           const res =  await axios.post('/uploads',data)
           console.log(res)
        }catch(err){
            console.log(err)
        }

        try{
            const finalPost = await axios.post('/post/addPost',newPost)
        }catch(err){
            console.log(err)
        }

    }
    
    return (
        <>
            <form enctype="multipart/form-data" onSubmit = {(e)=>handlePostUpload(e)}>
                <div className="container">
                    <div className="box">
                        <div className="text">
                            <input type="text" onChange={(e)=> setDes(e.target.value) } placeholder="What's on your mind..." ></input>
                        </div>
                        <div className="photo">  
                            <input type="file" onChange={ (e) => setphoto(e.target.files[0]) } ></input>
                        </div>
                        <Button type="submit" >Post</Button>
                    </div>
                </div>
            </form>
        </>
    )
}

export default AddPost
