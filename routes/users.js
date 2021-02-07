const express = require('express');
const router = express.Router();
const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');
const config = require('config')
const {check,validationResult} = require('express-validator');

const User = require('../models/User');

// register user
router.post('/register',[
    check('name','Please add name').not().isEmpty(),
    check('email','Please include a email').isEmail(),
    check('password','Please enter password with min 6 digits').isLength({
        min:6
    })
],
async (req,res)=> {
    const errors = validationResult(req);
    if(!errors.isEmpty()){
        return res.status(400).json({
            errors : errors.array()
        });
    }

    const {name,email,password} = req.body;

    try {
    
        // validate email
        let user = await User.findOne({email:email})
    
        if(user){
            return res.status(400).json({msg:'user already exists'})
        }

        // add new user
        user = new User({
            name,
            email,
            password
        })

        // hashing passwords
        const salt = await bcrypt.genSalt(10);
        user.password = await bcrypt.hash(password,salt)

        // saving user
        await user.save();

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
})

module.exports = router;