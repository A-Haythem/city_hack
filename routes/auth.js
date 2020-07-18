const router = require('express').Router();
const User = require('../models/User');
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
    }
});





module.exports = router;