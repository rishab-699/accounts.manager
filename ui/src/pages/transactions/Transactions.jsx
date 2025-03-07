import React, { useContext, useEffect, useState } from 'react'
import Addtransactions from '../../components/transactions/Addtransactions'
import './transactions.css'
import axios from 'axios';
import { Context } from '../../context/Contexts';
import Transactiontable from '../../components/transactiontable/Transactiontable';

export default function Transactions() {
  const [transactions, setTransactions] = useState([]);
  const {user} = useContext(Context);
  const [bookData, setBookData] = useState();
  useEffect(()=>{
    const transactions = async()=>{
      try {
        const getTransaction = await axios.get(`/transactions/${user.user._id}`);
        const bookData = await axios.get(`/book/${user.user._id}`);
        if(getTransaction.status === 200 && bookData.status === 200){
          console.log()
          console.log(getTransaction.data);
          setTransactions(getTransaction.data);
          setBookData(bookData.data);
        }else{
          //console.log(getTransaction.status)
          alert(getTransaction.status,": something went wrong!");
        }
      } catch (error) {
        //console.log(error);
        alert("Error: while fetching transaction data");
      }
      
    }
    transactions();
  },[user.user._id])
  
  return (
    <div className="transactionPage">
      <div className="transactions-entry">
            <span className="head">New Transaction</span>
            <Addtransactions bookDetails={bookData}/>
      </div>
      <Transactiontable transactions={transactions}/>
      
    </div>
    
  )
}
