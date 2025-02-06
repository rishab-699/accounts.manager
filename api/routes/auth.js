const express = require("express");
const bcrypt = require("bcryptjs");
const {generateToken} = require('../lib/jwtAuth');
const router = express.Router();

const users = []; //Mock Database

router.post('/register',async (req, res)=>{
    const {username, password} = req.body;
    const hashedpassword = await bcrypt.hash(password, 10);
    const user = {id: Date.now(), username, password: hashedpassword};
    users.push(user);
    res.status(200).json({message: 'registered Successfully'});
})


// User Login
router.post("/login", async (req, res)=> {
    const { username, password } = req.body;
    const user = users.find((u) => u.username === username);
    if(!user || (!await bcrypt.compare(password, user.password))){
        return res.status(401).json({ message: "Invalid credentials" });
    }
    const token = generateToken(user);
    res.cookie("token", token,{httpOnly: true, secure: false}).json({token});
})

module.exports = router;