import React from "react";
import { Link } from "react-router-dom"; // Ensure correct import
import "./sidebar.css";

export default function Sidebar() {
  return (
    <div className="sidebar">
      <div className="topbar">
        <span className="logo">Dashboard</span>
      </div>
      <div className="section">
        <span className="section-heading">Main Navigation</span>
        <ul>
          <li><Link to="/" className="link">Home</Link></li>
          <li><Link to="/books" className="link">Books</Link></li>
          <li><Link to="/reports" className="link">Reports</Link></li>
        </ul>
      </div>
      <div className="section">
        <span className="section-heading">Quick Actions</span>
        <ul>
          <li><Link to="/transactions" className="link">Add Transactions</Link></li>
          <li><Link to="/books" className="link">Add Book</Link></li>
          <li><Link to="/view-book" className="link">View Book</Link></li>
        </ul>
      </div>
    </div>
  );
}
