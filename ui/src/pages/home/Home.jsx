import React, { useContext, useEffect, useRef, useState } from 'react'
import './home.css';
import axios from 'axios';
import API from '../../lib/auth';
import Card from '../../components/card/Card';
import { Context } from '../../context/Contexts';
import Transactiontable from '../../components/transactiontable/Transactiontable';
import Barchart from '../../components/barchart/Barchart';
import Linechart from '../../components/linechart/Linechart';

export default function Home() {
  const [transactions, setTransactions] = useState([]);
  const [systemBooks, setSystemBooks] = useState([]);
  const [checkBooks, setCheckBooks] = useState(true);
  const [quickActionReports, setQuickActionReports] = useState();
  const [chartData, setChartData] = useState({});
  const [isfetching, setIsFetching] = useState(false);

  const {user} = useContext(Context);
  const {dispatch} = useContext(Context);
  const hasFetched = useRef(false);
  const [balances, setBalances] = useState({});
  const [chartopt, setChartOpt] = useState('barchart');
  useEffect(()=>{
    if (hasFetched.current) return;
    hasFetched.current = true;
    const checkBooks = async()=>{
      try {
        const bookData = await API.get(`/book/SystemDefined/${user.user._id}`);
        //console.log(bookData.data);
        
        if(bookData.data.data.length === 0){
          setIsFetching(true);
          const bookData = await API.get(`/book/${user.user._id}`);
          const getTransaction = await API.get(`/transactions/${user.user._id}`);
          const getQuickReports = await API.get(`/reports/home/${user.user._id}`);
          const getSalesReports = await API.get(`/reports/home/salesReport/${user.user._id}`);
          //console.log(getQuickReports.data);
          //console.log(bookData.data);
          await setSystemBooks(bookData.data);
          await setTransactions(getTransaction.data);
          await setQuickActionReports(getQuickReports?.data);
          await setCheckBooks(true);
          const salesData = getSalesReports.data;
          const transformedData = {
            month: salesData.map(item => item.month),
            totalSales: salesData.map(item => item.totalSales),
          };
          setChartData(transformedData);
          console.log("Transformed Chart Data:", transformedData);
          setIsFetching(false);
        }else{
          await setSystemBooks(bookData.data.data);
          setCheckBooks(false);
          setIsFetching(false)
          //console.log(systemBooks); 
        }
      } catch (error) {
          //console.log(error.status);
          setIsFetching(false)
          if(error.status === 403){
            console.log(error.status);
            dispatch({type: 'LOGOUT'});
            return;
        }
      }
      
    }
    checkBooks();
  },[user.user._id, dispatch]);

  const handleInputChange = (e) => {
    setBalances({ ...balances, [e.target.name]: e.target.value });
};
  const handleSubmit = async(e)=>{
    e.preventDefault();
    //console.log(systemBooks);
    //console.log(balances);
    const updatedBooks = systemBooks.map(book => ({
      bookId: book._id,
      balance: balances[book.bookname + "balance"] || 0
    }));
    console.log(updatedBooks);
    try {
      await API.post("/book/updateBalances", { books: updatedBooks });
      alert("Books updated successfully!");
      window.location.href('/')
    } catch (error) {
      //console.log(error);
      alert('Error updating books!');
    }
  }
  return (
    <>
    {!isfetching?
    <div className='Home'>
      {checkBooks?
      <>
        <div className="quickAction">
          <Card
            title={'Sales'}
            value={quickActionReports?.length > 0? quickActionReports.map((value)=>{
              return value.category==='sales' && value.totalAmount 
            }):'0'}
            description={'this month'}
          />
          <Card
            title={'Purchases'}
            value={quickActionReports?.length > 0? quickActionReports.map((value)=>{
              return value.category==='purchases' && value.totalAmount 
            }):'0'}
            description={'this month'}
          />
          <Card
            title={'Expenses'}
            value={quickActionReports?.length > 0? quickActionReports.map((value)=>{
              return value.category==='expenses'? value.totalAmount:0 
            }):'0 '}
            description={'this month'}
          />
        </div>
        <div className="salesChart">
          <span className="head">Sales Report</span>
            <select name="chartType" onChange={(e)=>setChartOpt(e.target.value)} id="">
              <option value="barchart">bar chart</option>
              <option value="linechart">line chart</option>
            </select>
            {chartopt === 'barchart'?
            <Barchart
              categories={chartData?.month || []}
              data={chartData?.totalSales || []}
              width={600}
              height={350}
            />:
            <Linechart
              categories={chartData?.month || []}
              data={chartData?.totalSales || []}
              width={600}
              height={350}
            />

            }
          
        </div>
        <div className="transaction-section">
          <div className="view-Books">
            <span className="head">Ledger Books</span>
            <div className="tableContent">
            <table>
              <thead>
                <tr>
                  <th>sl. no</th>
                  <th>Book Name</th>
                  <th>Balance</th>
                </tr>
              </thead>
              <tbody>
                {
                  systemBooks.length!==0 ? systemBooks.map((value, index)=>{
                    return <tr key={index}>
                      <td>{index+1}</td>
                    <td>{value.bookname}<br/>
                      
                    </td>
                    <td>{"₹ "+value.balance}</td>
                    
                    </tr>
                  }): <tr>
                        <td colSpan="5" className="no-data">No Data Available</td>
                      </tr>
                }
                
              </tbody>
            </table>
            </div>
          </div>
        
        
        <Transactiontable transactions={transactions}/>
        </div>
      </>:
      <div className="BookEntryCard">
        <h1>Book Entry</h1>
        <p>NOTE: Add opening balance of this necessary ledger books.
        </p>
        <form onSubmit={(e)=>handleSubmit(e)}>
        {systemBooks && systemBooks.map((book) => (
                    <div className="input-Row" key={book._id}>
                        <label className="BookTitles">{book.bookname}</label>
                        <input
                            type="text"
                            name={book.bookname + "balance"}
                            placeholder="₹ 0000"
                            onChange={handleInputChange}
                        />
                    </div>
                ))}
          
          <div className="input-Row">
            <button>Update</button>
          </div>
        </form>
      </div>
      }
    </div>: <div className="dashboard-skeleton">
  <div className="skeleton-cards">
    <div className="skeleton-card shimmer"></div>
    <div className="skeleton-card shimmer"></div>
    <div className="skeleton-card shimmer"></div>
  </div>
  <div className="skeleton-chart shimmer"></div>
  <div className="skeleton-table">
    {[...Array(5)].map((_, i) => (
      <div className="skeleton-row shimmer" key={i}></div>
    ))}
  </div>
</div>
    }
    </>
  )
}
