const router = require("express").Router()
const User = require("../Models/User")
const bcrypt = require("bcrypt")
const crypto = require("crypto")
const nodemailer = require("nodemailer")
const dotenv = require("dotenv")
dotenv.config();
const transporter = nodemailer.createTransport({
    service:"gmail" , 
    auth : {
        user : process.env.GMAIL_USER,
        pass : process.env.GMAIL_PASS,
    },
    tls : {
        rejectUnauthorized : false,
    } 

})

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
            profilepic : req.body.profilepic,
            emailToken : crypto.randomBytes(64).toString('hex')
        });
        const user = await newUser.save();
        console.log(process.env.Gmail_user)
        console.log(process.env.Gmail_pass)
        
        const mailOptions = {
            from : process.env.Gmail_user,
            to : user.email,
            subject : 'Verify your mail',
            html : `<p> Thanks for Registering </p>
                    <p> Please verify yourself to continue </p>
                    <a href="http://${req.headers.host}/api/auth/verify-email?token=${user.emailToken}">click here</a>`
        }   
        transporter.sendMail(mailOptions,(err,info)=>{
            if(err)
                console.log(err);
            else
                console.log(info);
        })
        res.status(200).json(user);
    }
    catch(err)
    {
        res.status(403).send(err.message);
    }
})

router.get("/verify-email",async(req,res)=>{
    try{
        const token = req.query.token
        const user = await User.findOne({emailToken : token})
        !user && res.status(403).json("not found")
        user.confirmed = true
        user.emailToken = ""
        await user.save();
        // res.status(200).send("ok")
        return res.redirect('http://localhost:3000/')
    }
    catch(err){
        console.log(err.message)
    }
})

router.post("/login",async(req,res)=>{
    try
    {
        const user = await User.findOne({userName : req.body.userName});
        const comparepass = await bcrypt.compare(req.body.password,user.password);
        !comparepass && res.status(200).json("Wrong password");
        res.status(200).json(user);
    }
    catch(err)
    {
        res.status(403).json("User not found")
    }
})

module.exports=router