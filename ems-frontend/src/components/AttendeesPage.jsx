
import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { useParams } from 'react-router-dom';

const AttendeesPage = () => {
  const { id } = useParams();
  const [event, setEvent] = useState(null);

  useEffect(() => {
    const fetchEvent = async () => {
      try {
        const response = await axios.get(`http://localhost:5000/api/events/${id}`);
        setEvent(response.data);
      } catch (error) {
        console.error('Failed to fetch event', error);
      }
    };
    fetchEvent();
  }, [id]);

  if (!event) return <p>Loading...</p>;

  return (
    <div className="attendees-container">
      <h1>Attendees for {event.title}</h1>
      {event.attendees && event.attendees.length > 0 ? (
        <ul>
          {event.attendees.map((attendee, index) => (
            <li key={index}>
              {attendee.firstName} {attendee.lastName} ({attendee.email})
            </li>
          ))}
        </ul>
      ) : (
        <p>No attendees yet</p>
      )}
    </div>
  );
};

export default AttendeesPage;
