import React, { useState } from 'react'
import './navbar.css'
import { Link } from 'react-router-dom'
import AccountCircleIcon from '@mui/icons-material/AccountCircle';
import NotificationsIcon from '@mui/icons-material/Notifications';

export default function Navbar() {
    const [handburger, setHandburger] = useState(false);
    const Handburger = ()=>{
        setHandburger(!handburger);
        console.log(handburger);
    }
  return (
    <div className='Navbar'>
        <div className="left">
            <span className="text">Hii, Welcome</span>
        </div>
        <div className="right">
            <ul className={handburger?'active':''}>
                <li><NotificationsIcon fontSize='12rem'/></li>
                <li><AccountCircleIcon fontSize='12rem'/></li>
            </ul>
            
        </div>
    </div>
  )
}
