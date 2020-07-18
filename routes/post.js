const express = require("express")
const router = express.Router()

const mongoose = require("mongoose")

const post = mongoose.model("post")

router.post("/createPost",(req,resp)=>{
    const {documents} = req.body
    if(!username || !email || !documents){
        return resp.status(402).json({error:"the fields shouldn't be empty"})
    }  
    const newPost = new post({
        documents : documents,
        user:req.user
    })
    newPost.save()
    .then((data)=>{
        console.log(data)
        resp.json(data)
    })
})


router.get("/posts",(req,resp)=>{
    post.find()
    .then(posts =>{
        resp.json(posts)
    })
    .catch(err=>{
        console.log(err)
    })
})

