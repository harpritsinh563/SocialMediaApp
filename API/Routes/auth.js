const router = require("express").Router()
const User = require("../Models/User")
const bcrypt = require("bcrypt");
// REGISTER
// POST // GET 

router.post("/register",async(req,res)=>{
    try
    {
        const salt = await bcrypt.genSalt(13);
        const hashedpass = await bcrypt.hash(req.body.password,salt);
        const newUser =  new User({
            userName : req.body.userName,
            password : hashedpass,
            email : req.body.email,
            age : req.body.age,
            name : req.body.name,
            contact : req.body.contact,
            gender : req.body.gender,
            profilepic : req.body.profilepic
        });
        const user = await newUser.save();
        res.status(200).json(user);
    }
    catch(err)
    {
        res.status(403).send("Something went wrong");
    }
})
router.post("/login",async(req,res)=>{
    try
    {
        const user = await User.findOne({userName : req.body.userName});
        const comparepass = await bcrypt.compare(req.body.password,user.password);
        !comparepass && res.status(403).json("WRONG PASSWORD");
        res.status(200).json(user);
    }
    catch(err)
    {
        res.status(403).json("User not found")
    }
})

module.exports=router