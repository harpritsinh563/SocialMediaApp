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

router.get("/convo/:id",async(req,res)=>{
    try
    {
        const convo = await Conversation.findById(req.params.id);
        return res.json(convo);

    }catch(err)
    {

    }


})


router.get("/:rId/:sId",async(req,res)=>{
    try
    {
        
        const conversations = await Conversation.find({
            members : {$in : [req.params.rId]},
        })
        let conversation1 = [];
        conversations.forEach((e)=>{
            if(e.members[0]==req.params.sId || e.members[1]==req.params.sId)
            {
                conversation1.push(e)
                return res.json(conversation1);
            }
        })
        return res.json(conversation1);
    }catch(er)
    {

    }
})


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