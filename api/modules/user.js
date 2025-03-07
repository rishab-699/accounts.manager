const mongoose = require('mongoose');

const userSchema = new mongoose.Schema({
    firm:{
        type: String,
        required: true
    },
    OwnerName:{
        type: String,
        required: true
    },
    email:{
        type: String,
        required: true
    },
    password:{
        type: String,
        required: true
    }
},{timestamps: true});

module.exports = mongoose.model('user', userSchema);