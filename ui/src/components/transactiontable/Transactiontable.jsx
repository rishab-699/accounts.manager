import React from 'react'
import './transactiontable.css'

export default function Transactiontable({ transactions }) {
  return (
    <div className="view-transactions">
      <span className="head">Transactions Entries</span>
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
              return <tr key={index}>
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
  )
}
