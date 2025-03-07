import React, { useContext } from 'react'
import './books.css'
import { Context } from '../../context/Contexts';
//import API from '../../lib/auth';
import axios from 'axios';

export default function Addbooks() {
  const {user} = useContext(Context);
    const handleSubmit = async(e)=>{
        e.preventDefault();
        const bookData = {
          userId: user.user._id,
          bookname: e.target.book.value,
          type: e.target.booktype.value,
          balance: e.target.balance.value,
          classification: e.target.classification.value
        }
        console.log(bookData);
        try {
          const addBook = await axios.post('/book/add', bookData);
          if(addBook.status === 200){
            alert('book successfully added!');
          }else{
            console.log(addBook.data);
          }
        } catch (error) {
          console.log(error)
        }
    }
    return (
        <div className="add-books">
            <form onSubmit={(e)=>handleSubmit(e)}>
                <div className="inputRow">
                  <div className="inputContainer">
                      <label htmlFor="">Book Name:</label>
                      <input type="text" name='book' id='book' placeholder='Book' />
                  </div>
                  <div className="inputContainer">
                      <label htmlFor="">Opening balance:</label>
                      <input type="text" name='balance' id='balance' placeholder='1000' />
                  </div>
                  <div className="inputContainer">
                      <label htmlFor="">Book Category:</label>
                      <select name="type" id="booktype">
                        <option value="sales">sales</option>
                        <option value="purchases">purchases</option>
                        <option value="debtors">debtors(receivables)</option>
                        <option value="creditors">creditors(Payables)</option>
                      </select>
                  </div>
                  <div className="inputContainer">
                      <label htmlFor="">Book Classification:</label>
                      <select name="classification" id="classification">
                        <option value="asset">asset</option>
                        <option value="liability">liability</option>
                        <option value="expenses">expenses</option>
                      </select>
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
