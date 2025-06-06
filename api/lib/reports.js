const book = require('../modules/book');
const Transaction = require('../modules/transaction');
const mongoose = require('mongoose');

async function quickActions(userId){
    try {
        const currentMonthData = await Transaction.aggregate([
            {
                $match: {
                    userId: new mongoose.Types.ObjectId(userId),
                    date: {
                        $gte: new Date(new Date().getFullYear(), new Date().getMonth(), 1), // First day of current month
                        $lt: new Date(new Date().getFullYear(), new Date().getMonth() + 1, 1) // First day of next month
                    }
                }
            },
            {
                $lookup: {
                    from: "books",
                    localField: "BookId",
                    foreignField: "_id",
                    as: "bookDetails"
                }
            },
            {
                $unwind: "$bookDetails"
            },
            {
                $group: {
                    _id: "$bookDetails.type", // Group by book type (sales, purchases, expenses)
                    totalAmount: {
                        $sum: {
                            $cond: {
                                if: { $eq: ["$type", "dr"] }, // Add for debit transactions
                                then: "$amount",
                                else: { $multiply: ["$amount", -1] } // Subtract for credit transactions
                            }
                        }
                    }
                }   
            },
            {
                $project: {
                    _id: 0,
                    category: "$_id", // Sales, Purchases, Expenses
                    totalAmount: 1
                }
            }
        ]);        

        return currentMonthData
        
    } catch (error) {
        return false
    }
}
async function salesChart(userId){
    try {
        const monthlySales = await Transaction.aggregate([
            {
              $match: {
                userId: new mongoose.Types.ObjectId(userId),
                date: {
                  $gte: new Date(new Date().getFullYear(), new Date().getMonth() - 6, 1), // last 6 months
                  $lte: new Date()
                }
              }
            },
            {
              $lookup: {
                from: 'books',
                localField: 'BookId',
                foreignField: '_id',
                as: 'book'
              }
            },
            { $unwind: '$book' },
            {
              $match: {
                'book.type': 'sales'
              }
            },
            {
              $addFields: {
                month: { $month: '$date' },
                year: { $year: '$date' }
              }
            },
            {
              $group: {
                _id: {
                  year: '$year',
                  month: '$month'
                },
                totalSales: {
                  $sum: {
                    $cond: [
                      { $eq: ["$type", "dr"] },
                      "$amount",
                      { $multiply: ["$amount", -1] }
                    ]
                  }
                }
              }
            },
            {
              $sort: {
                '_id.year': 1,
                '_id.month': 1
              }
            },
            {
              $project: {
                _id: 0,
                month: {
                  $concat: [
                    { $toString: '$_id.month' },
                    '-',
                    { $toString: '$_id.year' }
                  ]
                },
                totalSales: 1
              }
            }
          ]);
          console.log(monthlySales);
          return monthlySales;
    } catch (error) {
        return false
    }
}
module.exports = {quickActions, salesChart}