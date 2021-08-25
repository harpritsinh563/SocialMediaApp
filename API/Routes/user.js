const router = require("express").Router()
const User = require("../Models/User")
const bcrypt = require("bcrypt")

// send data -> post
// update data -> put
// delete data -> delete 
// get data  -> get

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
        await user.updateOne({$push:{friends:req.params.id},friendCount : currentFriendcount + 1})
        const otheruser = await User.findById(req.body.userId);
        const otheruserFriends = otheruser.friendCount
        await otheruser.findByIdAndUpdate(req.params.id,{
            $push:{friends:req.body.userId},
            friendCount : otheruserFriends+1
        },{new:true})
        res.status(200).json(user)
    }
    catch{
        res.status(403).send("ERROR");
    }
})

router.put("/:id/savedPost",async(req,res)=>{
    try{
        const user = await User.findById(req.body.userId)
        if(user.savedposts.includes(req.params.id))
        {
            await user.updateOne({
                $pull:{savedposts:req.params.id}
            })
        }
        else{
            await user.updateOne({
                $push:{savedposts:req.params.id}
            })
        }
        const updatedUser = await User.findById(req.body.userId)
        res.status(200).json(updatedUser)
    }
    catch(err){
        res.status(403).send(err.message)
    }
})
module.exports = router
