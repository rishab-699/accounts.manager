import React, { useState } from 'react'
import './landingpage.css'
import logo from '../../media/accountsLogo.png'
import Register from '../../components/register/Register';
import Login from '../../components/login/Login';
import heroImg from '../../media/heroImg.jpeg'

export default function Landingpage() {
      const [val, setVal] = useState(0);
    
  return (
    <div className='landingPage'>
      <div className="logo">
        <img src={logo} alt="tally flow" />
        <span className="title">TALLYFLOW</span>
      </div>
      <div className="hero">
        
        
      </div>
      <div className="about">
        <div className="left">
            <div className="aboutInfo">
              <span className="info">
                TALLYFLOW is an accounting software that helps business 
                to manage their ledger books. It will also provide you with various
                reports that will help you in your business like sales charts and monthly sales reports,
                expenses reports and many more.
              </span>
              
            </div>
            <div className='authPage'>
                <button onClick={()=> setVal(1)}>Login</button>
                <button onClick={()=> setVal(2)}>SignUp</button>
                {val === 2 && <Register setVal={setVal}/>}
                {val === 1 && <Login setVal={setVal}/>}
            </div>
        </div>
        <div className="right">
            <img src={heroImg} alt="" />
        </div>
      </div>
    </div>
  )
}