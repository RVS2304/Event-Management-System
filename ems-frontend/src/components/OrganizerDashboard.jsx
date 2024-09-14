import React, { useState, useEffect } from 'react';
import axios from 'axios';

const OrganizerDashboard = () => {
  const [events, setEvents] = useState([]);
  const [newEvent, setNewEvent] = useState({ title: '', description: '', date: '' });
  const [editingEvent, setEditingEvent] = useState(null); // Track event being edited

  const organizer = localStorage.getItem('user');  

  useEffect(() => {
    if (organizer) {
      // Fetch events created by this organizer
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
      const eventData = { ...newEvent, organizer }; // Ensure organizer is a string
      if (editingEvent) {
        // Update event
        await axios.put(`http://localhost:5000/api/events/${editingEvent._id}`, eventData);
        setEditingEvent(null); // Reset editing state after successful update
      } else {
        // Create event
        await axios.post('http://localhost:5000/api/events/add-event', eventData); // Correct endpoint
      }
      setNewEvent({ title: '', description: '', date: '' });
      const response = await axios.get(`http://localhost:5000/api/events/organizer/${organizer}`);
      setEvents(response.data);
    } catch (error) {
      console.error('Failed to create or update event', error);
    }
  };

  const handleEdit = (event) => {
    setEditingEvent(event); // Set the event to be edited
    setNewEvent({ title: event.title, description: event.description, date: event.date.split('T')[0] });
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

  if (!organizer) return <p>Loading...</p>;

  return (
    <div>
      <h1>Welcome, {organizer}</h1>
      <form onSubmit={handleSubmit}>
        <input
          type="text"
          name="title"
          value={newEvent.title}
          onChange={handleChange}
          placeholder="Event Title"
          required
        />
        <textarea
          name="description"
          value={newEvent.description}
          onChange={handleChange}
          placeholder="Event Description"
          required
        />
        <input
          type="date"
          name="date"
          value={newEvent.date}
          onChange={handleChange}
          required
        />
        <button type="submit">{editingEvent ? 'Update Event' : 'Create Event'}</button>
      </form>
      <h2>Events</h2>
      <ul>
        {events.map(event => (
          <li key={event._id}>
            <h3>{event.title}</h3>
            <p>{event.description}</p>
            <p>{new Date(event.date).toLocaleDateString()}</p>
            <button onClick={() => handleEdit(event)}>Edit</button>
            <button onClick={() => handleDelete(event._id)}>Delete</button>
          </li>
        ))}
      </ul>
    </div>
  );
};

export default OrganizerDashboard;
