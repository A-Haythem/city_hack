const mongoose = require("mongoose")

const {ObjectId} = mongoose.Schema.Types
const postSchema = mongoose.Schema({
    document:{
        type:String,
        required: true
    },
    content:{
        type:String,
        required: true
    },
    postedBy:{
        type:ObjectId,
        ref:"user"
    },
})

mongoose.model("post",postSchema)