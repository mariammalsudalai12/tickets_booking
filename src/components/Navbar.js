import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import { FaBus, FaPhoneAlt } from 'react-icons/fa'; // Importing icons for bus ticket and contact
import logo from './logo.png'

const Navbar = () => {
  const [isNavbarOpen, setIsNavbarOpen] = useState(false);
  
  // Assuming we're only showing specific links on the "Home" page
  const isHomePage = window.location.pathname === "/"; // Checking if the current page is Home

  return (
    <nav className="navbar navbar-expand-lg navbar-dark bg-dark">
      <div className="container">
        {/* Logo Section */}
        <Link className="navbar-brand" to="/">
          <img src={logo} alt="RedBus Clone Logo" className="navbar-logo" />
        </Link>

        {/* Mobile Toggle Button
        <button
          className="navbar-toggler"
          type="button"
          data-toggle="collapse"
          data-target="#navbarNav"
          aria-controls="navbarNav"
          aria-expanded={isNavbarOpen ? "true" : "false"}
          aria-label="Toggle navigation"
          onClick={() => setIsNavbarOpen(!isNavbarOpen)}
        >
          <span className="navbar-toggler-icon"></span>
        </button> */}

        {/* Navbar Links */}
        <div className={`collapse navbar-collapse ${isNavbarOpen ? 'show' : ''}`} id="navbarNav">
          <div className="navbar-nav">
            <Link className="nav-item nav-link" to="/ticket">
              <FaBus className="nav-icon" /> Bus Ticket
            </Link>
            <Link className="nav-item nav-link contact-link" to="/contact">
              <FaPhoneAlt className="nav-icon" /> Call us
            </Link>
          </div>
        </div>
      </div>
    </nav>
  );
};

export default Navbar;
