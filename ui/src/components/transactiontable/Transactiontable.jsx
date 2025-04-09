import React, { useState } from 'react'
import './transactiontable.css'

export default function Transactiontable({ transactions }) {
  const [date, setDate] = useState(new Date().toISOString().split('T')[0]);
  return (
    <div className="view-transactions">
      <div className="headerSection">
        <span className="head">Transactions Entries</span>
        <input type="date" name='transactionDate' value={date} onChange={(e)=> setDate(e.target.value)} />
      </div>
      
      <div className='TableContent'>
      <table>
        <thead>
          <tr>
            <th>sl. no</th>
            <th>Date</th>
            <th>Book</th>
            <th>description</th>
            <th>Amount (&#8377;)</th>
          </tr>
        </thead>
        <tbody>
          {
            transactions.length!==0 ? transactions.map((value, index)=>{
              return value.date.split("T")[0] === date && <tr key={index}>
                <td>{index+1}</td>
              <td>{value.date.split("T")[0]}</td>
              <td>{value.debitBookName}</td>
              <td>{value.description}</td>
              <td>{value.amount}</td></tr>
            }): <tr>
                  <td colSpan="6" className="no-data">No Data Available</td>
                </tr>
          }
          
        </tbody>
      </table>
      </div>
      </div>
  )
}
