const mongoose = require("mongoose")
const userSchema = new mongoose.Schema({
    name : {
        type:String,
        required:true
    },
    email:
    {
        type:String,
        required:true,
        unique:true
    },
    username:
    {
        type:String,
        required:true,
        unique:true
    },
    password:
    {
        type:String,
        required:true
    },
    profilepic:
    {
        type:String,
        default:""
    },
    age:
    {
        type:Number,
        required:true,
    },
    contact : 
    {
        type:String,
        required:true
    },
    gender : 
    {
        type:String,
        required:true
    },
    friends : 
    {
        type:Array,
        default:[]
    },
    likedposts : 
    {
        type : Array,
        default:[]
    },
    savedposts :
    {
        type : Array,
        default:[]
    }
},{timestamps:true});

module.exports=mongoose.model("User",userSchema)