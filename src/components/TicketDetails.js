import React, { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import './TicketDetails.css';

const TicketConfirmationPage = () => {
  const [ticketDetails, setTicketDetails] = useState(null);
  const navigate = useNavigate();

  useEffect(() => {
    const storedTicketDetails = JSON.parse(localStorage.getItem('ticketDetails'));

    if (storedTicketDetails) {
      setTicketDetails(storedTicketDetails);
    } else {
      navigate('/');
    }
  }, [navigate]);

  if (!ticketDetails) {
    return <div>Loading...</div>;
  }

  return (
    <div className="container my-5 ticket-container">
      <h2 className="text-center mb-4">Ticket Confirmation</h2>

      <div className="alert alert-success text-center">
        <h5 className='head-5'>Booking Successful!</h5>
        <p className='para'><strong>Bus:</strong> {ticketDetails.busName}</p>
        <p className='para'><strong>Total Price:</strong> ₹{ticketDetails.totalPrice}</p>

        <h6 className='head-6'>Selected Seats:</h6>
        <ul style={{ listStyleType: 'none', paddingLeft: 0 }}>
          {ticketDetails.selectedSeats.map((seatId) => {
            return (
              <li key={seatId} className='list'><i className="fas fa-chair"></i> {seatId}</li>
            );
          })}
        </ul>
      </div>

      <div className="text-center mt-4">
        <button
          className="Go-back-btn"
          onClick={() => navigate('/')} 
        >
          Go Back to Home
        </button>
      </div>
    </div>
  );
};

export default TicketConfirmationPage;
