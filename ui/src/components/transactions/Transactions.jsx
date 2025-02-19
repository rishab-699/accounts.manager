import React, { useState } from 'react'
import './transactions.css'
import axios from 'axios';

export default function Transactions() {
  const today = new Date();
const formattedDate = today.toISOString().split('T')[0];
  const [date, setDate] = useState(formattedDate);
    const handleSubmit= async(e)=>{
      e.preventDefault();
      console.log('Transaction Form Submitted!')
      const form = e.target;
      const transaction = {
        date: form.date.value,
        book: form.book.value,
        amount: form.amount.value,
        type: form.type.value,
        description: form.description.value,
      }
      const res = await axios.post("/transactions/add", transaction);
      console.log(res.data);
    }
  return (
    <div className="add-transactions">
        <form onSubmit={(e)=>handleSubmit(e)}>
          <div className="inputRow">
            <div className="inputContainer">
                  <label htmlFor="">Date:</label>
                  <input type="date" name='date' id='date' value={date} onChange={(e)=> setDate(e.target.value)} />
              </div>
              <div className="inputContainer">
                  <label htmlFor="">Ledger Book:</label>
                  <input type="text" name='book' id='book' placeholder='Book' />
              </div>
              </div>
              <div className="inputRow">
              <div className="inputContainer">
                  <label htmlFor="">Amount:</label>
                  <input type="text" name='amount' id='amount' placeholder='Amount' />
              </div>
          
              <div className="inputContainer">
                  <label htmlFor="">Type:</label>
                  <select name="type" id="type">
                    <option value="dr">Debit</option>
                    <option value="cr">credit</option>
                  </select>
              </div>
          </div>
          <div className="inputRow">
          <div className="inputContainer form-description">
              <label htmlFor="">Description:</label>
              <textarea type="text" name='description' id='description' placeholder='description'></textarea>
          </div>
          </div>
          <div className="inputRow">
            <div className="inputContainer form-button">
                <button>Submit</button>
            </div>
          </div>
        </form>
      </div>
  )
}
