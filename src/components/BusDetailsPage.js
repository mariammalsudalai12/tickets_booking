import React, { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { FaMapMarkerAlt, FaCalendarAlt } from 'react-icons/fa';
import busData from '../data/busData.json';
import './BusDetailsPage.css';

const BusDetailsPage = () => {
  const [source, setSource] = useState('');
  const [destination, setDestination] = useState('');
  const [date, setDate] = useState('');
  const [busDetails, setBusDetails] = useState([]);
  const [selectedSeats, setSelectedSeats] = useState([]);
  const [totalPrice, setTotalPrice] = useState(0);
  const [selectedBusId, setSelectedBusId] = useState(null);
  const [showNoBusesMessage, setShowNoBusesMessage] = useState(false);
 
  const navigate = useNavigate();

  useEffect(() => {
    const savedSource = localStorage.getItem('source');
    const savedDestination = localStorage.getItem('destination');
    const savedDate = localStorage.getItem('date');
    
    if (savedSource && savedDestination && savedDate) {
      setSource(savedSource);
      setDestination(savedDestination);
      setDate(savedDate);

      const filteredBuses = busData.filter(bus => 
        bus.source === savedSource && 
        bus.destination === savedDestination && 
        Array.isArray(bus.availableDate) && bus.availableDate.includes(savedDate)
      );

      if (filteredBuses.length > 0) {
        setBusDetails(filteredBuses);
        
        const savedBusId = localStorage.getItem('selectedBusId');
        const savedSeats = JSON.parse(localStorage.getItem('selectedSeats')) || [];
        const savedPrice = localStorage.getItem('totalPrice') || 0;

        if (savedBusId) {
          setSelectedBusId(savedBusId);
          setSelectedSeats(savedSeats);
          setTotalPrice(savedPrice);
        }

        setShowNoBusesMessage(false);
      } else {
        if (!showNoBusesMessage) {
          setShowNoBusesMessage(true);
        }
      }
    } else {
      navigate('/');
    }
  }, [navigate, showNoBusesMessage]);

  const handleViewSeats = (bus) => {
    localStorage.setItem('selectedBusId', bus.id);
    localStorage.setItem('selectedBus', JSON.stringify(bus)); 
    navigate(`/seats/${bus.id}`); 
  };

  const handleSeatSelection = (seatId, busPrice) => {
    const updatedSeats = [...selectedSeats];
    if (updatedSeats.includes(seatId)) {
      updatedSeats.splice(updatedSeats.indexOf(seatId), 1); 
    } else {
      updatedSeats.push(seatId); 
    }
    const updatedPrice = updatedSeats.length * busPrice;

    setSelectedSeats(updatedSeats);
    setTotalPrice(updatedPrice);

    localStorage.setItem('selectedSeats', JSON.stringify(updatedSeats));
    localStorage.setItem('totalPrice', updatedPrice);
  };

  

  return (
    <div className="container my-5">
     <h2 className="text-center mb-4">Bus Details for Your Trip</h2>

      <div className="text-center mb-4">
        <p><FaMapMarkerAlt /> {source} to {destination}</p>
        <p><FaCalendarAlt /> {date}</p>
      </div>

      <div className="d-flex flex-wrap justify-content-start">
        {busDetails.map((bus) => {
          const isSelectedBus = bus.id === selectedBusId;
          const busSeats = isSelectedBus ? selectedSeats : []; 
          const busTotalPrice = isSelectedBus ? totalPrice : 0; 

          return (
            <div className="col-12 col-sm-6 col-md-4 col-lg-3 mb-4 d-flex" key={bus.id}>
              <div className="card shadow-lg flex-fill">
                <div className="card-body busdet-card">
                  <h5 className="card-title">{bus.name}</h5>
                  <p className="card-text">Departure Time: {bus.startTime}</p>
                  <p className="card-text">Arrival Time: {bus.endTime}</p>
                  <p className="card-text">Duration: {bus.duration}</p>
                  <p className="card-text">Price: {bus.price}</p>

                  {isSelectedBus && busSeats.length > 0 && (
                    <div className="alert alert-info">
                      <h5>Selected Seats:</h5>
                      <ul>
                        {busSeats.map((seatId, index) => (
                          <li key={index}>{seatId}</li>
                        ))}
                      </ul>
                      <p>Total Price: ₹{busTotalPrice}</p>
                    </div>
                  )}

                  <button
                    className="btn btn-primary mb-2"
                    onClick={() => handleViewSeats(bus)}
                    aria-label="View available seats"
                  >
                    View Seats
                  </button>
                </div>
              </div>
            </div>
          );
        })}
      </div>
      {showNoBusesMessage && (
        <div className="no-buses-message">
          No buses available for the selected route.
        </div>
      )}
    </div>
  );
};

export default BusDetailsPage;
