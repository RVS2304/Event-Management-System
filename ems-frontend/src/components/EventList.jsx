import React, { useEffect, useState } from 'react';
import axios from 'axios';
import { Link } from 'react-router-dom';
import './EventList.css'; // Import the CSS file for styling

const EventList = () => {
  const [events, setEvents] = useState([]);

  useEffect(() => {
    const fetchEvents = async () => {
      try {
        const response = await axios.get('http://localhost:5000/api/events');
        setEvents(response.data);
      } catch (error) {
        console.error(error);
      }
    };
    fetchEvents();
  }, []);

  return (
    <div className="event-list-container">
      <h2>Event List</h2>
      <div className="event-cards">
        {events.map(event => (
          <div key={event._id} className="event-card">
            <Link to={`/event/${event._id}`} className="event-card-link">
              <h3 className="event-card-title">{event.title}</h3>
              <p className="event-description">{event.description}</p>
              <p className="event-date">Date: {new Date(event.date).toLocaleDateString()}</p>
              <p className="event-location">Location: {event.location}</p>
              <p className="event-organizer">Organizer: {event.organizer}</p>
            </Link>
          </div>
        ))}
      </div>
    </div>
  );
};

export default EventList;
