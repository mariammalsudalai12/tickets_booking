import React from 'react';
import { FaFacebook, FaTwitter, FaInstagram } from 'react-icons/fa'; // Import social media icons
import logo from './logo.png';

const Footer = () => {
  return (
    <footer className="footer-container bg-light text-dark text-center py-4">
      <div className="footer-top">
        <div className="footer-logo">
          <img
            src={logo} 
            alt="RedBus Logo"
            className="footer-logo-img"
          />
        </div>
        <div className="footer-info">
          <p>RedBus - My Travel Companian</p>
        </div>
        <div className="social-icons">
          <a href="https://www.facebook.com" target="_blank" rel="noopener noreferrer">
            <FaFacebook className="social-icon" />
          </a>
          <a href="https://www.twitter.com" target="_blank" rel="noopener noreferrer">
            <FaTwitter className="social-icon" />
          </a>
          <a href="https://www.instagram.com" target="_blank" rel="noopener noreferrer">
            <FaInstagram className="social-icon" />
          </a>
        </div>
      </div>
      <div className="footer-bottom">
        <p>&copy; 2025 RedBus Ticket Booking. All Rights Reserved.</p>
      </div>
    </footer>
  );
};

export default Footer;
