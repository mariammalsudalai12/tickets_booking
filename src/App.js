// /src/App.js
import React from 'react';
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom'; 
import Navbar from './components/Navbar';
import SearchPage from './components/SearchPage';
import BusDetailsPage from './components/BusDetailsPage';
import SeatSelectionPage from './components/SeatSelectionPage';
import TicketDetails from './components/TicketDetails';
import Footer from './components/Footer';
import './styles.css'

const App = () => {
  return (
    <Router>
      <Navbar />
      <Routes> 
        <Route path="/" element={<SearchPage />} /> 
        <Route path="/bus-details" element={<BusDetailsPage />} /> 
        <Route path="/seats/:busId" element={<SeatSelectionPage />} />
        <Route path="/ticket-details" element={<TicketDetails />} />
      </Routes>
      <Footer />
    </Router>
  );
};

export default App;
