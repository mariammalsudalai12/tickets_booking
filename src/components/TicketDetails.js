import React, { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';

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
    <div className="container my-5">
      <h2 className="text-center mb-4">Ticket Confirmation</h2>

      <div className="alert alert-success text-center">
        <h5>Booking Successful!</h5>
        <p><strong>Bus:</strong> {ticketDetails.busName}</p>
        <p><strong>Total Price:</strong> ₹{ticketDetails.totalPrice}</p>

        <h6>Selected Seats:</h6>
        <ul>
          {ticketDetails.selectedSeats.map((seatId) => {
            return (
              <li key={seatId}>{seatId}</li>
            );
          })}
        </ul>
      </div>

      <div className="text-center mt-4">
        <button
          className="btn btn-primary"
          onClick={() => navigate('/')} 
        >
          Go Back to Home
        </button>
      </div>
    </div>
  );
};

export default TicketConfirmationPage;
