const router = require("express").Router()
const User = require("../Models/User")
const bcrypt = require("bcrypt")
const Post = require("../Models/Post")

// send data -> post
// update data -> put
// delete data -> delete 
// get data  -> get

function compare( a, b ) 
{
    if ( a.createdAt > b.createdAt ){
      return -1;
    }
    if ( a.createdAt < b.createdAt ){
      return 1;
    }
    return 0;
}  


router.put("/:id",async(req,res)=>{
    try{
        const updateduser = await User.findByIdAndUpdate(req.params.id,{
            $set: req.body
        },{new:true})
        res.status(200).json(updateduser)
    }
    catch(err){
        res.status(403).send("Update Failed")
    }
})

router.get("/",async(req,res)=>{
    try{
        const user = await User.find()
        res.status(200).json(user);
    }catch(err){
        console.log(err)
    }
})

router.delete("/:id",async(req,res)=>{
    try{
        const user = await User.findByIdAndDelete(req.params.id)
        res.status(200).send("User Deleted!!");
    }
    catch(err){
        res.status(403).send("User Deleted")
    }
})

router.get("/:id",async(req,res)=>{
    try{
        const user = await User.findById(req.params.id)
        res.status(200).json(user)
    }
    catch{
        res.status(403).send("user not found")
    }
})

router.put("/:id/addFriend",async(req,res)=>{
    try{        
        const user = await User.findById(req.params.id);
        const currentFriendcount = user.friendCount;
        const otheruser = await User.findById(req.body.userId);
        const otheruserFriends = otheruser.friendCount
        if(!(user.friends.includes(req.body.userId)))
        {
            await user.updateOne({$push:{friends:req.body.userId},friendCount : currentFriendcount + 1})
            await otheruser.updateOne({
                $push:{friends:req.params.id},
                friendCount : otheruserFriends+1
            })
        }
        else
        {
            await user.updateOne({$pull:{friends:req.body.userId},friendCount : currentFriendcount - 1})
            await otheruser.updateOne({
                $pull:{friends:req.params.id},
                friendCount : otheruserFriends-1
            })
        }
        res.status(200).json(user)
    }
    catch{
        res.status(200).send(err.message);
    }
})


router.put("/:id/savedPost",async(req,res)=>{
    try{
        const user = await User.findById(req.body.userId)
        const post = await Post.findById(req.params.id)
        if(user.savedposts.includes(req.params.id))
        {
            await user.updateOne({
                $pull:{savedposts:req.params.id}
            })
            await post.updateOne({
                $pull:{savedBy:req.body.userId}
            })
        }
        else{
            await user.updateOne({
                $push:{savedposts:req.params.id}
            })
            await post.updateOne({
                $push:{savedBy:req.body.userId}
            })
        }

        const updatedUser = await User.findById(req.body.userId)
        
        // updatedUser.sort(compare);
        res.status(200).json(updatedUser)
    }
    catch(err){
        res.status(200).json(err.message)
    }
})

router.post("/searchProfile",async(req,res)=>{
    try{
        const regexterm = new RegExp( req.body.searchTerm,'i')
        const users = await User.find({ userName: {$regex:regexterm}} )
        res.status(200).json(users)
    }catch(err){

        console.log(err.message)
    }
})

module.exports = router

