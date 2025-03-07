import React from 'react'
import './navbar.css'
import AccountCircleIcon from '@mui/icons-material/AccountCircle';
import NotificationsIcon from '@mui/icons-material/Notifications';

export default function Navbar({ firmname }) {
    
  return (
    <div className='Navbar'>
        <div className="left">
            <span className="text">Hii, { firmname }</span>
        </div>
        <div className="right">
            <ul >
                <li><NotificationsIcon fontSize='12rem'/></li>
                <li><AccountCircleIcon fontSize='12rem'/></li>
            </ul>
            
        </div>
    </div>
  )
}
