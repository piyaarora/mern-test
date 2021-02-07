const { Router } = require('express')
const express = require('express')
const router = express(Router);
const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');
const config = require('config');
const auth = require('../middleware/auth')
const {check,validationResult} = require('express-validator');

const User = require('../models/User');


// get login user via private route
router.get('/',auth,async (req,res)=> {
    try {
        const user = await User.findById(req.user.id).select('-password');
        res.json(user);
    
    } catch (err) {
        console.error(err.message);
        res.status(500).send('server error')
    }
})


// auth user and get token

router.post('/login',[
    check('email','Please enter valid email').isEmail(),
    check('password','Password is required').exists()
],
async (req,res)=>{
    const errors = validationResult(req);
    if(!errors.isEmpty()){
        return res.status(400).json({
            errors : errors.array()
        });
    }

    const {email,password} = req.body;

    try {

         // validate email to get data from db
         let user = await User.findOne({email:email})
    
         if(!user){
             return res.status(400).json({msg:'Invalid credentials'})
         }
 
       
        const isMatch = await bcrypt.compare(password,user.password)

        if(!isMatch){
            return res.status(400).json({msg:'passwords dont match'})

        }

        // jwt token
        const payload = {
            user:{
                id:user.id
            }
        }

        jwt.sign(payload,config.get('jwtSecret'),{
            expiresIn:3600000
        },(err,token)=>{
            if (err) throw err;
            res.json({token})
        })

    } catch (err) {
        console.error(err.message);
        res.status(500).send('server error')
    }
    // res.send("login user")
})
module.exports = router