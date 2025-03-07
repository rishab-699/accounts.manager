const express = require("express");
const router = express.Router();
const booktransactions = require('../lib/book');
const Book = require('../modules/book');
const Transaction = require('../modules/transaction');
const mongoose = require('mongoose')
const { verifyToken } = require("../lib/jwtAuth");
const transaction = require("../modules/transaction");

router.post('/add',async (req,res)=>{
    try {
        const addNewBook = {
            userId: req.body.userId,
            bookname: req.body.bookname,
            balance:  req.body.balance,
            type: req.body.type,
            classification: req.body.classification
        }
        const entry = await booktransactions.addBook(addNewBook);
        
        if(entry !== false) return res.status(200).json(entry);
        return res.status(201).json({message: 'Something went wrong!'});
    } catch (error) {
        return res.status(500).json({message: 'Internal Server Error!'});
    }
})

router.post('/addMany/:id', async (req,res)=>{
    try {
        const entry = await booktransactions.addSystemBooks(req.params.id);
        if(entry !== false) res.status(200).json(entry);
        
    } catch (error) {
        res.status(500).json({message: 'Internal Server Error!'});
    }
})

router.post('/updateBalances', async (req, res) => {
    try {
        const { books } = req.body; // Get books array from request

        // Generate bulk update operations
        const bulkOps = books.map(book => ({
            updateOne: {
                filter: { _id: book.bookId }, // Match book by ID
                update: { $set: { balance: book.balance } } // Update balance
            }
        }));

        // Execute bulk update
        const result = await Book.bulkWrite(bulkOps);

        res.json({ message: "Books updated successfully", result });
    } catch (error) {
        //console.error("Error updating books:", error);
        res.status(500).json({ message: "Server error" });
    }
});


router.get('/SystemDefined/:id', verifyToken,async(req,res)=>{
    try {
        //console.log(req.params.id)
        const getData = await booktransactions.getSystemBookData(req.params.id);
        res.status(200).json({data: getData, message: 'Success'});
    } catch (error) {
        res.status(500).json({message: 'Internal Server Error!'});
    }
})

router.get('/bookTransactions/:userId/:bookId', async (req, res) => {
    try {
        const { userId, bookId } = req.params; // Extract parameters from request

        console.log(req.params); // Debugging

        const transactions = await Transaction.aggregate([
            { $match: { userId: new mongoose.Types.ObjectId(userId), BookId: new mongoose.Types.ObjectId(bookId) } }
        ]);

        return res.status(200).json(transactions);
    } catch (error) {
        console.error("Error fetching book transactions:", error);
        res.status(500).json({ error: "Failed to fetch book transactions" }); // Send proper error response
    }
});


router.get('/:id', async (req, res) => {
    try {
        //console.log("Received request for ID:", req.params.id);

        const getData = await booktransactions.getBookData(req.params.id);
        if (!getData || getData.length === 0) {
            //console.log("No data found, sending 400 response");
            return res.status(400).json({ message: 'No books found!' });
        }

        //console.log("Sending 200 response with data");
        res.status(200).json(getData);

    } catch (error) {
        //console.error("Error fetching book data:", error);
        
        if (!res.headersSent) {  // Ensure response is not sent twice
            return res.status(500).json({ message: 'Internal Server Error!' });
        }
    }
});



module.exports = router;