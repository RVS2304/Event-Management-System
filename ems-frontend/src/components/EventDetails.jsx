import React, { useEffect, useState } from 'react';
import axios from 'axios';
import { useParams } from 'react-router-dom';
import './EventDetails.css';

const EventDetails = () => {
  const { id } = useParams();
  const [event, setEvent] = useState(null);

  useEffect(() => {
    const fetchEvent = async () => {
      try {
        const response = await axios.get(`http://localhost:5000/api/events/${id}`);
        setEvent(response.data);
      } catch (error) {
        console.error(error);
      }
    };
    fetchEvent();
  }, [id]);


  if (!event) return <p>Loading...</p>;

  return (
    <div className="event-details-card">
      <h2 className="event-title">{event.name}</h2>
      <p className="event-description">{event.description}</p>
      <p className="event-date">Date: {new Date(event.date).toLocaleDateString()}</p>
      <p className="event-location">Location: {event.location}</p>
      <p className="event-organizer">Organizer: {event.organizer}</p>
      <button className="rsvp-button">RSVP</button>
    </div>
  );
};

export default EventDetails;
