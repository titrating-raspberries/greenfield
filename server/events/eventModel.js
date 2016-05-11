const mongoose = require('mongoose');

// Storing each event document as a date and location, with an array containing events
const EventSchema = new mongoose.Schema({
  dateAndPlace: {
    type: String,
    required: true,
    unique: true,
  },
  eventList: {
    type: Object,
    require: true,
    unique: false,
  },
});
  // optimization feature: set up auto-refreshing of cached events based on lastModified date
  // would need to add an update function to the eventController
  // lastModified: {
  //   type: Date,
  //   required: true,
  // },

module.exports = mongoose.model('events', EventSchema);
