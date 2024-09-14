const Event = require('../models/Event.cjs');

// Create Event
const createEvent = async (req, res) => {
  try {
    const event = new Event(req.body);
    await event.save();
    res.status(201).json(event);
  } catch (error) {
    res.status(400).json({ message: error.message });
  }
};

// Get All Events
const getEvents = async (req, res) => {
  try {
    const events = await Event.find();
    res.status(200).json(events);
  } catch (error) {
    res.status(400).json({ message: error.message });
  }
};


// Get Event by ID
const getEventById = async (req, res) => {
  try {
    const event = await Event.findById(req.params.id);
    if (!event) {
      return res.status(404).json({ message: 'Event not found' });
    }
    res.status(200).json(event);
  } catch (error) {
    res.status(400).json({ message: error.message });
  }
};


// Update Event
const updateEvent = async (req, res) => {
  try {
    const event = await Event.findByIdAndUpdate(req.params.id, req.body, { new: true });
    if (!event) {
      return res.status(404).json({ message: 'Event not found' });
    }
    res.status(200).json(event);
  } catch (error) {
    res.status(400).json({ message: error.message });
  }
};

// Delete Event
const deleteEvent = async (req, res) => {
  try {
    const event = await Event.findByIdAndDelete(req.params.id);
    if (!event) {
      return res.status(404).json({ message: 'Event not found' });
    }
    res.status(200).json({ message: 'Event deleted' });
  } catch (error) {
    res.status(400).json({ message: error.message });
  }
};

// Get Events by Organizer
const getEventsByOrganizer = async (req, res) => {
  try {
    const { organizer } = req.params;
    const events = await Event.find({ organizer });
    if (events.length === 0) {
      return res.status(404).json({ message: 'No events found for this organizer' });
    }
    res.status(200).json(events);
  } catch (error) {
    res.status(400).json({ message: error.message });
  }
};

const addRsvp = async (req, res) => {
  try {
    const { id } = req.params;
    const { firstName, lastName, email } = req.body;

    const event = await Event.findById(id);
    if (!event) {
      return res.status(404).json({ message: 'Event not found' });
    }

    // Create a new RSVP entry
    const rsvp = { firstName, lastName, email };

    // Push the RSVP to the attendees array
    event.attendees.push(rsvp); 
    await event.save();

    res.status(200).json({ message: 'RSVP submitted successfully' });
  } catch (error) {
    res.status(400).json({ message: error.message });
  }
};



module.exports = { createEvent, getEvents, getEventById, updateEvent, deleteEvent, getEventsByOrganizer, addRsvp };
