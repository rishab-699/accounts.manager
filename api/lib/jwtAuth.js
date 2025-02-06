//jsonwebtoken setup
const jwt = require('jsonwebtoken');
const dotenv = require('dotenv');
dotenv.config();

//generate jwt token
const generateToken = (user)=>{
    return jwt.sign(
        {id: user.id, username: user.username},
         process.env.JWT_SECRET,
         {expiresIn: "1h"});
}

//Middleware: to verify the token
const verifyToken= (req, res, next)=>{
    const token = req.cookies.token;
    if(!token) return res.status(401).json({message: 'Unauthorised Access!'});

    jwt.verify(token, process.env.JWT_SECRET, (err, decoded)=>{
        if(err) return res.status(403).json({message: 'Forbidden'});
        req.user = decoded;
        next();
    });
};

module.exports = {generateToken, verifyToken};