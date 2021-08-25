const router = require("express").Router()
const Comment = require("../Models/Comment")

// Add comment 
router.post("/",async(req,res)=>
{
    try
    {
        const comment = new Comment({
            comment:req.body.comment,
            userName : req.body.username,
            postId : req.body.postId
        })
        const newcomment = await comment.save();
        res.status(200).json(newcomment);
    }catch(err)
    {
        res.status(403).json(err);
    }
})


// Delete comment 
router.delete("/:id",async(req,res)=>{
    try
    {
        await Comment.findByIdAndDelete(req.params.id);
        res.status(200).send("Deleted");
    }
    catch(err)
    {
        res.status(403).send("Unable to delete");
    }
}
)

// Get all comments of a post
router.get("/:id",async(req,res)=>{
    try
    {   
        const allcomments = await Comment.find({postId:req.params.id});
        res.status(200).json(allcomments);
    }
    catch(err)
    {
        res.status(403).json(err);
    }
})

module.exports=router