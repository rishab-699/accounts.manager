import { useLocation } from 'react-router-dom';
import './App.css';
import {BrowserRouter, Routes, Route} from "react-router-dom"
import Home from './pages/home/Home';
import About from './pages/about/About';
import Navbar from './components/navbar/Navbar';
import Sidebar from './components/sidebar/Sidebar';
import Transactions from './pages/transactions/Transactions';
import Books from './pages/books/Books';
import { useContext, useEffect, useState } from 'react';
import { Context } from './context/Contexts';
import Register from './components/register/Register'
import Login from './components/login/Login';

function App() {
  const user = useContext(Context);
  const [val, setVal] = useState(0);
  /*useEffect(()=>{
    console.log('App user confirmation:')
    console.log(user.user)
  })*/

  
  return (

      <div className="Dashboard">
        {user.user === null? 
          <div className='authPage'>
            <button onClick={()=> setVal(1)}>Login</button>
            <button onClick={()=> setVal(2)}>SignUp</button>
            {val === 2 && <Register setVal={setVal}/>}
            {val === 1 && <Login setVal={setVal}/>}
          </div> :
        
        <BrowserRouter>
        <Sidebar/>
        <div className="content">
          
            <Navbar firmname={user.user.user.firm}/>
            <Routes>
              <Route path='/' element={<Home />} />
              <Route path='/about' element={<About />} />
              <Route path='/books' element={<Books />} />
              <Route path='/transactions' element={<Transactions />} />
            </Routes>
          
        </div>
        </BrowserRouter>
      }
    </div>
      
           
    
  );
}

export default App;
