const express = require("express");
const bcrypt = require("bcryptjs");
const {generateToken} = require('../lib/jwtAuth');
const router = express.Router();

const transactions = []; //Mock Database

router.post('/add',async (req, res)=>{
    
    transactions.push(req.body);
    res.status(200).json({message: 'registered Successfully'});
})


// User Login
router.get("/", async (req, res)=> {
    res.status(200).json(transactions);
})

module.exports = router;