const mongoose = require ('mongoose') 
const commentSchema = mongoose.Schema({
    comment:{
        type:String,
        max:101,

    },
    userName:{
        type:String,
        required:true,
    }



},{timestamps:true})

module.exports = mongoose.model("Comment",commentSchema) 