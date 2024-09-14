const express = require('express');
const router = express.Router();
const { createEvent, getEvents, getEventById, updateEvent, deleteEvent, getEventsByOrganizer, addRsvp } = require('../controllers/eventController.cjs');

// Routes for event operations
router.post('/add-event', createEvent);
router.get('/', getEvents);
router.get('/:id', getEventById);
router.put('/:id', updateEvent);
router.delete('/:id', deleteEvent);
router.get('/organizer/:organizer', getEventsByOrganizer);
router.post('/:id/rsvp', addRsvp);


module.exports = router;
