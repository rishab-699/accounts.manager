import React, { useState } from 'react'
import './navbar.css'
import { Link } from 'react-router-dom'

export default function Navbar() {
    const [handburger, setHandburger] = useState(false);
    const Handburger = ()=>{
        setHandburger(!handburger);
        console.log(handburger);
    }
  return (
    <div className='Navbar'>
        <div className="left">
            <div className="logo">
                <span>Logo Here!</span>
            </div>
        </div>
        <div className="right">
            <div className="handBurger" onClick={()=>Handburger()}>
                <div className="line"></div>
                <div className="line"></div>
                <div className="line"></div>
            </div>
            <ul className={handburger?'active':''}>
                <li><Link className='link' to="/">Home</Link></li>
                <li><Link className='link' to="/about">About</Link></li>
                <li><Link className='link'>Sign In</Link></li>
                <li><Link className='link'>Sign Up</Link></li>
                
            </ul>
            
        </div>
    </div>
  )
}
