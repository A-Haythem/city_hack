const router = require('express').Router();
const User = require('../models/User');
//validation
const Joi = require('@hapi/joi');
const schema = Joi.object({
    username: Joi.string().min(6).required(),
    email: Joi.string().min(6).required().email(),
    password: Joi.string().min(6).required()
});

router.post('/register', async (req,res)=>{
    const {password,password2,email,username}= req.body
    if(password === password2 ){
        const user= new User({
            username: username,
            email: req.body.email,
            password: req.body.password,
        })
        try{
            const savedUser = await user.save();
            res.send(savedUser);
        }catch(err){
            res.status(400).send(err);
        }

    }else{
        return res.status(400).json({error:"the password is not identical"})
   
}});

const validation = schema.validate(req.body);
res.send(validation);
const user = new User({
    username: req.body.username,
    email: req.body.email,
    password: req.body.password,
});
try{
    const savedUser = await user.save();
    res.send(savedUser);
}catch(err){
    res.status(400).send(err);
}





module.exports = router;