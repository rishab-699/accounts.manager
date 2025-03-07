const mongoose = require('mongoose');

const bookSchema = new mongoose.Schema({
    userId: {
        type: mongoose.Schema.Types.ObjectId, 
        ref: "User",
        required: true
    },
    bookname:{
        type: String,
        required: true
    },
    balance:{
        type: Number,
        default: 0
    },
    type:{
        type: String,
    },
    classification:{
        type: String,
        required: true
    },
    system_default:{
        type: Boolean,
        default: false
    }
},{timestamps: true});

module.exports = mongoose.model('book', bookSchema);