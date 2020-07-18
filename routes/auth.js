const router = require('express').Router();
const User = require('../models/User');
//validation
const Joi = require('@hapi/joi');
const schema = Joi.object({
    username: Joi.string().min(6).required(),
    email: Joi.string().min(6).required().email(),
    password: Joi.string().min(6).required(),
    password2: Joi.string().min(6).required()
});

router.post('/register', async (req,res)=>{
    const {password,password2,email,username}= req.body
    if(password === password2 ){
        const {error} = schema.validate(req.body);
        if(error) res.send(error.details[0].message);
        const user= new User({
            username: username,
            email: email,
            password: password,
        })
        try{
            const savedUser = await user.save();
            res.send(savedUser);
        }catch(err){
            res.status(400).send(err);
        }

    }else{
        return res.status(400).json({error:"the passwords do not match"})
   
}});

module.exports = router;