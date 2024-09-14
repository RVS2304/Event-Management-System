import React, { useState } from 'react';
import axios from 'axios';

const EventForm = () => {
  const [event, setEvent] = useState({
    title: '',
    description: '',
    date: '',
  });

  const handleChange = (e) => {
    setEvent({ ...event, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      await axios.post('http://localhost:5000/api/events/add-event', event);
      alert('Event created successfully');
    } catch (error) {
      console.error(error);
    }
  };

  return (
    <form onSubmit={handleSubmit}>
      <input
        type="text"
        name="name"
        value={event.title}
        onChange={handleChange}
        placeholder="Event Name"
        required
      />
      <textarea
        name="description"
        value={event.description}
        onChange={handleChange}
        placeholder="Event Description"
        required
      />
      <input
        type="date"
        name="date"
        value={event.date}
        onChange={handleChange}
        required
      />
      <button type="submit">Create Event</button>
    </form>
  );
};

export default EventForm;
