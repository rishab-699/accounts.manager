const express = require("express");
const router = express.Router();
const Transaction = require('../modules/transaction');
const mongoose = require('mongoose')
const Book = require('../modules/book');
const book = require("../modules/book");


//Add Data
router.post('/add',async (req,res)=>{
    try {
        const { userId, BookId, type, amount, description, date } = req.body;
        console.log(req.body)
        if (!userId || !BookId || !amount || !type) {
            return res.status(400).json({ message: "All fields are required" });
        }
        const lastTransaction = await Transaction.findOne({ 
          "BookId": BookId, 
            userId 
        }).sort({ createdAt: -1 });

        let latestBalance = lastTransaction ? lastTransaction.balance : null;

        // 🔹 If no transactions exist, use the book's initial balance
        if (latestBalance === null) {
            const book = await Book.findById(BookId);
            latestBalance = book ? book.balance : 0;
        }
        
        let newBalance = latestBalance;  // Debit book receives money

        if (type === "dr") {
          newBalance += amount;
      } else {
        newBalance -= amount;
      }
        console.log(userId,
          date,
          'BookId',":", BookId,
          'balance',':', newBalance,
          type,
          amount,
          description)
        // 🔹 Save the transaction
        const newTransaction = new Transaction({
            userId,
            date,
            BookId: BookId,
            balance: newBalance,
            type,
            amount,
            description
        });
        
        await newTransaction.save();
        res.status(201).json({ message: "Transaction added successfully", transaction: newTransaction });

    } catch (error) {
        console.error("Transaction Error:", error);
        res.status(500).json({ message: "Internal Server Error" });
    }
});



// User Login
router.get("/:id", async (req, res)=> {
    try{
    const transactions = await Transaction.aggregate([
        // 1️⃣ Match transactions for the given user
        { $match: { userId: new mongoose.Types.ObjectId(req.params.id) } },
  
        // 2️⃣ Lookup for Debit Book Details
        {
          $lookup: {
            from: "books",
            localField: "BookId",
            foreignField: "_id",
            as: "BookDetails",
          },
        },
  
  
        // 4️⃣ Unwind Debit Book Array (since we expect one book per transaction)
        { $unwind: { path: "$BookDetails", preserveNullAndEmptyArrays: true } },
  
      
  
        // 6️⃣ Project Required Fields
        {
          $project: {
            _id: 1,
            date: 1,
            amount: 1,
            description: 1,
            debitBookName: "$BookDetails.bookname",
            type: 1,
            balance: 1
          },
        },
  
        // 7️⃣ Sort Transactions by Date (Latest First)
        { $sort: { date: -1 } },
      ]);
  
      return res.status(200).json(transactions);
    } catch (error) {
      console.error("Error fetching transactions:", error);
      throw error;
    }
})

module.exports = router;