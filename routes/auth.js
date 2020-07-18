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
});




module.exports = router;