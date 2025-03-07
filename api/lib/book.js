const book = require('../modules/book');
const transaction = require('../modules/transaction');
const mongoose = require('mongoose');

async function addSystemBooks(id){
    try {
        const systemBooks = await book.insertMany([{
            userId: id,
            bookname: 'Sales Book',
            type: 'sales',
            classification: 'liability',
            system_default: true
          },
          {
            userId: id,
            bookname: 'Purchase Book',
            type: 'Purchase',
            classification: 'liability',
            system_default: true
          },
          {
            userId: id,
            bookname: 'Cash Book',
            type: 'cash',
            classification: 'asset',
            system_default: true
          },
          {
            userId: id,
            bookname: 'Bank Book',
            type: 'bank',
            classification: 'asset',
            system_default: true
          },
          {
            userId: id,
            bookname: 'Expense Book',
            classification: 'expenses',
            system_default: true
          }]);
          return systemBooks;
    } catch (error) {
        console.log(error);
        return 'Something went wrong!';
    }
}
async function addBook(obj){
    try {
        const newBook = new book(obj);
        const save = await newBook.save();
        const res = {
            bookEntry: save,
            response: true
        }
        return res;
    } catch (error) {
        console.log(error)
        return false;
    }
}

async function getbookBalance(userId){
    const latestBalances = await transaction.aggregate([
        {
            $match: { userId: new mongoose.Types.ObjectId(userId) } // Match transactions for the given user
        },
        {
            $sort: { date: -1 } // Sort transactions by date (latest first)
        },
        {
            $group: {
                _id: "$BookId", // Group by bookId from debitBook
                latest_balance: { $first: "$balance" } // Take the latest balance
            }
        },
        {
            $unionWith: {
                coll: "transactions",
                pipeline: [
                    { 
                        $match: { userId: new mongoose.Types.ObjectId(userId) } 
                    },
                    { $sort: { date: -1 } },
                    { 
                        $group: { 
                            _id: "$creditBook.BookId",
                            latest_balance: { $first: "$creditBook.balance" }
                        }
                    }
                ]
            }
        },
        {
            $group: {
                _id: "$_id",
                latest_balance: { $first: "$latest_balance" } // Keep the latest balance if a book appears in both debit & credit
            }
        }
    ]);
    
    console.log("Latest Book Balances:", latestBalances);
    return latestBalances;    
}

async function getBookData(id){
    try {
        const mongoose = require("mongoose");


        const booksWithBalance = await book.aggregate([
        {
            $match: { userId: new mongoose.Types.ObjectId(id) }
        },
        {
            $lookup: {
                from: "transactions",
                let: { bookId: "$_id" },
                pipeline: [
                    { $match: { $expr: { $eq: ["$BookId", "$$bookId"] } } },
                    { $sort: { date: -1 } },  // Get the latest transactions first
                    { $limit: 1 }  // Only the most recent transaction per book
                ],
                as: "latest_transaction"
            }
        },
        {
            $addFields: {
                latest_balance: {
                    $cond: {
                        if: { $gt: [{ $size: "$latest_transaction" }, 0] }, // If a transaction exists
                        then: {
                            $let: {
                                vars: { txn: { $arrayElemAt: ["$latest_transaction", 0] } },
                                in: {
                                    $cond: [
                                        { $eq: ["$$txn.type", "dr"] }, // If debit, add
                                        { $add: ["$balance", "$$txn.amount"] },
                                        { $subtract: ["$balance", "$$txn.amount"] } // If credit, subtract
                                    ]
                                }
                            }
                        },
                        else: "$balance" // If no transactions, use book's original balance
                    }
                }
            }
        },
        {
            $project: {
                latest_transaction: 0  // Remove unnecessary transaction details
            }
        }
    ]);

    
        if (!booksWithBalance || booksWithBalance.length === 0) {
            console.log("No book data found for user:", id);
            return false; 
        }

         return booksWithBalance;;
    } catch (error) {
        console.error("Error in getBookData:", error);
        return false;
    }
}
async function getSystemBookData(id){
    try {
        const userBookExist = await book.find({userId:id});
        if(userBookExist.length > 0 ){
            const bookData = await book.find({
                userId: id,
                system_default: true,
                balance: { $lte: 0 }
              });
              return bookData
        }else{
            return addSystemBooks(id);
        }
    } catch (error) {
        return false
    }
}

module.exports = {addBook, addSystemBooks, getBookData, getSystemBookData}
