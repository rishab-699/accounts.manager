import React, { useContext, useState } from 'react';
import axios from 'axios';
import { Context } from '../../context/Contexts';
import SuggestionInput from'./booksugestion/Suggestioninput'
import './transactions.css';

export default function Addtransactions({ bookDetails }) {
  const today = new Date().toISOString().split('T')[0];
  const [date, setDate] = useState(today);
  const { user } = useContext(Context);

  // 🔹 State for book selection
  const [debitBook, setDebitBook] = useState();
  const [amount, setAmount] = useState('');
  const [description, setDescription] = useState('');
  

  // 🔹 Handle form submission
  const handleSubmit = async (e) => {
    e.preventDefault();
    
    if (!debitBook || !amount) {
      alert("Please fill all fields!");
      return;
    }

    const transaction = {
      userId: user.user._id,
      BookId: debitBook._id,
      amount: parseFloat(amount),
      date,
      type: e.target.type.value,
      description
    };
    console.log(transaction);
    try {
      const res = await axios.post("/transactions/add", transaction);
      console.log(res.data);
      alert("Transaction added successfully!");
    } catch (error) {
      console.error("Transaction Error:", error);
      alert("Error adding transaction.");
    }
  };

  return (
    <div className="add-transactions">
      <form onSubmit={handleSubmit}>
        <div className="inputRow">
          <div className="inputContainer">
            <label>Date:</label>
            <input type="date" value={date} onChange={(e) => setDate(e.target.value)} />
          </div>
          <div className="inputContainer">
            <label>Amount:</label>
            <input type="number" placeholder="Amount" value={amount} onChange={(e) => setAmount(e.target.value)} />
          </div>
        </div>

        <div className="inputRow">
          {/* 🔹 Debit Book Input */}
          <div className="inputContainer">
            <label>Debit Book:</label>
            <SuggestionInput
              bookDetails={bookDetails}
              setBook={setDebitBook}
            />
          </div>

          {/* 🔹 Credit Book Input */}
          <div className="inputContainer">
            <label>Transaction Type:</label>
            <select name="type" id="type">
              <option value="dr">Debit</option>
              <option value="cr">Credit</option>
            </select>
          </div>
      </div>

        <div className="inputRow">
          <div className="inputContainer form-description">
            <label>Description:</label>
            <textarea placeholder="Transaction description" value={description} onChange={(e) => setDescription(e.target.value)}></textarea>
          </div>
        </div>

        <div className="inputRow">
          <div className="inputContainer form-button">
            <button type="submit">Submit</button>
          </div>
        </div>
      </form>
    </div>
  );
}
