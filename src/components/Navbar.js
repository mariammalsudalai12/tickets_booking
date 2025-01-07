import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import { FaBus, FaPhoneAlt } from 'react-icons/fa';
import logo from './logo.png'

const Navbar = () => {
  const [isNavbarOpen, setIsNavbarOpen] = useState(false);
  
  const isHomePage = window.location.pathname === "/";  

  return (
    <nav className="navbar navbar-expand-lg navbar-dark bg-dark">
      <div className="container">
        <Link className="navbar-brand" to="/">
          <img src={logo} alt="RedBus Clone Logo" className="navbar-logo" />
        </Link>

        
        <div className={`collapse navbar-collapse ${isNavbarOpen ? 'show' : ''}`} id="navbarNav">
          <div className="navbar-nav">
            <Link className="nav-item nav-link" to="/">
              <FaBus className="nav-icon" /> Bus Ticket
            </Link>
            <Link className="nav-item nav-link contact-link" to="/">
              <FaPhoneAlt className="nav-icon" /> Call us
            </Link>
          </div>
        </div>
      </div>
    </nav>
  );
};

export default Navbar;
