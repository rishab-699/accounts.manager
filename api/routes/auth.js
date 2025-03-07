const express = require("express");
const bcrypt = require("bcryptjs");
const {generateToken} = require('../lib/jwtAuth');
const user = require('../lib/user');
const router = express.Router();
const users = require('../modules/user');

router.post('/register',async (req, res)=>{
    const {username, password} = req.body;
    const hashedpassword = await bcrypt.hash(password, 10);
    const userdata = {
        firm: req.body.firm,
        name:req.body.userName,
        email:req.body.email,
        password: hashedpassword
    };
    const register = await user.registerUser(userdata);
    if(register === false) res.status(201).json({register,message: 'register not Successfully'});
    res.status(200).json({register,message: 'registered Successfully'});
})


// User Login
router.post("/login", async (req, res)=> {
    const { email, password } = req.body;
    try {
        const user = await users.findOne({email: email});
        console.log(user.password)
    if(!user || (!await bcrypt.compare(password, user.password))){
        return res.status(401).json({ message: "Invalid credentials" });
    }
    const token = generateToken(user);
    res.cookie("token", token,{httpOnly: true, secure: false}).json({token,user});
    } catch (error) {
        console.log('login route error')
        console.log(error);
        res.status(500).json({message: 'Server Side Error!'})
    }
    
})

module.exports = router;