import React from 'react'
import './sidebar.css'

export default function Sidebar() {
  return (
    <div className='sidebar'>
        <div className="topbar">
            <span className="logo">Dashboard</span>
        </div>
        <div className="section">
            <span className="section-heading">main navigation</span>
            <ul>
                <li>Home</li>
                <li>Books</li>
                <li>Reports</li>
            </ul>
        </div>
        <div className="section">
        <span className="section-heading">quick actions</span>
            <ul>
                <li>Add Transactions</li>
                <li>Add Book</li>
                <li>View Book</li>
            </ul>
        </div>
    </div>
  )
}
