const router = require("express").Router()
const Conversation = require("../Models/Conversation")

router.post("/",async(req,res)=>{
    const newConversation = new Conversation({
        members : [req.body.senderId,req.body.receiverId],
    });
    try {
        const savedConversation = await newConversation.save()
        res.status(200).json(savedConversation)
    } catch (err) {
        res.status(200).json(err)
    }
});

router.get("/:id",async(req,res)=>{
    try {
        const conversations = await Conversation.find({
            members : {$in : [req.params.id]},
        })
        res.status(200).json(conversations)
    } catch (err) {
        res.status(200).json(err)
    }
})



module.exports=router