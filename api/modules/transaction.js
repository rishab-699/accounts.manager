const mongoose = require('mongoose');

const transactionSchema = new mongoose.Schema({
    userId: {
        type: mongoose.Schema.Types.ObjectId, 
        ref: "User",
        required: true
    },
    BookId: {  // Debit Book
        type: mongoose.Schema.Types.ObjectId, 
        ref: "Book",
        required: true
    },
    balance:{
        type: Number,
        required: true
    },
    date: {
        type: Date,
        required: true
    },
    amount: {
        type: Number,  // Changed from String to Number
        required: true
    },
    description: {
        type: String,
        required: true
    },
    type:{
        type: String,
        Enum: ["dr","cr"],
        required: true
    }
}, { timestamps: true });


module.exports = mongoose.model('transaction', transactionSchema);