// src/components/OrganizerDashboard.js

import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';
import EventForm from './EventForm';
import './OrganizerDashboard.css'; // Import the CSS file

const OrganizerDashboard = () => {
  const [events, setEvents] = useState([]);
  const [newEvent, setNewEvent] = useState({
    title: '',
    description: '',
    date: '',
    startTime: '',
    endTime: '',
    location: '',
    organizer: ''
  });
  const [editingEvent, setEditingEvent] = useState(null);
  const [showForm, setShowForm] = useState(false);

  const navigate = useNavigate(); // For navigation
  const organizer = localStorage.getItem('user');

  useEffect(() => {
    if (organizer) {
      const fetchEvents = async () => {
        try {
          const response = await axios.get(`http://localhost:5000/api/events/organizer/${organizer}`);
          setEvents(response.data);
        } catch (error) {
          console.error('Failed to fetch events', error);
        }
      };
      fetchEvents();
    }
  }, [organizer]);

  const handleChange = (e) => {
    setNewEvent({ ...newEvent, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      // Create Date objects for startTime and endTime if they are not empty
      const formatDate = (dateString, timeString) => {
        if (!dateString || !timeString) return null;
        return new Date(`${dateString}T${timeString}`);
      };

      const eventData = {
        ...newEvent,
        organizer,
        startTime: formatDate(newEvent.date, newEvent.startTime),
        endTime: formatDate(newEvent.date, newEvent.endTime)
      };

      if (editingEvent) {
        await axios.put(`http://localhost:5000/api/events/${editingEvent._id}`, eventData);
        setEditingEvent(null);
      } else {
        await axios.post('http://localhost:5000/api/events/add-event', eventData);
      }

      // Reset form fields
      setNewEvent({
        title: '',
        description: '',
        date: '',
        startTime: '',
        endTime: '',
        location: '',
        organizer: ''
      });

      // Refresh event list
      const response = await axios.get(`http://localhost:5000/api/events/organizer/${organizer}`);
      setEvents(response.data);
    } catch (error) {
      console.error('Failed to create or update event', error);
    }
  };

  const handleEdit = (event) => {
    setEditingEvent(event);
    setNewEvent({
      title: event.title,
      description: event.description,
      date: event.date.split('T')[0],
      startTime: event.startTime ? new Date(event.startTime).toISOString().substr(11, 5) : '',
      endTime: event.endTime ? new Date(event.endTime).toISOString().substr(11, 5) : '',
      location: event.location,
      organizer: event.organizer
    });
    setShowForm(true); // Show form for editing
  };

  const handleDelete = async (id) => {
    try {
      await axios.delete(`http://localhost:5000/api/events/${id}`);
      const response = await axios.get(`http://localhost:5000/api/events/organizer/${organizer}`);
      setEvents(response.data);
    } catch (error) {
      console.error('Failed to delete event', error);
    }
  };

  const viewAttendees = (eventId) => {
    navigate(`/attendees/${eventId}`); // Navigate to the attendees page
  };

  const handleLogout = () => {
    localStorage.setItem('user', null);
    navigate('/');
  }

  if (!organizer) return <p>Loading...</p>;

  return (
    <div className="dashboard-container">
      <header>
      <h1>Welcome, {organizer}</h1>
      <button onClick={handleLogout}>Logout</button>
      </header>
      <button className="add-event-button" onClick={() => setShowForm(!showForm)}>
        {showForm ? 'Cancel' : 'Add Event'}
      </button>
      {showForm && (
        <EventForm
          event={newEvent}
          onChange={handleChange}
          onSubmit={handleSubmit}
          editingEvent={editingEvent}
        />
      )}
      <h2>Events</h2>
      {events.length === 0 ? (
        <p>No events found</p>
      ) : (
        <ul className="event-list">
          {events.map(event => (
            <li key={event._id} className="event-card">
              <h3>{event.title}</h3>
              <p>{event.description}</p>
              <p>{new Date(event.date).toLocaleDateString()}</p>
              {event.startTime && <p>Start Time: {new Date(event.startTime).toLocaleTimeString()}</p>}
              {event.endTime && <p>End Time: {new Date(event.endTime).toLocaleTimeString()}</p>}
              <p>Location: {event.location}</p>
              <button onClick={() => handleEdit(event)}>Edit</button>
              <button onClick={() => handleDelete(event._id)}>Delete</button>
              <button onClick={() => viewAttendees(event._id)}>View Attendees</button>
            </li>
          ))}
        </ul>
      )}
    </div>
  );
};

export default OrganizerDashboard;
