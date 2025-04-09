import React, { useContext, useEffect, useState } from 'react'
import './booktable.css'
import { Context } from '../../context/Contexts';
import axios from 'axios';
import CloseIcon from '@mui/icons-material/Close';

export default function Booktable({ selectedbook, setSelectedBook }) {
    const [book, setBookDetails] = useState([]);
    const { user } = useContext(Context);
  useEffect(()=>{
    const bookDetails = async()=>{
      //console.log(user.user._id)
      
      
      try {
        console.log(selectedbook)
        const getTransaction = await axios.get(`/book/bookTransactions/${user.user._id}/${selectedbook._id}`);
        if(getTransaction.status === 200){
          console.log(getTransaction.data);
          setBookDetails(getTransaction.data);
        }else{
          //console.log(getTransaction.status);
          alert(getTransaction.status, ': Something went wrong!')
        }
      } catch (error) {
        //console.log(error);
        alert('Error in fetching ledger books!');
      }
      
    }
    bookDetails();
  },[user.user._id])
  return (
    <div className='booksPage'>
      <div className="viewBooktransactions">
        <span className="head">{selectedbook.bookname} Books Details opening balance: {"₹ "+selectedbook.balance}</span>
        <button className='CloseBtn' onClick={()=>setSelectedBook(null)}><CloseIcon fontSize='2rem'/></button>
        <table>
          <thead>
            <tr>
              <th>Date</th>
              <th>Description</th>
              <th>Debit ₹</th>
              <th>credit ₹</th>
              <th>Balance</th>
            </tr>
          </thead>
          <tbody>
            {
              book.length!==0 ? book.map((value, index)=>{
                return <tr key={index}>
                <td>{value.date.split("T")[0]}</td>
                <td>{value.description}</td>
                <td>{value.type==="dr"?"₹ "+value.amount:'-'}</td>
                <td>{value.type==="cr"?"₹ "+value.amount:'-'}</td>
                <td>{'₹ '+value.balance}</td>
                </tr>
              }): <tr>
                    <td colSpan="5" className="no-data">No Data Available</td>
                  </tr>
            }
            
          </tbody>
        </table>

      </div>
    </div>
  )
}
