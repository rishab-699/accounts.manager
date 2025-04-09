import React, { useContext, useEffect, useState } from 'react'
import './books.css'
import Addbooks from '../../components/books/Addbooks'
//import API from '../../lib/auth';
import { Context } from '../../context/Contexts';
import axios from 'axios';
import Booktable from '../../components/booktable/Booktable';

export default function Books() {
    const [book, setBookDetails] = useState([]);
    const [selectedBook, setSelectedBook] = useState(null);
    const { user } = useContext(Context);
  useEffect(()=>{
    const bookDetails = async()=>{
      //console.log(user.user._id)
      try {
        const getTransaction = await axios.get(`/book/${user.user._id}`);
        if(getTransaction.status === 200){
          //console.log(getTransaction.data);
          setBookDetails(getTransaction.data);
        }else{
          //console.log(getTransaction.status);
          alert('something went wrong!')
        }
      } catch (error) {
        //console.log(error);
        alert('Error: while fetching data of book page');
      }
      
    }
    bookDetails();
  },[user.user._id])
  return (
    <>
      {selectedBook === null?
        <div className='booksPage'>
            <div className="book-entry">
                <span className="head">Add Book</span>
                <Addbooks/>
            </div>

            <div className="view-transactions">
          <span className="head">Ledger Books</span>
          <table>
            <thead>
              <tr>
                <th>sl. no</th>
                <th>Date</th>
                <th>Book Name</th>
                <th>Book Type</th>
                <th>Balance</th>
                <th>transactions</th>
              </tr>
            </thead>
            <tbody>
              {
                book.length!==0 ? book.map((value, index)=>{
                  return <tr key={index}>
                    <td>{index+1}</td>
                  <td>{value.createdAt.split("T")[0]}</td>
                  <td>{value.bookname}<br/>
                    
                  </td>
                  <td>{value.type}</td>
                  <td>{"₹ "+value.balance}</td>
                  <td><button className='transactionButton' onClick={()=> setSelectedBook(value)}>View Transactions</button></td>
                  </tr>
                }): <tr>
                      <td colSpan="5" className="no-data">No Data Available</td>
                    </tr>
              }
              
            </tbody>
          </table>
            
          </div>
        </div>
        :
        <Booktable selectedbook={selectedBook} setSelectedBook={setSelectedBook}/>
      }
    </>
  )
}
