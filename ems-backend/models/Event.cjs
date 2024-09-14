const mongoose = require('mongoose');

const eventSchema = new mongoose.Schema({
  title: {
    type: String,
    required: true
  },
  description: {
    type: String,
    required: true
  },
  date: {
    type: Date,
    required: true
  },
  startTime: {
    type: String
  },
  endTime: {
    type: String
  },
  location: {
    type: String
  },
  organizer: {
    type: String
  },
  attendees: [{
    firstName: String,
    lastName: String,
    email: String
  }],
  status: {
    type: String,
    enum: ['Upcoming', 'Completed'],
    default: 'Upcoming'
  }
}, { timestamps: true });

module.exports = mongoose.model('Event', eventSchema);
