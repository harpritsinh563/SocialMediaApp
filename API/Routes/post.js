const router = require('express').Router()
const Post = require("../Models/Post")

/*
     post -> send data 
    put -> update data
    delete -> delete data 
    get -> get data
*/

router.put("/:id",async(req,res) =>{

    try{
        const updatedPost= await Post.findByIdAndUpdate(req.params.id,{
            $set:req.body
        },{new:true})
        res.status(200).json(updatedPost)
    }catch(err){
        res.status(403).send("Error updating your Post")
    }
})

router.post("/addPost",async(req,res)=>{
    try{
        const newPost = new Post({
            photo: req.body.photo,
            caption: req.body.caption,
            userName: req.body.userName,
        })
        const post = await newPost.save()
        res.status(200).json(post)
    }catch(err){
        res.status(403).send("Error updating your Post")
    }
})

router.delete("/:id",async(req,res)=>{
    try{
        const post = await Post.findByIdAndDelete(req.params.id)
        res.status(200).send("Post Deleted successfully");
    }catch(err){
        res.status(403).send("Error deleting your Post")
    }
})

router.get("/:id",async (req,res)=>{
    try{
        const post = await Post.findById(req.params.id)
        res.status(200).json(post);
    }catch(err){
        res.status(403).send("Error reading your Post")
    }
})

router.get("/",async (req,res)=>{
    try{
        const userName = req.query.userName
        let post = await Post.find({
            userName: userName
        })
        res.status(200).json(post)
    }catch(err){
        res.status(403).send("Error displaying your Post")
    }
})
module.exports = router