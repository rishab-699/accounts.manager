import React, { useEffect, useState } from 'react'
import './home.css';
import axios from 'axios';
import Login from '../../components/login/Login';
import API from '../../lib/auth';
import Transactions from '../../components/transactions/Transactions';
import Card from '../../components/card/Card';


export default function Home() {
  const [server, setServer] = useState('Server is not live!');
  const [status, setStatus] = useState('error');
  const [jwtresponse, setJwtResponse]= useState({message:'No Token Generated'});
  const [transactions, setTransactions] = useState([]);
  useEffect(()=>{
    const getData = async()=>{
      try {
        const data = await axios.get('/api');
        await API.post('/auth/register',{username: 'test', password: 'test'})
        console.log(data);
        if(data.status === 200){
          setStatus('good');
        }else{
          status('error')
        }
        setServer(data.data);

      } catch (error) {
        console.log(error);
        setServer('Something Went Wrong!')
      }
    }
    getData();
    const fetchDashboard = async () => {
      try {

          const res = await API.get("/dashboard");
          console.log(res.data.message);
          setJwtResponse(res.data);
      } catch (error) {
          console.error("Access denied!", error.response?.data);
          setJwtResponse({message:'No Response'});
      }
    };
    fetchDashboard();

    const transactions = async()=>{
      const getTransaction = await axios.get("/transactions/");
      if(getTransaction.status === 200){
        console.log(getTransaction.data);
        setTransactions(getTransaction.data);
        
      }else{
        console.log(getTransaction.status)
      }
    }
    transactions();
  },[]);

  
  return (
    <div className='Home'>
      <div className="quickAction">
        <Card
          title={'Sales'}
          value={'100000'}
          description={'this month'}
        />
        <Card
          title={'Purchases'}
          value={'100000'}
          description={'this month'}
        />
        <Card
          title={'Expenses'}
          value={'100000'}
          description={'this month'}
        />
      </div>
      <div className="transactions-entry">
        <span className="head">New Transaction</span>
        <Transactions/>
      </div>
      
      <div className="view-transactions">
      <table>
        <thead>
          <tr>
            <th>sl. no</th>
            <th>Date</th>
            <th>Book</th>
            <th>Debit (&#8377;)</th>
            <th>Credit (&#8377;)</th>
          </tr>
        </thead>
        <tbody>
          {
            transactions.length!==0 ? transactions.map((value, index)=>{
              return <tr key={index}>
                <td>{index+1}</td>
              <td>{value.date}</td>
              <td>{value.book}<br/>
                <p className='desc'><b>Description</b>: {value.description}</p> 
              </td>
              <td>{value.type === "dr"? value.amount: '-'}</td>
              <td>{value.type === "cr"? value.amount: '-'}</td></tr>
            }): <tr><td>No Data</td></tr>
          }
          
        </tbody>
      </table>

      </div>
      <div className="JWTInfo">
        <Login/>
        <div className="tokenDetails">
          <h1>Token Status:</h1>
          <h1>{jwtresponse.message}</h1>
        </div>
      </div>
    </div>
  )
}
