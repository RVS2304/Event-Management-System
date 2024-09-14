import React from 'react';

const EventForm = ({ event, onChange, onSubmit, editingEvent }) => (
  <form className='event-form' onSubmit={onSubmit}>
    <input
      type="text"
      name="title"
      value={event.title}
      onChange={onChange}
      placeholder="Event Title"
      required
    />
    <textarea
      name="description"
      value={event.description}
      onChange={onChange}
      placeholder="Event Description"
      required
    />
    <input
      type="date"
      name="date"
      value={event.date}
      onChange={onChange}
      required
    />
    <input
      type="time"
      name="startTime"
      value={event.startTime}
      onChange={onChange}
      placeholder="Start Time"
    />
    <input
      type="time"
      name="endTime"
      value={event.endTime}
      onChange={onChange}
      placeholder="End Time"
    />
    <input
      type="text"
      name="location"
      value={event.location}
      onChange={onChange}
      placeholder="Location"
    />
    <button type="submit">{editingEvent ? 'Update Event' : 'Create Event'}</button>
  </form>
);

export default EventForm;
