const mongoose = require('mongoose')

const postSchema =  new mongoose.Schema({
    photo: {
        type: String,
        required: true
    },
    caption:{
        type:String,
        default: ""
    },
    userName:{
        type:String,
        required:true
    },
    userId:{
        type:String,
        required:true
    },
    comments:{
        type: Array,
        default: []
    },
    likedBy:{
        type: Array,
        default: []
    },
    likeCount: {
        type:Number,
        default: 0
    }
},{timestamps:true})

module.exports = mongoose.model("Post",postSchema)