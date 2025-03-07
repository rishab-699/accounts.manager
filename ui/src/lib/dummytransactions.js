const firm=[
{
  "_id": ObjectId(),
  "name": "John Doe",
  "email": "john@example.com",
  "password_hash": "hashed_password",
  "created_at": ISODate("2025-02-19T12:00:00Z")
}]

const books = [// Books Collection
    {
      "_id": ObjectId(),
      "user_id": ObjectId("userId_here"), 
      "name": "Cash Book",
      "category": "cash", // Enum: sales, purchases, expenses, debtors, creditors, cash, bank
      "created_at": ISODate("2025-02-19T12:00:00Z")
    }
    ]
const transactions = [// Transactions Collection
    {
      "_id": ObjectId(),
      "user_id": ObjectId("userId_here"),
      "book_id": ObjectId("bookId_here"),
      "date": ISODate("2025-02-19T12:00:00Z"),
      "amount": 1500.00,
      "type": "dr", // 'dr' for Debit, 'cr' for Credit
      "description": "Purchase of inventory",
      "balance_after": 5000.00,  // Stores historical balance
      "created_at": ISODate("2025-02-19T12:00:00Z")
    }
    ]