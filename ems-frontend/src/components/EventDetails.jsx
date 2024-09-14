import React, { useEffect, useState } from 'react';
import axios from 'axios';
import { useParams } from 'react-router-dom';
import './EventDetails.css';

const EventDetails = () => {
  const { id } = useParams();
  const [event, setEvent] = useState(null);
  const [rsvpFormVisible, setRsvpFormVisible] = useState(false);
  const [rsvpData, setRsvpData] = useState({
    email: '',
    firstName: '',
    lastName: ''
  });
  const [error, setError] = useState('');

  useEffect(() => {
    const fetchEvent = async () => {
      try {
        const response = await axios.get(`http://localhost:5000/api/events/${id}`);
        setEvent(response.data);
      } catch (error) {
        console.error('Failed to fetch event', error);
        setError('Failed to fetch event details');
      }
    };
    fetchEvent();
  }, [id]);

  const handleRsvpChange = (e) => {
    setRsvpData({ ...rsvpData, [e.target.name]: e.target.value });
  };

  const handleRsvpSubmit = async (e) => {
    e.preventDefault();
    try {
      await axios.post(`http://localhost:5000/api/events/${id}/rsvp`, rsvpData);
      alert('RSVP submitted successfully');
      setRsvpFormVisible(false); 
      setRsvpData({ firstName: '', lastName: '', email: '' }); 
    } catch (error) {
      console.error('Failed to submit RSVP', error);
      setError('Failed to submit RSVP');
    }
  };

  if (!event) return <p>Loading...</p>;

  return (
    <div className="event-details-card">
      <h2 className="event-title">{event.title}</h2>
      <p className="event-description">{event.description}</p>
      <p className="event-date">Date: {new Date(event.date).toLocaleDateString()}</p>
      <p className="event-startTime">Start Time: {event.startTime ? new Date(event.startTime).toLocaleTimeString() : 'N/A'}</p>
      <p className="event-endTime">End Time: {event.endTime ? new Date(event.endTime).toLocaleTimeString() : 'N/A'}</p>
      <p className="event-location">Location: {event.location}</p>
      <p className="event-organizer">Organizer: {event.organizer}</p>
      <p className="event-status">Status: {event.status}</p>
      <button className="rsvp-button" onClick={() => setRsvpFormVisible(!rsvpFormVisible)}>
        {rsvpFormVisible ? 'Cancel RSVP' : 'RSVP'}
      </button>
      
      {rsvpFormVisible && (
        <form onSubmit={handleRsvpSubmit} className="rsvp-form">
          {error && <p className="error-message">{error}</p>}
          <input
            type="email"
            name="email"
            value={rsvpData.email}
            onChange={handleRsvpChange}
            placeholder="Email"
            required
          />
          <input
            type="text"
            name="firstName"
            value={rsvpData.firstName}
            onChange={handleRsvpChange}
            placeholder="First Name"
            required
          />
          <input
            type="text"
            name="lastName"
            value={rsvpData.lastName}
            onChange={handleRsvpChange}
            placeholder="Last Name"
            required
          />
          <button type="submit">Submit RSVP</button>
        </form>
      )}
    </div>
  );
};

export default EventDetails;
