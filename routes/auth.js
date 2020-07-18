const router = require('express').Router();
const User = require('../models/User');
const{registrationValidation,loginValidation} = require('../middleware/validation')

router.post('/register', async (req,res)=>{
    const {password,password2,email,username}= req.body
    if(password === password2 ){
        //validation
        const {error} = registrationValidation(req.body);
        if(error) return res.status(400).send(error.details[0].message);

        //check if user exists
        const emailExist = await User.findOne({email: req.body.email});
        if(emailExist) return res.status(400).send('Email already exists');

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

router.post('/login', async (req,res)=>{
    //validation
    const {error} = loginValidation(req.body);
    if(error) return res.status(400).send(error.details[0].message);

    //check if user exists
    const user = await User.findOne({email: req.body.email});
    if(!user) return res.status(400).send('Email is incorrect !');
    //password is correct
    if(req.body.password != user.password)
    {return res.status(400).send('Password is incorrect !');}
    res.send('Logged In');
});
module.exports = router;