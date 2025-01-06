import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { FaMapMarkerAlt, FaExchangeAlt, FaBus, FaHotel, FaCut, FaCreditCard } from 'react-icons/fa';
import img1 from './img1.jpg';
import img2 from './img2.jpg';
import img3 from './img3.png';

const SearchPage = () => {
  const [source, setSource] = useState('');
  const [destination, setDestination] = useState('');
  const [date, setDate] = useState('');
  const navigate = useNavigate();

  // Use useEffect to populate the fields from localStorage when the component mounts
  useEffect(() => {
    const savedSource = localStorage.getItem('source');
    const savedDestination = localStorage.getItem('destination');
    const savedDate = localStorage.getItem('date');
    
    if (savedSource) setSource(savedSource);
    if (savedDestination) setDestination(savedDestination);
    if (savedDate) setDate(savedDate);
  }, []);

  const handleSearch = () => {
    if (source && destination && date) {
      localStorage.setItem('source', source);
      localStorage.setItem('destination', destination);
      localStorage.setItem('date', date);
      navigate('/bus-details');
    } else {
      alert('Please fill in all fields');
    }
  };

  return (
    <div className="container my-5 d-flex flex-column align-items-center custom-container">
      <h2 className="text-center mb-4 animated fadeIn">India's No. 1 Online Bus Ticket Booking Site</h2>

      {/* Search Form */}
      <div className="row justify-content-center mb-5 w-100">
        <div className="col-10 col-md-6 input-back">
          {/* Source Input */}
          <div className="form-group animated fadeInLeft">
            <div className="input-group">
              <span className="input-group-text">
                <FaMapMarkerAlt />
              </span>
              <input
                type="text"
                className="form-control custom-input"
                placeholder="Source"
                value={source}
                onChange={(e) => setSource(e.target.value)}
              />
            </div>
          </div>

          {/* Exchange Button */}
          <div className="text-center my-3 animated fadeInUp">
            <button
              type="button"
              className="btn btn-outline-secondary btn-circle"
              onClick={() => {
                const temp = source;
                setSource(destination);
                setDestination(temp);
              }}
            >
              <FaExchangeAlt className="fa-2x" />
            </button>
          </div>

          {/* Destination Input */}
          <div className="form-group animated fadeInRight">
            <div className="input-group">
              <span className="input-group-text">
                <FaMapMarkerAlt />
              </span>
              <input
                type="text"
                className="form-control custom-input"
                placeholder="Destination"
                value={destination}
                onChange={(e) => setDestination(e.target.value)}
              />
            </div>
          </div>

          {/* Date Picker */}
          <div className="form-group animated fadeInDown">
            <input
              type="date"
              className="form-control custom-input"
              value={date}
              onChange={(e) => setDate(e.target.value)}
            />
          </div>

          {/* Search Button */}
          <button onClick={handleSearch} className="btn btn-primary btn-block animated bounceInUp">
            Search
          </button>
        </div>
      </div>

      {/* Offers Section */}
      <div className="offers-section w-100">
        <h3 className="text-center mb-4">Special Offers</h3>
        <div className="row justify-content-center offer-card">
          {/* Offer 1 */}
          <div className="col-10 col-md-4 mb-4">
            <div className="card shadow-lg">
              <img src={img1} className="card-img-top" alt="Offer 1" />
              <div className="card-body">
                <h5 className="card-title">10% Off on First Booking</h5>
                <p className="card-text">Book your first bus ticket and get 10% off on your booking.</p>
              </div>
            </div>
          </div>
          {/* Offer 2 */}
          <div className="col-10 col-md-4 mb-4">
            <div className="card shadow-lg">
              <img src={img3} className="card-img-top" alt="Offer 2" />
              <div className="card-body">
                <h5 className="card-title">Get 20% Cashback</h5>
                <p className="card-text">Receive 20% cashback on every bus ticket booking.</p>
              </div>
            </div>
          </div>
          {/* Offer 3 */}
          <div className="col-10 col-md-4 mb-4">
            <div className="card shadow-lg">
              <img src={img2} className="card-img-top" alt="Offer 3" />
              <div className="card-body">
                <h5 className="card-title">Free Seat Selection</h5>
                <p className="card-text">Enjoy free seat selection on all bookings made this month.</p>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Facilities Section */}
      <div className="facilities-section w-100 my-5">
        <h3 className="text-center mb-4">Facilities Available</h3>
        <div className="row justify-content-centerm">
          {/* Facility 1 - Bus */}
          <div className="col-10 col-md-3 mb-4 text-center">
            <div className="facility-icon mb-2">
              <FaBus className="fa-3x faci-icn" />
            </div>
            <h5>Comfortable Buses</h5>
            <p>Travel in comfort with top-rated buses across all routes.</p>
          </div>

          {/* Facility 2 - Hotel */}
          <div className="col-10 col-md-3 mb-4 text-center">
            <div className="facility-icon mb-2">
              <FaHotel className="fa-3x faci-icn" />
            </div>
            <h5>Hotel Booking</h5>
            <p>Book your stay at discounted hotel rates with your bus ticket.</p>
          </div>

          {/* Facility 3 - Food */}
          <div className="col-10 col-md-3 mb-4 text-center">
            <div className="facility-icon mb-2">
              <FaCut className="fa-3x faci-icn" />
            </div>
            <h5>Food Onboard</h5>
            <p>Enjoy free meals or snacks on selected routes during your journey.</p>
          </div>

          {/* Facility 4 - Payment */}
          <div className="col-10 col-md-3 mb-4 text-center">
            <div className="facility-icon mb-2">
              <FaCreditCard className="fa-3x faci-icn" />
            </div>
            <h5>Multiple Payment Options</h5>
            <p>Pay easily through various methods like credit cards, UPI, and wallets.</p>
          </div>
        </div>
      </div>
    </div>
  );
};

export default SearchPage;
