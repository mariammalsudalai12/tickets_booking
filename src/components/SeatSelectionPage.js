import React, { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import '@fortawesome/fontawesome-free/css/all.min.css';
import './SeatSelectionPage.css';

const SeatSelectionPage = () => {
  const [bus, setBus] = useState(null);
  const [selectedSeats, setSelectedSeats] = useState([]);
  const [totalPrice, setTotalPrice] = useState(0);
  const [seatGenderInfo, setSeatGenderInfo] = useState('');
  const [showForm, setShowForm] = useState(false);
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const navigate = useNavigate();

  useEffect(() => {
    const selectedBus = JSON.parse(localStorage.getItem('selectedBus'));
    if (selectedBus) {
      setBus(selectedBus);
    } else {
      navigate('/');
    }
  }, [navigate]);

  const handleSeatSelection = (seat) => {
    if (seat.booked) return;

    const newSelectedSeats = selectedSeats.includes(seat.seatId)
      ? selectedSeats.filter((id) => id !== seat.seatId)
      : [...selectedSeats, seat.seatId];

    setSelectedSeats(newSelectedSeats);
    const price = parseInt(bus.price.replace('₹', ''));
    setTotalPrice(newSelectedSeats.length * price);
    setSeatGenderInfo(seat.gender === 'male' ? 'Male Seat' : seat.gender === 'female' ? 'Female Seat' : 'Unspecified Gender');
  };

  const handleBooking = () => {
    setShowForm(true);
  };

  const handleFormSubmit = () => {
    if (!email || !password) {
      alert('Please fill in all fields!');
      return;
    }

    if (!email.includes('@') || password.length < 8) {
      alert('Invalid email or password!');
      return;
    }

    const userDetails = { email, password };
    localStorage.setItem('userDetails', JSON.stringify(userDetails));

    const ticketDetails = {
      busName: bus.name,
      selectedSeats: selectedSeats,
      totalPrice: totalPrice,
      busPrice: bus.price,
    };

    localStorage.setItem('ticketDetails', JSON.stringify(ticketDetails));
    alert('Booking Successful! Redirecting to ticket details page.');
    navigate('/ticket-details');
  };

  if (!bus) {
    return <div>Loading...</div>;
  }

  return (
    <div className="container seat-selection-container">
      <h2 className="text-center mb-4">{bus.name} - Seat Selection</h2>

      {seatGenderInfo && (
        <div className="alert alert-info text-center mb-4">
          <h5>{seatGenderInfo}</h5>
        </div>
      )}

      <h4>Upper Deck</h4>
      <div className="row my-row">
        {bus.seats.filter(seat => seat.type === 'upper').map((seat) => (
          <div className="col-6 col-md-2 mb-3" key={seat.seatId}>
            <div
              className={`card ${seat.booked ? 'bg-light' : ''} ${
                selectedSeats.includes(seat.seatId) ? 'border-primary' : ''
              }`}
              style={{ cursor: seat.booked ? 'not-allowed' : 'pointer' }}
            >
              <div className="card-body text-center">
                <div
                  className="seat-icon"
                  onClick={() => handleSeatSelection(seat)}
                  style={{
                    backgroundColor: selectedSeats.includes(seat.seatId)
                      ? seat.gender === 'male'
                        ? '#17a2b8'
                        : seat.gender === 'female'
                        ? '#f78b42'
                        : '#6c757d'
                      : 'transparent',
                  }}
                >
                  {seat.booked ? (
                    <div className="seat booked">B</div>
                  ) : (
                    <div className="seat available">
                      <i className="fas fa-chair"></i>
                      {seat.seatId}
                    </div>
                  )}
                </div>
              </div>
            </div>
          </div>
        ))}
      </div>

      <h4>Lower Deck</h4>
      <div className="row my-row">
        {bus.seats.filter(seat => seat.type === 'lower').map((seat) => (
          <div className="col-6 col-md-2 mb-3" key={seat.seatId}>
            <div
              className={`card ${seat.booked ? 'bg-light' : ''} ${
                selectedSeats.includes(seat.seatId) ? 'border-primary' : ''
              }`}
              style={{ cursor: seat.booked ? 'not-allowed' : 'pointer' }}
            >
              <div className="card-body text-center">
                <div
                  className="seat-icon"
                  onClick={() => handleSeatSelection(seat)}
                  style={{
                    backgroundColor: selectedSeats.includes(seat.seatId)
                      ? seat.gender === 'male'
                        ? '#17a2b8'
                        : seat.gender === 'female'
                        ? '#f78b42'
                        : '#6c757d'
                      : 'transparent',
                  }}
                >
                  {seat.booked ? (
                    <div className="seat booked">B</div>
                  ) : (
                    <div className="seat available">
                      <i className="fas fa-chair"></i>
                      {seat.seatId}
                    </div>
                  )}
                </div>
              </div>
            </div>
          </div>
        ))}
      </div>

      {selectedSeats.length > 0 && (
        <div className="alert alert-info text-center mt-4">
          <h5>Selected Seats:</h5>
          <ul>
            {selectedSeats.map((seatId) => {
              const seat = bus.seats.find((s) => s.seatId === seatId);
              return (
                <li key={seatId} className='ul-list'>
                  {seatId} - {seat.type === 'upper' ? 'Upper Deck' : 'Lower Deck'}
                </li>
              );
            })}
          </ul>
          <p className='para'>Total Price: ₹{totalPrice}</p>
        </div>
      )}

      <div className="text-center mt-4">
        <button
          className="btn btn-success"
          disabled={selectedSeats.length === 0}
          onClick={handleBooking}
        >
          Book Now
        </button>
      </div>

      {showForm && (
        <div className="form-container mt-4">
          <h4 className="text-center">Enter Your Details</h4>
          <form onSubmit={(e) => e.preventDefault()}>
            <div className="mb-3">
              <label>Email:</label>
              <input
                type="email"
                className="form-controls"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
              />
            </div>
            <div className="mb-3">
              <label>Password:</label>
              <input
                type="password"
                className="form-controls"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
              />
            </div>
            <button className="butn" onClick={handleFormSubmit}>
              Submit Details
            </button>
          </form>
        </div>
      )}
    </div>
  );
};

export default SeatSelectionPage;
