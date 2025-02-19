const express = require('express');
const dotenv = require('dotenv');
const cors = require('cors');
const mongoose = require('mongoose');
//jsonwebtoken setup
const cookieParser = require('cookie-parser');
const authRoutes = require("./routes/auth");
const transactionRoutes = require("./routes/transactions");
const { verifyToken } = require("./lib/jwtAuth");
dotenv.config();

const app = express();

app.use(cors({
    "origin":true,
    "credentials": true
}));
//setting up cookie-parser
app.use(cookieParser());

//connect to mongodb server with adding database name in .env file
/*mongoose.connect(process.env.MONGOURL, { dbName: process.env.MONGODATABASE })
.then(() => console.log("Backend database connected"))
.catch((err) => console.log(err));*/
app.use(express.json());


app.use("/auth", authRoutes);
app.use("/transactions", transactionRoutes);

app.get("/dashboard", verifyToken, (req, res)=> {
    res.json({ message: `Welcome, ${req.user.username}!` });
});


app.get('/api',(req,res)=>{
    res.status(200).send('Server Live!');
})

app.listen(process.env.PORT,()=>{
    console.log('Server Live at port: ',process.env.PORT)
})
